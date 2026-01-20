'use client'

import { Box, Container, Heading, Text, VStack, SimpleGrid, HStack, Button, Select, Flex } from '@chakra-ui/react'
import { useState, useMemo } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import StoreNavbar from '@/components/store/StoreNavbar'
import ProductCard from '@/components/store/ProductCard'
import { getProductsByCategory, categories } from '@/data/products'
import { Product, FilterOptions } from '@/types/product'
import Footer from '@/components/Footer'

export default function CategoryPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const categorySlug = params.categoria as string
  const tipo = searchParams.get('tipo')
  
  const category = categories.find(c => c.slug === categorySlug)
  const allProducts = getProductsByCategory(categorySlug)
  
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 10000000],
    sortBy: 'name-asc'
  })

  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts]

    // Filtrar por tipo si estamos en la categoría Baños
    if (categorySlug === 'banos' && tipo) {
      filtered = filtered.filter(p => {
        const nameLower = p.name.toLowerCase()
        if (tipo === 'mamparas') {
          return nameLower.includes('shower door') || nameLower.includes('mampara') || nameLower.includes('corredera')
        } else if (tipo === 'espejos') {
          return nameLower.includes('espejo') && !nameLower.includes('led')
        } else if (tipo === 'espejos-led') {
          return nameLower.includes('led') || nameLower.includes('espejo led')
        }
        return true
      })
    }

    // Filtrar por rango de precio
    filtered = filtered.filter(p => {
      const price = p.originalPrice || p.price
      return price >= filters.priceRange[0] && price <= filters.priceRange[1]
    })

    // Ordenar
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return (a.originalPrice || a.price) - (b.originalPrice || b.price)
        case 'price-desc':
          return (b.originalPrice || b.price) - (a.originalPrice || a.price)
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        default:
          return 0
      }
    })

    return filtered
  }, [allProducts, filters, categorySlug, tipo])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const minPrice = Math.min(...allProducts.map(p => p.originalPrice || p.price))
  const maxPrice = Math.max(...allProducts.map(p => p.originalPrice || p.price))

  const isCocinasLanding = categorySlug === 'cocinas'

  return (
    <Box minH="100vh" bg="gray.50">
      <StoreNavbar />
      
      <Box pt="8" pb="16">
        <Container maxW="container.xl">
          {/* Banner de categoría */}
          {category && (
            <Box
              position="relative"
              borderRadius="xl"
              overflow="hidden"
              h={{ base: '220px', md: '320px' }}
              mb="8"
              bg="blue.900"
            >
              {category.image && (
                <Box
                  as="img"
                  src={category.image}
                  alt={category.name}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  opacity="0.3"
                />
              )}
              <Box
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
                textAlign="center"
                px="4"
              >
                <VStack spacing="3">
                  <Heading size="2xl">
                    {category.name}
                    {tipo === 'mamparas' && ' - Mamparas'}
                    {tipo === 'espejos' && ' - Espejos'}
                    {tipo === 'espejos-led' && ' - Espejos LED'}
                  </Heading>
                  {category.description && !isCocinasLanding && (
                    <Text fontSize="lg">{category.description}</Text>
                  )}
                  {isCocinasLanding && (
                    <Text fontSize={{ base: 'md', md: 'lg' }}>
                      Personaliza tu cocina con Splashback de vidrio templado. Diseños únicos, fáciles de limpiar y resistentes.
                    </Text>
                  )}
                </VStack>
              </Box>
            </Box>
          )}

          {/* Landing especial para Cocinas (Splashback) */}
          {isCocinasLanding ? (
            <VStack align="stretch" spacing="12">
              <Flex direction={{ base: 'column', md: 'row' }} gap="8" align="center">
                <Box flex="1">
                  <Heading size="lg" mb="4" color="gray.900">
                    Diseños y formatos disponibles
                  </Heading>
                  <Text fontSize="md" color="gray.700" mb="4">
                    Personaliza tus cocinas con traseras de vidrio templado, y dale un sello distintivo con el color o diseño que prefieras.
                  </Text>
                  <Text fontSize="md" color="gray.700" mb="6">
                    Los Splashback de vidrio son fáciles de limpiar, resistentes al calor y la humedad, y se adaptan a proyectos residenciales y comerciales.
                  </Text>
                  <Button
                    size="lg"
                    colorScheme="cyan"
                    onClick={() => {
                      window.location.href = '/tienda/ayuda'
                    }}
                  >
                    Cotizar Splashback a medida
                  </Button>
                </Box>
                <Box
                  flex="1"
                  borderRadius="xl"
                  overflow="hidden"
                  boxShadow="md"
                  bg="gray.100"
                >
                  <Box
                    as="img"
                    src="https://dellorto.cl/wp-content/uploads/2025/03/SPLASHBACK_01.jpg"
                    alt="Splashback de cocina"
                    w="100%"
                    h={{ base: '220px', md: '320px' }}
                    objectFit="cover"
                  />
                </Box>
              </Flex>

              <Box
                bg="blue.50"
                borderRadius="xl"
                p={{ base: '6', md: '10' }}
                textAlign={{ base: 'left', md: 'center' }}
              >
                <VStack spacing="4">
                  <Heading size="lg" color="blue.900">
                    ¿Te interesa? ¡Diseño hecho a tu medida!
                  </Heading>
                  <Text fontSize="md" color="gray.700" maxW="600px">
                    Solicita tu cotización y comienza a planificar tu proyecto de cocina con nuestro equipo. Te ayudamos a definir medidas, colores y terminaciones.
                  </Text>
                  <Button
                    size="lg"
                    colorScheme="cyan"
                    onClick={() => {
                      window.location.href = '/tienda/ayuda'
                    }}
                  >
                    Cotizar ahora
                  </Button>
                </VStack>
              </Box>
            </VStack>
          ) : (
            <Flex gap="6" direction={{ base: 'column', lg: 'row' }}>
              {/* Sidebar de filtros */}
              <Box
                w={{ base: '100%', lg: '250px' }}
                bg="white"
                p="6"
                borderRadius="lg"
                boxShadow="sm"
                h="fit-content"
                position={{ lg: 'sticky' }}
                top="120px"
              >
                <VStack align="stretch" spacing="6">
                  <Heading size="sm" color="gray.900">
                    Filtros
                  </Heading>

                  {/* Precio */}
                  <Box>
                    <Text fontSize="sm" fontWeight="semibold" mb="2">
                      Precio
                    </Text>
                    <VStack spacing="2">
                      <HStack w="100%" justify="space-between">
                        <Text fontSize="xs">{formatPrice(filters.priceRange[0])}</Text>
                        <Text fontSize="xs">{formatPrice(filters.priceRange[1])}</Text>
                      </HStack>
                      <input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        value={filters.priceRange[1]}
                        onChange={(e) =>
                          setFilters({
                            ...filters,
                            priceRange: [filters.priceRange[0], parseInt(e.target.value)],
                          })
                        }
                        style={{ width: '100%' }}
                      />
                    </VStack>
                  </Box>

                  {/* Ordenar */}
                  <Box>
                    <Text fontSize="sm" fontWeight="semibold" mb="2">
                      Ordenar por
                    </Text>
                    <Select
                      value={filters.sortBy}
                      onChange={(e) =>
                        setFilters({ ...filters, sortBy: e.target.value as FilterOptions['sortBy'] })
                      }
                      size="sm"
                    >
                      <option value="name-asc">Nombre A-Z</option>
                      <option value="name-desc">Nombre Z-A</option>
                      <option value="price-asc">Precio: Menor a Mayor</option>
                      <option value="price-desc">Precio: Mayor a Menor</option>
                    </Select>
                  </Box>
                </VStack>
              </Box>

              {/* Productos */}
              <Box flex="1">
                <HStack justify="space-between" mb="6">
                  <Text color="gray.600">
                    {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
                  </Text>
                </HStack>

                <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </SimpleGrid>

                {filteredProducts.length === 0 && (
                  <Text textAlign="center" color="gray.500" py="12">
                    No se encontraron productos con estos filtros
                  </Text>
                )}
              </Box>
            </Flex>
          )}
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}

