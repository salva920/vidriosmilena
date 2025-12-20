'use client'

import { Box, Container, Button, VStack, Heading } from '@chakra-ui/react'
import TitleCarousel from './TitleCarousel'
import ImageCarousel from './ImageCarousel'

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
      {/* Imagen de fondo con carrusel */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        zIndex={1}
      >
        <ImageCarousel images={images} />
      </Box>
      
      {/* Overlay oscuro para mejorar legibilidad */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        bg="blackAlpha.400"
        zIndex={2}
      />
      
      {/* Contenido centrado sobre la imagen */}
      <Container maxW="container.xl" position="relative" zIndex={3}>
        <VStack
          spacing="8"
          align="center"
          textAlign="center"
          py="20"
        >
          {/* Títulos centrados */}
          <Box
            position="relative"
            minH={{ base: "200px", md: "280px", lg: "320px" }}
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Heading
              as="h1"
              fontSize={{ base: "3xl", md: "5xl", lg: "6xl", xl: "7xl" }}
              fontWeight="900"
              lineHeight="1.1"
              color="white"
              letterSpacing={{ base: "-0.01em", md: "-0.02em" }}
              textTransform="uppercase"
              fontFamily="sans-serif"
              width="100%"
            >
              <TitleCarousel titles={rotatingTitles} />
            </Heading>
          </Box>
          
          {/* Botón CTA */}
          <Button
            size="lg"
            bg="red.600"
            color="white"
            px={{ base: "8", md: "12" }}
            py={{ base: "6", md: "8" }}
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="bold"
            borderRadius="md"
            _hover={{ 
              bg: 'red.700',
              transform: 'translateY(-2px)',
              boxShadow: 'xl'
            }}
            transition="all 0.3s"
            boxShadow="2xl"
            letterSpacing="wide"
            textTransform="uppercase"
            onClick={onScrollToContact}
          >
            Solicitar Cotización
          </Button>
        </VStack>
      </Container>
    </Box>
  )
}

