'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Card,
  CardBody,
  Image,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'

const espejosTypes = [
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
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Espejos de Baño',
    description: 'Espejos funcionales y decorativos para baños con iluminación LED y diferentes acabados.'
  },
  {
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Espejos Personalizados',
    description: 'Espejos a medida según tus necesidades, con diferentes formas, tamaños y marcos.'
  }
]

// Componente para carrusel interno de imágenes
function ImageCarousel({ images, title }: { images: string[], title: string }) {
  const [currentImgIndex, setCurrentImgIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % images.length)
    }, 3000)

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

export default function EspejosSection() {
  return (
    <Box id="espejos" py={{ base: '12', md: '16', lg: '20' }} bg="white">
      <Container maxW="container.xl">
        <VStack spacing="12">
          <Box textAlign="center" maxW="900px" mx="auto" px={{ base: '4', md: '6' }} w="100%">
            <Heading 
              fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
              color="gray.900"
              fontWeight="800"
              letterSpacing={{ base: '-0.02em', md: '-0.03em' }}
              textTransform="uppercase"
              mb={{ base: '3', md: '4' }}
              lineHeight="1.1"
            >
              ESPEJOS
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
              maxW="800px"
              mx="auto"
              lineHeight="1.7"
            >
              Espejos de alta calidad para decoración y funcionalidad, disponibles en diferentes estilos y tamaños para transformar tus espacios.
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: '6', md: '8' }} w="100%">
            {espejosTypes.map((item, index) => (
              <Card 
                key={index} 
                bg="white" 
                boxShadow="xl" 
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.100"
                overflow="hidden"
                _hover={{
                  transform: 'translateY(-4px)',
                  boxShadow: '2xl',
                  transition: 'all 0.3s'
                }}
                transition="all 0.3s"
              >
                <Box
                  position="relative"
                  h={{ base: '200px', md: '240px' }}
                  w="100%"
                  overflow="hidden"
                  bg="gray.100"
                >
                  {item.images && item.images.length > 1 ? (
                    <ImageCarousel images={item.images} title={item.title} />
                  ) : (
                    <Image
                      src={item.image}
                      alt={item.title}
                      w="100%"
                      h="100%"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  )}
                </Box>
                
                <CardBody textAlign="center" p={{ base: '6', md: '8' }}>
                  <Heading 
                    size="md" 
                    mb="3" 
                    color="gray.800"
                    fontWeight="700"
                    fontSize={{ base: 'lg', md: 'xl' }}
                  >
                    {item.title}
                  </Heading>
                  
                  <Text 
                    color="gray.600" 
                    fontSize={{ base: 'sm', md: 'md' }}
                    lineHeight="1.6"
                  >
                    {item.description}
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

