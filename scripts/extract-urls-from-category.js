/**
 * Script para extraer URLs de productos desde páginas de categoría
 * Este script busca productos de múltiples formas en el HTML
 */

const https = require('https');
const fs = require('fs');

const BASE_URL = 'https://dellorto.cl';

// URLs de categorías
const CATEGORY_URLS = [
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
        'Connection': 'keep-alive',
      },
    };

    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }

      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => { resolve(data); });
    });

    req.on('error', reject);
    req.end();
  });
}

function extractProductUrls(html, categoryUrl) {
  const urls = new Set();
  
  // Patrón 1: Enlaces directos a productos
  const patterns = [
    /<a[^>]+href=["'](\/producto\/[^"']+)["'][^>]*>/gi,
    /<a[^>]+href=["'](https?:\/\/dellorto\.cl\/producto\/[^"']+)["'][^>]*>/gi,
    /href=["'](\/producto\/[^"']+)["']/gi,
    /"url":\s*["'](\/producto\/[^"']+)["']/gi,
    /"permalink":\s*["']([^"']*\/producto\/[^"']+)["']/gi,
    /data-product-url=["']([^"']+)["']/gi,
    /data-href=["']([^"']*\/producto\/[^"']+)["']/gi,
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(html)) !== null) {
      let url = match[1];
      if (url && url.includes('/producto/')) {
        if (!url.startsWith('http')) {
          url = BASE_URL + url;
        }
        // Filtrar URLs que no sean productos reales
        if (!url.includes('categoria') && !url.includes('tag') && !url.includes('page')) {
          urls.add(url);
        }
      }
    }
  }

  // Patrón 2: Buscar en atributos data-*
  const dataPattern = /data-[^=]*=["']([^"']*\/producto\/[^"']+)["']/gi;
  let dataMatch;
  while ((dataMatch = dataPattern.exec(html)) !== null) {
    let url = dataMatch[1];
    if (!url.startsWith('http')) {
      url = BASE_URL + url;
    }
    if (url.includes('/producto/')) {
      urls.add(url);
    }
  }

  // Patrón 3: Buscar en JSON embebido (si hay)
  const jsonPattern = /<script[^>]*type=["']application\/json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let jsonMatch;
  while ((jsonMatch = jsonPattern.exec(html)) !== null) {
    try {
      const json = JSON.parse(jsonMatch[1]);
      const jsonStr = JSON.stringify(json);
      const productMatches = jsonStr.match(/\/producto\/[^"'\s}]+/g);
      if (productMatches) {
        productMatches.forEach(path => {
          urls.add(BASE_URL + path);
        });
      }
    } catch (e) {
      // Ignorar errores de parsing JSON
    }
  }

  return Array.from(urls);
}

async function main() {
  console.log('🔍 Extrayendo URLs de productos desde categorías...\n');
  
  const allProductUrls = new Set();
  
  for (const categoryUrl of CATEGORY_URLS) {
    try {
      console.log(`📂 Procesando: ${categoryUrl}`);
      const html = await fetchUrl(categoryUrl);
      const urls = extractProductUrls(html, categoryUrl);
      
      urls.forEach(url => allProductUrls.add(url));
      
      console.log(`   ✅ Encontrados ${urls.length} productos (Total único: ${allProductUrls.size})`);
      
      // Delay entre solicitudes
      await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (error) {
      console.error(`   ❌ Error: ${error.message}`);
    }
  }

  const productUrlsArray = Array.from(allProductUrls);
  
  console.log(`\n📦 Total de productos únicos encontrados: ${productUrlsArray.length}\n`);

  if (productUrlsArray.length > 0) {
    // Guardar URLs en archivo
    const urlsContent = productUrlsArray.join('\n');
    fs.writeFileSync('product-urls.txt', urlsContent);
    console.log('✅ URLs guardadas en: product-urls.txt\n');
    
    // También guardar como JSON
    fs.writeFileSync('product-urls.json', JSON.stringify(productUrlsArray, null, 2));
    console.log('✅ URLs guardadas en: product-urls.json\n');
    
    console.log('💡 Próximo paso:');
    console.log('   node scripts/fetch-products-from-list.js product-urls.txt\n');
  } else {
    console.log('⚠️  No se encontraron productos.');
    console.log('💡 El sitio puede cargar productos dinámicamente con JavaScript.');
    console.log('   Considera usar Puppeteer o obtener las URLs manualmente.\n');
  }
}

if (require.main === module) {
  main();
}
