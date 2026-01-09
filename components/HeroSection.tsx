'use client'

import { Box, Container, Button, VStack, Heading } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
// @ts-ignore
const anime = require('animejs')
import TitleCarousel from './TitleCarousel'

interface RotatingTitle {
  line1: string
  line2: string
  line3: string
}

interface HeroSectionProps {
  rotatingTitles: RotatingTitle[]
  images: string[]
  onScrollToContact: () => void
  onOpenModal: () => void
}

export default function HeroSection({ 
  rotatingTitles, 
  images, 
  onScrollToContact, 
  onOpenModal 
}: HeroSectionProps) {
  const titleRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // Animación de entrada para el título
    if (titleRef.current) {
      anime({
        targets: titleRef.current,
        opacity: [0, 1],
        translateX: [-50, 0],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: 300
      })
    }

    // Animación de entrada para el botón
    if (buttonRef.current) {
      anime({
        targets: buttonRef.current,
        opacity: [0, 1],
        translateY: [30, 0],
        scale: [0.8, 1],
        duration: 800,
        easing: 'easeOutExpo',
        delay: 800
      })
    }
  }, [])

  return (
    <Box
      id="inicio"
      minH={{ base: "60vh", sm: "65vh", md: "70vh", lg: "75vh" }}
      h={{ base: "60vh", sm: "65vh", md: "70vh", lg: "75vh" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      overflow="hidden"
    >
      {/* Video de fondo */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        zIndex={1}
        overflow="hidden"
      >
        <Box
          as="video"
          autoPlay
          loop
          muted
          playsInline
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          minW="100%"
          minH="100%"
          width="auto"
          height="auto"
          objectFit="cover"
          src="/fondo home.mp4"
        />
      </Box>
      
      {/* Fondo azul grande diagonal/triangular sobre el video */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        zIndex={2}
        clipPath={{
          base: "polygon(0 0, 60% 0, 40% 100%, 0 100%)",
          sm: "polygon(0 0, 65% 0, 42% 100%, 0 100%)",
          md: "polygon(0 0, 70% 0, 45% 100%, 0 100%)",
          lg: "polygon(0 0, 75% 0, 50% 100%, 0 100%)"
        }}
        bg="blue.900"
        opacity="0.95"
      />
      
      {/* Contenido alineado a la izquierda */}
      <Container maxW="container.xl" position="relative" zIndex={3} h="100%">
        <Box
          display="flex"
          alignItems="center"
          h="100%"
          py={{ base: "6", sm: "8", md: "12", lg: "16" }}
          px={{ base: "3", sm: "4", md: "6", lg: "8" }}
        >
          {/* Contenido dentro del área azul - Totalmente a la izquierda */}
          <VStack
            spacing={{ base: "3", sm: "4", md: "6" }}
            align="flex-start"
            textAlign="left"
            w="auto"
            maxW={{ base: "55%", sm: "60%", md: "auto" }}
            pl={{ base: "2", sm: "3", md: "4" }}
          >
            {/* Títulos totalmente a la izquierda */}
            <Box ref={titleRef} opacity={0}>
              <Heading
                as="h1"
                fontSize={{ base: "10px", sm: "xs", md: "2xl", lg: "3xl", xl: "4xl" }}
                fontWeight="900"
                lineHeight={{ base: "1.2", sm: "1.3", md: "1.2", lg: "1.1" }}
                color="white"
                letterSpacing={{ base: "-0.002em", sm: "-0.003em", md: "-0.02em" }}
                textTransform="uppercase"
                fontFamily="sans-serif"
                w="100%"
                maxW="100%"
                wordBreak="break-word"
                overflowWrap="break-word"
              >
                <TitleCarousel titles={rotatingTitles} />
              </Heading>
            </Box>
            
            {/* Botón CTA totalmente a la izquierda */}
            <Button
              ref={buttonRef}
              size={{ base: "xs", sm: "sm", md: "lg" }}
              bg="white"
              color="blue.900"
              px={{ base: "3", sm: "4", md: "10" }}
              py={{ base: "2", sm: "3", md: "6" }}
              fontSize={{ base: "10px", sm: "xs", md: "md" }}
              fontWeight="bold"
              borderRadius="md"
              opacity={0}
              _hover={{ 
                bg: 'gray.100',
                transform: 'translateY(-2px)',
                boxShadow: 'xl'
              }}
              transition="all 0.3s"
              boxShadow="2xl"
              letterSpacing="wide"
              textTransform="uppercase"
              onClick={onOpenModal}
              w={{ base: "100%", sm: "auto" }}
            >
              Más resultados
            </Button>
          </VStack>
        </Box>
      </Container>
    </Box>
  )
}

