'use client'

import { Box, Heading, Text, VStack, SimpleGrid, Button, Flex } from '@chakra-ui/react'
import { FaWhatsapp } from 'react-icons/fa'

export default function TabiqueriasLanding() {
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
            Tabiquerías
          </Heading>
          <VStack align="stretch" spacing="4" mb="8">
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700" lineHeight="tall">
              Al usar cristales, se obtiene una mayor luminosidad y amplitud en los espacios, 
              pudiéndolos personalizar con impresión digital para generar entornos únicos.
            </Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700" lineHeight="tall">
              Descubre nuestras tabiquerías de cristal personalizables con impresión digital. 
              Crea espacios únicos con diseño hecho a tu medida. Soluciones modernas que 
              transforman cualquier ambiente en un lugar luminoso y espacioso.
            </Text>
          </VStack>
          <Button
            as="a"
            href="https://wa.me/56949932178?text=Hola%20estoy%20interesado%20en%20un%20proyecto%20de%20tabiquerias"
            target="_blank"
            colorScheme="whatsapp"
            size="lg"
            borderRadius="full"
            px="8"
          >
            Cotizar Tabiquerías
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
            src="https://dellorto.cl/wp-content/uploads/2023/04/Portada-soluciones-9.png"
            alt="Tabiquerías de cristal"
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </Box>
      </Flex>

      {/* Sección de características */}
      <Box bg="white" p="8" borderRadius="xl" boxShadow="md">
        <Heading size="lg" mb="4" color="gray.900" textAlign="center">
          Diseños y formatos disponibles
        </Heading>
        <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700" textAlign="center" lineHeight="tall">
          Confeccionamos divisiones de vidrio templado, laminado o DVH para todo tipo de 
          espacios, sean interiores o exteriores. Con impresión digital personalizable, 
          creamos divisiones que no solo separan espacios, sino que también los embellecen.
        </Text>
      </Box>

      {/* Características */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6" mt="8">
        <Box bg="white" p="6" borderRadius="xl" boxShadow="md" textAlign="center">
          <Heading size="md" mb="3" color="gray.900">
            Luminosidad
          </Heading>
          <Text color="gray.600">
            Mayor luminosidad y amplitud en tus espacios
          </Text>
        </Box>
        <Box bg="white" p="6" borderRadius="xl" boxShadow="md" textAlign="center">
          <Heading size="md" mb="3" color="gray.900">
            Impresión digital
          </Heading>
          <Text color="gray.600">
            Personalización con diseños únicos impresos
          </Text>
        </Box>
        <Box bg="white" p="6" borderRadius="xl" boxShadow="md" textAlign="center">
          <Heading size="md" mb="3" color="gray.900">
            Versatilidad
          </Heading>
          <Text color="gray.600">
            Vidrio templado, laminado o DVH para cualquier espacio
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
            Solicita tu cotización y comienza a planificar con nosotros
          </Text>
        </Box>
        <Button
          as="a"
          href="https://wa.me/56949932178?text=Hola%20estoy%20interesado%20en%20un%20proyecto%20de%20tabiquerias"
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
