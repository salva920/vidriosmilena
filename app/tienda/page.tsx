'use client'

import { Box, Container, Heading, Text, VStack, SimpleGrid, Button, Image, HStack, Badge } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import StoreNavbar from '@/components/store/StoreNavbar'
import ProductCard from '@/components/store/ProductCard'
import { products, categories, searchProducts } from '@/data/products'
import { Product } from '@/types/product'
import Footer from '@/components/Footer'

export default function TiendaPage() {
  const searchParams = useSearchParams()
  const [displayProducts, setDisplayProducts] = useState<Product[]>(products)
  const searchQuery = searchParams.get('search')

  useEffect(() => {
    if (searchQuery) {
      const results = searchProducts(searchQuery)
      setDisplayProducts(results)
    } else {
      // Mostrar productos destacados y por categoría
      const featured = products.filter(p => p.featured || p.exclusiveDiscount || p.tags?.includes('OFERTA'))
      setDisplayProducts(featured.length > 0 ? featured : products.slice(0, 12))
    }
  }, [searchQuery])

  return (
    <Box minH="100vh" bg="gray.50">
      <StoreNavbar />
      
      <Box pt="8" pb="16">
        <Container maxW="container.xl">
          {searchQuery ? (
            <VStack spacing="8" align="stretch">
              <Heading size="lg" color="gray.900">
                Resultados de búsqueda: "{searchQuery}"
              </Heading>
              <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="6">
                {displayProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </SimpleGrid>
              {displayProducts.length === 0 && (
                <Text textAlign="center" color="gray.500" py="8">
                  No se encontraron productos
                </Text>
              )}
            </VStack>
          ) : (
            <VStack spacing="12" align="stretch">
              {/* Hero Banner */}
              <Box
                position="relative"
                borderRadius="xl"
                overflow="hidden"
                h={{ base: '300px', md: '400px' }}
                bg="blue.900"
              >
                <Image
                  src="/img/shower2.jpg"
                  alt="Banner"
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  opacity="0.3"
                />
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  bottom="0"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                  color="white"
                  textAlign="center"
                  px="4"
                >
                  <Heading size="2xl" mb="4">
                    Bienvenido a ARTECRISTAL
                  </Heading>
                  <Text fontSize="xl" mb="6">
                    Soluciones en vidrios, aluminio y acero inoxidable
                  </Text>
                  <Button size="lg" colorScheme="cyan" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    Explorar Productos
                  </Button>
                </Box>
              </Box>

              {/* Categorías destacadas */}
              <Box>
                <Heading size="lg" mb="6" color="gray.900">
                  Categorías
                </Heading>
                <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }} spacing="4">
                  {categories.map((category) => (
                    <Box
                      key={category.id}
                      as="a"
                      href={`/tienda/${category.slug}`}
                      position="relative"
                      borderRadius="lg"
                      overflow="hidden"
                      h="150px"
                      bg="gray.200"
                      _hover={{ transform: 'translateY(-4px)', boxShadow: 'xl' }}
                      transition="all 0.3s"
                    >
                      {category.image && (
                        <Image
                          src={category.image}
                          alt={category.name}
                          w="100%"
                          h="100%"
                          objectFit="cover"
                          opacity="0.8"
                        />
                      )}
                      <Box
                        position="absolute"
                        bottom="0"
                        left="0"
                        right="0"
                        bg="linear-gradient(to top, rgba(0,0,0,0.8), transparent)"
                        p="3"
                        color="white"
                      >
                        <Text fontWeight="bold" fontSize="sm">
                          {category.name}
                        </Text>
                      </Box>
                    </Box>
                  ))}
                </SimpleGrid>
              </Box>

              {/* Productos destacados */}
              <Box>
                <HStack justify="space-between" mb="6">
                  <Heading size="lg" color="gray.900">
                    TUS PRÓXIMOS FAVORITOS
                  </Heading>
                </HStack>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="6">
                  {displayProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </SimpleGrid>
              </Box>

              {/* Promociones */}
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="6">
                <Box
                  position="relative"
                  borderRadius="xl"
                  overflow="hidden"
                  h="300px"
                  bg="gray.200"
                  _hover={{ transform: 'scale(1.02)' }}
                  transition="all 0.3s"
                >
                  <Image
                    src="/img/ventana pvc.jpg"
                    alt="Cubiertas De Mesa"
                    w="100%"
                    h="100%"
                    objectFit="cover"
                  />
                  <Box
                    position="absolute"
                    bottom="0"
                    left="0"
                    right="0"
                    bg="linear-gradient(to top, rgba(0,0,0,0.8), transparent)"
                    p="6"
                    color="white"
                  >
                    <Heading size="md" mb="3">Cubiertas De Mesa</Heading>
                    <Button colorScheme="red" size="sm">Comprar</Button>
                  </Box>
                </Box>

                <Box
                  position="relative"
                  borderRadius="xl"
                  overflow="hidden"
                  h="300px"
                  bg="gray.200"
                  _hover={{ transform: 'scale(1.02)' }}
                  transition="all 0.3s"
                >
                  <Image
                    src="/img/ventana pvc.jpg"
                    alt="Splashback"
                    w="100%"
                    h="100%"
                    objectFit="cover"
                  />
                  <Box
                    position="absolute"
                    bottom="0"
                    left="0"
                    right="0"
                    bg="linear-gradient(to top, rgba(0,0,0,0.8), transparent)"
                    p="6"
                    color="white"
                  >
                    <Heading size="md" mb="3">Splashback</Heading>
                    <Button colorScheme="red" size="sm">Comprar</Button>
                  </Box>
                </Box>

                <Box
                  position="relative"
                  borderRadius="xl"
                  overflow="hidden"
                  h="300px"
                  bg="gray.200"
                  _hover={{ transform: 'scale(1.02)' }}
                  transition="all 0.3s"
                >
                  <Image
                    src="/img/cortinas-de-cristal-neulam.jpg"
                    alt="Cortina De Cristal"
                    w="100%"
                    h="100%"
                    objectFit="cover"
                  />
                  <Box
                    position="absolute"
                    bottom="0"
                    left="0"
                    right="0"
                    bg="linear-gradient(to top, rgba(0,0,0,0.8), transparent)"
                    p="6"
                    color="white"
                  >
                    <Heading size="md" mb="3">Cortina De Cristal</Heading>
                    <Button colorScheme="red" size="sm">Cotiza Aqui</Button>
                  </Box>
                </Box>
              </SimpleGrid>
            </VStack>
          )}
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}

