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
          px={{ base: "4", sm: "5", md: "6", lg: "8" }}
        >
          {/* Contenido dentro del área azul */}
          <Box
            position="relative"
            maxW={{ base: "85%", sm: "80%", md: "600px", lg: "700px" }}
            w="auto"
          >
            <VStack
              spacing={{ base: "5", sm: "6", md: "8" }}
              align="flex-start"
              textAlign="left"
              w="auto"
            >
            {/* Títulos alineados a la izquierda */}
            <Box
              position="relative"
              w="auto"
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
            >
              <Heading
                as="h1"
                fontSize={{ base: "sm", sm: "md", md: "3xl", lg: "4xl", xl: "5xl" }}
                fontWeight="900"
                lineHeight={{ base: "1.3", sm: "1.35", md: "1.2", lg: "1.1" }}
                color="white"
                letterSpacing={{ base: "-0.003em", sm: "-0.005em", md: "-0.02em" }}
                textTransform="uppercase"
                fontFamily="sans-serif"
                w="auto"
                maxW={{ base: "280px", sm: "320px", md: "500px", lg: "600px" }}
                wordBreak="break-word"
                overflowWrap="break-word"
              >
                <TitleCarousel titles={rotatingTitles} />
              </Heading>
            </Box>
            
            {/* Botón CTA alineado a la izquierda */}
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

