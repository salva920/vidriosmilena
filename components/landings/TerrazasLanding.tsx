'use client'

import { Box, Heading, Text, VStack, SimpleGrid, Button, Flex } from '@chakra-ui/react'

export default function TerrazasLanding() {
  return (
    <VStack align="stretch" spacing="16">
      {/* Sección Cierre de Terrazas */}
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
            Cierre de terrazas a tu medida
          </Heading>
          <VStack align="stretch" spacing="4" mb="8">
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700" lineHeight="tall">
              Crea un cierre de terraza Openglass que se adapte a tu espacio. Diseños versátiles,
              vanguardistas y minimalistas que combinan elegancia y funcionalidad.
            </Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700" lineHeight="tall">
              Convierte tu terraza en un espacio acogedor y funcional durante todo el año. Disfruta de
              la luz natural y las vistas panorámicas mientras te proteges del viento, la lluvia y el polvo.
              Fabricados con materiales de alta calidad, nuestros cierres aseguran durabilidad, seguridad
              y una estética impecable.
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
            href={`https://wa.me/56912345678?text=${encodeURIComponent('Hola, estoy interesado en un proyecto de cierre de terraza')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Cotizar cierre de terraza
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
            src="https://dellorto.cl/wp-content/uploads/2025/08/ENVIAR_ERICK-03-1024x385.jpg"
            alt="Proyecto de cierre de terraza con vidrio Openglass"
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </Box>
      </Flex>

      {/* Características clave de cierres de terraza */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6" mb="8">
        <Box
          bg="white"
          p="6"
          borderRadius="xl"
          boxShadow="md"
          textAlign="center"
        >
          <Text fontSize="4xl" mb="3">🌦️</Text>
          <Heading size="sm" mb="2" color="gray.900">
            Uso todo el año
          </Heading>
          <Text fontSize="sm" color="gray.600">
            Protege tu terraza del viento, la lluvia y el polvo sin perder luz natural.
          </Text>
        </Box>
        <Box
          bg="white"
          p="6"
          borderRadius="xl"
          boxShadow="md"
          textAlign="center"
        >
          <Text fontSize="4xl" mb="3">🪟</Text>
          <Heading size="sm" mb="2" color="gray.900">
            Vista y transparencia
          </Heading>
          <Text fontSize="sm" color="gray.600">
            Sistemas de vidrio que permiten vistas panorámicas y máximas entradas de luz.
          </Text>
        </Box>
        <Box
          bg="white"
          p="6"
          borderRadius="xl"
          boxShadow="md"
          textAlign="center"
        >
          <Text fontSize="4xl" mb="3">🔒</Text>
          <Heading size="sm" mb="2" color="gray.900">
            Seguridad y calidad
          </Heading>
          <Text fontSize="sm" color="gray.600">
            Vidrios de alta resistencia y herrajes de calidad para mayor seguridad y durabilidad.
          </Text>
        </Box>
      </SimpleGrid>

      {/* Sección Barandas para terrazas y quinchos */}
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        gap={{ base: '6', lg: '12' }}
        align={{ base: 'stretch', lg: 'center' }}
      >
        <Box
          flex="1"
          borderRadius="2xl"
          overflow="hidden"
          boxShadow="xl"
          bg="gray.100"
          order={{ base: 1, lg: 1 }}
          h={{ base: '260px', md: '340px', lg: '400px' }}
        >
          <Box
            as="img"
            src="https://dellorto.cl/wp-content/uploads/2025/03/barandas-banner-scaled.jpg"
            alt="Barandas de vidrio para terrazas y quinchos"
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </Box>
        <Box flex="1" order={{ base: 2, lg: 2 }}>
          <Heading
            size={{ base: 'lg', md: 'xl' }}
            mb="4"
            color="gray.900"
            fontWeight="bold"
          >
            Barandas para terrazas y quinchos
          </Heading>
          <VStack align="stretch" spacing="4" mb="8">
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700" lineHeight="tall">
              Descubre barandas de calidad para terrazas y quinchos, con una amplia variedad de
              diseños, desde soluciones funcionales hasta opciones premium de alto diseño.
            </Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700" lineHeight="tall">
              Elaboradas con vidrio templado y/o laminado, entregan mayor resistencia a impactos
              y seguridad para los usuarios, manteniendo una estética limpia y moderna.
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
            href={`https://wa.me/56912345678?text=${encodeURIComponent('Hola, estoy interesado en un proyecto de barandas para terraza o quincho')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Cotizar barandas
          </Button>
        </Box>
      </Flex>

      {/* Galería de proyectos Terrazas & Quinchos */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6" mt="8" mb="4">
        <Box borderRadius="xl" overflow="hidden" boxShadow="md" bg="gray.100">
          <Box
            as="img"
            src="https://dellorto.cl/wp-content/uploads/2025/03/CIERRES_DE_TERRAZA.jpg"
            alt="Cierre de terraza Openglass"
            w="100%"
            h="220px"
            objectFit="cover"
          />
          <Box p="4">
            <Text fontSize="sm" fontWeight="semibold" color="gray.800">
              Cierre de terraza Openglass
            </Text>
            <Text fontSize="xs" color="gray.600">
              Solución integral para usar tu terraza durante todo el año.
            </Text>
          </Box>
        </Box>

        <Box borderRadius="xl" overflow="hidden" boxShadow="md" bg="gray.100">
          <Box
            as="img"
            src="https://dellorto.cl/wp-content/uploads/2025/03/barandas-1.jpg"
            alt="Barandas de vidrio en terraza residencial"
            w="100%"
            h="220px"
            objectFit="cover"
          />
          <Box p="4">
            <Text fontSize="sm" fontWeight="semibold" color="gray.800">
              Barandas de vidrio
            </Text>
            <Text fontSize="xs" color="gray.600">
              Seguridad y diseño para terrazas y balcones con vista despejada.
            </Text>
          </Box>
        </Box>

        <Box borderRadius="xl" overflow="hidden" boxShadow="md" bg="gray.100">
          <Box
            as="img"
            src="https://dellorto.cl/wp-content/uploads/2025/08/ENVIAR_ERICK-05-1024x385.jpg"
            alt="Proyecto de terraza con cierres y barandas de vidrio"
            w="100%"
            h="220px"
            objectFit="cover"
          />
          <Box p="4">
            <Text fontSize="sm" fontWeight="semibold" color="gray.800">
              Terrazas & Quinchos
            </Text>
            <Text fontSize="xs" color="gray.600">
              Integración de cierres, barandas y cubiertas de vidrio en un mismo proyecto.
            </Text>
          </Box>
        </Box>
      </SimpleGrid>

      {/* Call to Action final Terrazas & Quinchos */}
      <Box
        bg="linear-gradient(135deg, #1A365D 0%, #2C5282 50%, #319795 100%)"
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
          bg="rgba(0, 0, 0, 0.35)"
          opacity="0.85"
        />
        <VStack spacing="6" position="relative" zIndex="1">
          <Heading
            size={{ base: 'xl', md: '2xl' }}
            color="white"
            fontWeight="bold"
          >
            ¿Listo para tu proyecto de terraza o quincho?
          </Heading>
          <Text
            fontSize={{ base: 'md', md: 'lg' }}
            color="white"
            maxW="700px"
            opacity="0.95"
          >
            Te asesoramos en el diseño de cierres de terraza y barandas de vidrio para que tu
            espacio exterior sea seguro, cómodo y lleno de luz.
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
            href={`https://wa.me/56912345678?text=${encodeURIComponent('Hola, estoy interesado en un proyecto de terraza o quincho (cierres y barandas)')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Cotizar Terrazas & Quinchos
          </Button>
        </VStack>
      </Box>
    </VStack>
  )
}
