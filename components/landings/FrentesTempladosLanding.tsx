'use client'

import { Box, Heading, Text, VStack, SimpleGrid, Button, Flex } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

export default function FrentesTempladosLanding() {
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
            Frentes Templados para Fachadas Modernas
          </Heading>
          <VStack align="stretch" spacing="4" mb="8">
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700" lineHeight="tall">
              Soluciones templadas para fachadas vidriadas de edificios combinadas con herrajes 
              de acero inoxidable y diseños personalizables.
            </Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700" lineHeight="tall">
              Vidrio templado resistente y diseño personalizable para fachadas. Combina estilo y 
              durabilidad con herrajes de acero inoxidable para crear fachadas modernas y elegantes 
              que transforman cualquier edificio.
            </Text>
          </VStack>
          <Button
            as="a"
            href="https://wa.me/56949932178?text=Hola!%20Estoy%20interesado%20en%20frentes%20templados%20para%20fachadas."
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
            Cotizar Frentes Templados
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
            src="https://dellorto.cl/wp-content/uploads/2023/04/Portada-soluciones-4-1024x868.png"
            alt="Frentes templados"
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </Box>
      </Flex>

      {/* Sección de características */}
      <VStack align="stretch" spacing="8" mt="12">
        <Heading size={{ base: 'xl', md: '2xl' }} color="gray.900" fontWeight="bold" textAlign="center">
          Beneficios de nuestros Frentes Templados
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing="8">
          <Box bg="white" p="6" borderRadius="xl" boxShadow="md" textAlign="center">
            <Heading size="md" mb="2" color="gray.900">
              Resistencia y Durabilidad
            </Heading>
            <Text color="gray.600" fontSize="sm">
              Vidrio templado de alta resistencia que garantiza durabilidad y seguridad en fachadas de edificios.
            </Text>
          </Box>
          <Box bg="white" p="6" borderRadius="xl" boxShadow="md" textAlign="center">
            <Heading size="md" mb="2" color="gray.900">
              Diseño Personalizable
            </Heading>
            <Text color="gray.600" fontSize="sm">
              Soluciones personalizables que se adaptan a tu proyecto arquitectónico con herrajes de acero inoxidable.
            </Text>
          </Box>
          <Box bg="white" p="6" borderRadius="xl" boxShadow="md" textAlign="center">
            <Heading size="md" mb="2" color="gray.900">
              Estética Moderna
            </Heading>
            <Text color="gray.600" fontSize="sm">
              Fachadas vidriadas modernas y elegantes que transforman la apariencia de cualquier edificio.
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
            ¿Listo para transformar tu fachada?
          </Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }}>
            Contáctanos para una cotización personalizada y sin compromiso.
          </Text>
        </Box>
        <Button
          as="a"
          href="https://wa.me/56949932178?text=Hola!%20Estoy%20interesado%20en%20frentes%20templados%20para%20fachadas."
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
