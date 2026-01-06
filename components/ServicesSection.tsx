'use client'

import { Box, Container, Heading, Text, VStack, Card, CardBody, Image, HStack, IconButton, Flex } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

// Componente para carrusel interno de imágenes
function ImageCarousel({ images, title }: { images: string[], title: string }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % images.length)
    }, 3000) // Cambia cada 3 segundos

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <Box position="relative" w="100%" h="100%">
      {images.map((img, index) => (
        <Image
          key={index}
          src={img}
          alt={`${title} ${index + 1}`}
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          objectFit="cover"
          objectPosition="center"
          opacity={index === currentImgIndex ? 1 : 0}
          transition="opacity 0.8s ease-in-out"
          pointerEvents="none"
          zIndex={index === currentImgIndex ? 1 : 0}
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      ))}
    </Box>
  )
}

interface Service {
  image: string
  images?: string[] // Para carrusel interno de múltiples imágenes
  title: string
  description: string
}

const services: Service[] = [
  {
    image: '/img/vidrioT.jpg',
    images: [
      '/img/vidrioT.jpg',
      '/img/vidriot2.jpg',
      '/img/vidriot3.jpg'
    ],
    title: 'Vidrios Templados',
    description: 'Cristales de seguridad resistentes y duraderos para ventanas, puertas y divisiones.'
  },
  {
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Vidrios Laminados',
    description: 'Protección adicional contra impactos y ruido, ideales para zonas de alto tráfico.'
  },
  {
    image: '/img/espejo decorativo.jpg',
    images: [
      '/img/espejo decorativo.jpg',
      '/img/espejo decorativo2.jpg',
      '/img/espejo decorativo3.jpg'
    ],
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
  const cardsPerView = 1 // Siempre mostrar solo una tarjeta centrada

  const maxIndex = services.length - 1

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  // Auto-play del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 5000) // Cambia cada 5 segundos

    return () => clearInterval(interval)
  }, [maxIndex])

  return (
    <Box id="servicios" py={{ base: '12', md: '16' }} bg="white">
      <Container maxW="container.xl">
        <VStack spacing={{ base: '8', md: '10' }}>
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
          <Box w="100%" position="relative" px={{ base: '0', md: '16', lg: '20' }}>
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
            />

            {/* Carousel Container */}
            <Box
              position="relative"
              w="100%"
              mx="auto"
            >
              <Box
                position="relative"
                w="100%"
                minH="500px"
              >
                {services.map((service, index) => (
                  <Box
                    key={index}
                    position={index === currentIndex ? 'relative' : 'absolute'}
                    top="0"
                    left="0"
                    w="100%"
                    opacity={index === currentIndex ? 1 : 0}
                    pointerEvents={index === currentIndex ? 'auto' : 'none'}
                    transition="opacity 0.5s ease-in-out"
                    zIndex={index === currentIndex ? 1 : 0}
                  >
                    <Card 
                      bg="white" 
                      boxShadow="xl" 
                      borderRadius="xl"
                      border="1px solid"
                      borderColor="gray.100"
                      overflow="hidden"
                      w="100%"
                      display="flex"
                      flexDirection="column"
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
                        h={{ base: '240px', sm: '280px', md: '320px', lg: '340px' }}
                        w="100%"
                        overflow="hidden"
                        bg="gray.100"
                      >
                        {service.images && service.images.length > 1 ? (
                          <ImageCarousel images={service.images} title={service.title} />
                        ) : (
                          <Image
                            src={service.image}
                            alt={service.title}
                            w="100%"
                            h="100%"
                            objectFit="cover"
                            objectPosition="center"
                          />
                        )}
                        <Box
                          position="absolute"
                          bottom="0"
                          left="0"
                          right="0"
                          h="60px"
                          bgGradient="linear(to-t, rgba(0,0,0,0.3), transparent)"
                          pointerEvents="none"
                          zIndex={1}
                        />
                      </Box>
                      
                      <CardBody 
                        textAlign="center" 
                        p={{ base: '6', md: '8' }}
                      >
                        <Heading 
                          size="md" 
                          mb="3" 
                          color="gray.800"
                          fontWeight="700"
                          fontSize={{ base: 'lg', sm: 'xl', md: 'xl' }}
                          lineHeight="1.2"
                        >
                          {service.title}
                        </Heading>
                        
                        <Text 
                          color="gray.600" 
                          fontSize={{ base: 'sm', sm: 'md', md: 'md' }}
                          lineHeight="1.6"
                        >
                          {service.description}
                        </Text>
                      </CardBody>
                    </Card>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Dots Indicator */}
            <HStack spacing="2" justify="center" mt="8">
              {services.map((_, index) => (
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

