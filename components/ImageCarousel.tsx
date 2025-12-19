'use client'

import { Box, Image, HStack, IconButton, Text } from '@chakra-ui/react'
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

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <Box
      position="relative"
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="2xl"
      height="500px"
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

      {/* Botones de navegación */}
      <IconButton
        aria-label="Imagen anterior"
        icon={<Text fontSize="3xl" fontWeight="bold" color="blue.500">◀</Text>}
        position="absolute"
        left="4"
        top="50%"
        transform="translateY(-50%)"
        bg="whiteAlpha.900"
        _hover={{ bg: 'white', transform: 'translateY(-50%) scale(1.1)' }}
        borderRadius="full"
        size={{ base: 'md', md: 'lg' }}
        onClick={prevImage}
        zIndex={2}
        boxShadow="lg"
        transition="all 0.2s"
        display={{ base: 'none', md: 'flex' }}
      />
      <IconButton
        aria-label="Siguiente imagen"
        icon={<Text fontSize="3xl" fontWeight="bold" color="blue.500">▶</Text>}
        position="absolute"
        right="4"
        top="50%"
        transform="translateY(-50%)"
        bg="whiteAlpha.900"
        _hover={{ bg: 'white', transform: 'translateY(-50%) scale(1.1)' }}
        borderRadius="full"
        size={{ base: 'md', md: 'lg' }}
        onClick={nextImage}
        zIndex={2}
        boxShadow="lg"
        transition="all 0.2s"
        display={{ base: 'none', md: 'flex' }}
      />

      {/* Indicadores de puntos */}
      <HStack
        position="absolute"
        bottom="4"
        left="50%"
        transform="translateX(-50%)"
        spacing="2"
        zIndex={2}
        bg="blackAlpha.300"
        px="3"
        py="2"
        borderRadius="full"
        backdropFilter="blur(10px)"
      >
        {images.map((_, index) => (
          <Box
            key={index}
            as="button"
            onClick={() => goToImage(index)}
            width={index === currentImageIndex ? "10px" : "8px"}
            height={index === currentImageIndex ? "10px" : "8px"}
            borderRadius="full"
            bg={index === currentImageIndex ? 'white' : 'whiteAlpha.600'}
            transition="all 0.3s ease"
            _hover={{ bg: 'white', transform: 'scale(1.3)' }}
            boxShadow={index === currentImageIndex ? "0 0 8px rgba(255,255,255,0.8)" : "none"}
          />
        ))}
      </HStack>
    </Box>
  )
}

