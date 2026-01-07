'use client'

import { Box, Container, Button, VStack, Heading } from '@chakra-ui/react'
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
  return (
    <Box
      id="inicio"
      minH="100vh"
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
      
      {/* Fondo triangular/diagonal azul oscuro - Responsive */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        zIndex={2}
        clipPath={{
          base: "polygon(0 0, 50% 0, 20% 100%, 0 100%)",
          sm: "polygon(0 0, 52% 0, 22% 100%, 0 100%)",
          md: "polygon(0 0, 55% 0, 28% 100%, 0 100%)",
          lg: "polygon(0 0, 60% 0, 32% 100%, 0 100%)"
        }}
        bg="blue.900"
        opacity="0.95"
      />
      
      {/* Contenido alineado a la izquierda */}
      <Container maxW="container.xl" position="relative" zIndex={3} h="100%">
        <Box
          display="flex"
          alignItems="center"
          minH="100vh"
          py={{ base: "12", md: "20" }}
          px={{ base: "4", md: "6", lg: "8" }}
        >
          <VStack
            spacing={{ base: "6", md: "8" }}
            align="flex-start"
            textAlign="left"
            maxW={{ base: "90%", sm: "85%", md: "500px", lg: "600px" }}
            w="100%"
            pr={{ base: "2", sm: "4" }}
          >
            {/* Títulos alineados a la izquierda - Más compactos */}
            <Box
              position="relative"
              minH={{ base: "140px", sm: "160px", md: "280px", lg: "320px" }}
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
            >
              <Heading
                as="h1"
                fontSize={{ base: "lg", sm: "xl", md: "4xl", lg: "5xl", xl: "6xl" }}
                fontWeight="900"
                lineHeight={{ base: "1.3", md: "1.1" }}
                color="white"
                letterSpacing={{ base: "-0.01em", md: "-0.02em" }}
                textTransform="uppercase"
                fontFamily="sans-serif"
                width="100%"
                wordBreak="break-word"
              >
                <TitleCarousel titles={rotatingTitles} />
              </Heading>
            </Box>
            
            {/* Botón CTA alineado a la izquierda - Más compacto */}
            <Button
              size={{ base: "md", md: "lg" }}
              bg="white"
              color="blue.900"
              px={{ base: "6", md: "12" }}
              py={{ base: "5", md: "8" }}
              fontSize={{ base: "sm", md: "lg" }}
              fontWeight="bold"
              borderRadius="md"
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
            >
              Más resultados
            </Button>
          </VStack>
        </Box>
      </Container>
    </Box>
  )
}

