'use client'

import {
  Box,
  Card,
  CardBody,
  Text,
  Heading,
  Button,
  Badge,
  HStack,
  VStack,
  IconButton,
  useToast,
} from '@chakra-ui/react'
import { FiHeart, FiShoppingCart } from 'react-icons/fi'
import { FaHeart } from 'react-icons/fa'
import Link from 'next/link'
import { Product } from '@/types/product'
import { useCart } from '@/contexts/CartContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import { getImageUrl } from '@/lib/image-utils'

interface ProductCardProps {
  product: Product
  onAddToCart?: () => void
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { addToCart, openCart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  const toast = useToast()

  const handleAddToCart = () => {
    addToCart(product, 1)
    toast({
      title: 'Producto agregado',
      description: `${product.name} se agregó al carrito`,
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
    onAddToCart?.()
  }

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(product)
    toast({
      title: isFavorite(product.id) ? 'Eliminado de favoritos' : 'Agregado a favoritos',
      status: 'success',
      duration: 1500,
      isClosable: true,
    })
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const isOnSale = product.originalPrice && product.originalPrice > product.price
  const showPrice = product.price > 0

  return (
    <Card
      as={Link}
      href={`/tienda/producto/${product.slug}`}
      position="relative"
      overflow="hidden"
      borderRadius="lg"
      bg="white"
      boxShadow="sm"
      _hover={{
        boxShadow: 'xl',
        transform: 'translateY(-4px)',
      }}
      transition="all 0.3s ease"
      cursor="pointer"
      h="100%"
      display="flex"
      flexDirection="column"
    >
      {/* Badges */}
      <HStack position="absolute" top="2" left="2" zIndex={2} spacing="2">
        {product.exclusiveDiscount && (
          <Badge
            bg="red.500"
            color="white"
            px="2"
            py="1"
            borderRadius="md"
            fontSize="xs"
            fontWeight="bold"
          >
            Descuento exclusivo
          </Badge>
        )}
        {product.tags?.includes('OFERTA') && (
          <Badge
            bg="red.500"
            color="white"
            px="2"
            py="1"
            borderRadius="md"
            fontSize="xs"
            fontWeight="bold"
          >
            OFERTA
          </Badge>
        )}
      </HStack>

      {/* Botón de favoritos */}
      <IconButton
        aria-label={isFavorite(product.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        icon={isFavorite(product.id) ? <FaHeart /> : <FiHeart />}
        position="absolute"
        top="2"
        right="2"
        zIndex={2}
        bg="white"
        color={isFavorite(product.id) ? 'red.500' : 'gray.600'}
        borderRadius="full"
        size="sm"
        boxShadow="md"
        _hover={{
          bg: 'gray.50',
          transform: 'scale(1.1)',
        }}
        onClick={handleFavoriteClick}
      />

      {/* Imagen del producto */}
      <Box position="relative" w="100%" h="200px" bg="gray.100" overflow="hidden">
        <Box
          as="img"
          src={getImageUrl(product.images[0] || '/img/shower2.jpg')}
          alt={product.name}
          w="100%"
          h="100%"
          objectFit="cover"
          transition="transform 0.3s ease"
          _groupHover={{ transform: 'scale(1.05)' }}
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            const target = e.currentTarget
            if (!target.src.includes('/img/shower2.jpg')) {
              target.src = '/img/shower2.jpg'
            }
          }}
        />
      </Box>

      <CardBody p="4" flex="1" display="flex" flexDirection="column">
        <VStack align="stretch" spacing="3" flex="1">
          {/* Nombre del producto */}
          <Heading
            fontSize={{ base: 'sm', md: 'md' }}
            fontWeight="600"
            color="gray.900"
            lineHeight="1.3"
            noOfLines={2}
            minH="2.6em"
          >
            {product.name}
          </Heading>

          {/* Stock */}
          {product.stock === 'available' && (
            <Text fontSize="xs" color="green.600" fontWeight="semibold">
              Stock Disponible
            </Text>
          )}

          {/* Precios */}
          {showPrice ? (
            <VStack align="flex-start" spacing="1">
              {isOnSale && (
                <Text
                  fontSize="sm"
                  color="gray.500"
                  textDecoration="line-through"
                >
                  {formatPrice(product.originalPrice!)}
                </Text>
              )}
              <Text
                fontSize={{ base: 'lg', md: 'xl' }}
                fontWeight="bold"
                color="blue.900"
              >
                {formatPrice(product.price)}
              </Text>
              {!isOnSale && (
                <Text fontSize="xs" color="gray.600">
                  Desde
                </Text>
              )}
            </VStack>
          ) : (
            <Text fontSize="lg" fontWeight="semibold" color="blue.900">
              Precio a cotizar
            </Text>
          )}

          {/* Botón de acción */}
          <Button
            leftIcon={<FiShoppingCart />}
            bg={showPrice ? 'cyan.500' : 'red.500'}
            color="white"
            size="sm"
            w="100%"
            _hover={{
              bg: showPrice ? 'cyan.600' : 'red.600',
              transform: 'translateY(-2px)',
            }}
            onClick={(e: React.MouseEvent) => {
              e.preventDefault()
              e.stopPropagation()
              handleAddToCart()
            }}
            mt="auto"
          >
            {showPrice ? 'Añadir al carrito' : 'Cotizar'}
          </Button>
        </VStack>
      </CardBody>
    </Card>
  )
}

