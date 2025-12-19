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
    <Box py="20" bg="white">
      <Container maxW="container.xl">
        <VStack spacing="16">
          <Box textAlign="center">
            <Heading size="2xl" mb="4" color="gray.800">
              ¿Por qué elegirnos?
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="600px">
              Ofrecemos los mejores productos y servicios en el mercado de vidrios
            </Text>
          </Box>
          
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing="8">
            {features.map((feature, index) => (
              <Card key={index} bg="white" boxShadow="xl" borderRadius="xl">
                <CardBody textAlign="center" p="8">
                  <Box
                    w="12"
                    h="12"
                    bg="blue.500"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mb="4"
                    mx="auto"
                  >
                    <Text color="white" fontSize="xl" fontWeight="bold">{feature.icon}</Text>
                  </Box>
                  <Heading size="md" mb="3" color="gray.800">
                    {feature.title}
                  </Heading>
                  <Text color="gray.600" fontSize="sm">
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

