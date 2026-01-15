/**
 * Script para obtener TODOS los productos de dellorto.cl
 * Extrae información de cada producto y la convierte al formato de la tienda
 * 
 * Uso: node scripts/fetch-all-products.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://dellorto.cl';
const DELAY_BETWEEN_REQUESTS = 2000; // 2 segundos entre solicitudes (rate limiting)
const OUTPUT_FILE = 'all-products-data.json';
const CODE_FILE = 'all-products-code.ts';

// Categorías mapeadas
const CATEGORY_MAP = {
  'banos': 'Baños',
  'cocinas': 'Cocinas',
  'terrazas-quinchos': 'Terrazas & Quinchos',
  'pergolas-bioclimaticas': 'Pergolas Bioclimáticas',
  'habitaciones-oficinas': 'Habitaciones & Oficinas',
  'fachadas': 'Fachadas',
};

let allProducts = [];
let processedCount = 0;
let errorCount = 0;

/**
 * Función para hacer peticiones HTTPS
 */
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    }, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Obtener todas las URLs de productos
 */
async function getAllProductUrls() {
  console.log('🔍 Buscando URLs de productos...\n');
  
  const productUrls = new Set();
  
  // Estrategia 1: Buscar en la página principal
  try {
    console.log('📂 Procesando página principal...');
    const html = await fetchUrl(BASE_URL);
    
    // Múltiples patrones para encontrar productos
    const patterns = [
      /<a[^>]+href="(\/producto\/[^"]+)"[^>]*>/gi,
      /href="(\/producto\/[^"]+)"/gi,
      /"url":"(\/producto\/[^"]+)"/gi,
    ];
    
    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(html)) !== null) {
        const productPath = match[1];
        if (productPath && !productPath.includes('categoria') && !productPath.includes('tag')) {
          const productUrl = productPath.startsWith('http') ? productPath : BASE_URL + productPath;
          productUrls.add(productUrl);
        }
      }
    }
    
    console.log(`   ✅ Encontrados ${productUrls.size} productos en página principal`);
  } catch (error) {
    console.error('   ❌ Error en página principal:', error.message);
  }

  // Estrategia 2: Buscar en sitemap si existe
  try {
    console.log('📂 Buscando sitemap...');
    const sitemapUrl = BASE_URL + '/sitemap.xml';
    const sitemap = await fetchUrl(sitemapUrl);
    
    const sitemapRegex = /<loc>([^<]*\/producto\/[^<]+)<\/loc>/gi;
    let match;
    
    while ((match = sitemapRegex.exec(sitemap)) !== null) {
      productUrls.add(match[1]);
    }
    
    console.log(`   ✅ Encontrados ${productUrls.size} productos totales (incluyendo sitemap)`);
  } catch (error) {
    console.log('   ⚠️  Sitemap no disponible o error al acceder');
  }

  // Estrategia 3: Buscar en páginas de categorías reales
  const categoryUrls = [
    'https://dellorto.cl/categoria-producto/banos/',
    'https://dellorto.cl/categoria/splashback/',
    'https://dellorto.cl/pergolas-bioclimaticas-v2/',
    'https://dellorto.cl/categoria-producto/terrazas-quinchos/',
    'https://dellorto.cl/categoria/revestimientos/',
    'https://dellorto.cl/categoria/tabiquerias/',
    'https://dellorto.cl/categoria/pisos-y-escaleras/',
    'https://dellorto.cl/categoria/puertas-y-ventanas/',
    'https://dellorto.cl/categoria-producto/banos/espejos/',
    'https://dellorto.cl/categoria-producto/habitaciones-oficinas/pizarra/',
    'https://dellorto.cl/categoria-producto/muebles-decoracion/cubiertas/',
    'https://dellorto.cl/categoria/frentes-templados/',
  ];

  console.log(`\n📂 Procesando ${categoryUrls.length} categorías...\n`);

  for (const categoryUrl of categoryUrls) {
    try {
      console.log(`   📁 Procesando: ${categoryUrl}`);
      const html = await fetchUrl(categoryUrl);
      
      // Múltiples patrones para encontrar productos
      const patterns = [
        /<a[^>]+href="(\/producto\/[^"]+)"[^>]*>/gi,
        /href="(\/producto\/[^"]+)"/gi,
        /"url":"(\/producto\/[^"]+)"/gi,
        /<a[^>]+href="(https:\/\/dellorto\.cl\/producto\/[^"]+)"[^>]*>/gi,
      ];
      
      let found = 0;
      for (const pattern of patterns) {
        let match;
        while ((match = pattern.exec(html)) !== null) {
          const productPath = match[1];
          let productUrl;
          
          if (productPath.startsWith('http')) {
            productUrl = productPath;
          } else {
            productUrl = BASE_URL + productPath;
          }
          
          if (productUrl && !productUrl.includes('categoria') && !productUrl.includes('tag')) {
            if (productUrls.add(productUrl)) {
              found++;
            }
          }
        }
      }
      
      if (found > 0) {
        console.log(`      ✅ Encontrados ${found} productos nuevos (Total: ${productUrls.size})`);
      } else {
        console.log(`      ⚠️  No se encontraron productos en esta categoría`);
      }
      
      await sleep(1500); // Delay entre categorías
    } catch (error) {
      console.error(`      ❌ Error en ${categoryUrl}:`, error.message);
    }
  }

  // Si aún no hay productos, intentar buscar en páginas de tienda
  if (productUrls.size === 0) {
    console.log('📂 Buscando en páginas de tienda...');
    const shopPages = ['/tienda/', '/shop/', '/productos/'];
    
    for (const shopPath of shopPages) {
      try {
        const url = BASE_URL + shopPath;
        const html = await fetchUrl(url);
        
        const productLinkRegex = /<a[^>]+href="(\/producto\/[^"]+)"[^>]*>/gi;
        let match;
        
        while ((match = productLinkRegex.exec(html)) !== null) {
          const productUrl = BASE_URL + match[1];
          productUrls.add(productUrl);
        }
        
        if (productUrls.size > 0) {
          console.log(`   ✅ Encontrados ${productUrls.size} productos en ${shopPath}`);
          break;
        }
      } catch (error) {
        // Continuar con siguiente página
      }
    }
  }

  console.log(`\n📦 Total de productos únicos encontrados: ${productUrls.size}\n`);
  
  return Array.from(productUrls);
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
    
    // Especificaciones técnicas (convertir a formato { label, value } para luego convertir)
    const technicalSpecs = extractTechnicalSpecs(html);
    
    // Imágenes
    const images = extractImages(html);
    
    // Medidas/variaciones
    const measurements = extractMeasurements(html);
    
    // Categoría (inferir de URL o contenido)
    const category = extractCategory(html, url);

    // Slug
    const slug = generateSlug(cleanName);

    return {
      name: cleanName,
      slug,
      description: description || 'Descripción no disponible',
      price: price?.min || 0,
      originalPrice: price?.max && price?.max !== price?.min ? price.max : undefined,
      images: images.slice(0, 5), // Limitar a 5 imágenes
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

/**
 * Extraer texto con múltiples patrones
 */
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

/**
 * Extraer precio
 */
function extractPrice(html) {
  const pricePatterns = [
    /\$[\s]*([\d]{1,3}(?:[.,][\d]{3})*)/g,
    /price[^>]*>[\s]*\$?[\s]*([\d.,]+)/gi,
    /precio[^>]*>[\s]*\$?[\s]*([\d.,]+)/gi,
    /Rango de precios: desde \$([\d.,]+) hasta \$([\d.,]+)/i,
  ];

  const prices = [];
  
  // Buscar rangos de precio primero
  const rangeMatch = html.match(/Rango de precios: desde \$([\d.,]+) hasta \$([\d.,]+)/i);
  if (rangeMatch) {
    const min = parseInt(rangeMatch[1].replace(/[.,]/g, ''), 10);
    const max = parseInt(rangeMatch[2].replace(/[.,]/g, ''), 10);
    return { min, max, all: [min, max] };
  }

  for (const pattern of pricePatterns) {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      const priceStr = match[1] || match[0];
      const cleaned = priceStr.replace(/[.,]/g, '');
      const priceNum = parseInt(cleaned, 10);
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

/**
 * Extraer descripción
 */
function extractDescription(html) {
  const patterns = [
    /<div[^>]*class="[^"]*description[^"]*"[^>]*>([\s\S]{100,2000})<\/div>/i,
    /<div[^>]*class="[^"]*product-description[^"]*"[^>]*>([\s\S]{100,2000})<\/div>/i,
    /Descripción[^<]*<[^>]*>([\s\S]{100,2000})/i,
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

/**
 * Extraer especificaciones técnicas
 */
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

/**
 * Extraer imágenes
 */
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

/**
 * Extraer medidas
 */
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

/**
 * Extraer categoría
 */
function extractCategory(html, url) {
  // Intentar inferir de la URL
  for (const [slug, name] of Object.entries(CATEGORY_MAP)) {
    if (url.includes(slug) || url.includes(slug.replace('-', '/'))) {
      return { name, slug };
    }
  }

  // Intentar inferir del contenido
  if (html.includes('mampara') || html.includes('shower') || html.includes('espejo')) {
    return { name: 'Baños', slug: 'banos' };
  }
  if (html.includes('splashback') || html.includes('cocina')) {
    return { name: 'Cocinas', slug: 'cocinas' };
  }
  if (html.includes('pergola') || html.includes('bioclimatica')) {
    return { name: 'Pergolas Bioclimáticas', slug: 'pergolas-bioclimaticas' };
  }
  if (html.includes('baranda') || html.includes('terraza')) {
    return { name: 'Terrazas & Quinchos', slug: 'terrazas-quinchos' };
  }
  if (html.includes('pizarra') || html.includes('oficina')) {
    return { name: 'Habitaciones & Oficinas', slug: 'habitaciones-oficinas' };
  }
  if (html.includes('fachada') || html.includes('ventana')) {
    return { name: 'Fachadas', slug: 'fachadas' };
  }

  return { name: 'Baños', slug: 'banos' }; // Default
}

/**
 * Generar slug
 */
function generateSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 100);
}

/**
 * Sleep function para delays
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Procesar un producto
 */
async function processProduct(url) {
  try {
    const html = await fetchUrl(url);
    const product = extractProductInfo(html, url);
    
    if (product && product.name !== 'Producto sin nombre') {
      // Generar ID único
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

/**
 * Convertir medidas al formato correcto
 */
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

/**
 * Convertir technicalSpecs al formato correcto
 */
function convertTechnicalSpecs(specs) {
  if (!specs || specs.length === 0) return undefined;
  
  return specs.map(spec => ({
    name: spec.label,
    value: spec.value,
  }));
}

/**
 * Generar código TypeScript en el formato correcto
 */
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
    
    // Technical specs
    const techSpecs = convertTechnicalSpecs(product.technicalSpecs);
    if (techSpecs && techSpecs.length > 0) {
      code += `    technicalSpecs: ${JSON.stringify(techSpecs)},\n`;
    }
    
    // Measurements
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

/**
 * Función principal
 */
async function main() {
  console.log('🚀 Iniciando extracción de productos de dellorto.cl\n');
  console.log('⏱️  Esto puede tomar varios minutos...\n');

  try {
    // Paso 1: Obtener todas las URLs
    const productUrls = await getAllProductUrls();
    
    if (productUrls.length === 0) {
      console.log('❌ No se encontraron productos');
      return;
    }

    console.log(`\n📦 Total de productos a procesar: ${productUrls.length}\n`);
    console.log('⏳ Procesando productos (con delay de 2s entre cada uno)...\n');

    // Paso 2: Procesar cada producto
    for (let i = 0; i < productUrls.length; i++) {
      const url = productUrls[i];
      await processProduct(url);
      
      // Delay entre solicitudes (excepto la última)
      if (i < productUrls.length - 1) {
        await sleep(DELAY_BETWEEN_REQUESTS);
      }
    }

    // Paso 3: Guardar resultados
    console.log(`\n💾 Guardando resultados...\n`);
    
    // Guardar JSON
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allProducts, null, 2));
    console.log(`✅ JSON guardado en: ${OUTPUT_FILE}`);
    
    // Guardar código TypeScript
    const code = generateTypeScriptCode(allProducts);
    fs.writeFileSync(CODE_FILE, code);
    console.log(`✅ Código TypeScript guardado en: ${CODE_FILE}`);

    // Resumen
    console.log(`\n📊 RESUMEN:`);
    console.log(`   ✅ Productos procesados: ${processedCount}`);
    console.log(`   ❌ Errores: ${errorCount}`);
    console.log(`   📁 Archivos generados:`);
    console.log(`      - ${OUTPUT_FILE}`);
    console.log(`      - ${CODE_FILE}`);
    console.log(`\n✨ ¡Proceso completado!`);
    console.log(`\n💡 Próximo paso: Revisa ${CODE_FILE} y agrega los productos a data/products.ts`);

  } catch (error) {
    console.error('❌ Error fatal:', error);
  }
}

// Ejecutar
if (require.main === module) {
  main();
}
