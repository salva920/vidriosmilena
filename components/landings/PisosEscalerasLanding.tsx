'use client'

import { Box, Heading, Text, VStack, SimpleGrid, Button, Flex } from '@chakra-ui/react'

export default function PisosEscalerasLanding() {
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
            Pisos y escaleras
          </Heading>
          <VStack align="stretch" spacing="4" mb="8">
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700" lineHeight="tall">
              Los pisos y escaleras de vidrio son la solución perfecta para quienes 
              buscan un diseño moderno, elegante y funcional. Con un material resistente, 
              duradero y con un acabado impecable, el vidrio transforma cualquier ambiente, 
              aportando luminosidad, amplitud y un toque de sofisticación.
            </Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700" lineHeight="tall">
              Ya sea para interiores residenciales o comerciales, estas soluciones de 
              vidrio no solo ofrecen estética, sino también una gran seguridad y resistencia, 
              adaptándose a las necesidades de tu espacio.
            </Text>
          </VStack>
          <Button
            as="a"
            href="https://wa.me/56949932178?text=Hola%20estoy%20interesado%20en%20un%20proyecto%20de%20pisos%20y%20escaleras"
            target="_blank"
            colorScheme="whatsapp"
            size="lg"
            borderRadius="full"
            px="8"
          >
            Cotizar Pisos y Escaleras
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
            src="https://dellorto.cl/wp-content/uploads/2025/03/pisos-banner-1024x412.png"
            alt="Pisos y escaleras de vidrio"
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </Box>
      </Flex>

      {/* Sección de características */}
      <Box bg="white" p="8" borderRadius="xl" boxShadow="md">
        <Heading size="lg" mb="4" color="gray.900" textAlign="center">
          Innovación, Elegancia y Seguridad
        </Heading>
        <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700" textAlign="center" lineHeight="tall">
          El vidrio usado en pisos y escaleras está diseñado para soportar el peso y el uso 
          continuo sin perder sus propiedades. Con acabados personalizables, combinando vidrio 
          templado y laminado, garantizando no solo belleza, sino también una estructura robusta y segura.
        </Text>
      </Box>

      {/* Características */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6" mt="8">
        <Box bg="white" p="6" borderRadius="xl" boxShadow="md" textAlign="center">
          <Heading size="md" mb="3" color="gray.900">
            Resistencia
          </Heading>
          <Text color="gray.600">
            Vidrio templado y laminado de alta resistencia para uso intensivo
          </Text>
        </Box>
        <Box bg="white" p="6" borderRadius="xl" boxShadow="md" textAlign="center">
          <Heading size="md" mb="3" color="gray.900">
            Luminosidad
          </Heading>
          <Text color="gray.600">
            Aporta luz natural y sensación de amplitud a tus espacios
          </Text>
        </Box>
        <Box bg="white" p="6" borderRadius="xl" boxShadow="md" textAlign="center">
          <Heading size="md" mb="3" color="gray.900">
            Diseño moderno
          </Heading>
          <Text color="gray.600">
            Soluciones elegantes que transforman cualquier ambiente
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
          ¿Te interesa? ¡Diseño hecho a tu medida!
        </Heading>
        <Text fontSize={{ base: 'md', md: 'lg' }} mb="6" opacity={0.9}>
          Solicita tu cotización y comienza a planificar con nosotros
        </Text>
        <Button
          as="a"
          href="https://wa.me/56949932178?text=Hola%20estoy%20interesado%20en%20un%20proyecto%20de%20pisos%20y%20escaleras"
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
