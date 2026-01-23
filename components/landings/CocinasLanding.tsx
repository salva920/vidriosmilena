'use client'

import { Box, Heading, Text, VStack, SimpleGrid, Button, Flex } from '@chakra-ui/react'

export default function CocinasLanding() {
  return (
    <VStack align="stretch" spacing="16">
      {/* Sección principal con imagen y texto */}
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
            Diseños y formatos disponibles
          </Heading>
          <VStack align="stretch" spacing="4" mb="8">
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700" lineHeight="tall">
              Personaliza tus cocinas con traseras de vidrio templado, y dale un sello distintivo con el color o diseño que prefieras.
            </Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700" lineHeight="tall">
              Los Splashback de vidrio son fáciles de limpiar, resistentes al calor y la humedad, y se adaptan a proyectos residenciales y comerciales.
            </Text>
          </VStack>
          <Button
            size="lg"
            colorScheme="cyan"
            bg="cyan.500"
            color="white"
            fontSize={{ base: 'md', md: 'lg' }}
            px="8"
            py="6"
            borderRadius="md"
            _hover={{ bg: 'cyan.600', transform: 'translateY(-2px)', boxShadow: 'lg' }}
            transition="all 0.2s"
            as="a"
            href={`https://wa.me/56949932178?text=${encodeURIComponent('Hola, estoy interesado en un proyecto de cocina')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Cotizar Splashback a medida
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
            src="/Brown Macro Coffee Brand Guidelines Presentation.png"
            alt="Proyecto de cocina Artecristal"
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </Box>
      </Flex>

      {/* Sección de características */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6" mb="8">
        <Box
          bg="white"
          p="6"
          borderRadius="xl"
          boxShadow="md"
          textAlign="center"
        >
          <Text fontSize="4xl" mb="3">🎨</Text>
          <Heading size="sm" mb="2" color="gray.900">
            Diseños Personalizados
          </Heading>
          <Text fontSize="sm" color="gray.600">
            Elige el color o diseño que mejor se adapte a tu estilo
          </Text>
        </Box>
        <Box
          bg="white"
          p="6"
          borderRadius="xl"
          boxShadow="md"
          textAlign="center"
        >
          <Text fontSize="4xl" mb="3">✨</Text>
          <Heading size="sm" mb="2" color="gray.900">
            Fácil Limpieza
          </Heading>
          <Text fontSize="sm" color="gray.600">
            Superficie lisa y resistente, ideal para cocinas
          </Text>
        </Box>
        <Box
          bg="white"
          p="6"
          borderRadius="xl"
          boxShadow="md"
          textAlign="center"
        >
          <Text fontSize="4xl" mb="3">🏢</Text>
          <Heading size="sm" mb="2" color="gray.900">
            Proyectos Comerciales
          </Heading>
          <Text fontSize="sm" color="gray.600">
            Adaptable a proyectos residenciales y comerciales
          </Text>
        </Box>
      </SimpleGrid>

      {/* Call to Action final */}
      <Box
        bg="linear-gradient(135deg, #1A365D 0%, #2B6CB0 50%, #0BC5EA 100%)"
        borderRadius="2xl"
        p={{ base: '8', md: '12' }}
        textAlign="center"
        boxShadow="2xl"
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0, 0, 0, 0.25)"
          opacity="0.7"
        />
        <VStack spacing="6" position="relative" zIndex="1">
          <Heading 
            size={{ base: 'xl', md: '2xl' }} 
            color="white"
            fontWeight="bold"
          >
            ¿Te interesa? ¡Diseño hecho a tu medida!
          </Heading>
          <Text 
            fontSize={{ base: 'md', md: 'lg' }} 
            color="white" 
            maxW="700px"
            opacity="0.95"
          >
            Solicita tu cotización y comienza a planificar tu proyecto de cocina con nuestro equipo. Te ayudamos a definir medidas, colores y terminaciones.
          </Text>
          <Button
            size="lg"
            bg="cyan.300"
            color="blue.900"
            fontSize={{ base: 'md', md: 'lg' }}
            px="10"
            py="7"
            borderRadius="md"
            fontWeight="bold"
            _hover={{ 
              bg: 'cyan.400', 
              transform: 'translateY(-2px)', 
              boxShadow: '2xl' 
            }}
            transition="all 0.2s"
            as="a"
            href={`https://wa.me/56949932178?text=${encodeURIComponent('Hola, estoy interesado en un proyecto de cocina')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Cotizar ahora
          </Button>
        </VStack>
      </Box>
    </VStack>
  )
}
