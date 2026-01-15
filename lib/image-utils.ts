/**
 * Utilidad para obtener URLs de imágenes con proxy si es necesario
 */

export function getImageUrl(imageUrl: string): string {
  // Si la imagen es de dellorto.cl, usar el proxy para evitar CORS
  if (imageUrl.startsWith('https://dellorto.cl/')) {
    return `/api/image-proxy?url=${encodeURIComponent(imageUrl)}`
  }
  // Si es una imagen local, devolverla tal cual
  return imageUrl
}
