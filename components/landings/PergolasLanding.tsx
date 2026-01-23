'use client'

import { Box, Heading, Text, VStack, SimpleGrid, Button, Flex } from '@chakra-ui/react'
import { FaWhatsapp } from 'react-icons/fa'

export default function PergolasLanding() {
  return (
    <VStack align="stretch" spacing="16">
      {/* Sección principal pérgolas */}
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
            ¿Qué son las pérgolas bioclimáticas?
          </Heading>
          <VStack align="stretch" spacing="4" mb="8">
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700" lineHeight="tall">
              Son estructuras de aluminio con lamas orientables que regulan el sol, la sombra,
              la ventilación y la lluvia. Se instalan rápidamente y pueden personalizarse con
              cierres de vidrio, iluminación LED y calefactores.
            </Text>
            <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700" lineHeight="tall">
              Son ideales para disfrutar tu terraza o quincho todo el año, creando un espacio
              cómodo y elegante que protege del clima sin perder luz natural.
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
            href={`https://wa.me/56949932178?text=${encodeURIComponent('Hola, estoy interesado en un proyecto de pérgola bioclimática')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Cotizar pérgola bioclimática
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
            src="https://dellorto.cl/wp-content/uploads/2025/08/ENVIAR_ERICK-02-1024x385.jpg"
            alt="Pérgola bioclimática instalada en terraza"
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </Box>
      </Flex>

      {/* Características clave de pérgolas */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6" mb="8">
        <Box
          bg="white"
          p="6"
          borderRadius="xl"
          boxShadow="md"
          textAlign="center"
        >
          <Text fontSize="4xl" mb="3">☀️</Text>
          <Heading size="sm" mb="2" color="gray.900">
            Control del clima
          </Heading>
          <Text fontSize="sm" color="gray.600">
            Lamas orientables que regulan sol, sombra, ventilación y lluvia.
          </Text>
        </Box>
        <Box
          bg="white"
          p="6"
          borderRadius="xl"
          boxShadow="md"
          textAlign="center"
        >
          <Text fontSize="4xl" mb="3">🛠️</Text>
          <Heading size="sm" mb="2" color="gray.900">
            100% personalizables
          </Heading>
          <Text fontSize="sm" color="gray.600">
            Opciones de cierres, luz LED y calefactores para tu proyecto.
          </Text>
        </Box>
        <Box
          bg="white"
          p="6"
          borderRadius="xl"
          boxShadow="md"
          textAlign="center"
        >
          <Text fontSize="4xl" mb="3">🏡</Text>
          <Heading size="sm" mb="2" color="gray.900">
            Disfruta todo el año
          </Heading>
          <Text fontSize="sm" color="gray.600">
            Crea terrazas cómodas y elegantes para uso residencial o comercial.
          </Text>
        </Box>
      </SimpleGrid>

      {/* Pérgolas estándar */}
      <Box mt="4">
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          gap={{ base: '6', lg: '12' }}
          align={{ base: 'stretch', lg: 'center' }}
        >
          <Box flex="1">
            <Heading
              size={{ base: 'lg', md: 'xl' }}
              mb="4"
              color="gray.900"
              fontWeight="bold"
            >
              Pérgolas estándar
            </Heading>
            <VStack align="stretch" spacing="3">
              <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.700" lineHeight="tall">
                Pérgola bioclimática en blanco o grafito, con accionamiento motorizado o manual,
                lamas con cámara de aire y opción de luz LED.
              </Text>
              <Text fontSize={{ base: 'sm', md: 'md' }} color="gray.700" lineHeight="tall">
                Disponible en versión autoportante (4 apoyos) o adosada a muro, con altura adaptable
                y fácil instalación, ideal para disfrutar tu espacio exterior todo el año con estilo y confort.
              </Text>
            </VStack>
          </Box>
          <Box
            flex="1"
            borderRadius="2xl"
            overflow="hidden"
            boxShadow="lg"
            bg="gray.100"
            h={{ base: '260px', md: '320px' }}
          >
            <Box
              as="img"
              src="https://dellorto.cl/wp-content/uploads/2025/08/ESTANDAR.png"
              alt="Esquema de pérgola bioclimática estándar"
              w="100%"
              h="100%"
              objectFit="cover"
            />
          </Box>
        </Flex>

        {/* Galería de imágenes de proyectos */}
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing="6" mt="8">
          <Box borderRadius="xl" overflow="hidden" boxShadow="md" bg="gray.100">
            <Box
              as="img"
              src="https://dellorto.cl/wp-content/uploads/2025/08/ENVIAR_ERICK-03-1024x385.jpg"
              alt="Pérgola bioclimática en terraza residencial"
              w="100%"
              h="200px"
              objectFit="cover"
            />
            <Box p="4">
              <Text fontSize="sm" fontWeight="semibold" color="gray.800">
                Terraza residencial
              </Text>
              <Text fontSize="xs" color="gray.600">
                Pérgola bioclimática integrada a zona de quincho.
              </Text>
            </Box>
          </Box>

          <Box borderRadius="xl" overflow="hidden" boxShadow="md" bg="gray.100">
            <Box
              as="img"
              src="https://dellorto.cl/wp-content/uploads/2025/08/3x3-1024x919.png"
              alt="Pérgola bioclimática 3x3"
              w="100%"
              h="200px"
              objectFit="cover"
            />
            <Box p="4">
              <Text fontSize="sm" fontWeight="semibold" color="gray.800">
                Módulo 3x3
              </Text>
              <Text fontSize="xs" color="gray.600">
                Formato compacto ideal para patios pequeños.
              </Text>
            </Box>
          </Box>

          <Box borderRadius="xl" overflow="hidden" boxShadow="md" bg="gray.100">
            <Box
              as="img"
              src="https://dellorto.cl/wp-content/uploads/2025/08/3x4-1024x919.png"
              alt="Pérgola bioclimática 3x4"
              w="100%"
              h="200px"
              objectFit="cover"
            />
            <Box p="4">
              <Text fontSize="sm" fontWeight="semibold" color="gray.800">
                Módulo 3x4
              </Text>
              <Text fontSize="xs" color="gray.600">
                Más superficie útil para comedor o estar exterior.
              </Text>
            </Box>
          </Box>

          <Box borderRadius="xl" overflow="hidden" boxShadow="md" bg="gray.100" display={{ base: 'none', md: 'block' }}>
            <Box
              as="img"
              src="https://dellorto.cl/wp-content/uploads/2025/08/4x4-1024x919.png"
              alt="Pérgola bioclimática 4x4"
              w="100%"
              h="200px"
              objectFit="cover"
            />
            <Box p="4">
              <Text fontSize="sm" fontWeight="semibold" color="gray.800">
                Módulo 4x4
              </Text>
              <Text fontSize="xs" color="gray.600">
                Máxima amplitud para grandes reuniones y eventos.
              </Text>
            </Box>
          </Box>
        </SimpleGrid>
      </Box>

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
            ¿Listo para tu pérgola bioclimática?
          </Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }}>
            Cuéntanos tu idea y te ayudamos a definir medidas, configuración de lamas,
            colores y complementos para tu terraza o quincho.
          </Text>
        </Box>
        <Button
          as="a"
          href={`https://wa.me/56949932178?text=${encodeURIComponent('Hola, estoy interesado en un proyecto de pérgola bioclimática')}`}
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
