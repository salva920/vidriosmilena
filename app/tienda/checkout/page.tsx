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
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Divider,
  RadioGroup,
  Radio,
  Stack,
  Alert,
  AlertIcon,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import StoreNavbar from '@/components/store/StoreNavbar'
import { useCart } from '@/contexts/CartContext'
import Footer from '@/components/Footer'

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart()
  const router = useRouter()
  const toast = useToast()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('webpay')
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    postalCode: '',
    notes: '',
  })

  const totalPrice = getTotalPrice()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCustomerData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      if (paymentMethod === 'webpay') {
        // Crear transacción en Webpay
        const response = await fetch('/api/webpay/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: totalPrice,
            items: items.map((item) => ({
              id: item.product.id,
              name: item.product.name,
              quantity: item.quantity,
              price: item.product.originalPrice || item.product.price,
            })),
            customer: customerData,
          }),
        })

        const data = await response.json()

        if (data.token) {
          // Redirigir al formulario de Webpay usando la URL específica
          const webpayFormUrl = data.url || 'https://www.webpay.cl/form-pay/319759'
          
          const form = document.createElement('form')
          form.method = 'POST'
          form.action = webpayFormUrl
          form.innerHTML = `<input type="hidden" name="token_ws" value="${data.token}">`
          document.body.appendChild(form)
          form.submit()
        } else {
          throw new Error('Error al crear la transacción: No se recibió el token de Webpay')
        }
      } else {
        // Otros métodos de pago (transferencia, etc.)
        toast({
          title: 'Método de pago no disponible',
          description: 'Por favor, selecciona Webpay como método de pago.',
          status: 'warning',
          duration: 3000,
          isClosable: true,
        })
        setIsProcessing(false)
      }
    } catch (error) {
      console.error('Error en el checkout:', error)
      toast({
        title: 'Error al procesar el pago',
        description: 'Hubo un problema al procesar tu pedido. Por favor, intenta nuevamente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <Box minH="100vh" bg="gray.50">
        <StoreNavbar />
        <Container maxW="container.xl" py="16">
          <VStack spacing="4">
            <Heading>Tu carrito está vacío</Heading>
            <Button as="a" href="/tienda" colorScheme="cyan">
              Ir a la tienda
            </Button>
          </VStack>
        </Container>
        <Footer />
      </Box>
    )
  }

  return (
    <Box minH="100vh" bg="gray.50">
      <StoreNavbar />
      <Container maxW="container.xl" py="8">
        <VStack spacing="4" mb="8" align="flex-start">
          <Heading size="xl">
            Finalizar Compra
          </Heading>
          <Text color="gray.600" fontSize="sm">
            Completa tus datos y elige tu método de pago para finalizar tu compra
          </Text>
        </VStack>

        <form onSubmit={handleSubmit}>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing="8">
            {/* Información del Cliente */}
            <VStack spacing="6" align="stretch">
              <Box bg="white" p="6" borderRadius="lg" boxShadow="sm" borderWidth="1px" borderColor="gray.200">
                <Heading size="md" mb="4" color="gray.800">
                  Información de Contacto
                </Heading>
                <VStack spacing="4">
                  <FormControl isRequired>
                    <FormLabel>Nombre Completo</FormLabel>
                    <Input
                      name="name"
                      value={customerData.name}
                      onChange={handleInputChange}
                      placeholder="Juan Pérez"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      value={customerData.email}
                      onChange={handleInputChange}
                      placeholder="juan@ejemplo.com"
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Teléfono</FormLabel>
                    <Input
                      type="tel"
                      name="phone"
                      value={customerData.phone}
                      onChange={handleInputChange}
                      placeholder="+56912345678"
                    />
                  </FormControl>
                </VStack>
              </Box>

              <Box bg="white" p="6" borderRadius="lg" boxShadow="sm" borderWidth="1px" borderColor="gray.200">
                <Heading size="md" mb="4" color="gray.800">
                  Dirección de Entrega
                </Heading>
                <VStack spacing="4">
                  <FormControl isRequired>
                    <FormLabel>Dirección</FormLabel>
                    <Input
                      name="address"
                      value={customerData.address}
                      onChange={handleInputChange}
                      placeholder="Calle y número"
                    />
                  </FormControl>
                  <SimpleGrid columns={2} spacing="4" w="100%">
                    <FormControl isRequired>
                      <FormLabel>Ciudad</FormLabel>
                      <Input
                        name="city"
                        value={customerData.city}
                        onChange={handleInputChange}
                        placeholder="Santiago"
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Región</FormLabel>
                      <Input
                        name="region"
                        value={customerData.region}
                        onChange={handleInputChange}
                        placeholder="Región Metropolitana"
                      />
                    </FormControl>
                  </SimpleGrid>
                  <FormControl>
                    <FormLabel>Código Postal</FormLabel>
                    <Input
                      name="postalCode"
                      value={customerData.postalCode}
                      onChange={handleInputChange}
                      placeholder="1234567"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Notas adicionales (opcional)</FormLabel>
                    <Textarea
                      name="notes"
                      value={customerData.notes}
                      onChange={handleInputChange}
                      placeholder="Instrucciones especiales para la entrega..."
                      rows={3}
                    />
                  </FormControl>
                </VStack>
              </Box>

              <Box bg="white" p="6" borderRadius="lg" boxShadow="sm" borderWidth="1px" borderColor="gray.200">
                <Heading size="md" mb="4" color="gray.800">
                  Método de Pago
                </Heading>
                <VStack spacing="4" align="stretch">
                  <Box
                    p="4"
                    borderWidth="2px"
                    borderColor="cyan.500"
                    borderRadius="md"
                    bg="cyan.50"
                  >
                    <HStack spacing="3">
                      <Box
                        w="40px"
                        h="40px"
                        bg="cyan.500"
                        borderRadius="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="white"
                        fontWeight="bold"
                      >
                        ✓
                      </Box>
                      <VStack align="flex-start" spacing="1" flex="1">
                        <Text fontWeight="bold" fontSize="md">
                          Webpay
                        </Text>
                        <Text fontSize="sm" color="gray.600">
                          Pago seguro con tarjetas de crédito y débito
                        </Text>
                        <Text fontSize="xs" color="gray.500" mt="2">
                          Serás redirigido a Webpay para completar el pago de forma segura
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                  <Alert status="info" borderRadius="md" fontSize="sm">
                    <AlertIcon />
                    <Text>
                      Aceptamos todas las tarjetas de crédito y débito a través de Webpay
                    </Text>
                  </Alert>
                </VStack>
              </Box>
            </VStack>

            {/* Resumen del Pedido */}
            <VStack spacing="6" align="stretch">
              <Box bg="white" p="6" borderRadius="lg" boxShadow="sm" position="sticky" top="120px" borderWidth="1px" borderColor="gray.200">
                <Heading size="md" mb="4" color="gray.800">
                  Resumen del Pedido
                </Heading>
                <VStack spacing="4" align="stretch">
                  {items.map((item) => {
                    const itemPrice = item.product.originalPrice || item.product.price
                    return (
                      <HStack key={item.product.id} justify="space-between">
                        <VStack align="flex-start" spacing="0">
                          <Text fontSize="sm" fontWeight="semibold">
                            {item.product.name}
                          </Text>
                          <Text fontSize="xs" color="gray.600">
                            Cantidad: {item.quantity}
                          </Text>
                        </VStack>
                        <Text fontSize="sm" fontWeight="bold">
                          {formatPrice(itemPrice * item.quantity)}
                        </Text>
                      </HStack>
                    )
                  })}
                  <Divider />
                  <HStack justify="space-between">
                    <Text fontSize="lg" fontWeight="bold">
                      Total:
                    </Text>
                    <Text fontSize="xl" fontWeight="bold" color="blue.900">
                      {formatPrice(totalPrice)}
                    </Text>
                  </HStack>
                </VStack>

                <Button
                  type="submit"
                  colorScheme="cyan"
                  size="lg"
                  w="100%"
                  mt="6"
                  isLoading={isProcessing}
                  loadingText="Procesando..."
                  isDisabled={!customerData.name || !customerData.email || !customerData.phone || !customerData.address}
                >
                  Pagar con Webpay
                </Button>

                <Box mt="4" p="4" bg="gray.50" borderRadius="md" borderWidth="1px" borderColor="gray.200">
                  <VStack align="flex-start" spacing="2">
                    <Text fontSize="sm" fontWeight="semibold" color="gray.700">
                      Resumen de tu pedido:
                    </Text>
                    <VStack align="flex-start" spacing="1" fontSize="xs" color="gray.600">
                      <Text>• {items.length} {items.length === 1 ? 'producto' : 'productos'}</Text>
                      <Text>• Total: {formatPrice(totalPrice)}</Text>
                      <Text>• Método: Webpay (Tarjetas de crédito/débito)</Text>
                    </VStack>
                  </VStack>
                </Box>
                
                <Alert status="info" mt="4" borderRadius="md">
                  <AlertIcon />
                  <Text fontSize="sm">
                    Al hacer clic en &quot;Pagar con Webpay&quot;, serás redirigido a la plataforma segura de Webpay para completar tu pago.
                  </Text>
                </Alert>
              </Box>
            </VStack>
          </SimpleGrid>
        </form>
      </Container>
      <Footer />
    </Box>
  )
}

