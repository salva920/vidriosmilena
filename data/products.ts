import { Product, Category } from '@/types/product'
import { espejosLedProducts } from './products-espejos-led'
import { mamparasBanosProducts } from './products-mamparas-banos'

export const categories: Category[] = [
  {
    id: 'banos',
    name: 'Baños',
    slug: 'banos',
    description: 'Mamparas, espejos y accesorios para baños',
    image: '/img/shower2.jpg'
  },
  {
    id: 'cocinas',
    name: 'Cocinas',
    slug: 'cocinas',
    description: 'Splashbacks y cubiertas para cocinas',
    image: '/img/ventana pvc.jpg'
  },
  {
    id: 'pergolas',
    name: 'Pergolas Bioclimáticas',
    slug: 'pergolas-bioclimaticas',
    description: 'Pérgolas modernas y bioclimáticas',
    image: '/img/baranda3.jpg'
  },
  {
    id: 'terrazas',
    name: 'Terrazas & Quinchos',
    slug: 'terrazas-quinchos',
    description: 'Cierres de terrazas y barandas',
    image: '/img/cierre.jpg'
  },
  {
    id: 'habitaciones',
    name: 'Habitaciones & Oficinas',
    slug: 'habitaciones-oficinas',
    description: 'Pizarras y divisiones para espacios',
    image: '/img/espejo decorativo.jpg'
  },
  {
    id: 'fachadas',
    name: 'Fachadas',
    slug: 'fachadas',
    description: 'Ventanas y sistemas de fachada',
    image: '/img/ventana pvc.jpg'
  }
]

export const products: Product[] = [
  // Productos de Baños
  // Productos de Pizarras
  {
    id: 'pizarra-empavonada',
    name: 'Pizarra Empavonada',
    slug: 'pizarra-empavonada',
    category: 'Habitaciones & Oficinas',
    categorySlug: 'habitaciones-oficinas',
    price: 79990,
    sku: 'PIZ-EMP-001',
    images: [
      '/img/espejo decorativo.jpg'
    ],
    description: 'Pizarra de vidrio empavonado para oficinas y espacios de trabajo.',
    stock: 'available',
    tags: ['OFERTA']
  },
  {
    id: 'pizarra-negra',
    name: 'Pizarra Negra',
    slug: 'pizarra-negra',
    category: 'Habitaciones & Oficinas',
    categorySlug: 'habitaciones-oficinas',
    price: 79990,
    sku: 'PIZ-NEG-001',
    images: [
      '/img/espejo decorativo2.jpg'
    ],
    description: 'Pizarra negra tradicional para aulas y oficinas.',
    stock: 'available',
    tags: ['OFERTA']
  },
  // Productos de Espejos
  {
    id: 'espejo-circular-marco-aluminio-negro-70-cm-lucca',
    name: 'Espejo circular Marco aluminio negro 70 cm - Lucca',
    slug: 'espejo-circular-marco-aluminio-negro-70-cm-lucca',
    category: 'Baños',
    categorySlug: 'banos',
    price: 169990,
    originalPrice: 227990,
    discount: 25,
    sku: 'N/A',
    images: [
      'https://dellorto.cl/wp-content/uploads/2025/08/YFR-01-VDto.jpg',
      'https://dellorto.cl/wp-content/uploads/2025/04/w1500h1500fitpad.webp',
      'https://dellorto.cl/wp-content/uploads/2025/04/w1500h1500fitpad-1.webp',
      'https://dellorto.cl/wp-content/uploads/2025/04/w1500h1500fitpad-3.webp',
      'https://dellorto.cl/wp-content/uploads/2025/04/w1500h1500fitpad-4.webp'
    ],
    description: 'Marco frontal de aluminio (Negro) Marco trasero de aluminio (Blanco) Espejo de plata sin cobre de 4 mm',
    stock: 'available'
  },
  {
    id: 'espejo-ovalado-marco-dorado-50x80-cm-spello',
    name: 'Espejo ovalado Marco dorado 50×80 cm - Spello',
    slug: 'espejo-ovalado-marco-dorado-50x80-cm-spello',
    category: 'Baños',
    categorySlug: 'banos',
    price: 169990,
    originalPrice: 227990,
    discount: 25,
    sku: 'N/A',
    images: [
      'https://dellorto.cl/wp-content/uploads/2025/08/YFR-03-VDto.jpg',
      'https://dellorto.cl/wp-content/uploads/2025/04/w1500h1500fitpad.webp',
      'https://dellorto.cl/wp-content/uploads/2025/04/w1500h1500fitpad-1.webp',
      'https://dellorto.cl/wp-content/uploads/2025/04/w1500h1500fitpad-3.webp',
      'https://dellorto.cl/wp-content/uploads/2025/04/w1500h1500fitpad-4.webp'
    ],
    description: 'Marco frontal de aluminio dorado. Marco trasero de aluminio (Blanco) Espejo de plata sin cobre de 4 mm',
    stock: 'available'
  },
  {
    id: 'espejo-circular-modelo-viso-con-bastidor',
    name: 'Espejo circular modelo "Viso" con bastidor',
    slug: 'espejo-circular-modelo-viso-con-bastidor',
    category: 'Baños',
    categorySlug: 'banos',
    price: 39990,
    sku: 'N/A',
    images: [
      'https://dellorto.cl/wp-content/uploads/2023/04/espejos-viso-01.png',
      'https://dellorto.cl/wp-content/uploads/2023/04/espejos-viso-02.png',
      'https://dellorto.cl/wp-content/uploads/2023/04/espejos-viso-03.png',
      'https://dellorto.cl/wp-content/uploads/2023/04/espejos-viso-04.png',
      'https://dellorto.cl/wp-content/uploads/2023/04/espejos-viso-05.png'
    ],
    description: 'Proceso de cristal: Fabricación / pulido / bastidor. Acabado: Espejo incoloro. Materialidad: Espejo incoloro 5 mm / Aluminio. Accesorios incluidos: Bastidor de aluminio 20/20',
    specifications: [
      { label: 'Proceso de cristal', value: 'Fabricación / pulido / bastidor' },
      { label: 'Acabado', value: 'Espejo incoloro' },
      { label: 'Materialidad', value: 'Espejo incoloro 5 mm / Aluminio' },
      { label: 'Accesorios incluidos', value: 'Bastidor de aluminio 20/20' }
    ],
    stock: 'available'
  },
  {
    id: 'espejo-con-forma-modelo-cecita-con-bastidor',
    name: 'Espejo con forma modelo "Cecita" con bastidor',
    slug: 'espejo-con-forma-modelo-cecita-con-bastidor',
    category: 'Baños',
    categorySlug: 'banos',
    price: 67990,
    sku: 'N/A',
    images: [
      'https://dellorto.cl/wp-content/uploads/2023/04/espejos-cecita-01-1.png',
      'https://dellorto.cl/wp-content/uploads/2023/04/espejos-cecita-02-1.png',
      'https://dellorto.cl/wp-content/uploads/2023/04/espejos-cecita-03-1.png',
      'https://dellorto.cl/wp-content/uploads/2023/04/espejos-cecita-04-1.png',
      'https://dellorto.cl/wp-content/uploads/2023/04/espejos-cecita-05-1.png'
    ],
    description: 'Proceso de cristal: Fabricación / pulido / bastidor. Acabado: Espejo incoloro. Materialidad: Espejo incoloro 5 mm / Aluminio. Accesorios incluidos: Bastidor de aluminio 20/20',
    specifications: [
      { label: 'Proceso de cristal', value: 'Fabricación / pulido / bastidor' },
      { label: 'Acabado', value: 'Espejo incoloro' },
      { label: 'Materialidad', value: 'Espejo incoloro 5 mm / Aluminio' },
      { label: 'Accesorios incluidos', value: 'Bastidor de aluminio 20/20' }
    ],
    stock: 'available'
  },
  {
    id: 'espejo-con-forma-modelo-croce-con-bastidor',
    name: 'Espejo con forma modelo "Croce" con bastidor',
    slug: 'espejo-con-forma-modelo-croce-con-bastidor',
    category: 'Baños',
    categorySlug: 'banos',
    price: 44990,
    sku: 'N/A',
    images: [
      'https://dellorto.cl/wp-content/uploads/2023/04/espejos-croce-02-1-2.png',
      'https://dellorto.cl/wp-content/uploads/2023/04/espejos-croce-03-1-2.png',
      'https://dellorto.cl/wp-content/uploads/2023/04/espejos-croce-04-1-2.png',
      'https://dellorto.cl/wp-content/uploads/2023/04/espejos-croce-05-1-2.png',
      'https://dellorto.cl/wp-content/uploads/2023/04/espejos-croce-06-1-2.png'
    ],
    description: 'Proceso de cristal: Fabricación / pulido / bastidor. Acabado: Espejo incoloro. Materialidad: Espejo incoloro 5 mm / Aluminio. Accesorios incluidos: Bastidor de aluminio 20/20',
    specifications: [
      { label: 'Proceso de cristal', value: 'Fabricación / pulido / bastidor' },
      { label: 'Acabado', value: 'Espejo incoloro' },
      { label: 'Materialidad', value: 'Espejo incoloro 5 mm / Aluminio' },
      { label: 'Accesorios incluidos', value: 'Bastidor de aluminio 20/20' }
    ],
    stock: 'available'
  },
  {
    id: 'espejo-con-forma-modelo-liscia-con-bastidor',
    name: 'Espejo con forma modelo "Liscia" con bastidor',
    slug: 'espejo-con-forma-modelo-liscia-con-bastidor',
    category: 'Baños',
    categorySlug: 'banos',
    price: 49990,
    sku: 'N/A',
    images: [
      'https://dellorto.cl/wp-content/uploads/2023/04/espejos-liscia-01.png',
      'https://dellorto.cl/wp-content/uploads/2023/04/espejos-liscia-02.png',
      'https://dellorto.cl/wp-content/uploads/2023/04/espejos-liscia-03.png',
      'https://dellorto.cl/wp-content/uploads/2023/04/espejos-liscia-04.png',
      'https://dellorto.cl/wp-content/uploads/2023/04/espejos-liscia-05.png'
    ],
    description: 'Proceso de cristal: Fabricación / pulido / bastidor. Acabado: Espejo incoloro. Materialidad: Espejo incoloro 5 mm / Aluminio. Accesorios incluidos: Bastidor de aluminio 20/20',
    specifications: [
      { label: 'Proceso de cristal', value: 'Fabricación / pulido / bastidor' },
      { label: 'Acabado', value: 'Espejo incoloro' },
      { label: 'Materialidad', value: 'Espejo incoloro 5 mm / Aluminio' },
      { label: 'Accesorios incluidos', value: 'Bastidor de aluminio 20/20' }
    ],
    stock: 'available'
  },
  {
    id: 'espejo-con-forma-modelo-locone-con-bastidor',
    name: 'Espejo con forma modelo "Locone" con bastidor',
    slug: 'espejo-con-forma-modelo-locone-con-bastidor',
    category: 'Baños',
    categorySlug: 'banos',
    price: 59990,
    sku: 'N/A',
    images: [
      'https://dellorto.cl/wp-content/uploads/2023/04/espejos-locone-01.png',
      'https://dellorto.cl/wp-content/uploads/2023/04/espejos-locone-02.png',
      'https://dellorto.cl/wp-content/uploads/2023/04/espejos-locone-03.png',
      'https://dellorto.cl/wp-content/uploads/2023/04/espejos-locone-04.png',
      'https://dellorto.cl/wp-content/uploads/2023/04/espejos-locone-05.png'
    ],
    description: 'Proceso de cristal: Fabricación / pulido / bastidor. Acabado: Espejo incoloro. Materialidad: Espejo incoloro 5 mm / Aluminio. Accesorios incluidos: Bastidor de aluminio 20/20',
    specifications: [
      { label: 'Proceso de cristal', value: 'Fabricación / pulido / bastidor' },
      { label: 'Acabado', value: 'Espejo incoloro' },
      { label: 'Materialidad', value: 'Espejo incoloro 5 mm / Aluminio' },
      { label: 'Accesorios incluidos', value: 'Bastidor de aluminio 20/20' }
    ],
    stock: 'available'
  },
  {
    id: 'espejo-con-forma-modelo-resia-con-bastidor',
    name: 'Espejo con forma modelo "Resia" con bastidor',
    slug: 'espejo-con-forma-modelo-resia-con-bastidor',
    category: 'Baños',
    categorySlug: 'banos',
    price: 44990,
    sku: 'N/A',
    images: [
      'https://dellorto.cl/wp-content/uploads/2023/04/espejos-resia-01.png',
      'https://dellorto.cl/wp-content/uploads/2023/04/espejos-resia-02.png',
      'https://dellorto.cl/wp-content/uploads/2023/04/espejos-resia-03.png',
      'https://dellorto.cl/wp-content/uploads/2023/04/espejos-resia-04.png',
      'https://dellorto.cl/wp-content/uploads/2023/04/espejos-resia-05.png'
    ],
    description: 'Proceso de cristal: Fabricación / pulido / bastidor. Acabado: Espejo incoloro. Materialidad: Espejo incoloro 5 mm / Aluminio. Accesorios incluidos: Bastidor de aluminio 20/20',
    specifications: [
      { label: 'Proceso de cristal', value: 'Fabricación / pulido / bastidor' },
      { label: 'Acabado', value: 'Espejo incoloro' },
      { label: 'Materialidad', value: 'Espejo incoloro 5 mm / Aluminio' },
      { label: 'Accesorios incluidos', value: 'Bastidor de aluminio 20/20' }
    ],
    stock: 'available'
  },
  // Productos de Pergolas
  {
    id: 'pergola-3x3-manual',
    name: 'Pérgola 3x3 manual a muro',
    slug: 'pergola-3x3-manual',
    category: 'Pergolas Bioclimáticas',
    categorySlug: 'pergolas-bioclimaticas',
    price: 2370000,
    sku: 'PERG-3X3-MAN',
    images: [
      '/img/baranda3.jpg'
    ],
    description: 'Pérgola bioclimática manual de 3x3 metros instalada a muro.',
    stock: 'available'
  },
  {
    id: 'pergola-4x4-motorizada',
    name: 'Pérgola 4x4 motorizada a piso',
    slug: 'pergola-4x4-motorizada',
    category: 'Pergolas Bioclimáticas',
    categorySlug: 'pergolas-bioclimaticas',
    price: 6225000,
    sku: 'PERG-4X4-MOT',
    images: [
      '/img/baranda3.jpg'
    ],
    description: 'Pérgola bioclimática motorizada de 4x4 metros instalada a piso.',
    stock: 'available'
  },
  {
    id: 'pergola-bioclimatica',
    name: 'Pérgola Bioclimatica',
    slug: 'pergola-bioclimatica',
    category: 'Pergolas Bioclimáticas',
    categorySlug: 'pergolas-bioclimaticas',
    price: 3690000,
    sku: 'PERG-BIO-001',
    images: [
      '/img/baranda3.jpg'
    ],
    description: 'Pérgola bioclimática con sistema de lamas orientables.',
    stock: 'available',
    tags: ['OFERTA']
  },
  // Productos de Terrazas
  {
    id: 'cortina-cristal',
    name: 'Cortina De Cristal',
    slug: 'cortina-cristal',
    category: 'Terrazas & Quinchos',
    categorySlug: 'terrazas-quinchos',
    price: 0, // Precio a cotizar
    sku: 'CORT-CRIST-001',
    images: [
      '/img/cortinas-de-cristal-neulam.jpg',
      '/img/cortina_cristal_azur_vivienda_susana_elche_r_t7a6123.jpg'
    ],
    description: 'Sistema de cortinas de cristal para terrazas y espacios exteriores.',
    stock: 'available'
  },
  // Productos de Cocinas
  {
    id: 'cubiertas-mesa',
    name: 'Cubiertas De Mesa',
    slug: 'cubiertas-mesa',
    category: 'Cocinas',
    categorySlug: 'cocinas',
    price: 0, // Precio a cotizar
    sku: 'CUB-MESA-001',
    images: [
      '/img/ventana pvc.jpg'
    ],
    description: 'Cubiertas de vidrio templado para mesas.',
    stock: 'available'
  },
  {
    id: 'splashback',
    name: 'Splashback',
    slug: 'splashback',
    category: 'Cocinas',
    categorySlug: 'cocinas',
    price: 0, // Precio a cotizar
    sku: 'SPLASH-001',
    images: [
      'https://dellorto.cl/wp-content/uploads/2025/03/SPLASHBACK_01.jpg',
      'https://dellorto.cl/wp-content/uploads/2023/05/LCD-1.jpg',
      'https://dellorto.cl/wp-content/uploads/2023/03/Molymet.png',
      'https://dellorto.cl/wp-content/uploads/2024/11/Energia-Andina-11.png',
      'https://dellorto.cl/wp-content/uploads/2024/11/San-Alberto-de-Sicilia-1-1.jpg'
    ],
    description: 'Personaliza tu cocina con Splashback de vidrio templado. Diseños únicos, fáciles de limpiar y resistentes. Cotiza tus Splashback con Dellorto',
    specifications: [
      { label: 'Material', value: 'Vidrio templado' },
      { label: 'Aplicación', value: 'Cocinas' },
      { label: 'Características', value: 'Diseños personalizados, fácil limpieza, resistencia' }
    ],
    stock: 'available'
  },
  // Combinar productos de mamparas de Baños
  ...mamparasBanosProducts,
  // Combinar productos de espejos LED
  ...espejosLedProducts
]

// Función helper para obtener productos por categoría
export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug)
}

// Función helper para obtener un producto por slug
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

// Función helper para obtener un producto por ID
export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

// Función helper para buscar productos
export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase()
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
  )
}

