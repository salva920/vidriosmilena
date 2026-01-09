'use client'

import { useEffect, useRef } from 'react'
import anime from '@/lib/anime'

interface AnimeOptions {
  targets: string | HTMLElement | HTMLElement[] | NodeList | null
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

export const useAnime = (options: AnimeOptions, deps: any[] = []) => {
  const animationRef = useRef<any>(null)

  useEffect(() => {
    if (options.targets) {
      animationRef.current = anime({
        ...options,
        autoplay: true
      })
    }

    return () => {
      if (animationRef.current) {
        anime.remove(options.targets)
      }
    }
  }, deps)

  return animationRef.current
}

export const useAnimeOnScroll = (
  selector: string,
  options: Omit<AnimeOptions, 'targets'>,
  threshold: number = 0.1
) => {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const elements = document.querySelectorAll(selector)
    
    if (elements.length === 0) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target,
              ...options
            })
            observerRef.current?.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    elements.forEach((el) => {
      observerRef.current?.observe(el)
    })

    return () => {
      if (observerRef.current) {
        elements.forEach((el) => {
          observerRef.current?.unobserve(el)
        })
      }
    }
  }, [selector, threshold])
}
