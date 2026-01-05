'use client'

import { Box, Container, Heading, Text, VStack, Card, CardBody, Image, HStack, IconButton, Flex } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface Service {
  image: string
  title: string
  description: string
}

const services: Service[] = [
  {
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Vidrios Templados',
    description: 'Cristales de seguridad resistentes y duraderos para ventanas, puertas y divisiones.'
  },
  {
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Vidrios Laminados',
    description: 'Protección adicional contra impactos y ruido, ideales para zonas de alto tráfico.'
  },
  {
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Espejos Decorativos',
    description: 'Espejos de diferentes tamaños y formas para decorar y ampliar visualmente tu espacio.'
  },
  {
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Cristales para Muebles',
    description: 'Vidrios especializados para estanterías, mesas, vitrinas y muebles modernos.'
  },
  {
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Instalación Profesional',
    description: 'Servicio de instalación con técnicos especializados y herramientas profesionales.'
  },
  {
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Reparación y Mantenimiento',
    description: 'Servicio de reparación de vidrios dañados y mantenimiento preventivo.'
  }
]

interface ServicesSectionProps {
  onScrollToContact: () => void
}

export default function ServicesSection({ onScrollToContact }: ServicesSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [cardsPerView, setCardsPerView] = useState(3)

  // Ajustar número de tarjetas visibles según el tamaño de pantalla
  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1)
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2)
      } else {
        setCardsPerView(3)
      }
    }

    updateCardsPerView()
    window.addEventListener('resize', updateCardsPerView)
    return () => window.removeEventListener('resize', updateCardsPerView)
  }, [])

  const maxIndex = Math.max(0, services.length - cardsPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  // Auto-play del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000) // Cambia cada 5 segundos

    return () => clearInterval(interval)
  }, [currentIndex, maxIndex])

  return (
    <Box id="servicios" py="20" bg="white">
      <Container maxW="container.xl">
        <VStack spacing="12">
          {/* Header Section */}
          <Box textAlign="center" maxW="850px" mx="auto" px={{ base: '4', md: '6' }} w="100%">
            <Heading 
              fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
              color="gray.900"
              fontWeight="800"
              letterSpacing={{ base: '-0.02em', md: '-0.03em' }}
              textTransform="uppercase"
              mb={{ base: '3', md: '4' }}
              lineHeight="1.1"
            >
              PRODUCTOS Y SERVICIOS
            </Heading>
            
            <Box
              w={{ base: '60px', md: '80px' }}
              h="4px"
              bgGradient="linear(to-r, red.400, red.600)"
              borderRadius="full"
              mx="auto"
              mb={{ base: '6', md: '8' }}
              boxShadow="0 2px 8px rgba(229, 62, 62, 0.3)"
            />
            
            <Text 
              fontSize={{ base: 'md', md: 'lg' }}
              color="gray.600"
              maxW="700px"
              mx="auto"
              lineHeight="1.7"
            >
              Nos caracterizamos por nuestro <Text as="span" fontWeight="700" color="gray.900">diseño tecnológico, innovador y funcional</Text>. Nuestra línea de maquinarias modernas nos ha permitido dar un paso más en la fabricación de vidrio templado y laminado, brindándote una <Text as="span" fontWeight="700" color="gray.900">amplia y moderna selección de productos</Text> que se adaptan a las necesidades de tu proyecto.
            </Text>
          </Box>
          
          {/* Services Carousel */}
          <Box w="100%" position="relative" px={{ base: '4', md: '16', lg: '20' }}>
            {/* Navigation Buttons */}
            <IconButton
              aria-label="Anterior"
              icon={<FiChevronLeft />}
              position="absolute"
              left={{ base: '0', md: '0' }}
              top="50%"
              transform="translateY(-50%)"
              zIndex={2}
              bg="white"
              color="gray.700"
              boxShadow="xl"
              borderRadius="full"
              size="lg"
              onClick={prevSlide}
              _hover={{
                bg: 'red.600',
                color: 'white',
                transform: 'translateY(-50%) scale(1.1)'
              }}
              transition="all 0.3s"
              display={{ base: 'none', md: 'flex' }}
            />
            
            <IconButton
              aria-label="Siguiente"
              icon={<FiChevronRight />}
              position="absolute"
              right={{ base: '0', md: '0' }}
              top="50%"
              transform="translateY(-50%)"
              zIndex={2}
              bg="white"
              color="gray.700"
              boxShadow="xl"
              borderRadius="full"
              size="lg"
              onClick={nextSlide}
              _hover={{
                bg: 'red.600',
                color: 'white',
                transform: 'translateY(-50%) scale(1.1)'
              }}
              transition="all 0.3s"
              display={{ base: 'none', md: 'flex' }}
            />

            {/* Carousel Container */}
            <Box
              overflow="hidden"
              position="relative"
              w="100%"
              mx="auto"
            >
              <Flex
                transform={`translateX(-${currentIndex * (100 / cardsPerView)}%)`}
                transition="transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
                gap={{ base: '4', md: '6', lg: '8' }}
                style={{
                  width: `${(services.length / cardsPerView) * 100}%`
                }}
              >
                {services.map((service, index) => (
                  <Box
                    key={index}
                    flex={`0 0 ${100 / cardsPerView}%`}
                    minW="0"
                  >
                    <Card 
                      bg="white" 
                      boxShadow="xl" 
                      borderRadius="xl"
                      border="1px solid"
                      borderColor="gray.100"
                      overflow="hidden"
                      h="100%"
                      w="100%"
                      _hover={{
                        transform: 'translateY(-4px)',
                        boxShadow: '2xl',
                        transition: 'all 0.3s'
                      }}
                      transition="all 0.3s"
                    >
                      {/* Image Section */}
                      <Box
                        position="relative"
                        h={{ base: '180px', sm: '200px', md: '240px' }}
                        w="100%"
                        overflow="hidden"
                        bg="gray.100"
                      >
                        <Image
                          src={service.image}
                          alt={service.title}
                          w="100%"
                          h="100%"
                          objectFit="cover"
                          objectPosition="center"
                          minH="100%"
                          minW="100%"
                          transition="transform 0.5s ease"
                          sx={{
                            '&:hover': {
                              transform: 'scale(1.05)'
                            }
                          }}
                        />
                        <Box
                          position="absolute"
                          bottom="0"
                          left="0"
                          right="0"
                          h="60px"
                          bgGradient="linear(to-t, rgba(0,0,0,0.3), transparent)"
                          pointerEvents="none"
                        />
                      </Box>
                      
                      <CardBody textAlign="center" p={{ base: '5', md: '8' }}>
                        <Heading 
                          size="md" 
                          mb="3" 
                          color="gray.800"
                          fontWeight="700"
                          fontSize={{ base: 'md', sm: 'lg', md: 'xl' }}
                        >
                          {service.title}
                        </Heading>
                        
                        <Text 
                          color="gray.600" 
                          fontSize={{ base: 'xs', sm: 'sm', md: 'md' }}
                          lineHeight="1.6"
                        >
                          {service.description}
                        </Text>
                      </CardBody>
                    </Card>
                  </Box>
                ))}
              </Flex>
            </Box>

            {/* Dots Indicator */}
            <HStack spacing="2" justify="center" mt="8">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <Box
                  key={index}
                  w={currentIndex === index ? '32px' : '8px'}
                  h="8px"
                  borderRadius="full"
                  bg={currentIndex === index ? 'red.600' : 'gray.300'}
                  transition="all 0.3s"
                  cursor="pointer"
                  onClick={() => setCurrentIndex(index)}
                  _hover={{
                    bg: currentIndex === index ? 'red.700' : 'gray.400'
                  }}
                />
              ))}
            </HStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

