'use client'

import { Box, Image } from '@chakra-ui/react'
import { useState, useEffect } from 'react'

interface ImageCarouselProps {
  images: string[]
}

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Carrusel automático de imágenes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 4000) // Cambia de imagen cada 4 segundos

    return () => clearInterval(interval)
  }, [images.length])


  return (
    <Box
      position="relative"
      width="100%"
      height="100%"
      overflow="hidden"
    >
      {/* Carrusel de imágenes */}
      <Box
        position="relative"
        width="100%"
        height="100%"
        overflow="hidden"
      >
        {images.map((src, index) => (
          <Box
            key={index}
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            opacity={index === currentImageIndex ? 1 : 0}
            transition="opacity 0.8s ease-in-out"
            transform={`translateX(${(index - currentImageIndex) * 100}%)`}
            pointerEvents={index === currentImageIndex ? 'auto' : 'none'}
          >
            <Image
              src={src}
              alt={`Vidrios de alta calidad ${index + 1}`}
              width="100%"
              height="100%"
              objectFit="cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </Box>
        ))}
      </Box>

    </Box>
  )
}

