'use client'

import { Box, Container, Heading, Text, VStack, SimpleGrid, Card, CardBody } from '@chakra-ui/react'

interface Feature {
  icon: string
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: '🛡️',
    title: 'Calidad Garantizada',
    description: 'Todos nuestros vidrios cumplen con los más altos estándares de calidad y seguridad.'
  },
  {
    icon: '🚚',
    title: 'Instalación Rápida',
    description: 'Servicio de instalación profesional y puntual en toda la ciudad.'
  },
  {
    icon: '🔧',
    title: 'Mantenimiento',
    description: 'Servicio de mantenimiento y reparación para mantener tus vidrios en perfecto estado.'
  },
  {
    icon: '⭐',
    title: 'Atención Premium',
    description: 'Atención personalizada y asesoramiento experto para cada proyecto.'
  }
]

export default function FeaturesSection() {
  return (
    <Box id="nosotros" py="20" bg="white">
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
              ¿POR QUÉ ELEGIRNOS?
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
              Ofrecemos los mejores productos y servicios en el mercado de vidrios
            </Text>
          </Box>
          
          {/* Features Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={{ base: '6', md: '8' }} w="100%">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                bg="white" 
                boxShadow="xl" 
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.100"
                _hover={{
                  transform: 'translateY(-4px)',
                  boxShadow: '2xl',
                  transition: 'all 0.3s'
                }}
                transition="all 0.3s"
              >
                <CardBody textAlign="center" p={{ base: '6', md: '8' }}>
                  {/* Icon in red square */}
                  <Box
                    w={{ base: '14', md: '16' }}
                    h={{ base: '14', md: '16' }}
                    bg="red.600"
                    borderRadius="lg"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mb="5"
                    mx="auto"
                    boxShadow="0 4px 12px rgba(229, 62, 62, 0.3)"
                  >
                    <Text color="white" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold">
                      {feature.icon}
                    </Text>
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

