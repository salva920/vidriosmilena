'use client'

import { Box, Container, Heading, Text, VStack, SimpleGrid, Card, CardBody } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
// @ts-ignore
const anime = require('animejs')
import { FiShield, FiZap, FiTool, FiAward } from 'react-icons/fi'
import { IconType } from 'react-icons'

interface Feature {
  icon: IconType
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: FiShield,
    title: 'Calidad Garantizada',
    description: 'Todos nuestros vidrios cumplen con los más altos estándares de calidad y seguridad.'
  },
  {
    icon: FiZap,
    title: 'Instalación Rápida',
    description: 'Servicio de instalación profesional y puntual en toda la ciudad.'
  },
  {
    icon: FiTool,
    title: 'Mantenimiento',
    description: 'Servicio de mantenimiento y reparación para mantener tus vidrios en perfecto estado.'
  },
  {
    icon: FiAward,
    title: 'Atención Premium',
    description: 'Atención personalizada y asesoramiento experto para cada proyecto.'
  }
]

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animación para el título
            anime({
              targets: '.features-title',
              opacity: [0, 1],
              translateY: [-30, 0],
              duration: 800,
              easing: 'easeOutExpo'
            })

            // Animación para las tarjetas de características
            anime({
              targets: '.feature-card',
              opacity: [0, 1],
              translateY: [50, 0],
              scale: [0.9, 1],
              duration: 700,
              easing: 'easeOutExpo',
              delay: anime.stagger(150)
            })

            // Animación para los iconos
            anime({
              targets: '.feature-icon',
              scale: [0, 1],
              rotate: [180, 0],
              duration: 800,
              easing: 'easeOutBack',
              delay: anime.stagger(150, { start: 300 })
            })

            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      const currentRef = sectionRef.current
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <Box id="nosotros" py="20" bg="white" ref={sectionRef}>
      <Container maxW="container.xl">
        <VStack spacing="12">
          {/* Header Section */}
          <Box textAlign="center" maxW="850px" mx="auto" px={{ base: '4', md: '6' }} w="100%">
            <Heading 
              className="features-title"
              fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
              color="gray.900"
              fontWeight="800"
              letterSpacing={{ base: '-0.02em', md: '-0.03em' }}
              textTransform="uppercase"
              mb={{ base: '3', md: '4' }}
              lineHeight="1.1"
              opacity={0}
            >
              ¿POR QUÉ ELEGIRNOS?
            </Heading>
            
            <Box
              w={{ base: '60px', md: '80px' }}
              h="4px"
              bgGradient="linear(to-r, cyan.400, cyan.600)"
              borderRadius="full"
              mx="auto"
              mb={{ base: '6', md: '8' }}
              boxShadow="0 2px 8px rgba(6, 182, 212, 0.3)"
            />
            
            <Text 
              fontSize={{ base: 'md', md: 'lg' }}
              color="gray.600"
              maxW="700px"
              mx="auto"
              lineHeight="1.7"
            >
              Ofrecemos los mejores productos y servicios en el mercado de vidrios
            </Text>
          </Box>
          
          {/* Features Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={{ base: '6', md: '8' }} w="100%">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="feature-card"
                bg="white" 
                boxShadow="xl" 
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.100"
                opacity={0}
                _hover={{
                  transform: 'translateY(-4px)',
                  boxShadow: '2xl',
                  transition: 'all 0.3s'
                }}
                transition="all 0.3s"
              >
                <CardBody textAlign="center" p={{ base: '6', md: '8' }}>
                  {/* Icon in cyan square */}
                  <Box
                    className="feature-icon"
                    w={{ base: '14', md: '16' }}
                    h={{ base: '14', md: '16' }}
                    bg="cyan.500"
                    borderRadius="lg"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mb="5"
                    mx="auto"
                    boxShadow="0 4px 12px rgba(6, 182, 212, 0.3)"
                  >
                    <Box
                      as={feature.icon}
                      color="white"
                      fontSize={{ base: '24px', md: '28px' }}
                    />
                  </Box>
                  
                  <Heading 
                    size="md" 
                    mb="3" 
                    color="gray.800"
                    fontWeight="700"
                    fontSize={{ base: 'lg', md: 'xl' }}
                  >
                    {feature.title}
                  </Heading>
                  
                  <Text 
                    color="gray.600" 
                    fontSize={{ base: 'sm', md: 'md' }}
                    lineHeight="1.6"
                  >
                    {feature.description}
                  </Text>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}

