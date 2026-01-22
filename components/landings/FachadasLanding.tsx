'use client'

import React from 'react'
import { Box, Heading, Text, VStack, SimpleGrid, Button, Flex } from '@chakra-ui/react'
import { useRouter, useSearchParams } from 'next/navigation'
import AntibalasLanding from './AntibalasLanding'
import FrentesTempladosLanding from './FrentesTempladosLanding'

type Subcategory = 'antibalas' | 'frentes-templados' | null

export default function FachadasLanding() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const subcategoriaParam = searchParams.get('subcategoria')
  const [selectedSubcategory, setSelectedSubcategory] = React.useState<Subcategory>(null)

  React.useEffect(() => {
    if (subcategoriaParam) {
      const validSubcategories: Subcategory[] = ['antibalas', 'frentes-templados']
      if (validSubcategories.includes(subcategoriaParam as Subcategory)) {
        setSelectedSubcategory(subcategoriaParam as Subcategory)
      }
    }
  }, [subcategoriaParam])

  // Si hay una subcategoría seleccionada, mostrar su landing
  if (selectedSubcategory === 'antibalas') {
    return (
      <VStack align="stretch" spacing="4">
        <AntibalasLanding />
      </VStack>
    )
  }
  if (selectedSubcategory === 'frentes-templados') {
    return (
      <VStack align="stretch" spacing="4">
        <FrentesTempladosLanding />
      </VStack>
    )
  }

  // Función para navegar a la subcategoría
  const navigateToSubcategory = (sub: Subcategory) => {
    router.push(`/tienda/fachadas?subcategoria=${sub}`)
  }

  // Vista principal con todas las subcategorías
  return (
    <VStack align="stretch" spacing="16">
      <Box textAlign="center" mb="8">
        <Heading size={{ base: 'xl', md: '2xl' }} mb="4" color="gray.900">
          Fachadas
        </Heading>
        <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.600" maxW="2xl" mx="auto">
          Soluciones completas para fachadas modernas con vidrios de alta calidad, 
          diseñados a medida para edificios residenciales y comerciales.
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing="6">
        {/* Vidrios Antibalas */}
        <Box
          bg="white"
          p="6"
          borderRadius="xl"
          boxShadow="md"
          cursor="pointer"
          transition="all 0.3s"
          _hover={{ transform: 'translateY(-4px)', boxShadow: 'xl' }}
          onClick={() => navigateToSubcategory('antibalas')}
        >
          <Box
            as="img"
            src="https://dellorto.cl/wp-content/uploads/2023/04/Portada-soluciones.png"
            alt="Vidrios Antibalas"
            w="100%"
            h="200px"
            objectFit="cover"
            borderRadius="lg"
            mb="4"
          />
          <Heading size="md" mb="2" color="gray.900">
            Vidrios Antibalas
          </Heading>
          <Text color="gray.600" fontSize="sm" mb="4">
            Vidrios de alta resistencia que brindan máxima protección y seguridad
          </Text>
          <Button
            size="sm"
            colorScheme="blue"
            borderRadius="full"
            w="100%"
            onClick={(e) => {
              e.stopPropagation()
              navigateToSubcategory('antibalas')
            }}
          >
            Ver más
          </Button>
        </Box>

        {/* Frentes Templados */}
        <Box
          bg="white"
          p="6"
          borderRadius="xl"
          boxShadow="md"
          cursor="pointer"
          transition="all 0.3s"
          _hover={{ transform: 'translateY(-4px)', boxShadow: 'xl' }}
          onClick={() => navigateToSubcategory('frentes-templados')}
        >
          <Box
            as="img"
            src="https://dellorto.cl/wp-content/uploads/2023/04/Portada-soluciones-4-1024x868.png"
            alt="Frentes Templados"
            w="100%"
            h="200px"
            objectFit="cover"
            borderRadius="lg"
            mb="4"
          />
          <Heading size="md" mb="2" color="gray.900">
            Frentes Templados
          </Heading>
          <Text color="gray.600" fontSize="sm" mb="4">
            Soluciones templadas para fachadas vidriadas con herrajes de acero inoxidable
          </Text>
          <Button
            size="sm"
            colorScheme="blue"
            borderRadius="full"
            w="100%"
            onClick={(e) => {
              e.stopPropagation()
              navigateToSubcategory('frentes-templados')
            }}
          >
            Ver más
          </Button>
        </Box>
      </SimpleGrid>
    </VStack>
  )
}
