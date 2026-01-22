'use client'

import { Box, Heading, Text, VStack, SimpleGrid, Button, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import CubiertasLanding from './CubiertasLanding'
import EspejosLanding from './EspejosLanding'
import PisosEscalerasLanding from './PisosEscalerasLanding'
import PizzarrasLanding from './PizzarrasLanding'
import PuertasVentanasLanding from './PuertasVentanasLanding'
import TabiqueriasLanding from './TabiqueriasLanding'

type Subcategory = 'cubiertas' | 'espejos' | 'pisos-escaleras' | 'pizzarras' | 'puertas-ventanas' | 'tabiquerias' | null

export default function HabitacionesOficinasLanding() {
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory>(null)

  // Si hay una subcategoría seleccionada, mostrar su landing
  if (selectedSubcategory === 'cubiertas') return <CubiertasLanding />
  if (selectedSubcategory === 'espejos') return <EspejosLanding />
  if (selectedSubcategory === 'pisos-escaleras') return <PisosEscalerasLanding />
  if (selectedSubcategory === 'pizzarras') return <PizzarrasLanding />
  if (selectedSubcategory === 'puertas-ventanas') return <PuertasVentanasLanding />
  if (selectedSubcategory === 'tabiquerias') return <TabiqueriasLanding />

  // Vista principal con todas las subcategorías
  return (
    <VStack align="stretch" spacing="16">
      <Box textAlign="center" mb="8">
        <Heading size={{ base: 'xl', md: '2xl' }} mb="4" color="gray.900">
          Habitaciones & Oficinas
        </Heading>
        <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600" maxW="2xl" mx="auto">
          Soluciones completas para transformar tus espacios interiores con productos de vidrio 
          de alta calidad, diseñados a medida para habitaciones, oficinas y áreas de trabajo.
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="6">
        {/* Cubiertas */}
        <Box
          bg="white"
          p="6"
          borderRadius="xl"
          boxShadow="md"
          cursor="pointer"
          transition="all 0.3s"
          _hover={{ transform: 'translateY(-4px)', boxShadow: 'xl' }}
          onClick={() => setSelectedSubcategory('cubiertas')}
        >
          <Box
            as="img"
            src="https://dellorto.cl/wp-content/uploads/2023/10/MESA-COMEDOR-3.png"
            alt="Cubiertas"
            w="100%"
            h="200px"
            objectFit="cover"
            borderRadius="lg"
            mb="4"
          />
          <Heading size="md" mb="2" color="gray.900">
            Cubiertas
          </Heading>
          <Text color="gray.600" fontSize="sm" mb="4">
            Cubiertas de vidrio templado para mesas, escritorios y superficies de trabajo
          </Text>
          <Button
            size="sm"
            colorScheme="blue"
            borderRadius="full"
            w="100%"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedSubcategory('cubiertas')
            }}
          >
            Ver más
          </Button>
        </Box>

        {/* Espejos */}
        <Box
          bg="white"
          p="6"
          borderRadius="xl"
          boxShadow="md"
          cursor="pointer"
          transition="all 0.3s"
          _hover={{ transform: 'translateY(-4px)', boxShadow: 'xl' }}
          onClick={() => setSelectedSubcategory('espejos')}
        >
          <Box
            as="img"
            src="https://dellorto.cl/wp-content/uploads/2025/08/YFR-01-VDto.jpg"
            alt="Espejos"
            w="100%"
            h="200px"
            objectFit="cover"
            borderRadius="lg"
            mb="4"
          />
          <Heading size="md" mb="2" color="gray.900">
            Espejos
          </Heading>
          <Text color="gray.600" fontSize="sm" mb="4">
            Espejos con luz LED, antiempañantes y diseños personalizados
          </Text>
          <Button
            size="sm"
            colorScheme="blue"
            borderRadius="full"
            w="100%"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedSubcategory('espejos')
            }}
          >
            Ver más
          </Button>
        </Box>

        {/* Pisos y Escaleras */}
        <Box
          bg="white"
          p="6"
          borderRadius="xl"
          boxShadow="md"
          cursor="pointer"
          transition="all 0.3s"
          _hover={{ transform: 'translateY(-4px)', boxShadow: 'xl' }}
          onClick={() => setSelectedSubcategory('pisos-escaleras')}
        >
          <Box
            as="img"
            src="https://dellorto.cl/wp-content/uploads/2025/03/pisos-banner-1024x412.png"
            alt="Pisos y Escaleras"
            w="100%"
            h="200px"
            objectFit="cover"
            borderRadius="lg"
            mb="4"
          />
          <Heading size="md" mb="2" color="gray.900">
            Pisos y Escaleras
          </Heading>
          <Text color="gray.600" fontSize="sm" mb="4">
            Pisos y escaleras de vidrio para espacios modernos y luminosos
          </Text>
          <Button
            size="sm"
            colorScheme="blue"
            borderRadius="full"
            w="100%"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedSubcategory('pisos-escaleras')
            }}
          >
            Ver más
          </Button>
        </Box>

        {/* Pizzarras */}
        <Box
          bg="white"
          p="6"
          borderRadius="xl"
          boxShadow="md"
          cursor="pointer"
          transition="all 0.3s"
          _hover={{ transform: 'translateY(-4px)', boxShadow: 'xl' }}
          onClick={() => setSelectedSubcategory('pizzarras')}
        >
          <Box
            as="img"
            src="https://dellorto.cl/wp-content/uploads/2024/12/Pizarra-de-vidrio-templado-8-mm-color-negro-con-herrajes-cromados.png"
            alt="Pizzarras"
            w="100%"
            h="200px"
            objectFit="cover"
            borderRadius="lg"
            mb="4"
          />
          <Heading size="md" mb="2" color="gray.900">
            Pizzarras
          </Heading>
          <Text color="gray.600" fontSize="sm" mb="4">
            Pizarras de vidrio templado para oficinas y espacios educativos
          </Text>
          <Button
            size="sm"
            colorScheme="blue"
            borderRadius="full"
            w="100%"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedSubcategory('pizzarras')
            }}
          >
            Ver más
          </Button>
        </Box>

        {/* Puertas y Ventanas */}
        <Box
          bg="white"
          p="6"
          borderRadius="xl"
          boxShadow="md"
          cursor="pointer"
          transition="all 0.3s"
          _hover={{ transform: 'translateY(-4px)', boxShadow: 'xl' }}
          onClick={() => setSelectedSubcategory('puertas-ventanas')}
        >
          <Box
            as="img"
            src="https://dellorto.cl/wp-content/uploads/2023/04/Portada-soluciones-10.png"
            alt="Puertas y Ventanas"
            w="100%"
            h="200px"
            objectFit="cover"
            borderRadius="lg"
            mb="4"
          />
          <Heading size="md" mb="2" color="gray.900">
            Puertas y Ventanas
          </Heading>
          <Text color="gray.600" fontSize="sm" mb="4">
            Puertas y ventanas eficientes con perfiles PVC o aluminio
          </Text>
          <Button
            size="sm"
            colorScheme="blue"
            borderRadius="full"
            w="100%"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedSubcategory('puertas-ventanas')
            }}
          >
            Ver más
          </Button>
        </Box>

        {/* Tabiquerías */}
        <Box
          bg="white"
          p="6"
          borderRadius="xl"
          boxShadow="md"
          cursor="pointer"
          transition="all 0.3s"
          _hover={{ transform: 'translateY(-4px)', boxShadow: 'xl' }}
          onClick={() => setSelectedSubcategory('tabiquerias')}
        >
          <Box
            as="img"
            src="https://dellorto.cl/wp-content/uploads/2023/04/Portada-soluciones-9.png"
            alt="Tabiquerías"
            w="100%"
            h="200px"
            objectFit="cover"
            borderRadius="lg"
            mb="4"
          />
          <Heading size="md" mb="2" color="gray.900">
            Tabiquerías
          </Heading>
          <Text color="gray.600" fontSize="sm" mb="4">
            Divisiones de cristal con impresión digital personalizable
          </Text>
          <Button
            size="sm"
            colorScheme="blue"
            borderRadius="full"
            w="100%"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedSubcategory('tabiquerias')
            }}
          >
            Ver más
          </Button>
        </Box>
      </SimpleGrid>
    </VStack>
  )
}
