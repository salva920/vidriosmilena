import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const imageUrl = req.nextUrl.searchParams.get('url')

    if (!imageUrl) {
      return new NextResponse('Image URL is required', { status: 400 })
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
      return new NextResponse('Invalid image source', { status: 400 })
    }

    // Descargar la imagen desde dellorto.cl
    const response = await fetch(decodedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://dellorto.cl/',
        'Accept': 'image/webp,image/apng,image/*,*/*;q=0.8',
      },
    })

    if (!response.ok) {
      console.error(`Failed to fetch image: ${decodedUrl} - Status: ${response.status}`)
      return new NextResponse(`Image not found: ${response.status}`, { status: response.status })
    }

    // Obtener el tipo de contenido
    const contentType = response.headers.get('content-type') || 'image/jpeg'
    
    // Verificar que sea una imagen
    if (!contentType.startsWith('image/')) {
      return new NextResponse('URL does not point to an image', { status: 400 })
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
    console.error('Error fetching image:', error.message)
    return new NextResponse(`Error fetching image: ${error.message}`, { status: 500 })
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
