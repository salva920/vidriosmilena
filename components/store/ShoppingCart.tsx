'use client'

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  HStack,
  Text,
  Button,
  Image,
  IconButton,
  Box,
  Divider,
  Badge,
} from '@chakra-ui/react'
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
import { useCart } from '@/contexts/CartContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface ShoppingCartProps {
  isOpen: boolean
  onClose: () => void
}

export default function ShoppingCart({ isOpen, onClose }: ShoppingCartProps) {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart()
  const router = useRouter()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleCheckout = () => {
    onClose()
    router.push('/tienda/checkout')
  }

  const totalPrice = getTotalPrice()

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottom="1px" borderColor="gray.200">
          <HStack>
            <Text fontSize="lg" fontWeight="bold">
              Carrito de Compras
            </Text>
            {items.length > 0 && (
              <Badge bg="blue.500" color="white" borderRadius="full" px="2">
                {items.length}
              </Badge>
            )}
          </HStack>
        </DrawerHeader>

        <DrawerBody p="4">
          {items.length === 0 ? (
            <VStack spacing="4" py="8">
              <Text color="gray.500" textAlign="center">
                Tu carrito está vacío
              </Text>
              <Button
                as={Link}
                href="/tienda"
                colorScheme="cyan"
                onClick={onClose}
              >
                Ir a la tienda
              </Button>
            </VStack>
          ) : (
            <VStack spacing="4" align="stretch">
              {items.map((item) => {
                const productPrice = item.product.originalPrice || item.product.price
                const itemTotal = productPrice * item.quantity

                return (
                  <Box
                    key={item.product.id}
                    p="3"
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="md"
                  >
                    <HStack spacing="3" align="flex-start">
                      {/* Product Image */}
                      <Image
                        src={item.product.images[0] || '/img/shower2.jpg'}
                        alt={item.product.name}
                        w="80px"
                        h="80px"
                        objectFit="cover"
                        borderRadius="md"
                        bg="gray.100"
                      />

                      {/* Product Info */}
                      <VStack align="flex-start" spacing="1" flex="1">
                        <Text
                          fontSize="sm"
                          fontWeight="semibold"
                          noOfLines={2}
                          color="gray.900"
                        >
                          {item.product.name}
                        </Text>
                        {item.selectedMeasurement && (
                          <Text fontSize="xs" color="gray.600">
                            Medida: {item.selectedMeasurement}
                          </Text>
                        )}
                        <Text fontSize="sm" color="blue.900" fontWeight="bold">
                          {formatPrice(itemTotal)}
                        </Text>

                        {/* Quantity Controls */}
                        <HStack spacing="2">
                          <IconButton
                            aria-label="Disminuir cantidad"
                            icon={<FiMinus />}
                            size="xs"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          />
                          <Text fontSize="sm" fontWeight="semibold" minW="30px" textAlign="center">
                            {item.quantity}
                          </Text>
                          <IconButton
                            aria-label="Aumentar cantidad"
                            icon={<FiPlus />}
                            size="xs"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          />
                          <IconButton
                            aria-label="Eliminar producto"
                            icon={<FiTrash2 />}
                            size="xs"
                            colorScheme="red"
                            variant="ghost"
                            onClick={() => removeFromCart(item.product.id)}
                            ml="auto"
                          />
                        </HStack>
                      </VStack>
                    </HStack>
                  </Box>
                )
              })}
            </VStack>
          )}
        </DrawerBody>

        {items.length > 0 && (
          <DrawerFooter borderTop="1px" borderColor="gray.200" flexDirection="column" gap="3">
            <HStack justify="space-between" w="100%">
              <Text fontSize="lg" fontWeight="bold">
                TOTAL PARCIAL:
              </Text>
              <Text fontSize="xl" fontWeight="bold" color="blue.900">
                {formatPrice(totalPrice)}
              </Text>
            </HStack>
            <Button
              colorScheme="cyan"
              size="lg"
              w="100%"
              onClick={handleCheckout}
            >
              FINALIZAR COMPRA
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCart}
            >
              Vaciar carrito
            </Button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  )
}

