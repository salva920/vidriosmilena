import { Product, Category } from '@/types/product'

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
  {
    id: 'shower-door-empavonado-cromado',
    name: 'Shower Door 8 mm Empavonado Herrajes cromados - Bagno',
    slug: 'shower-door-empavonado-cromado',
    category: 'Baños',
    categorySlug: 'banos',
    price: 249990,
    originalPrice: 249990,
    sku: 'SHOWER-BAGNO-CROM',
    images: [
      '/img/shower2.jpg',
      '/img/shower3.jpg',
      '/img/shower 4.jpg'
    ],
    description: 'Solución de mampara fija de vidrio incoloro con diseño empavonado para mayor privacidad. Esta mampara está fabricada con la técnica de serigrafía sobre el cristal, cuya calidad se mantiene en el tiempo. Ideal para baños donde se requiere aprovechar al máximo el espacio, para instalar en obra o sobre receptáculo a piso.',
    specifications: [
      { label: 'Proceso de cristal', value: 'Fabricación / pulido / serigrafía / templado' },
      { label: 'Acabado', value: 'Vidrio incoloro empavonado / herrajes cromados' },
      { label: 'Materialidad', value: 'Vidrio templado 8mm empavonado / Herrajes de acero inoxidable' },
      { label: 'Accesorios incluidos', value: 'Kit 4 soportes muro-vidrio de acero inoxidable en acabado cromado' }
    ],
    technicalSpecs: [
      { name: 'Espesor del vidrio', value: '8mm' },
      { name: 'Tipo de vidrio', value: 'Templado empavonado' },
      { name: 'Material herrajes', value: 'Acero inoxidable' },
      { name: 'Acabado herrajes', value: 'Cromado' }
    ],
    installation: 'Instalación en obra o sobre receptáculo a piso. Requiere 4 puntos de fijación en muro.',
    regulations: 'Cumple con normativas chilenas de seguridad para vidrios templados.',
    stock: 'available',
    measurements: [
      { id: '120x190', label: '120×190 cm', value: '120×190', price: 249990 },
      { id: '100x190', label: '100×190 cm', value: '100×190', price: 229990 },
      { id: '80x190', label: '80×190 cm', value: '80×190', price: 199990 }
    ],
    accessories: [
      {
        id: 'brazo-tensor-100',
        name: 'Brazo Tensor para shower door 100cm Acero Inoxidable inox cepillado - Vidrio 8mm',
        originalPrice: 49990,
        price: 44990,
        sku: 'ACC-BRAZO-100'
      }
    ]
  },
  {
    id: 'shower-door-empavonado-negro',
    name: 'Shower Door 8 mm Empavonado Herrajes negro mate - Bagno',
    slug: 'shower-door-empavonado-negro',
    category: 'Baños',
    categorySlug: 'banos',
    price: 249990,
    originalPrice: 249990,
    sku: 'SHOWER-BAGNO-NEG',
    images: [
      '/img/shower3.jpg',
      '/img/shower2.jpg'
    ],
    description: 'Mampara fija de vidrio empavonado con herrajes en acabado negro mate. Diseño moderno y minimalista.',
    specifications: [
      { label: 'Proceso de cristal', value: 'Fabricación / pulido / serigrafía / templado' },
      { label: 'Acabado', value: 'Vidrio incoloro empavonado / herrajes negro mate' },
      { label: 'Materialidad', value: 'Vidrio templado 8mm empavonado / Herrajes de acero inoxidable' }
    ],
    stock: 'available',
    measurements: [
      { id: '120x190', label: '120×190 cm', value: '120×190', price: 249990 }
    ]
  },
  {
    id: 'shower-door-corredero-empavonado',
    name: 'Shower Door Corredero 8 mm Empavonado Herrajes Acero cepillado - Ravella',
    slug: 'shower-door-corredero-empavonado',
    category: 'Baños',
    categorySlug: 'banos',
    price: 399990,
    originalPrice: 474990,
    discount: 15,
    sku: 'SHOWER-RAVELLA-AC',
    images: [
      '/img/shower2.jpg',
      '/img/shower3.jpg'
    ],
    description: 'Mampara corredera de vidrio empavonado con sistema de deslizamiento suave. Herrajes en acero cepillado.',
    stock: 'available',
    exclusiveDiscount: true,
    measurements: [
      { id: '120x190', label: '120×190 cm', value: '120×190', price: 399990 }
    ]
  },
  {
    id: 'shower-door-corredero-negro',
    name: 'Shower Door Corredero 8 mm Empavonado Herrajes Negro - Ravella',
    slug: 'shower-door-corredero-negro',
    category: 'Baños',
    categorySlug: 'banos',
    price: 419990,
    originalPrice: 499990,
    discount: 16,
    sku: 'SHOWER-RAVELLA-NEG',
    images: [
      '/img/shower2.jpg'
    ],
    description: 'Mampara corredera con herrajes negros. Diseño elegante y funcional.',
    stock: 'available',
    exclusiveDiscount: true,
    measurements: [
      { id: '120x190', label: '120×190 cm', value: '120×190', price: 419990 }
    ]
  },
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
      'https://dellorto.cl/wp-content/uploads/2025/04/w1500h1500fitpad-300x300.webp',
      'https://dellorto.cl/wp-content/uploads/2025/04/w1500h1500fitpad-1-300x300.webp',
      'https://dellorto.cl/wp-content/uploads/2025/04/w1500h1500fitpad-3-300x300.webp',
      'https://dellorto.cl/wp-content/uploads/2025/04/w1500h1500fitpad-4-300x300.webp'
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
      'https://dellorto.cl/wp-content/uploads/2025/04/w1500h1500fitpad-300x300.webp',
      'https://dellorto.cl/wp-content/uploads/2025/04/w1500h1500fitpad-1-300x300.webp',
      'https://dellorto.cl/wp-content/uploads/2025/04/w1500h1500fitpad-3-300x300.webp',
      'https://dellorto.cl/wp-content/uploads/2025/04/w1500h1500fitpad-4-300x300.webp'
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
      '/img/ventana pvc.jpg'
    ],
    description: 'Splashback de vidrio para cocinas.',
    stock: 'available'
  }
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

