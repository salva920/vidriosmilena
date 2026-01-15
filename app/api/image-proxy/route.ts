import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const imageUrl = searchParams.get('url')

  if (!imageUrl) {
    return new NextResponse('URL parameter is required', { status: 400 })
  }

  // Validar que la URL sea de dellorto.cl
  if (!imageUrl.startsWith('https://dellorto.cl/')) {
    return new NextResponse('Invalid image source', { status: 400 })
  }

  try {
    // Descargar la imagen desde dellorto.cl
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://dellorto.cl/',
      },
    })

    if (!response.ok) {
      return new NextResponse('Image not found', { status: 404 })
    }

    // Obtener el tipo de contenido
    const contentType = response.headers.get('content-type') || 'image/jpeg'
    const imageBuffer = await response.arrayBuffer()

    // Devolver la imagen con headers CORS permitidos
    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
      },
    })
  } catch (error) {
    console.error('Error fetching image:', error)
    return new NextResponse('Error fetching image', { status: 500 })
  }
}
