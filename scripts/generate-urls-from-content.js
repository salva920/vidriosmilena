/**
 * Script para generar URLs de productos basado en el contenido visible
 * Este script puede ayudarte a generar URLs de productos si conoces los slugs
 */

const fs = require('fs');

// Basado en el contenido de la página de categoría de baños que viste,
// aquí están algunos productos que puedes ver. Agrega más según necesites.

const PRODUCT_SLUGS = [
  // Espejos
  'espejo-circular-led-touch-60-cm-iluminacion-frontal-capri',
  'espejo-circular-led-touch-90-cm-iluminacion-trasera-tivoli',
  'espejo-circular-marco-aluminio-negro-70-cm-lucca',
  'espejo-media-luna-led-touch-40x80-cm-iluminacion-trasera-lecco',
  'espejo-media-luna-led-touch-60x120-cm-iluminacion-trasera-lecco',
  'espejo-organico-led-touch-50x50-cm-iluminacion-trasera-bari',
  'espejo-organico-led-touch-60x110-cm-iluminacion-trasera-verdi',
  'espejo-organico-led-touch-60x90-cm-iluminacion-trasera-riva',
  'espejo-ovalado-marco-dorado-50x80-cm-spello',
  'espejo-rectangular-4-mm-led-touch-70x50-cm-iluminacion-frontal-iseo',
  'espejo-rectangular-led-touch-60x80-cm-iluminacion-frontal-sella',
  'espejo-circular-modelo-viso-con-bastidor',
  'espejo-con-forma-modelo-cecita-con-bastidor',
  'espejo-con-forma-modelo-croce-con-bastidor',
  'espejo-con-forma-modelo-liscia-con-bastidor',
  'espejo-con-forma-modelo-locone-con-bastidor',
  'espejo-con-forma-modelo-resia-con-bastidor',
  'espejo-con-forma-modelo-tarsia-con-bastidor',
  'espejo-con-forma-modelo-turano-con-bastidor',
  'espejo-hexagonal-con-bastidor-place',
  'espejo-rectangular-modelo-giardino-con-bastidor',
  
  // Mamparas
  'shower-door-corredero-8-mm-empavonado-herrajes-acero-cepillado-ravella',
  'shower-door-corredero-8-mm-empavonado-herrajes-negro-ravella',
  'shower-door-8-mm-empavonado-herrajes-cromados-bagno',
  'shower-door-ancho-ajustable-corredera-8-mm-modelo-scala-con-herrajes-acero-cepillado',
  'shower-door-8-mm-impresion-digital',
  
  // Agrega más slugs aquí según los productos que veas en otras categorías
];

const BASE_URL = 'https://dellorto.cl';

function generateUrls(slugs) {
  return slugs.map(slug => `${BASE_URL}/producto/${slug}/`);
}

function main() {
  console.log('🔗 Generando URLs de productos...\n');
  
  const urls = generateUrls(PRODUCT_SLUGS);
  
  console.log(`📦 Total de URLs generadas: ${urls.length}\n`);
  
  // Guardar en archivo de texto
  fs.writeFileSync('product-urls-generated.txt', urls.join('\n'));
  console.log('✅ URLs guardadas en: product-urls-generated.txt\n');
  
  // Guardar en JSON
  fs.writeFileSync('product-urls-generated.json', JSON.stringify(urls, null, 2));
  console.log('✅ URLs guardadas en: product-urls-generated.json\n');
  
  console.log('💡 Próximo paso:');
  console.log('   node scripts/fetch-products-from-list.js product-urls-generated.txt\n');
  console.log('📝 Nota: Agrega más slugs en PRODUCT_SLUGS según los productos que veas.\n');
  
  // Mostrar primeras 5 URLs como ejemplo
  console.log('📋 Ejemplo de URLs generadas:');
  urls.slice(0, 5).forEach((url, i) => {
    console.log(`   ${i + 1}. ${url}`);
  });
  if (urls.length > 5) {
    console.log(`   ... y ${urls.length - 5} más`);
  }
}

if (require.main === module) {
  main();
}
