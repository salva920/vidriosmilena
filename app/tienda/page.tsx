'use client'

import { Box, Container, Heading, Text, VStack, SimpleGrid, Button, Image, HStack, Badge, Flex, Icon, List, ListItem, ListIcon, Link as ChakraLink } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { FiCheckCircle } from 'react-icons/fi'
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
                Resultados de búsqueda: &quot;{searchQuery}&quot;
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
                h={{ base: '400px', md: '500px' }}
                bg="blue.900"
              >
                <Image
                  src="https://dellorto.cl/wp-content/uploads/2025/06/Foto_Albert.jpg"
                  alt="Banner Principal"
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  opacity="0.4"
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
                  bgGradient="linear(to-b, rgba(0,0,0,0.3), rgba(0,0,0,0.6))"
                >
                  <Heading size={{ base: 'xl', md: '2xl' }} mb="4" fontWeight="bold">
                    Bienvenido a ARTECRISTAL
                  </Heading>
                  <Text fontSize={{ base: 'lg', md: 'xl' }} mb="6" maxW="2xl">
                    Soluciones en vidrios, aluminio y acero inoxidable
                  </Text>
                  <Button 
                    size="lg" 
                    colorScheme="cyan" 
                    onClick={() => window.scrollTo({ top: document.getElementById('categorias')?.offsetTop || 0, behavior: 'smooth' })}
                    _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
                  >
                    Explorar Productos
                  </Button>
                </Box>
              </Box>

              {/* Banner B2B Promocional */}
              <Box
                position="relative"
                borderRadius="xl"
                overflow="hidden"
                h={{ base: '120px', md: '150px' }}
                bg="gray.200"
              >
                <Image
                  src="https://dellorto.cl/wp-content/uploads/2025/07/B2b_Promo-1-scaled.png"
                  alt="B2B Promocional"
                  w="100%"
                  h="100%"
                  objectFit="cover"
                />
              </Box>

              {/* Categorías destacadas */}
              <Box id="categorias">
                <Heading size="lg" mb="6" color="gray.900">
                  Categorías
                </Heading>
                <SimpleGrid columns={{ base: 2, md: 3, lg: 6 }} spacing="4">
                  {categories.map((category) => {
                    // Mapear imágenes de Dellorto para cada categoría
                    const categoryImages: Record<string, string> = {
                      'banos': 'https://dellorto.cl/wp-content/uploads/2023/04/garda-tensor-negro-1.png',
                      'cocinas': 'https://dellorto.cl/wp-content/uploads/2025/03/SPLASHBACK_01.jpg',
                      'pergolas-bioclimaticas': 'https://dellorto.cl/wp-content/uploads/2025/08/ENVIAR_ERICK-02-1024x385.jpg',
                      'terrazas-quinchos': 'https://dellorto.cl/wp-content/uploads/2025/03/CIERRES_DE_TERRAZA.jpg',
                      'habitaciones-oficinas': 'https://dellorto.cl/wp-content/uploads/2023/04/Portada-soluciones-9.png',
                      'fachadas': 'https://dellorto.cl/wp-content/uploads/2023/04/Portada-soluciones.png'
                    }
                    
                    const imageUrl = categoryImages[category.slug] || category.image
                    
                    return (
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
                        <Image
                          src={imageUrl}
                          alt={category.name}
                          w="100%"
                          h="100%"
                          objectFit="cover"
                          opacity="0.8"
                        />
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
                    )
                  })}
                </SimpleGrid>
              </Box>

              {/* Sección: Nuestra Línea de Mamparas */}
              {products.filter(p => {
                const nameLower = p.name.toLowerCase()
                return nameLower.includes('mampara') || nameLower.includes('shower door')
              }).length > 0 && (
                <Box>
                  <Heading size="lg" mb="6" color="gray.900" textAlign="center">
                    NUESTRA LÍNEA DE MAMPARAS
                  </Heading>
                  <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing="4">
                    {products
                      .filter(p => {
                        const nameLower = p.name.toLowerCase()
                        return nameLower.includes('mampara') || nameLower.includes('shower door')
                      })
                      .slice(0, 5)
                      .map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                  </SimpleGrid>
                </Box>
              )}

              {/* Productos destacados */}
              <Box>
                <HStack justify="space-between" mb="6">
                  <Heading size="lg" color="gray.900">
                    PRODUCTOS DESTACADOS
                  </Heading>
                </HStack>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="6">
                  {displayProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </SimpleGrid>
              </Box>

              {/* Sección: Expertos en Cristal y Arquitectura */}
              <Box
                bgGradient="linear(to-r, blue.900, blue.800)"
                color="white"
                borderRadius="xl"
                p={{ base: '8', md: '12' }}
                mt="8"
              >
                <VStack spacing="6" align="stretch">
                  <Heading size={{ base: 'xl', md: '2xl' }} textAlign="center" fontWeight="bold">
                    Expertos en Cristal y Arquitectura
                  </Heading>
                  <Text fontSize={{ base: 'md', md: 'lg' }} textAlign="center" maxW="3xl" mx="auto" opacity="0.95">
                    Más de 145 años respaldan la calidad de nuestros proyectos B2B. Solicitud de cotización exclusiva para empresas
                  </Text>
                  <SimpleGrid columns={{ base: 1, md: 3 }} spacing="6" mt="4">
                    <Box textAlign="center" p="4" bg="rgba(255,255,255,0.1)" borderRadius="lg">
                      <Icon as={FiCheckCircle} boxSize="6" mb="2" color="cyan.300" />
                      <Text fontWeight="semibold" mb="2">Proyectos a medida</Text>
                      <Text fontSize="sm" opacity="0.9">
                        Soluciones personalizadas para cada necesidad
                      </Text>
                    </Box>
                    <Box textAlign="center" p="4" bg="rgba(255,255,255,0.1)" borderRadius="lg">
                      <Icon as={FiCheckCircle} boxSize="6" mb="2" color="cyan.300" />
                      <Text fontWeight="semibold" mb="2">Asesoría técnica especializada</Text>
                      <Text fontSize="sm" opacity="0.9">
                        Expertos en cristal y arquitectura a tu servicio
                      </Text>
                    </Box>
                    <Box textAlign="center" p="4" bg="rgba(255,255,255,0.1)" borderRadius="lg">
                      <Icon as={FiCheckCircle} boxSize="6" mb="2" color="cyan.300" />
                      <Text fontWeight="semibold" mb="2">Garantía y respaldo</Text>
                      <Text fontSize="sm" opacity="0.9">
                        Más de 145 años de experiencia y calidad
                      </Text>
                    </Box>
                  </SimpleGrid>
                </VStack>
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

