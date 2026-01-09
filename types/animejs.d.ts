declare module 'animejs' {
  interface AnimeParams {
    targets?: any
    duration?: number
    delay?: number | ((el: HTMLElement, i: number) => number)
    easing?: string
    opacity?: number | number[]
    translateX?: number | number[]
    translateY?: number | number[]
    scale?: number | number[]
    rotate?: number | number[]
    [key: string]: any
  }

  interface AnimeInstance {
    play: () => void
    pause: () => void
    restart: () => void
    reverse: () => void
    seek: (time: number) => void
    remove: (targets: any) => void
  }

  interface AnimeStatic {
    (params: AnimeParams): AnimeInstance
    stagger: (value: number | number[], options?: any) => (el: HTMLElement, i: number) => number
    remove: (targets: any) => void
  }

  const anime: AnimeStatic
  export default anime
}

