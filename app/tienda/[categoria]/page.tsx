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
              bg={isCocinasLanding ? 'transparent' : 'blue.900'}
            >
              {/* Imagen de fondo: para Cocinas usamos directamente el Splashback */}
              {(
                isCocinasLanding
                  ? 'https://dellorto.cl/wp-content/uploads/2025/03/SPLASHBACK_01.jpg'
                  : category.image
              ) && (
                <Box
                  as="img"
                  src={
                    isCocinasLanding
                      ? 'https://dellorto.cl/wp-content/uploads/2025/03/SPLASHBACK_01.jpg'
                      : category.image
                  }
                  alt={category.name}
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  opacity={isCocinasLanding ? 1 : 0.3}
                />
              )}

              {/* Overlay con título sólo para categorías distintas de Cocinas */}
              {!isCocinasLanding && (
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
                    {category.description && (
                      <Text fontSize="lg">{category.description}</Text>
                    )}
                  </VStack>
                </Box>
              )}
            </Box>
          )}

          {/* Landing especial para Cocinas (Splashback) */}
          {isCocinasLanding ? (
            <VStack align="stretch" spacing="16">
              {/* Sección principal con imagen y texto */}
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
                    Diseños y formatos disponibles
                  </Heading>
                  <VStack align="stretch" spacing="4" mb="8">
                    <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700" lineHeight="tall">
                      Personaliza tus cocinas con traseras de vidrio templado, y dale un sello distintivo con el color o diseño que prefieras.
                    </Text>
                    <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700" lineHeight="tall">
                      Los Splashback de vidrio son fáciles de limpiar, resistentes al calor y la humedad, y se adaptan a proyectos residenciales y comerciales.
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
                    href={`https://wa.me/56912345678?text=${encodeURIComponent('Hola, estoy interesado en un proyecto de cocina')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Cotizar Splashback a medida
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
                    src="/Brown Macro Coffee Brand Guidelines Presentation.png"
                    alt="Proyecto de cocina Artecristal"
                    w="100%"
                    h="100%"
                    objectFit="cover"
                  />
                </Box>
              </Flex>

              {/* Sección de características */}
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6" mb="8">
                <Box
                  bg="white"
                  p="6"
                  borderRadius="xl"
                  boxShadow="md"
                  textAlign="center"
                >
                  <Text fontSize="4xl" mb="3">🎨</Text>
                  <Heading size="sm" mb="2" color="gray.900">
                    Diseños Personalizados
                  </Heading>
                  <Text fontSize="sm" color="gray.600">
                    Elige el color o diseño que mejor se adapte a tu estilo
                  </Text>
                </Box>
                <Box
                  bg="white"
                  p="6"
                  borderRadius="xl"
                  boxShadow="md"
                  textAlign="center"
                >
                  <Text fontSize="4xl" mb="3">✨</Text>
                  <Heading size="sm" mb="2" color="gray.900">
                    Fácil Limpieza
                  </Heading>
                  <Text fontSize="sm" color="gray.600">
                    Superficie lisa y resistente, ideal para cocinas
                  </Text>
                </Box>
                <Box
                  bg="white"
                  p="6"
                  borderRadius="xl"
                  boxShadow="md"
                  textAlign="center"
                >
                  <Text fontSize="4xl" mb="3">🏢</Text>
                  <Heading size="sm" mb="2" color="gray.900">
                    Proyectos Comerciales
                  </Heading>
                  <Text fontSize="sm" color="gray.600">
                    Adaptable a proyectos residenciales y comerciales
                  </Text>
                </Box>
              </SimpleGrid>

              {/* Call to Action final */}
              <Box
                bg="linear-gradient(135deg, #1A365D 0%, #2B6CB0 50%, #0BC5EA 100%)"
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
                  bg="rgba(0, 0, 0, 0.25)"
                  opacity="0.7"
                />
                <VStack spacing="6" position="relative" zIndex="1">
                  <Heading 
                    size={{ base: 'xl', md: '2xl' }} 
                    color="white"
                    fontWeight="bold"
                  >
                    ¿Te interesa? ¡Diseño hecho a tu medida!
                  </Heading>
                  <Text 
                    fontSize={{ base: 'md', md: 'lg' }} 
                    color="white" 
                    maxW="700px"
                    opacity="0.95"
                  >
                    Solicita tu cotización y comienza a planificar tu proyecto de cocina con nuestro equipo. Te ayudamos a definir medidas, colores y terminaciones.
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
                    href={`https://wa.me/56912345678?text=${encodeURIComponent('Hola, estoy interesado en un proyecto de cocina')}`}
                    target="_blank"
                    rel="noopener noreferrer"
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

