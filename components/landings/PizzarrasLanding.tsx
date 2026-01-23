'use client'

import { Box, Heading, Text, VStack, SimpleGrid, Button, Flex } from '@chakra-ui/react'
import { FaWhatsapp } from 'react-icons/fa'

export default function PizzarrasLanding() {
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
            Pizarras de vidrio templado
          </Heading>
          <VStack align="stretch" spacing="4" mb="8">
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700" lineHeight="tall">
              Pizarras de vidrio templado de alta calidad, perfectas para oficinas, 
              salas de reuniones, aulas y espacios creativos. Disponibles en múltiples 
              colores y con herrajes cromados o personalizados.
            </Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700" lineHeight="tall">
              Ideales para escribir, dibujar y organizar ideas. Fáciles de limpiar y 
              mantener, con acabados elegantes que se integran perfectamente en cualquier 
              ambiente profesional o educativo.
            </Text>
          </VStack>
          <Button
            as="a"
            href="https://wa.me/56949932178?text=Hola%20estoy%20interesado%20en%20un%20proyecto%20de%20pizarras"
            target="_blank"
            colorScheme="whatsapp"
            size="lg"
            borderRadius="full"
            px="8"
          >
            Cotizar Pizarras
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
            src="https://dellorto.cl/wp-content/uploads/2024/12/Pizarra-de-vidrio-templado-8-mm-color-negro-con-herrajes-cromados.png"
            alt="Pizarra de vidrio templado"
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
            Múltiples colores
          </Heading>
          <Text color="gray.600">
            Disponibles en negro, blanco y otros colores personalizados
          </Text>
        </Box>
        <Box bg="white" p="6" borderRadius="xl" boxShadow="md" textAlign="center">
          <Heading size="md" mb="3" color="gray.900">
            Fácil limpieza
          </Heading>
          <Text color="gray.600">
            Superficie lisa y resistente, fácil de mantener impecable
          </Text>
        </Box>
        <Box bg="white" p="6" borderRadius="xl" boxShadow="md" textAlign="center">
          <Heading size="md" mb="3" color="gray.900">
            Herrajes elegantes
          </Heading>
          <Text color="gray.600">
            Opciones en cromado o personalizados según tu estilo
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
            ¿Listo para organizar tus ideas?
          </Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }}>
            Solicita tu cotización personalizada y comienza a planificar con nosotros
          </Text>
        </Box>
        <Button
          as="a"
          href="https://wa.me/56949932178?text=Hola%20estoy%20interesado%20en%20un%20proyecto%20de%20pizarras"
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
