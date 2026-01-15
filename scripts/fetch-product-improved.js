/**
 * Script mejorado para obtener información detallada de un producto de dellorto.cl
 * Ejecutar con: node scripts/fetch-product-improved.js
 */

const https = require('https');
const fs = require('fs');

const productUrl = 'https://dellorto.cl/producto/mampara-corredera-vidrio-templado-8-mm-modelo-scala-con-herrajes-acero-cepillado/';

https.get(productUrl, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const productInfo = extractProductInfo(data);
      
      console.log('📦 Información del producto extraída:');
      console.log(JSON.stringify(productInfo, null, 2));

      // Guardar en archivo
      fs.writeFileSync('product-data.json', JSON.stringify(productInfo, null, 2));
      console.log('\n✅ Datos guardados en product-data.json');
      
      // También generar formato para agregar a products.ts
      generateProductCode(productInfo);
    } catch (error) {
      console.error('❌ Error:', error.message);
    }
  });
}).on('error', (err) => {
  console.error('❌ Error de conexión:', err.message);
});

function extractProductInfo(html) {
  // Extraer nombre (múltiples patrones)
  const name = extractText(html, [
    /<h1[^>]*class="[^"]*product-title[^"]*"[^>]*>([^<]+)<\/h1>/i,
    /<h1[^>]*>([^<]+)<\/h1>/i,
    /<title>([^<]+)<\/title>/i,
  ]) || 'Producto sin nombre';

  // Limpiar HTML entities
  const cleanName = name
    .replace(/&#8211;/g, '-')
    .replace(/&#8217;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .trim();

  // Extraer precio (buscar en múltiples ubicaciones)
  const price = extractPrice(html);
  
  // Extraer SKU
  const sku = extractText(html, [
    /SKU[:\s]+([^\n<]+)/i,
    /sku[:\s]+([^\n<]+)/i,
    /<span[^>]*class="[^"]*sku[^"]*"[^>]*>([^<]+)<\/span>/i,
  ]) || '';

  // Extraer descripción completa
  const description = extractDescription(html);
  
  // Extraer especificaciones técnicas
  const technicalSpecs = extractTechnicalSpecs(html);
  
  // Extraer imágenes del producto
  const images = extractImages(html);
  
  // Extraer medidas/variaciones
  const measurements = extractMeasurements(html);
  
  // Extraer categoría
  const category = extractCategory(html);

  return {
    name: cleanName,
    slug: generateSlug(cleanName),
    description: description || 'Descripción no disponible',
    price: price?.min || 0,
    originalPrice: price?.max && price?.max !== price?.min ? price.max : undefined,
    priceRange: price,
    images,
    sku: sku.trim(),
    category: category || 'Baños',
    stock: 'available',
    measurements,
    technicalSpecs,
  };
}

function extractText(html, patterns) {
  if (Array.isArray(patterns)) {
    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
    return null;
  }
  const match = html.match(patterns);
  return match ? match[1].trim() : null;
}

function extractPrice(html) {
  // Buscar precios en formato $XXX.XXX o $XXX,XXX
  const pricePatterns = [
    /\$[\s]*([\d]{1,3}(?:[.,][\d]{3})*)/g,  // $369.990 o $369,990
    /price[^>]*>[\s]*\$?[\s]*([\d.,]+)/gi,
    /precio[^>]*>[\s]*\$?[\s]*([\d.,]+)/gi,
  ];

  const prices = [];
  
  for (const pattern of pricePatterns) {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      const priceStr = match[1].replace(/[.,]/g, '');
      const priceNum = parseInt(priceStr, 10);
      if (priceNum > 1000) { // Filtrar precios razonables (mayor a $1.000)
        prices.push(priceNum);
      }
    }
  }

  if (prices.length === 0) return null;
  
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  
  return {
    min,
    max: max !== min ? max : undefined,
    all: [...new Set(prices)].sort((a, b) => a - b),
  };
}

function extractDescription(html) {
  const patterns = [
    /<div[^>]*class="[^"]*description[^"]*"[^>]*>([\s\S]{100,2000})<\/div>/i,
    /<div[^>]*class="[^"]*product-description[^"]*"[^>]*>([\s\S]{100,2000})<\/div>/i,
    /Descripción[^<]*<[^>]*>([\s\S]{100,2000})/i,
    /<p[^>]*class="[^"]*description[^"]*"[^>]*>([\s\S]{100,2000})<\/p>/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) {
      let desc = match[1]
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      
      if (desc.length > 50 && !desc.includes('{{{')) {
        return desc.substring(0, 500);
      }
    }
  }
  
  return null;
}

function extractTechnicalSpecs(html) {
  const specs = [];
  
  // Buscar tablas de especificaciones
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
          specs.push({ label, value });
        }
      }
    });
  }

  // Buscar listas de especificaciones
  const listMatch = html.match(/<ul[^>]*class="[^"]*spec[^"]*"[^>]*>([\s\S]*?)<\/ul>/i);
  if (listMatch) {
    const items = listMatch[1].match(/<li[^>]*>([^<]+)<\/li>/gi) || [];
    items.forEach(item => {
      const text = item.replace(/<[^>]+>/g, '').trim();
      if (text.includes(':')) {
        const [label, value] = text.split(':').map(s => s.trim());
        if (label && value) {
          specs.push({ label, value });
        }
      }
    });
  }

  return specs.length > 0 ? specs : undefined;
}

function extractImages(html) {
  const images = [];
  const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/gi;
  let match;

  while ((match = imgRegex.exec(html)) !== null) {
    const src = match[1];
    // Filtrar solo imágenes de productos (no logos, iconos, etc.)
    if (
      (src.includes('product') || src.includes('wp-content/uploads')) &&
      !src.includes('logo') &&
      !src.includes('icon') &&
      !src.includes('Falabella') &&
      !src.includes('Mecado_Libre') &&
      !src.includes('Paris') &&
      !src.includes('Ripley')
    ) {
      // Convertir URLs relativas a absolutas
      const fullUrl = src.startsWith('http') ? src : `https://dellorto.cl${src}`;
      images.push(fullUrl);
    }
  }

  // Eliminar duplicados y limitar
  return [...new Set(images)].slice(0, 5);
}

function extractMeasurements(html) {
  const measurements = [];
  
  // Buscar en select/opciones
  const selectMatch = html.match(/<select[^>]*name="[^"]*medida[^"]*"[^>]*>([\s\S]*?)<\/select>/i) ||
                      html.match(/<select[^>]*>([\s\S]*?)<\/select>/i);
  
  if (selectMatch) {
    const options = selectMatch[1].match(/<option[^>]*value="([^"]+)"[^>]*>([^<]+)<\/option>/gi) || [];
    options.forEach(option => {
      const match = option.match(/value="([^"]+)"[^>]*>([^<]+)/i);
      if (match) {
        const value = match[1];
        const text = match[2].trim();
        // Filtrar opciones que parezcan medidas
        if (text && (text.includes('cm') || text.includes('x') || text.match(/\d+-\d+/))) {
          measurements.push({ size: text, priceAdjustment: 0 });
        }
      }
    });
  }

  // Buscar en tabla de medidas
  const tableMatch = html.match(/<table[^>]*>([\s\S]*?)<\/table>/i);
  if (tableMatch) {
    const rows = tableMatch[1].match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi) || [];
    rows.forEach((row, index) => {
      if (index === 0) return; // Saltar header
      
      const cells = row.match(/<t[dh][^>]*>([^<]+)<\/t[dh]>/gi) || [];
      if (cells.length >= 1) {
        const size = cells[0].replace(/<[^>]+>/g, '').trim();
        if (size && (size.includes('cm') || size.includes('x') || size.match(/\d+-\d+/))) {
          measurements.push({ size, priceAdjustment: 0 });
        }
      }
    });
  }

  // Eliminar duplicados
  const unique = [];
  const seen = new Set();
  measurements.forEach(m => {
    if (!seen.has(m.size)) {
      seen.add(m.size);
      unique.push(m);
    }
  });

  return unique.length > 0 ? unique : undefined;
}

function extractCategory(html) {
  const categoryMatch = html.match(/<a[^>]*class="[^"]*category[^"]*"[^>]*>([^<]+)<\/a>/i) ||
                       html.match(/Categoría[^<]*<[^>]*>([^<]+)/i);
  
  if (categoryMatch) {
    return categoryMatch[1].trim();
  }
  
  // Intentar inferir de la URL o contenido
  if (html.includes('mampara') || html.includes('shower')) {
    return 'Baños';
  }
  
  return 'Baños'; // Default
}

function generateSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function generateProductCode(productInfo) {
  const code = `
// Producto importado de dellorto.cl
{
  id: '${productInfo.slug}',
  name: ${JSON.stringify(productInfo.name)},
  slug: '${productInfo.slug}',
  description: ${JSON.stringify(productInfo.description)},
  price: ${productInfo.price},
  ${productInfo.originalPrice ? `originalPrice: ${productInfo.originalPrice},` : ''}
  images: ${JSON.stringify(productInfo.images)},
  category: '${productInfo.category}',
  categorySlug: '${productInfo.category.toLowerCase().replace(/\s+/g, '-')}',
  sku: ${JSON.stringify(productInfo.sku || 'N/A')},
  stock: 'available',
  ${productInfo.measurements ? `measurements: ${JSON.stringify(productInfo.measurements)},` : ''}
  ${productInfo.technicalSpecs ? `technicalSpecs: ${JSON.stringify(productInfo.technicalSpecs)},` : ''}
},
`;

  fs.writeFileSync('product-code.ts', code);
  console.log('\n📝 Código para products.ts guardado en product-code.ts');
}
