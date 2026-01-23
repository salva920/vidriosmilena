'use client'

import { Box, Heading, Text, VStack, SimpleGrid, Button, Flex } from '@chakra-ui/react'
import { FaWhatsapp } from 'react-icons/fa'

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

      {/* CTA Final */}
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center"
        justify="space-between"
        bgGradient="linear(to-r, blue.800, cyan.600)"
        color="white"
        p={{ base: '6', md: '10' }}
        borderRadius="xl"
        mt="16"
        textAlign={{ base: 'center', md: 'left' }}
        gap="6"
      >
        <Box>
          <Heading size={{ base: 'lg', md: 'xl' }} mb="2">
            ¿Te interesa? ¡Diseño hecho a tu medida!
          </Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }}>
            Solicita tu cotización y comienza a planificar tu proyecto de cocina con nuestro equipo. Te ayudamos a definir medidas, colores y terminaciones.
          </Text>
        </Box>
        <Button
          as="a"
          href={`https://wa.me/56949932178?text=${encodeURIComponent('Hola, estoy interesado en un proyecto de cocina')}`}
          target="_blank"
          rel="noopener noreferrer"
          size="lg"
          colorScheme="yellow"
          px="8"
          py="6"
          fontSize="md"
          fontWeight="bold"
          borderRadius="full"
          boxShadow="lg"
          leftIcon={<FaWhatsapp />}
          _hover={{ bg: 'yellow.300', transform: 'translateY(-2px)' }}
          _active={{ bg: 'yellow.500', transform: 'translateY(0)' }}
        >
          Cotizar por WhatsApp
        </Button>
      </Flex>
    </VStack>
  )
}
