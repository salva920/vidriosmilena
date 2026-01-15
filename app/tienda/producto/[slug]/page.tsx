'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  SimpleGrid,
  Select,
  Checkbox,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
  IconButton,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { FiHeart, FiMinus, FiPlus } from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa'
import StoreNavbar from '@/components/store/StoreNavbar'
import { getProductBySlug } from '@/data/products'
import { useCart } from '@/contexts/CartContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import Footer from '@/components/Footer'
import { getImageUrl } from '@/lib/image-utils'

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string
  const product = getProductBySlug(slug)
  const toast = useToast()

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedMeasurement, setSelectedMeasurement] = useState<string>('')
  const [selectedAccessories, setSelectedAccessories] = useState<string[]>([])

  const { addToCart, openCart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()

  if (!product) {
    return (
      <Box minH="100vh" bg="gray.50">
        <StoreNavbar />
        <Container maxW="container.xl" py="16">
          <Text textAlign="center" fontSize="xl" color="gray.500">
            Producto no encontrado
          </Text>
        </Container>
        <Footer />
      </Box>
    )
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedMeasurement, selectedAccessories)
    toast({
      title: 'Producto agregado',
      description: `${product.name} se agregó al carrito`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
    openCart()
  }

  const handleFavoriteClick = () => {
    toggleFavorite(product)
    toast({
      title: isFavorite(product.id) ? 'Eliminado de favoritos' : 'Agregado a favoritos',
      status: 'success',
      duration: 1500,
      isClosable: true,
    })
  }

  const handleAccessoryToggle = (accessoryId: string) => {
    setSelectedAccessories((prev) =>
      prev.includes(accessoryId)
        ? prev.filter((id) => id !== accessoryId)
        : [...prev, accessoryId]
    )
  }

  const getTotalPrice = () => {
    let total = product.originalPrice || product.price
    if (selectedMeasurement) {
      const measurement = product.measurements?.find((m) => m.id === selectedMeasurement)
      if (measurement?.price) {
        total = measurement.price
      }
    }
    selectedAccessories.forEach((accId) => {
      const accessory = product.accessories?.find((a) => a.id === accId)
      if (accessory) {
        total += accessory.price
      }
    })
    return total * quantity
  }

  const isOnSale = product.originalPrice && product.originalPrice > product.price
  const showPrice = product.price > 0

  return (
    <Box minH="100vh" bg="gray.50">
      <StoreNavbar />

      <Box pt="8" pb="16">
        <Container maxW="container.xl">
          {/* Breadcrumbs */}
          <HStack spacing="2" mb="6" fontSize="sm" color="gray.600">
            <Text as="a" href="/tienda" _hover={{ textDecoration: 'underline' }}>
              Inicio
            </Text>
            <Text>›</Text>
            <Text as="a" href={`/tienda/${product.categorySlug}`} _hover={{ textDecoration: 'underline' }}>
              {product.category}
            </Text>
            <Text>›</Text>
            <Text>{product.name}</Text>
          </HStack>

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="8" mb="12">
            {/* Galería de imágenes */}
            <VStack spacing="4" align="stretch">
              {/* Imagen principal */}
              <Box
                position="relative"
                borderRadius="xl"
                overflow="hidden"
                bg="gray.100"
                h={{ base: '300px', md: '500px' }}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Box
                  as="img"
                  src={getImageUrl(product.images[selectedImageIndex] || product.images[0] || '/img/shower2.jpg')}
                  alt={product.name}
                  maxW="100%"
                  maxH="100%"
                  objectFit="contain"
                  loading="lazy"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    // Si falla la imagen, usar imagen local
                    const target = e.currentTarget
                    if (!target.src.includes('/img/shower2.jpg')) {
                      target.src = '/img/shower2.jpg'
                    }
                  }}
                />
              </Box>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <HStack spacing="2" overflowX="auto" pb="2">
                  {product.images.map((image, index) => (
                    <Box
                      key={index}
                      w="80px"
                      h="80px"
                      borderRadius="md"
                      overflow="hidden"
                      border="2px"
                      borderColor={selectedImageIndex === index ? 'cyan.500' : 'transparent'}
                      cursor="pointer"
                      onClick={() => setSelectedImageIndex(index)}
                      bg="gray.100"
                      flexShrink={0}
                    >
                      <Box
                        as="img"
                        src={getImageUrl(image)}
                        alt={`${product.name} ${index + 1}`}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                        loading="lazy"
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                          // Si falla la imagen, usar imagen local
                          const target = e.currentTarget
                          if (!target.src.includes('/img/shower2.jpg')) {
                            target.src = '/img/shower2.jpg'
                          }
                        }}
                      />
                    </Box>
                  ))}
                </HStack>
              )}
            </VStack>

            {/* Información del producto */}
            <VStack align="stretch" spacing="6">
              {/* Título y favoritos */}
              <HStack justify="space-between" align="flex-start">
                <Heading size="xl" color="gray.900" flex="1">
                  {product.name}
                </Heading>
                <IconButton
                  aria-label={isFavorite(product.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                  icon={isFavorite(product.id) ? <FaHeart /> : <FiHeart />}
                  color={isFavorite(product.id) ? 'red.500' : 'gray.600'}
                  variant="ghost"
                  onClick={handleFavoriteClick}
                />
              </HStack>

              {/* SKU */}
              <Text fontSize="sm" color="gray.600">
                SKU: {product.sku || 'N/A'}
              </Text>

              {/* Especificaciones rápidas */}
              {product.specifications && (
                <VStack align="stretch" spacing="2">
                  {product.specifications.map((spec, index) => (
                    <Text key={index} fontSize="sm" color="gray.700">
                      <Text as="span" fontWeight="semibold">{spec.label}:</Text> {spec.value}
                    </Text>
                  ))}
                </VStack>
              )}

              <Divider />

              {/* Precio */}
              {showPrice ? (
                <VStack align="flex-start" spacing="1">
                  {isOnSale && (
                    <Text fontSize="lg" color="gray.500" textDecoration="line-through">
                      {formatPrice(product.originalPrice!)}
                    </Text>
                  )}
                  <Text fontSize="3xl" fontWeight="bold" color="blue.900">
                    {formatPrice(getTotalPrice() / quantity)}
                  </Text>
                  {product.measurements && product.measurements.length > 0 && (
                    <Text fontSize="sm" color="gray.600">
                      Precio puede variar según medida seleccionada
                    </Text>
                  )}
                </VStack>
              ) : (
                <Text fontSize="2xl" fontWeight="bold" color="blue.900">
                  Precio a cotizar
                </Text>
              )}

              {/* Medidas */}
              {product.measurements && product.measurements.length > 0 && (
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" mb="2">
                    Elegir Medidas
                  </Text>
                  <Select
                    placeholder="Elige una opción"
                    value={selectedMeasurement}
                    onChange={(e) => setSelectedMeasurement(e.target.value)}
                    size="lg"
                  >
                    {product.measurements.map((measurement) => (
                      <option key={measurement.id} value={measurement.id}>
                        {measurement.label} {measurement.price && `- ${formatPrice(measurement.price)}`}
                      </option>
                    ))}
                  </Select>
                  {product.measurements.find((m) => m.id === '120x190') && (
                    <Text fontSize="xs" color="gray.600" mt="2">
                      *Sólo el modelo 120×190 viene con brazo tensor incluido.
                    </Text>
                  )}
                </Box>
              )}

              {/* Accesorios */}
              {product.accessories && product.accessories.length > 0 && (
                <Box>
                  <Text fontSize="sm" fontWeight="semibold" mb="2">
                    Accesorios
                  </Text>
                  <VStack align="stretch" spacing="2">
                    {product.accessories.map((accessory) => (
                      <Checkbox
                        key={accessory.id}
                        isChecked={selectedAccessories.includes(accessory.id)}
                        onChange={() => handleAccessoryToggle(accessory.id)}
                      >
                        <HStack>
                          <Text fontSize="sm">{accessory.name}</Text>
                          <HStack spacing="2">
                            {accessory.originalPrice && (
                              <Text fontSize="xs" color="gray.500" textDecoration="line-through">
                                {formatPrice(accessory.originalPrice)}
                              </Text>
                            )}
                            <Text fontSize="sm" fontWeight="semibold" color="blue.900">
                              {formatPrice(accessory.price)}
                            </Text>
                          </HStack>
                        </HStack>
                      </Checkbox>
                    ))}
                  </VStack>
                </Box>
              )}

              {/* Cantidad */}
              <HStack>
                <Text fontSize="sm" fontWeight="semibold">
                  Cantidad:
                </Text>
                <HStack spacing="2">
                  <IconButton
                    aria-label="Disminuir cantidad"
                    icon={<FiMinus />}
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  />
                  <Text minW="40px" textAlign="center" fontWeight="semibold">
                    {quantity}
                  </Text>
                  <IconButton
                    aria-label="Aumentar cantidad"
                    icon={<FiPlus />}
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  />
                </HStack>
              </HStack>

              {/* Botón agregar al carrito */}
              <Button
                size="lg"
                colorScheme={showPrice ? 'cyan' : 'red'}
                leftIcon={<FiPlus />}
                onClick={handleAddToCart}
                w="100%"
              >
                {showPrice ? 'Añadir al carrito' : 'Cotizar'}
              </Button>

              {/* Stock */}
              {product.stock === 'available' && (
                <Text fontSize="sm" color="green.600" fontWeight="semibold">
                  ✓ Stock Disponible
                </Text>
              )}
            </VStack>
          </SimpleGrid>

          {/* Tabs de información */}
          <Tabs>
            <TabList>
              <Tab>Descripción</Tab>
              {product.technicalSpecs && <Tab>Especificaciones Técnicas</Tab>}
              {product.regulations && <Tab>Normativas</Tab>}
              {product.installation && <Tab>Instalación</Tab>}
              {product.dataSheet && <Tab>Ficha técnica</Tab>}
            </TabList>

            <TabPanels>
              <TabPanel>
                <Text color="gray.700" lineHeight="1.8">
                  {product.description}
                </Text>
              </TabPanel>
              {product.technicalSpecs && (
                <TabPanel>
                  <VStack align="stretch" spacing="3">
                    {product.technicalSpecs.map((spec, index) => (
                      <HStack key={index} justify="space-between" borderBottom="1px" borderColor="gray.200" pb="2">
                        <Text fontWeight="semibold">{spec.name}:</Text>
                        <Text>{spec.value}</Text>
                      </HStack>
                    ))}
                  </VStack>
                </TabPanel>
              )}
              {product.regulations && (
                <TabPanel>
                  <Text color="gray.700" lineHeight="1.8">
                    {product.regulations}
                  </Text>
                </TabPanel>
              )}
              {product.installation && (
                <TabPanel>
                  <Text color="gray.700" lineHeight="1.8">
                    {product.installation}
                  </Text>
                </TabPanel>
              )}
              {product.dataSheet && (
                <TabPanel>
                  <Text color="gray.700" lineHeight="1.8">
                    {product.dataSheet}
                  </Text>
                </TabPanel>
              )}
            </TabPanels>
          </Tabs>
        </Container>
      </Box>

      <Footer />
    </Box>
  )
}

