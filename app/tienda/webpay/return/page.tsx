'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Button,
  Alert,
  AlertIcon,
  Spinner,
} from '@chakra-ui/react'
import StoreNavbar from '@/components/store/StoreNavbar'
import Footer from '@/components/Footer'

export default function WebpayReturnPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const token = searchParams.get('token_ws')
    
    if (!token) {
      setStatus('error')
      setMessage('No se recibió el token de Webpay')
      return
    }

    // Confirmar la transacción con Webpay
    const confirmTransaction = async () => {
      try {
        const response = await fetch('/api/webpay/confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        })

        const data = await response.json()

        if (data.status === 'AUTHORIZED') {
          setStatus('success')
          setMessage('¡Pago realizado exitosamente!')
          
          // Limpiar el carrito
          // Esto se haría desde el contexto del carrito
          
          // Redirigir después de 3 segundos
          setTimeout(() => {
            router.push('/tienda/webpay/success')
          }, 3000)
        } else {
          setStatus('error')
          setMessage(data.message || 'El pago fue rechazado')
        }
      } catch (error) {
        console.error('Error al confirmar transacción:', error)
        setStatus('error')
        setMessage('Error al procesar la respuesta de Webpay')
      }
    }

    confirmTransaction()
  }, [searchParams, router])

  return (
    <Box minH="100vh" bg="gray.50">
      <StoreNavbar />
      <Container maxW="container.md" py="16">
        <VStack spacing="6">
          {status === 'loading' && (
            <>
              <Spinner size="xl" color="cyan.500" />
              <Heading>Procesando pago...</Heading>
              <Text color="gray.600">Por favor, espera mientras confirmamos tu pago.</Text>
            </>
          )}

          {status === 'success' && (
            <>
              <Alert status="success" borderRadius="md">
                <AlertIcon />
                <VStack align="flex-start" spacing="2">
                  <Text fontWeight="bold">¡Pago exitoso!</Text>
                  <Text fontSize="sm">{message}</Text>
                </VStack>
              </Alert>
              <Text color="gray.600">Redirigiendo...</Text>
            </>
          )}

          {status === 'error' && (
            <>
              <Alert status="error" borderRadius="md">
                <AlertIcon />
                <VStack align="flex-start" spacing="2">
                  <Text fontWeight="bold">Error en el pago</Text>
                  <Text fontSize="sm">{message}</Text>
                </VStack>
              </Alert>
              <Button colorScheme="cyan" onClick={() => router.push('/tienda/checkout')}>
                Intentar nuevamente
              </Button>
              <Button variant="ghost" onClick={() => router.push('/tienda')}>
                Volver a la tienda
              </Button>
            </>
          )}
        </VStack>
      </Container>
      <Footer />
    </Box>
  )
}

