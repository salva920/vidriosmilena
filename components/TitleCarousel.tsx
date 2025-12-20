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
    <Box 
      position="relative" 
      width="100%"
    >
      <Box
        key={currentTitleIndex}
        opacity={titleAnimation === 'fadeIn' ? 1 : 0}
        transform={titleAnimation === 'fadeIn' ? 'translateY(0)' : 'translateY(20px)'}
        transition="all 0.5s ease-in-out"
        position="relative"
        width="100%"
      >
        <Text 
          as="div" 
          display="block" 
          mb={{ base: "2", md: "4" }}
          whiteSpace="normal"
        >
          {titles[currentTitleIndex].line1}
        </Text>
        <Text 
          as="div" 
          display="block" 
          mb={{ base: "2", md: "4" }}
          whiteSpace="normal"
        >
          {titles[currentTitleIndex].line2}
        </Text>
        <Text 
          as="div" 
          display="block"
          whiteSpace="normal"
        >
          {titles[currentTitleIndex].line3}
        </Text>
      </Box>
    </Box>
  )
}

