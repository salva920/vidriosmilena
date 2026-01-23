'use client'

import { Box, Image, Link as ChakraLink } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface ImageCarouselProps {
  images: string[]
  links?: string[]
}

export default function ImageCarousel({ images, links = [] }: ImageCarouselProps) {
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
        {images.map((src, index) => {
          const link = links[index]
          const imageContent = (
            <Image
              src={src}
              alt={`Banner ${index + 1}`}
              width="100%"
              height="100%"
              maxW="100%"
              maxH="100%"
              objectFit="contain"
              objectPosition="center"
              display="block"
              loading={index === 0 ? 'eager' : 'lazy'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                objectPosition: 'center',
                cursor: link ? 'pointer' : 'default'
              }}
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                const target = e.currentTarget
                // Si falla la imagen, usar una imagen local de respaldo
                if (!target.src.includes('/img/')) {
                  target.src = '/img/shower2.jpg'
                }
              }}
            />
          )

          return (
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
              {link ? (
                <ChakraLink
                  as={Link}
                  href={link}
                  width="100%"
                  height="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  _hover={{ textDecoration: 'none' }}
                >
                  {imageContent}
                </ChakraLink>
              ) : (
                imageContent
              )}
            </Box>
          )
        })}
      </Box>

    </Box>
  )
}

