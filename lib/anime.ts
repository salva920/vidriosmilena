// Wrapper para animejs que funciona en Next.js
// Usamos una función que carga animejs dinámicamente solo en el cliente

// @ts-ignore
let animeModule: any = null

function loadAnime() {
  if (animeModule) return animeModule
  
  if (typeof window !== 'undefined') {
    // Solo cargar en el cliente
    // @ts-ignore
    animeModule = require('animejs')
    // animejs puede estar en default o directamente
    return animeModule.default || animeModule
  }
  
  // En SSR, retornar función vacía
  return function() {}
}

// Crear objeto proxy que carga animejs cuando se accede
const anime = function(...args: any[]) {
  const animeFn = loadAnime()
  return animeFn.apply(null, args)
} as any

// Copiar propiedades estáticas como stagger
Object.setPrototypeOf(anime, {
  get stagger() {
    const animeFn = loadAnime()
    return animeFn.stagger
  },
  get remove() {
    const animeFn = loadAnime()
    return animeFn.remove
  }
})

export default anime

