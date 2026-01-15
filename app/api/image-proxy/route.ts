import { NextRequest, NextResponse } from 'next/server'

// Usar Node.js runtime para tener acceso completo a Buffer y fetch
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const imageUrl = req.nextUrl.searchParams.get('url')

    if (!imageUrl) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 })
    }

    // Decodificar la URL (puede estar doblemente codificada)
    let decodedUrl = imageUrl
    try {
      decodedUrl = decodeURIComponent(imageUrl)
      // Si la decodificación no cambió nada, intentar una vez más
      if (decodedUrl === imageUrl) {
        decodedUrl = decodeURIComponent(decodedUrl)
      }
    } catch (e) {
      // Si falla la decodificación, usar la URL original
      decodedUrl = imageUrl
    }

    // Validar que la URL sea de dellorto.cl
    if (!decodedUrl.startsWith('https://dellorto.cl/')) {
      return NextResponse.json({ error: 'Invalid image source' }, { status: 400 })
    }

    // Crear un AbortController para timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 segundos

    // Intentar múltiples estrategias para obtener la imagen
    const fetchOptions: RequestInit = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://dellorto.cl/',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
      },
      signal: controller.signal,
    }

    let response: Response
    try {
      response = await fetch(decodedUrl, fetchOptions)
      clearTimeout(timeoutId)
    } catch (fetchError: any) {
      clearTimeout(timeoutId)
      console.error('Fetch error:', fetchError.message)
      
      // Si falla, intentar sin algunos headers y con un nuevo timeout
      const simpleController = new AbortController()
      const simpleTimeoutId = setTimeout(() => simpleController.abort(), 15000)
      
      try {
        const simpleOptions: RequestInit = {
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; +https://artecristal.vercel.app)',
            'Referer': 'https://dellorto.cl/',
          },
          signal: simpleController.signal,
        }
        response = await fetch(decodedUrl, simpleOptions)
        clearTimeout(simpleTimeoutId)
      } catch (secondError: any) {
        clearTimeout(simpleTimeoutId)
        throw new Error(`Failed to fetch image after retry: ${secondError.message}`)
      }
    }

    if (!response.ok) {
      const errorText = await response.text().catch(() => '')
      console.error(`Failed to fetch image: ${decodedUrl} - Status: ${response.status} - Response: ${errorText.substring(0, 200)}`)
      
      // Si es 403, devolver un error más descriptivo
      if (response.status === 403) {
        return NextResponse.json(
          { 
            error: 'Access forbidden. The image server may be blocking requests.',
            url: decodedUrl,
            status: 403
          },
          { status: 403 }
        )
      }
      
      return NextResponse.json(
        { error: `Image not found: ${response.status}`, url: decodedUrl },
        { status: response.status }
      )
    }

    // Obtener el tipo de contenido
    const contentType = response.headers.get('content-type') || 'image/jpeg'
    
    // Verificar que sea una imagen
    if (!contentType.startsWith('image/')) {
      return NextResponse.json({ error: 'URL does not point to an image' }, { status: 400 })
    }

    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Devolver la imagen con headers CORS permitidos
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    })
  } catch (error: any) {
    console.error('Error fetching image:', error.message, error.stack)
    return NextResponse.json(
      { error: `Error fetching image: ${error.message}` },
      { status: 500 }
    )
  }
}

// Manejar OPTIONS para CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
