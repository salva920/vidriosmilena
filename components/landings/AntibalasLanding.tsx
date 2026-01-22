'use client'

import { Box, Heading, Text, VStack, SimpleGrid, Button, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

export default function AntibalasLanding() {
  const router = useRouter()

  return (
    <VStack align="stretch" spacing="16">
      {/* Botón Volver */}
      <Button
        onClick={() => router.push('/tienda/fachadas')}
        variant="ghost"
        alignSelf="flex-start"
        leftIcon={<Box as="span" className="fa fa-arrow-left" />}
        colorScheme="blue"
        mb="8"
      >
        Volver a Fachadas
      </Button>

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
            Vidrios Antibalas Resistentes y Seguros
          </Heading>
          <VStack align="stretch" spacing="4" mb="8">
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700" lineHeight="tall">
              Vidrios antibalas de alta resistencia que brindan máxima protección y seguridad. 
              Producto resistente, robusto y macizo, que brinda seguridad y protección al usuario.
            </Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700" lineHeight="tall">
              Diseños y formatos disponibles para adaptarse a tus necesidades específicas. 
              Solicita tu cotización personalizada en Dellorto y protege tu entorno con la 
              máxima calidad y seguridad.
            </Text>
          </VStack>
          <Button
            as="a"
            href="https://wa.me/56912345678?text=Hola!%20Estoy%20interesado%20en%20vidrios%20antibalas."
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            colorScheme="cyan"
            px="8"
            py="6"
            fontSize="md"
            fontWeight="bold"
            borderRadius="full"
            boxShadow="lg"
            _hover={{ bg: 'cyan.400', transform: 'translateY(-2px)' }}
            _active={{ bg: 'cyan.600', transform: 'translateY(0)' }}
          >
            Cotizar Vidrios Antibalas
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
            src="https://dellorto.cl/wp-content/uploads/2023/04/Portada-soluciones.png"
            alt="Vidrios antibalas"
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </Box>
      </Flex>

      {/* Sección de características */}
      <VStack align="stretch" spacing="8" mt="12">
        <Heading size={{ base: 'xl', md: '2xl' }} color="gray.900" fontWeight="bold" textAlign="center">
          Beneficios de nuestros Vidrios Antibalas
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing="8">
          <Box bg="white" p="6" borderRadius="xl" boxShadow="md" textAlign="center">
            <Heading size="md" mb="2" color="gray.900">
              Máxima Protección
            </Heading>
            <Text color="gray.600" fontSize="sm">
              Vidrios de alta resistencia que brindan seguridad y protección al usuario en entornos de alto riesgo.
            </Text>
          </Box>
          <Box bg="white" p="6" borderRadius="xl" boxShadow="md" textAlign="center">
            <Heading size="md" mb="2" color="gray.900">
              Resistencia Superior
            </Heading>
            <Text color="gray.600" fontSize="sm">
              Producto robusto y macizo diseñado para soportar impactos y mantener la integridad estructural.
            </Text>
          </Box>
          <Box bg="white" p="6" borderRadius="xl" boxShadow="md" textAlign="center">
            <Heading size="md" mb="2" color="gray.900">
              Diseños Personalizados
            </Heading>
            <Text color="gray.600" fontSize="sm">
              Formatos y diseños disponibles para adaptarse a tus necesidades específicas de seguridad.
            </Text>
          </Box>
        </SimpleGrid>
      </VStack>

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
            ¿Necesitas protección máxima?
          </Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }}>
            Contáctanos para una cotización personalizada y sin compromiso.
          </Text>
        </Box>
        <Button
          as="a"
          href="https://wa.me/56912345678?text=Hola!%20Estoy%20interesado%20en%20vidrios%20antibalas."
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
          _hover={{ bg: 'yellow.300', transform: 'translateY(-2px)' }}
          _active={{ bg: 'yellow.500', transform: 'translateY(0)' }}
        >
          Cotizar por WhatsApp
        </Button>
      </Flex>
    </VStack>
  )
}
