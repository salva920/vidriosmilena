// Wrapper para animejs que funciona en Next.js
// Cargamos animejs directamente, sin wrappers complejos

// @ts-ignore
let anime: any

if (typeof window !== 'undefined') {
  // En el cliente, cargar animejs
  // @ts-ignore
  const animejs = require('animejs')
  // animejs puede estar en default o directamente en el módulo
  anime = animejs.default || animejs
} else {
  // En SSR, crear función no-op
  anime = function() {
    return {
      play: () => {},
      pause: () => {},
      restart: () => {},
      reverse: () => {},
      seek: () => {},
      remove: () => {}
    }
  }
  // Agregar métodos estáticos
  anime.stagger = function() { return 0 }
  anime.remove = function() {}
}

export default anime

