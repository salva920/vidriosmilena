/**
 * Script para obtener productos de dellorto.cl desde una lista de URLs
 * 
 * Uso:
 * 1. Agrega las URLs de productos en el array PRODUCT_URLS
 * 2. Ejecuta: node scripts/fetch-products-from-list.js
 * 
 * O usa con un archivo de URLs:
 * node scripts/fetch-products-from-list.js urls.txt
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://dellorto.cl';
const DELAY_BETWEEN_REQUESTS = 2000;

// Lista de URLs de productos (agrega más según necesites)
const PRODUCT_URLS = [
  'https://dellorto.cl/producto/mampara-corredera-vidrio-templado-8-mm-modelo-scala-con-herrajes-acero-cepillado/',
  // Agrega más URLs aquí...
];

let allProducts = [];
let processedCount = 0;
let errorCount = 0;

/**
 * Función para hacer peticiones HTTPS
 */
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Cache-Control': 'max-age=0',
      },
    };

    const req = https.request(options, (res) => {
      // Manejar redirecciones
      if (res.statusCode === 301 || res.statusCode === 302) {
        const redirectUrl = res.headers.location;
        if (redirectUrl) {
          return fetchUrl(redirectUrl.startsWith('http') ? redirectUrl : BASE_URL + redirectUrl)
            .then(resolve)
            .catch(reject);
        }
      }

      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage || 'Error'}`));
        return;
      }

      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(data);
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    req.end();
  });
}

/**
 * Extraer información de un producto
 */
function extractProductInfo(html, url) {
  try {
    // Nombre
    const name = extractText(html, [
      /<h1[^>]*class="[^"]*product-title[^"]*"[^>]*>([^<]+)<\/h1>/i,
      /<h1[^>]*>([^<]+)<\/h1>/i,
      /<title>([^<]+)<\/title>/i,
    ]) || 'Producto sin nombre';

    const cleanName = name
      .replace(/&#8211;/g, '-')
      .replace(/&#8217;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#8212;/g, '—')
      .replace(/&nbsp;/g, ' ')
      .trim();

    // Precio
    const price = extractPrice(html);
    
    // SKU
    const sku = extractText(html, [
      /SKU[:\s]+([^\n<]+)/i,
      /sku[:\s]+([^\n<]+)/i,
      /<span[^>]*class="[^"]*sku[^"]*"[^>]*>([^<]+)<\/span>/i,
    ]) || '';

    // Descripción
    const description = extractDescription(html);
    
    // Especificaciones técnicas
    const technicalSpecs = extractTechnicalSpecs(html);
    
    // Imágenes
    const images = extractImages(html);
    
    // Medidas/variaciones
    const measurements = extractMeasurements(html);
    
    // Categoría
    const category = extractCategory(html, url);

    // Slug
    const slug = generateSlug(cleanName);

    return {
      name: cleanName,
      slug,
      description: description || 'Descripción no disponible',
      price: price?.min || 0,
      originalPrice: price?.max && price?.max !== price?.min ? price.max : undefined,
      images: images.slice(0, 5),
      sku: sku.trim() || 'N/A',
      category: category.name,
      categorySlug: category.slug,
      stock: 'available',
      measurements,
      technicalSpecs,
      sourceUrl: url,
    };
  } catch (error) {
    console.error('Error extrayendo producto:', error.message);
    return null;
  }
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
  // Buscar rangos de precio primero
  const rangeMatch = html.match(/Rango de precios: desde \$([\d.,]+) hasta \$([\d.,]+)/i);
  if (rangeMatch) {
    const min = parseInt(rangeMatch[1].replace(/[.,]/g, ''), 10);
    const max = parseInt(rangeMatch[2].replace(/[.,]/g, ''), 10);
    return { min, max, all: [min, max] };
  }

  // Buscar precios individuales
  const pricePatterns = [
    /\$[\s]*([\d]{1,3}(?:[.,][\d]{3})*)/g,
    /price[^>]*>[\s]*\$?[\s]*([\d.,]+)/gi,
  ];

  const prices = [];
  for (const pattern of pricePatterns) {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      const priceStr = match[1].replace(/[.,]/g, '');
      const priceNum = parseInt(priceStr, 10);
      if (priceNum > 1000) {
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

  return [...new Set(images)];
}

function extractMeasurements(html) {
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

function extractCategory(html, url) {
  const CATEGORY_MAP = {
    'banos': { name: 'Baños', slug: 'banos' },
    'cocinas': { name: 'Cocinas', slug: 'cocinas' },
    'pergolas': { name: 'Pergolas Bioclimáticas', slug: 'pergolas-bioclimaticas' },
    'terrazas': { name: 'Terrazas & Quinchos', slug: 'terrazas-quinchos' },
    'habitaciones': { name: 'Habitaciones & Oficinas', slug: 'habitaciones-oficinas' },
    'fachadas': { name: 'Fachadas', slug: 'fachadas' },
  };

  for (const [key, value] of Object.entries(CATEGORY_MAP)) {
    if (url.includes(key)) {
      return value;
    }
  }

  if (html.includes('mampara') || html.includes('shower') || html.includes('espejo')) {
    return { name: 'Baños', slug: 'banos' };
  }
  if (html.includes('splashback') || html.includes('cocina')) {
    return { name: 'Cocinas', slug: 'cocinas' };
  }

  return { name: 'Baños', slug: 'banos' };
}

function generateSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 100);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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

async function processProduct(url) {
  try {
    const html = await fetchUrl(url);
    const product = extractProductInfo(html, url);
    
    if (product && product.name !== 'Producto sin nombre') {
      product.id = product.slug;
      allProducts.push(product);
      processedCount++;
      
      console.log(`✅ [${processedCount}] ${product.name.substring(0, 60)}...`);
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
  console.log('🚀 Iniciando extracción de productos de dellorto.cl\n');

  // Leer URLs desde archivo si se proporciona
  let productUrls = [...PRODUCT_URLS];
  const args = process.argv.slice(2);
  
  if (args.length > 0 && fs.existsSync(args[0])) {
    console.log(`📄 Leyendo URLs desde: ${args[0]}\n`);
    const fileContent = fs.readFileSync(args[0], 'utf-8');
    const urlsFromFile = fileContent
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && line.startsWith('http'));
    productUrls = [...productUrls, ...urlsFromFile];
  }

  if (productUrls.length === 0) {
    console.log('❌ No hay URLs de productos para procesar.');
    console.log('💡 Agrega URLs en PRODUCT_URLS o proporciona un archivo de URLs.\n');
    console.log('Ejemplo: node scripts/fetch-products-from-list.js urls.txt');
    return;
  }

  console.log(`📦 Total de productos a procesar: ${productUrls.length}\n`);
  console.log('⏳ Procesando productos (con delay de 2s entre cada uno)...\n');

  for (let i = 0; i < productUrls.length; i++) {
    const url = productUrls[i];
    await processProduct(url);
    
    if (i < productUrls.length - 1) {
      await sleep(DELAY_BETWEEN_REQUESTS);
    }
  }

  console.log(`\n💾 Guardando resultados...\n`);
  
  fs.writeFileSync('all-products-data.json', JSON.stringify(allProducts, null, 2));
  console.log(`✅ JSON guardado en: all-products-data.json`);
  
  const code = generateTypeScriptCode(allProducts);
  fs.writeFileSync('all-products-code.ts', code);
  console.log(`✅ Código TypeScript guardado en: all-products-code.ts`);

  console.log(`\n📊 RESUMEN:`);
  console.log(`   ✅ Productos procesados: ${processedCount}`);
  console.log(`   ❌ Errores: ${errorCount}`);
  console.log(`\n✨ ¡Proceso completado!`);
}

if (require.main === module) {
  main();
}
