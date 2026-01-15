/**
 * Script para obtener productos de dellorto.cl
 * 
 * Este script puede extraer productos de dos formas:
 * 1. Usando la API REST de WooCommerce (si está disponible)
 * 2. Haciendo scraping web (fallback)
 */

interface ProductData {
  name: string
  slug: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  sku: string
  category: string
  stock: number
  measurements?: Array<{ size: string; priceAdjustment: number }>
  technicalSpecs?: Array<{ label: string; value: string }>
}

/**
 * Método 1: Intentar obtener productos usando la API REST de WooCommerce
 */
async function fetchFromWooCommerceAPI(baseUrl: string): Promise<ProductData[]> {
  try {
    // Endpoint común de WooCommerce REST API
    const apiUrl = `${baseUrl}/wp-json/wc/v3/products`
    
    // Nota: En producción necesitarías Consumer Key y Consumer Secret
    // const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Basic ${auth}` // Si requiere autenticación
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    const products = await response.json()
    
    return products.map((product: any) => ({
      name: product.name,
      slug: product.slug,
      description: product.short_description || product.description,
      price: parseFloat(product.price || '0'),
      originalPrice: product.sale_price ? parseFloat(product.regular_price) : undefined,
      images: product.images?.map((img: any) => img.src) || [],
      sku: product.sku || '',
      category: product.categories?.[0]?.name || 'Sin categoría',
      stock: product.stock_quantity || 0,
    }))
  } catch (error) {
    console.error('Error fetching from WooCommerce API:', error)
    return []
  }
}

/**
 * Método 2: Extraer información de una página de producto específica
 */
async function scrapeProductPage(url: string): Promise<ProductData | null> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`)
    }

    const html = await response.text()
    
    // Extraer información usando expresiones regulares y parsing básico
    // Nota: Para un scraping más robusto, usaría cheerio o puppeteer
    
    const nameMatch = html.match(/<h1[^>]*>([^<]+)<\/h1>/i) || 
                     html.match(/<title>([^<]+)<\/title>/i)
    const name = nameMatch ? nameMatch[1].trim() : 'Producto sin nombre'

    // Extraer precio (buscar patrones comunes)
    const priceMatch = html.match(/\$[\d.,]+/g) || []
    const prices = priceMatch.map(p => parseFloat(p.replace(/[$,.]/g, '')))
    const price = prices.length > 0 ? Math.max(...prices) : 0

    // Extraer SKU
    const skuMatch = html.match(/SKU[:\s]+([^\n<]+)/i)
    const sku = skuMatch ? skuMatch[1].trim() : ''

    // Extraer descripción
    const descMatch = html.match(/<div[^>]*class="[^"]*description[^"]*"[^>]*>([\s\S]*?)<\/div>/i)
    const description = descMatch ? descMatch[1].replace(/<[^>]+>/g, '').trim() : ''

    // Extraer imágenes
    const imageMatches = html.match(/<img[^>]+src="([^"]+)"[^>]*>/gi) || []
    const images = Array.from(new Set(
      imageMatches.map((match: string) => {
        const srcMatch = match.match(/src="([^"]+)"/i)
        return srcMatch ? srcMatch[1] : ''
      }).filter((src: string) => src.includes('product') || src.includes('wp-content'))
    ))

    // Extraer medidas/variaciones (si están en una tabla)
    const measurements: Array<{ size: string; priceAdjustment: number }> = []
    const tableMatch = html.match(/<table[^>]*>([\s\S]*?)<\/table>/i)
    if (tableMatch) {
      const rows = tableMatch[1].match(/<tr[^>]*>([\s\S]*?)<\/tr>/gi) || []
      rows.forEach((row: string) => {
        const cells = row.match(/<t[dh][^>]*>([^<]+)<\/t[dh]>/gi) || []
        if (cells.length >= 2) {
          const size = cells[0].replace(/<[^>]+>/g, '').trim()
          measurements.push({ size, priceAdjustment: 0 })
        }
      })
    }

    return {
      name,
      slug: url.split('/').filter(Boolean).pop() || '',
      description,
      price,
      images: images.slice(0, 5), // Limitar a 5 imágenes
      sku,
      category: 'Baños', // Categoría por defecto, ajustar según necesidad
      stock: 0,
      measurements: measurements.length > 0 ? measurements : undefined,
    }
  } catch (error) {
    console.error('Error scraping product page:', error)
    return null
  }
}

/**
 * Método 3: Usar Puppeteer para scraping más robusto (requiere instalación)
 */
async function scrapeWithPuppeteer(url: string): Promise<ProductData | null> {
  // Este método requiere: npm install puppeteer
  // Descomentar y usar si el método básico no funciona
  
  /*
  const puppeteer = require('puppeteer')
  
  try {
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle2' })
    
    const productData = await page.evaluate(() => {
      const name = document.querySelector('h1')?.textContent?.trim() || ''
      const priceText = document.querySelector('.price')?.textContent || ''
      const price = parseFloat(priceText.replace(/[^0-9]/g, '')) || 0
      const description = document.querySelector('.description')?.textContent?.trim() || ''
      const images = Array.from(document.querySelectorAll('img')).map(img => img.src)
      
      return { name, price, description, images }
    })
    
    await browser.close()
    return productData as ProductData
  } catch (error) {
    console.error('Error with Puppeteer:', error)
    return null
  }
  */
  
  return null
}

/**
 * Función principal para obtener productos
 */
export async function fetchProductsFromDellorto(
  productUrl?: string,
  useAPI: boolean = false
): Promise<ProductData[]> {
  const baseUrl = 'https://dellorto.cl'
  
  if (useAPI) {
    // Intentar usar la API REST de WooCommerce
    const products = await fetchFromWooCommerceAPI(baseUrl)
    if (products.length > 0) {
      return products
    }
  }

  // Si la API no funciona o se especificó una URL, hacer scraping
  if (productUrl) {
    const product = await scrapeProductPage(productUrl)
    return product ? [product] : []
  }

  // Si no hay URL específica, intentar obtener lista de productos
  // Esto requeriría conocer la estructura de URLs del sitio
  console.warn('No se proporcionó URL de producto específica')
  return []
}

// Ejemplo de uso
if (require.main === module) {
  const productUrl = 'https://dellorto.cl/producto/mampara-corredera-vidrio-templado-8-mm-modelo-scala-con-herrajes-acero-cepillado/'
  
  fetchProductsFromDellorto(productUrl)
    .then(products => {
      console.log('Productos obtenidos:', JSON.stringify(products, null, 2))
    })
    .catch(error => {
      console.error('Error:', error)
    })
}
