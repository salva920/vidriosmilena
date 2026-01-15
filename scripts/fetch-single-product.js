/**
 * Script simple para obtener información de un producto específico
 * Ejecutar con: node scripts/fetch-single-product.js
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
    // Extraer información básica del HTML
    const productInfo = {
      name: extractText(data, /<h1[^>]*>([^<]+)<\/h1>/i) || extractText(data, /<title>([^<]+)<\/title>/i),
      price: extractPrice(data),
      sku: extractText(data, /SKU[:\s]+([^\n<]+)/i),
      description: extractDescription(data),
      images: extractImages(data),
      measurements: extractMeasurements(data),
    };

    console.log('Información del producto:');
    console.log(JSON.stringify(productInfo, null, 2));

    // Guardar en archivo
    fs.writeFileSync('product-data.json', JSON.stringify(productInfo, null, 2));
    console.log('\n✅ Datos guardados en product-data.json');
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});

function extractText(html, regex) {
  const match = html.match(regex);
  return match ? match[1].trim() : null;
}

function extractPrice(html) {
  // Buscar precios en formato $XXX.XXX
  const priceMatches = html.match(/\$[\d.,]+/g) || [];
  const prices = priceMatches.map(p => {
    // Convertir $369.990 a número
    const cleaned = p.replace(/[$,]/g, '');
    return parseFloat(cleaned);
  }).filter(p => !isNaN(p) && p > 0);
  
  return prices.length > 0 ? Math.max(...prices) : null;
}

function extractDescription(html) {
  // Buscar en diferentes posibles ubicaciones
  const patterns = [
    /<div[^>]*class="[^"]*description[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<p[^>]*class="[^"]*description[^"]*"[^>]*>([\s\S]*?)<\/p>/i,
    /Descripción[^<]*<[^>]*>([\s\S]{0,500})/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) {
      return match[1].replace(/<[^>]+>/g, '').trim().substring(0, 500);
    }
  }
  
  return null;
}

function extractImages(html) {
  const images = [];
  const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/gi;
  let match;

  while ((match = imgRegex.exec(html)) !== null) {
    const src = match[1];
    // Filtrar solo imágenes de productos
    if (src.includes('product') || src.includes('wp-content') || src.includes('dellorto')) {
      if (!src.includes('logo') && !src.includes('icon')) {
        images.push(src);
      }
    }
  }

  // Eliminar duplicados y limitar
  return [...new Set(images)].slice(0, 5);
}

function extractMeasurements(html) {
  const measurements = [];
  
  // Buscar tabla de medidas
  const tableMatch = html.match(/<table[^>]*>([\s\S]*?)<\/table>/i);
  if (tableMatch) {
    const rows = tableMatch[1].match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi) || [];
    rows.forEach((row, index) => {
      if (index === 0) return; // Saltar header
      
      const cells = row.match(/<t[dh][^>]*>([^<]+)<\/t[dh]>/gi) || [];
      if (cells.length >= 2) {
        const size = cells[0].replace(/<[^>]+>/g, '').trim();
        if (size && size.length < 50) { // Validar que sea una medida razonable
          measurements.push({ size, priceAdjustment: 0 });
        }
      }
    });
  }

  // También buscar en selects/opciones
  const selectMatch = html.match(/<select[^>]*>([\s\S]*?)<\/select>/gi);
  if (selectMatch) {
    selectMatch.forEach(select => {
      const options = select.match(/<option[^>]*value="([^"]+)"[^>]*>([^<]+)<\/option>/gi) || [];
      options.forEach(option => {
        const match = option.match(/value="([^"]+)"[^>]*>([^<]+)/i);
        if (match && match[2].includes('cm') || match[2].includes('x')) {
          measurements.push({ size: match[2].trim(), priceAdjustment: 0 });
        }
      });
    });
  }

  return [...new Set(measurements.map(m => m.size))].map(size => ({ size, priceAdjustment: 0 }));
}
