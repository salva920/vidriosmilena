/**
 * Script para procesar HTML copiado manualmente de páginas de productos
 * 
 * Uso:
 * 1. Abre una página de producto en dellorto.cl
 * 2. Copia todo el HTML (Ctrl+A, Ctrl+C en el código fuente)
 * 3. Guarda el HTML en un archivo (ej: producto1.html)
 * 4. Ejecuta: node scripts/process-html-manual.js producto1.html
 * 
 * O pega el HTML directamente en el archivo
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://dellorto.cl';

function extractProductFromHTML(html, sourceUrl = '') {
  try {
    // Nombre
    const nameMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/i) || 
                     html.match(/<title>([^<]+)<\/title>/i);
    const name = nameMatch ? nameMatch[1]
      .replace(/&#8211;/g, '-')
      .replace(/&#8217;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#8212;/g, '—')
      .replace(/&nbsp;/g, ' ')
      .trim() : 'Producto sin nombre';

    // Precio - Buscar primero en dataLayer de Google Tag Manager
    let price = null;
    let originalPrice = null;
    
    // Método 1: Buscar en gtmkit_dataLayer_content (más confiable)
    const dataLayerMatch = html.match(/gtmkit_dataLayer_content\s*=\s*({[^}]+"price":(\d+)[^}]+})/);
    if (dataLayerMatch) {
      try {
        const dataLayerStr = dataLayerMatch[1].replace(/&#36;/g, '$');
        const priceMatch = dataLayerStr.match(/"price":(\d+)/);
        if (priceMatch) {
          price = parseInt(priceMatch[1], 10);
        }
      } catch (e) {
        // Continuar con otros métodos
      }
    }
    
    // Método 2: Buscar rango de precios
    if (!price) {
      const priceRangeMatch = html.match(/Rango de precios: desde \$([\d.,]+) hasta \$([\d.,]+)/i);
      if (priceRangeMatch) {
        price = parseInt(priceRangeMatch[1].replace(/[.,]/g, ''), 10);
        originalPrice = parseInt(priceRangeMatch[2].replace(/[.,]/g, ''), 10);
      }
    }
    
    // Método 3: Buscar precio con descuento en HTML WooCommerce
    if (!price) {
      // Buscar formato: <del>$227.990</del> <ins>$169.990</ins>
      const discountMatch = html.match(/<del[^>]*>.*?woocommerce-Price-amount[^>]*>.*?&#36;([\d.,]+).*?<\/del>.*?<ins[^>]*>.*?woocommerce-Price-amount[^>]*>.*?&#36;([\d.,]+)/i);
      if (discountMatch) {
        originalPrice = parseInt(discountMatch[1].replace(/[.,]/g, ''), 10);
        price = parseInt(discountMatch[2].replace(/[.,]/g, ''), 10);
      } else {
        // Buscar precio simple en formato WooCommerce
        const priceMatch = html.match(/woocommerce-Price-amount[^>]*>.*?&#36;([\d]{1,3}(?:[.,][\d]{3})*)/i);
        if (priceMatch) {
          price = parseInt(priceMatch[1].replace(/[.,]/g, ''), 10);
        }
      }
    }
    
    // Método 4: Buscar precio simple con formato $XXX.XXX
    if (!price) {
      const priceMatch = html.match(/\$([\d]{1,3}(?:[.,][\d]{3})*)/);
      if (priceMatch) {
        const priceStr = priceMatch[1].replace(/[.,]/g, '');
        const priceNum = parseInt(priceStr, 10);
        if (priceNum > 1000) { // Filtrar precios razonables
          price = priceNum;
        }
      }
    }

    // SKU
    const skuMatch = html.match(/SKU[:\s]+([^\n<]+)/i);
    const sku = skuMatch ? skuMatch[1].trim() : '';

    // Descripción - buscar en múltiples lugares
    let description = '';
    
    // Método 1: Buscar en meta og:description (más confiable)
    const ogDescMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
    if (ogDescMatch && ogDescMatch[1]) {
      description = ogDescMatch[1]
        .replace(/&#8211;/g, '-')
        .replace(/&#8217;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#8212;/g, '—')
        .replace(/&nbsp;/g, ' ')
        .trim();
    }
    
    // Método 2: Buscar en short description de WooCommerce
    if (!description || description.length < 20) {
      const shortDescMatch = html.match(/<div[^>]*class="[^"]*woocommerce-product-details__short-description[^"]*"[^>]*>([\s\S]{50,1000})<\/div>/i);
      if (shortDescMatch) {
        let desc = shortDescMatch[1]
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        if (desc.length > 20 && !desc.includes('{{{')) {
          description = desc.substring(0, 500);
        }
      }
    }
    
    // Método 3: Buscar en tab description
    if (!description || description.length < 20) {
      const tabDescMatch = html.match(/<div[^>]*id=["']tab-description["'][^>]*>([\s\S]{100,2000})<\/div>/i);
      if (tabDescMatch) {
        let desc = tabDescMatch[1]
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        if (desc.length > 20 && !desc.includes('{{{')) {
          description = desc.substring(0, 500);
        }
      }
    }

    // Especificaciones técnicas (tabla)
    const technicalSpecs = [];
    const tableMatch = html.match(/<table[^>]*>([\s\S]*?)<\/table>/i);
    if (tableMatch) {
      const rows = tableMatch[1].match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi) || [];
      rows.forEach((row, index) => {
        if (index === 0) return; // Saltar header
        const cells = row.match(/<t[dh][^>]*>([^<]+)<\/t[dh]>/gi) || [];
        if (cells.length >= 2) {
          const label = cells[0].replace(/<[^>]+>/g, '').trim();
          const value = cells[1].replace(/<[^>]+>/g, '').trim();
          if (label && value && label.length < 50) {
            technicalSpecs.push({ label, value });
          }
        }
      });
    }

    // Imágenes - buscar en data-src (lazy loading) y src
    const images = [];
    const seenImages = new Set();
    
    // Buscar en data-src (lazy loading)
    const dataSrcRegex = /<img[^>]+data-src="([^"]+)"[^>]*>/gi;
    let imgMatch;
    
    while ((imgMatch = dataSrcRegex.exec(html)) !== null) {
      const src = imgMatch[1];
      if (
        (src.includes('wp-content/uploads') || src.includes('product')) &&
        !src.includes('logo') &&
        !src.includes('Logo_') &&
        !src.includes('icon') &&
        !src.includes('Falabella') &&
        !src.includes('Mecado_Libre') &&
        !src.includes('Paris') &&
        !src.includes('Ripley') &&
        !src.includes('placeholder') &&
        !src.includes('100x100') && // Excluir thumbnails pequeños
        !src.includes('150x150') &&
        !src.includes('90x90')
      ) {
        const fullUrl = src.startsWith('http') ? src : BASE_URL + src;
        if (!seenImages.has(fullUrl)) {
          images.push(fullUrl);
          seenImages.add(fullUrl);
        }
      }
    }
    
    // Buscar en src normal si no hay suficientes imágenes
    if (images.length < 3) {
      const srcRegex = /<img[^>]+src="([^"]+)"[^>]*>/gi;
      while ((imgMatch = srcRegex.exec(html)) !== null) {
        const src = imgMatch[1];
        if (
          (src.includes('wp-content/uploads') || src.includes('product')) &&
          !src.includes('logo') &&
          !src.includes('Logo_') &&
          !src.includes('icon') &&
          !src.includes('Falabella') &&
          !src.includes('Mecado_Libre') &&
          !src.includes('Paris') &&
          !src.includes('Ripley') &&
          !src.includes('placeholder') &&
          !src.includes('100x100') &&
          !src.includes('150x150') &&
          !src.includes('90x90')
        ) {
          const fullUrl = src.startsWith('http') ? src : BASE_URL + src;
          if (!seenImages.has(fullUrl)) {
            images.push(fullUrl);
            seenImages.add(fullUrl);
          }
        }
      }
    }

    // Medidas (si hay select o tabla)
    const measurements = [];
    const selectMatch = html.match(/<select[^>]*>([\s\S]*?)<\/select>/i);
    if (selectMatch) {
      const options = selectMatch[1].match(/<option[^>]*value="([^"]+)"[^>]*>([^<]+)<\/option>/gi) || [];
      options.forEach(option => {
        const match = option.match(/value="([^"]+)"[^>]*>([^<]+)/i);
        if (match) {
          const text = match[2].trim();
          if (text && (text.includes('cm') || text.includes('x') || text.match(/\d+-\d+/))) {
            measurements.push({ size: text, priceAdjustment: 0 });
          }
        }
      });
    }

    // Categoría (inferir de URL o contenido)
    let category = { name: 'Baños', slug: 'banos' };
    if (sourceUrl.includes('espejo')) {
      category = { name: 'Baños', slug: 'banos' };
    } else if (sourceUrl.includes('mampara') || sourceUrl.includes('shower')) {
      category = { name: 'Baños', slug: 'banos' };
    }

    // Slug
    const slug = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 100);

    return {
      name,
      slug,
      description: description || 'Descripción no disponible',
      price: price || 0,
      originalPrice: originalPrice && originalPrice !== price ? originalPrice : undefined,
      images: [...new Set(images)].slice(0, 5),
      sku: sku || 'N/A',
      category: category.name,
      categorySlug: category.slug,
      stock: 'available',
      measurements: measurements.length > 0 ? measurements : undefined,
      technicalSpecs: technicalSpecs.length > 0 ? technicalSpecs : undefined,
      sourceUrl,
    };
  } catch (error) {
    console.error('Error extrayendo producto:', error.message);
    return null;
  }
}

function convertToTypeScript(products) {
  let code = `// Productos importados de dellorto.cl\n`;
  code += `// Total: ${products.length} productos\n`;
  code += `// Fecha: ${new Date().toLocaleDateString('es-CL')}\n\n`;
  code += `import { Product } from '@/types/product'\n\n`;
  code += `export const importedProducts: Product[] = [\n`;

  products.forEach((product, index) => {
    code += `  {\n`;
    code += `    id: '${product.slug}',\n`;
    code += `    name: ${JSON.stringify(product.name)},\n`;
    code += `    slug: '${product.slug}',\n`;
    code += `    category: ${JSON.stringify(product.category)},\n`;
    code += `    categorySlug: '${product.categorySlug}',\n`;
    code += `    price: ${product.price},\n`;
    if (product.originalPrice && product.originalPrice !== product.price) {
      code += `    originalPrice: ${product.originalPrice},\n`;
    }
    code += `    sku: ${JSON.stringify(product.sku)},\n`;
    code += `    images: ${JSON.stringify(product.images)},\n`;
    code += `    description: ${JSON.stringify(product.description)},\n`;
    
    if (product.technicalSpecs && product.technicalSpecs.length > 0) {
      const techSpecs = product.technicalSpecs.map(spec => ({
        name: spec.label,
        value: spec.value,
      }));
      code += `    technicalSpecs: ${JSON.stringify(techSpecs)},\n`;
    }
    
    if (product.measurements && product.measurements.length > 0) {
      const measurements = product.measurements.map((m, i) => {
        const id = m.size.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 20);
        return {
          id: `${id}-${i}`,
          label: m.size,
          value: m.size,
          price: m.priceAdjustment || undefined,
        };
      });
      code += `    measurements: ${JSON.stringify(measurements)},\n`;
    }
    
    code += `    stock: 'available',\n`;
    code += `  }${index < products.length - 1 ? ',' : ''}\n`;
  });

  code += `]\n`;
  return code;
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('❌ Error: Debes proporcionar un archivo HTML');
    console.log('\nUso:');
    console.log('  node scripts/process-html-manual.js archivo.html');
    console.log('\nO procesar múltiples archivos:');
    console.log('  node scripts/process-html-manual.js producto1.html producto2.html ...');
    console.log('\n💡 Cómo obtener el HTML:');
    console.log('   1. Abre la página del producto en dellorto.cl');
    console.log('   2. Presiona F12 (herramientas de desarrollador)');
    console.log('   3. Ve a la pestaña "Elements"');
    console.log('   4. Haz clic derecho en <html> > Copy > Copy outerHTML');
    console.log('   5. Pega en un archivo .html');
    return;
  }

  console.log('📄 Procesando archivos HTML...\n');
  
  const products = [];
  let successCount = 0;
  let errorCount = 0;
  
  for (const filePath of args) {
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Archivo no encontrado: ${filePath}`);
      errorCount++;
      continue;
    }

    console.log(`📂 Procesando: ${filePath}`);
    const html = fs.readFileSync(filePath, 'utf-8');
    
    // Verificar que el HTML parece válido
    if (html.length < 1000) {
      console.log(`   ⚠️  El archivo parece muy pequeño (${html.length} caracteres). ¿Está completo?`);
    }
    
    // Intentar extraer URL del archivo o del HTML
    let sourceUrl = '';
    const urlMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) ||
                    html.match(/<meta[^>]*property=["']og:url["'][^>]*content=["']([^"']+)["']/i);
    if (urlMatch) {
      sourceUrl = urlMatch[1];
      console.log(`   🔗 URL detectada: ${sourceUrl}`);
    } else {
      console.log(`   ⚠️  No se pudo detectar la URL del producto`);
    }
    
    const product = extractProductFromHTML(html, sourceUrl);
    
    if (product && product.name !== 'Producto sin nombre') {
      product.id = product.slug;
      products.push(product);
      successCount++;
      console.log(`   ✅ Extraído: ${product.name.substring(0, 60)}...`);
      console.log(`      Precio: $${product.price.toLocaleString('es-CL')}`);
      console.log(`      Imágenes: ${product.images.length}`);
      console.log(`      SKU: ${product.sku}`);
    } else {
      errorCount++;
      console.log(`   ⚠️  No se pudo extraer producto de este archivo`);
      console.log(`   💡 Verifica que el HTML esté completo y contenga la información del producto`);
    }
    console.log('');
  }

  if (products.length === 0) {
    console.log('\n❌ No se pudieron extraer productos');
    console.log('\n💡 Sugerencias:');
    console.log('   - Verifica que los archivos HTML estén completos');
    console.log('   - Asegúrate de copiar todo el HTML (Ctrl+A, Ctrl+C)');
    console.log('   - Revisa que la página haya cargado completamente antes de copiar');
    return;
  }

  console.log(`\n💾 Guardando ${products.length} productos...\n`);
  
  // Guardar JSON
  fs.writeFileSync('products-from-html.json', JSON.stringify(products, null, 2));
  console.log('✅ JSON guardado en: products-from-html.json');
  
  // Guardar código TypeScript
  const code = convertToTypeScript(products);
  fs.writeFileSync('products-from-html.ts', code);
  console.log('✅ Código TypeScript guardado en: products-from-html.ts');
  
  console.log(`\n📊 RESUMEN:`);
  console.log(`   ✅ Productos extraídos: ${successCount}`);
  console.log(`   ❌ Errores: ${errorCount}`);
  console.log('\n✨ ¡Proceso completado!');
  console.log('\n💡 Próximo paso:');
  console.log('   1. Revisa products-from-html.ts');
  console.log('   2. Verifica que los datos sean correctos');
  console.log('   3. Copia los productos a data/products.ts');
  console.log('   4. Asegúrate de que las categorías coincidan');
}

if (require.main === module) {
  main();
}
