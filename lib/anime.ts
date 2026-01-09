// Wrapper para animejs que maneja la importación correctamente
// @ts-ignore
import * as animeLib from 'animejs'

// animejs puede exportarse de diferentes formas dependiendo del entorno
const anime = (animeLib as any).default || animeLib || (animeLib as any)

export default anime

