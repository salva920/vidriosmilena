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
      maxW="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {/* Carrusel de imágenes */}
      <Box
        position="relative"
        width="100%"
        height="100%"
        overflow="hidden"
        maxW="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {images.map((src, index) => (
          <Box
            key={index}
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            maxW="100%"
            maxH="100%"
            opacity={index === currentImageIndex ? 1 : 0}
            transition="opacity 0.8s ease-in-out"
            pointerEvents={index === currentImageIndex ? 'auto' : 'none'}
            overflow="hidden"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              src={src}
              alt={`Banner ${index + 1}`}
              width="100%"
              height="100%"
              maxW="100%"
              maxH="100%"
              objectFit="cover"
              objectPosition="center"
              display="block"
              loading={index === 0 ? 'eager' : 'lazy'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          </Box>
        ))}
      </Box>

    </Box>
  )
}

