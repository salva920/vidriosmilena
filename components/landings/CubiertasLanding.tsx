'use client'

import { Box, Heading, Text, VStack, SimpleGrid, Button, Flex } from '@chakra-ui/react'

export default function CubiertasLanding() {
  return (
    <VStack align="stretch" spacing="16">
      {/* Sección principal */}
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        gap={{ base: '6', lg: '12' }}
        align={{ base: 'stretch', lg: 'center' }}
      >
        <Box flex="1" order={{ base: 2, lg: 1 }}>
          <Heading
            size={{ base: 'xl', md: '2xl' }}
            mb="6"
            color="gray.900"
            fontWeight="bold"
          >
            Cubiertas de vidrio para tu hogar
          </Heading>
          <VStack align="stretch" spacing="4" mb="8">
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700" lineHeight="tall">
              Transforma tus espacios con cubiertas de vidrio templado de alta calidad. 
              Perfectas para mesas de comedor, escritorios y superficies de trabajo, 
              nuestras cubiertas combinan elegancia, resistencia y funcionalidad.
            </Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700" lineHeight="tall">
              Disponibles en múltiples formatos y espesores, diseñadas a medida para 
              adaptarse perfectamente a tus necesidades y estilo de decoración.
            </Text>
          </VStack>
          <Button
            as="a"
            href="https://wa.me/56912345678?text=Hola%20estoy%20interesado%20en%20un%20proyecto%20de%20cubiertas"
            target="_blank"
            colorScheme="whatsapp"
            size="lg"
            borderRadius="full"
            px="8"
          >
            Cotizar Cubiertas
          </Button>
        </Box>
        <Box
          flex="1"
          borderRadius="2xl"
          overflow="hidden"
          boxShadow="xl"
          bg="gray.100"
          order={{ base: 1, lg: 2 }}
          h={{ base: '300px', md: '400px', lg: '500px' }}
        >
          <Box
            as="img"
            src="https://dellorto.cl/wp-content/uploads/2023/10/MESA-COMEDOR-3.png"
            alt="Cubierta de vidrio para comedor"
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </Box>
      </Flex>

      {/* Características */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6" mt="8">
        <Box bg="white" p="6" borderRadius="xl" boxShadow="md" textAlign="center">
          <Heading size="md" mb="3" color="gray.900">
            Resistencia
          </Heading>
          <Text color="gray.600">
            Vidrio templado de alta resistencia, ideal para uso diario
          </Text>
        </Box>
        <Box bg="white" p="6" borderRadius="xl" boxShadow="md" textAlign="center">
          <Heading size="md" mb="3" color="gray.900">
            Personalización
          </Heading>
          <Text color="gray.600">
            Formatos y medidas adaptadas a tu espacio y necesidades
          </Text>
        </Box>
        <Box bg="white" p="6" borderRadius="xl" boxShadow="md" textAlign="center">
          <Heading size="md" mb="3" color="gray.900">
            Elegancia
          </Heading>
          <Text color="gray.600">
            Diseño moderno que complementa cualquier estilo decorativo
          </Text>
        </Box>
      </SimpleGrid>

      {/* CTA Final */}
      <Box
        bgGradient="linear(to-r, blue.900, cyan.600)"
        borderRadius="2xl"
        p={{ base: '8', md: '12' }}
        textAlign="center"
        color="white"
        mt="12"
      >
        <Heading size={{ base: 'lg', md: 'xl' }} mb="4">
          ¿Listo para transformar tus espacios?
        </Heading>
        <Text fontSize={{ base: 'md', md: 'lg' }} mb="6" opacity={0.9}>
          Solicita tu cotización personalizada y comienza a planificar con nosotros
        </Text>
        <Button
          as="a"
          href="https://wa.me/56912345678?text=Hola%20estoy%20interesado%20en%20un%20proyecto%20de%20cubiertas"
          target="_blank"
          colorScheme="whatsapp"
          size="lg"
          borderRadius="full"
          px="8"
        >
          Cotizar Ahora
        </Button>
      </Box>
    </VStack>
  )
}
