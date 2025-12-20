'use client'

import { Box, Heading, Text } from '@chakra-ui/react'
import { useState, useEffect } from 'react'

interface RotatingTitle {
  line1: string
  line2: string
  line3: string
}

interface TitleCarouselProps {
  titles: RotatingTitle[]
}

export default function TitleCarousel({ titles }: TitleCarouselProps) {
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0)
  const [titleAnimation, setTitleAnimation] = useState('fadeIn')

  // Carrusel automático de títulos
  useEffect(() => {
    const titleInterval = setInterval(() => {
      setTitleAnimation('fadeOut')
      
      setTimeout(() => {
        setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length)
        setTitleAnimation('fadeIn')
      }, 300) // Delay para la transición
    }, 3500) // Cambia de título cada 3.5 segundos

    return () => clearInterval(titleInterval)
  }, [titles.length])


  return (
    <Box position="relative" minH={{ base: "140px", md: "180px", lg: "200px" }} width="100%">
      <Heading
        as="h1"
        size={{ base: "3xl", md: "4xl", lg: "5xl" }}
        fontWeight="900"
        lineHeight="1.1"
        color="gray.900"
        letterSpacing="-0.02em"
        position="relative"
        width="100%"
        display="block"
        whiteSpace="normal"
        style={{ writingMode: 'horizontal-tb', textOrientation: 'mixed' }}
      >
        <Box
          key={currentTitleIndex}
          opacity={titleAnimation === 'fadeIn' ? 1 : 0}
          transform={titleAnimation === 'fadeIn' ? 'translateY(0)' : 'translateY(20px)'}
          transition="all 0.5s ease-in-out"
          position="absolute"
          width="100%"
          top="0"
          left="0"
          whiteSpace="normal"
        >
          <Text as="div" display="block" mb="3" whiteSpace="normal">
            {titles[currentTitleIndex].line1}
          </Text>
          <Text as="div" display="block" color="blue.500" mb="3" whiteSpace="normal">
            {titles[currentTitleIndex].line2}
          </Text>
          <Text as="div" display="block" whiteSpace="normal">
            {titles[currentTitleIndex].line3}
          </Text>
        </Box>
      </Heading>
    </Box>
  )
}

