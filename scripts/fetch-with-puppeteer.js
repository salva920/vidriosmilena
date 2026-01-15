/**
 * Script para obtener productos usando Puppeteer (renderiza JavaScript)
 * 
 * Instalación:
 * npm install puppeteer
 * 
 * Uso:
 * node scripts/fetch-with-puppeteer.js urls.txt
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://dellorto.cl';
const DELAY_BETWEEN_REQUESTS = 3000; // 3 segundos entre requests

let allProducts = [];
let processedCount = 0;
let errorCount = 0;

/**
 * Extraer información de un producto desde el HTML renderizado
 */
function extractProductInfo(html, url) {
  try {
    // Nombre
    const nameMatch = html.match(/<h1[^>]*class="[^"]*product-title[^"]*"[^>]*>([^<]+)<\/h1>/i) ||
                     html.match(/<h1[^>]*>([^<]+)<\/h1>/i) ||
                     html.match(/<title>([^<]+)<\/title>/i);
    
    const name = nameMatch ? nameMatch[1]
      .replace(/&#8211;/g, '-')
      .replace(/&#8217;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#8212;/g, '—')
      .replace(/&nbsp;/g, ' ')
      .trim() : 'Producto sin nombre';

    // Precio - buscar múltiples patrones
    let price = null;
    let originalPrice = null;
    
    // Buscar rango de precios
    const rangeMatch = html.match(/Rango de precios: desde \$([\d.,]+) hasta \$([\d.,]+)/i);
    if (rangeMatch) {
      price = parseInt(rangeMatch[1].replace(/[.,]/g, ''), 10);
      originalPrice = parseInt(rangeMatch[2].replace(/[.,]/g, ''), 10);
    } else {
      // Buscar precio con descuento
      const discountMatch = html.match(/~~\$([\d.,]+)~~[^$]*\$([\d.,]+)/i);
      if (discountMatch) {
        originalPrice = parseInt(discountMatch[1].replace(/[.,]/g, ''), 10);
        price = parseInt(discountMatch[2].replace(/[.,]/g, ''), 10);
      } else {
        // Buscar precio simple
        const priceMatches = html.match(/\$([\d]{1,3}(?:[.,][\d]{3})*)/g);
        if (priceMatches && priceMatches.length > 0) {
          const prices = priceMatches.map(p => parseInt(p.replace(/[$,.]/g, ''), 10))
            .filter(p => p > 1000);
          if (prices.length > 0) {
            price = Math.min(...prices);
            if (prices.length > 1) {
              originalPrice = Math.max(...prices);
            }
          }
        }
      }
    }

    // SKU
    const skuMatch = html.match(/SKU[:\s]+([^\n<]+)/i) ||
                     html.match(/<span[^>]*class="[^"]*sku[^"]*"[^>]*>([^<]+)<\/span>/i);
    const sku = skuMatch ? skuMatch[1].trim() : '';

    // Descripción
    let description = '';
    const descPatterns = [
      /<div[^>]*class="[^"]*description[^"]*"[^>]*>([\s\S]{100,2000})<\/div>/i,
      /<div[^>]*class="[^"]*product-description[^"]*"[^>]*>([\s\S]{100,2000})<\/div>/i,
      /Descripción[^<]*<[^>]*>([\s\S]{100,2000})/i,
    ];
    
    for (const pattern of descPatterns) {
      const match = html.match(pattern);
      if (match) {
        description = match[1]
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
          .substring(0, 500);
        break;
      }
    }

    // Especificaciones técnicas
    const technicalSpecs = [];
    const tableMatch = html.match(/<table[^>]*>([\s\S]*?)<\/table>/i);
    if (tableMatch) {
      const rows = tableMatch[1].match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi) || [];
      rows.forEach((row, index) => {
        if (index === 0) return;
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

    // Imágenes
    const images = [];
    const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/gi;
    let imgMatch;
    
    while ((imgMatch = imgRegex.exec(html)) !== null) {
      const src = imgMatch[1];
      if (
        (src.includes('product') || src.includes('wp-content/uploads')) &&
        !src.includes('logo') &&
        !src.includes('icon') &&
        !src.includes('Falabella') &&
        !src.includes('Mecado_Libre') &&
        !src.includes('Paris') &&
        !src.includes('Ripley')
      ) {
        const fullUrl = src.startsWith('http') ? src : BASE_URL + src;
        images.push(fullUrl);
      }
    }

    // Medidas
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

    // Categoría
    let category = { name: 'Baños', slug: 'banos' };
    if (url.includes('espejo')) {
      category = { name: 'Baños', slug: 'banos' };
    } else if (url.includes('mampara') || url.includes('shower')) {
      category = { name: 'Baños', slug: 'banos' };
    } else if (url.includes('splashback') || url.includes('cocina')) {
      category = { name: 'Cocinas', slug: 'cocinas' };
    } else if (url.includes('pergola')) {
      category = { name: 'Pergolas Bioclimáticas', slug: 'pergolas-bioclimaticas' };
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
      sourceUrl: url,
    };
  } catch (error) {
    console.error('Error extrayendo producto:', error.message);
    return null;
  }
}

function convertMeasurements(measurements) {
  if (!measurements || measurements.length === 0) return undefined;
  
  return measurements.map((m, index) => {
    const id = m.size.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 20);
    return {
      id: `${id}-${index}`,
      label: m.size,
      value: m.size,
      price: m.priceAdjustment || undefined,
    };
  });
}

function convertTechnicalSpecs(specs) {
  if (!specs || specs.length === 0) return undefined;
  
  return specs.map(spec => ({
    name: spec.label,
    value: spec.value,
  }));
}

function generateTypeScriptCode(products) {
  let code = `// Productos importados de dellorto.cl\n`;
  code += `// Total: ${products.length} productos\n`;
  code += `// Fecha: ${new Date().toLocaleDateString('es-CL')}\n\n`;
  code += `import { Product } from '@/types/product'\n\n`;
  code += `export const importedProducts: Product[] = [\n`;

  products.forEach((product, index) => {
    code += `  {\n`;
    code += `    id: '${product.id}',\n`;
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
    
    const techSpecs = convertTechnicalSpecs(product.technicalSpecs);
    if (techSpecs && techSpecs.length > 0) {
      code += `    technicalSpecs: ${JSON.stringify(techSpecs)},\n`;
    }
    
    const measurements = convertMeasurements(product.measurements);
    if (measurements && measurements.length > 0) {
      code += `    measurements: ${JSON.stringify(measurements)},\n`;
    }
    
    code += `    stock: 'available',\n`;
    code += `  }${index < products.length - 1 ? ',' : ''}\n`;
  });

  code += `]\n`;
  return code;
}

async function processProductWithPuppeteer(url, browser) {
  try {
    console.log(`\n🌐 Abriendo: ${url}`);
    
    const page = await browser.newPage();
    
    // Configurar User-Agent y headers
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // Navegar a la página
    await page.goto(url, { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    // Esperar a que el contenido se cargue
    await page.waitForTimeout(2000);
    
    // Obtener HTML renderizado
    const html = await page.content();
    
    await page.close();
    
    // Extraer información del producto
    const product = extractProductInfo(html, url);
    
    if (product && product.name !== 'Producto sin nombre') {
      product.id = product.slug;
      allProducts.push(product);
      processedCount++;
      
      console.log(`✅ [${processedCount}] ${product.name.substring(0, 60)}...`);
      console.log(`   Precio: $${product.price.toLocaleString('es-CL')}`);
      return product;
    } else {
      errorCount++;
      console.log(`⚠️  [Error] No se pudo extraer: ${url}`);
      return null;
    }
  } catch (error) {
    errorCount++;
    console.error(`❌ [Error] ${url}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🚀 Iniciando extracción con Puppeteer...\n');
  
  // Verificar si Puppeteer está instalado
  try {
    require('puppeteer');
  } catch (error) {
    console.log('❌ Error: Puppeteer no está instalado.\n');
    console.log('💡 Instala Puppeteer con:');
    console.log('   npm install puppeteer\n');
    return;
  }

  // Leer URLs desde archivo
  const args = process.argv.slice(2);
  let productUrls = [];
  
  if (args.length > 0 && fs.existsSync(args[0])) {
    console.log(`📄 Leyendo URLs desde: ${args[0]}\n`);
    const fileContent = fs.readFileSync(args[0], 'utf-8');
    productUrls = fileContent
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && line.startsWith('http'));
  } else {
    console.log('❌ Error: Debes proporcionar un archivo con URLs');
    console.log('\nUso:');
    console.log('  node scripts/fetch-with-puppeteer.js urls.txt\n');
    return;
  }

  if (productUrls.length === 0) {
    console.log('❌ No hay URLs de productos para procesar.');
    return;
  }

  console.log(`📦 Total de productos a procesar: ${productUrls.length}\n`);
  console.log('⏳ Procesando productos (con delay de 3s entre cada uno)...\n');

  // Iniciar navegador
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    for (let i = 0; i < productUrls.length; i++) {
      const url = productUrls[i];
      await processProductWithPuppeteer(url, browser);
      
      if (i < productUrls.length - 1) {
        console.log(`⏸️  Esperando ${DELAY_BETWEEN_REQUESTS / 1000}s antes del siguiente producto...`);
        await new Promise(resolve => setTimeout(resolve, DELAY_BETWEEN_REQUESTS));
      }
    }
  } finally {
    await browser.close();
  }

  console.log(`\n💾 Guardando resultados...\n`);
  
  fs.writeFileSync('products-puppeteer.json', JSON.stringify(allProducts, null, 2));
  console.log(`✅ JSON guardado en: products-puppeteer.json`);

  const code = generateTypeScriptCode(allProducts);
  fs.writeFileSync('products-puppeteer.ts', code);
  console.log(`✅ Código TypeScript guardado en: products-puppeteer.ts`);

  console.log(`\n📊 RESUMEN:`);
  console.log(`   ✅ Productos procesados: ${processedCount}`);
  console.log(`   ❌ Errores: ${errorCount}`);
  console.log(`\n✨ ¡Proceso completado!`);
}

if (require.main === module) {
  main().catch(console.error);
}
