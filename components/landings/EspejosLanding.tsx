'use client'

import { Box, Heading, Text, VStack, SimpleGrid, Button, Flex } from '@chakra-ui/react'

export default function EspejosLanding() {
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
            Espejos para baños hechos a medida
          </Heading>
          <VStack align="stretch" spacing="4" mb="8">
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700" lineHeight="tall">
              Explora nuestra variedad de espejos para baños hechos a medida. 
              Diseños con luz LED, antiempañantes y de alta calidad para decorar 
              con elegancia cualquier espacio de tu hogar.
            </Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700" lineHeight="tall">
              Desde modelos circulares con marcos de aluminio hasta diseños 
              personalizados, nuestros espejos combinan funcionalidad y estilo 
              para crear ambientes únicos y sofisticados.
            </Text>
          </VStack>
          <Button
            as="a"
            href="https://wa.me/56949932178?text=Hola%20estoy%20interesado%20en%20un%20proyecto%20de%20espejos"
            target="_blank"
            colorScheme="whatsapp"
            size="lg"
            borderRadius="full"
            px="8"
          >
            Cotizar Espejos
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
            src="https://dellorto.cl/wp-content/uploads/2025/08/YFR-01-VDto.jpg"
            alt="Espejo para baño con diseño moderno"
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
            Luz LED
          </Heading>
          <Text color="gray.600">
            Iluminación integrada para una experiencia visual perfecta
          </Text>
        </Box>
        <Box bg="white" p="6" borderRadius="xl" boxShadow="md" textAlign="center">
          <Heading size="md" mb="3" color="gray.900">
            Antiempañante
          </Heading>
          <Text color="gray.600">
            Tecnología que evita el empañamiento en ambientes húmedos
          </Text>
        </Box>
        <Box bg="white" p="6" borderRadius="xl" boxShadow="md" textAlign="center">
          <Heading size="md" mb="3" color="gray.900">
            Diseños únicos
          </Heading>
          <Text color="gray.600">
            Formas y marcos personalizables para cada estilo
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
          ¿Listo para renovar tu baño?
        </Heading>
        <Text fontSize={{ base: 'md', md: 'lg' }} mb="6" opacity={0.9}>
          Solicita tu cotización personalizada y comienza a planificar con nosotros
        </Text>
        <Button
          as="a"
          href="https://wa.me/56949932178?text=Hola%20estoy%20interesado%20en%20un%20proyecto%20de%20espejos"
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
