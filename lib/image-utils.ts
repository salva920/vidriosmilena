/**
 * Utilidad para obtener URLs de imágenes con proxy si es necesario
 */

export function getImageUrl(imageUrl: string): string {
  // Si la imagen es de dellorto.cl, usar el proxy para evitar CORS
  if (imageUrl.startsWith('https://dellorto.cl/')) {
    // Intentar primero con nuestro proxy
    // Si falla, el componente puede usar un fallback
    return `/api/image-proxy?url=${encodeURIComponent(imageUrl)}`
  }
  // Si es una imagen local, devolverla tal cual
  return imageUrl
}

/**
 * Obtiene una URL de imagen usando un servicio de proxy de terceros como fallback
 */
export function getImageUrlWithFallback(imageUrl: string): string {
  if (imageUrl.startsWith('https://dellorto.cl/')) {
    // Usar un servicio de proxy de terceros que puede evitar bloqueos
    // https://images.weserv.nl/ es un servicio gratuito de proxy de imágenes
    return `https://images.weserv.nl/?url=${encodeURIComponent(imageUrl)}&output=webp`
  }
  return imageUrl
}
