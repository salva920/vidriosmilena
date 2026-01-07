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
      
      {/* Overlay oscuro general para mejorar contraste */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        bg="blackAlpha.400"
        zIndex={2}
      />
      
      {/* Contenido alineado a la izquierda */}
      <Container maxW="container.xl" position="relative" zIndex={3} h="100%">
        <Box
          display="flex"
          alignItems="center"
          minH="100vh"
          py={{ base: "8", md: "20" }}
          px={{ base: "4", sm: "5", md: "6", lg: "8" }}
        >
          {/* Cuadro de fondo azul para el contenido */}
          <Box
            position="relative"
            bg="blue.900"
            borderRadius={{ base: "md", md: "xl" }}
            p={{ base: "5", sm: "6", md: "10", lg: "12" }}
            maxW={{ base: "100%", sm: "95%", md: "550px", lg: "650px" }}
            w="100%"
            boxShadow="0 20px 60px rgba(0, 0, 0, 0.5)"
            border="2px solid"
            borderColor="blue.700"
            backdropFilter="blur(10px)"
          >
            <VStack
              spacing={{ base: "5", sm: "6", md: "8" }}
              align="flex-start"
              textAlign="left"
              w="100%"
            >
            {/* Títulos alineados a la izquierda - Más compactos */}
            <Box
              position="relative"
              minH={{ base: "100px", sm: "120px", md: "280px", lg: "320px" }}
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
            >
              <Heading
                as="h1"
                fontSize={{ base: "sm", sm: "md", md: "4xl", lg: "5xl", xl: "6xl" }}
                fontWeight="900"
                lineHeight={{ base: "1.3", sm: "1.35", md: "1.1" }}
                color="white"
                letterSpacing={{ base: "-0.003em", sm: "-0.005em", md: "-0.02em" }}
                textTransform="uppercase"
                fontFamily="sans-serif"
                width="100%"
                wordBreak="break-word"
                overflowWrap="break-word"
              >
                <TitleCarousel titles={rotatingTitles} />
              </Heading>
            </Box>
            
            {/* Botón CTA alineado a la izquierda - Más compacto */}
            <Button
              size={{ base: "sm", sm: "md", md: "lg" }}
              bg="white"
              color="blue.900"
              px={{ base: "5", sm: "6", md: "12" }}
              py={{ base: "4", sm: "5", md: "8" }}
              fontSize={{ base: "xs", sm: "sm", md: "lg" }}
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
              w={{ base: "100%", sm: "auto" }}
            >
              Más resultados
            </Button>
            </VStack>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

