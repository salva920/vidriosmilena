'use client'

import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Alert,
  AlertIcon,
  Icon,
} from '@chakra-ui/react'
import { FiCheckCircle } from 'react-icons/fi'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import StoreNavbar from '@/components/store/StoreNavbar'
import { useCart } from '@/contexts/CartContext'
import Footer from '@/components/Footer'

export default function WebpaySuccessPage() {
  const router = useRouter()
  const { clearCart } = useCart()

  // Limpiar el carrito cuando se carga la página de éxito
  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <Box minH="100vh" bg="gray.50">
      <StoreNavbar />
      <Container maxW="container.md" py="16">
        <VStack spacing="6">
          <Icon as={FiCheckCircle} boxSize="16" color="green.500" />
          <Heading size="xl" color="green.600">
            ¡Pago Realizado Exitosamente!
          </Heading>
          
          <Alert status="success" borderRadius="md">
            <AlertIcon />
            <VStack align="flex-start" spacing="2">
              <Text fontWeight="bold">Tu pedido ha sido confirmado</Text>
              <Text fontSize="sm">
                Recibirás un email de confirmación con los detalles de tu compra.
                Nos pondremos en contacto contigo pronto para coordinar la entrega.
              </Text>
            </VStack>
          </Alert>

          <VStack spacing="4" mt="8">
            <Button
              colorScheme="cyan"
              size="lg"
              onClick={() => router.push('/tienda')}
            >
              Continuar Comprando
            </Button>
            <Button
              variant="ghost"
              onClick={() => router.push('/')}
            >
              Volver al inicio
            </Button>
          </VStack>
        </VStack>
      </Container>
      <Footer />
    </Box>
  )
}

