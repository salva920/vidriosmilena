'use client'

import { Box, Container, Heading, Text, VStack, HStack, Flex, Divider } from '@chakra-ui/react'

export default function Footer() {
  return (
    <Box bg="gray.900" color="white" py="12">
      <Container maxW="container.xl">
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          justify="space-between"
          align="start"
          gap="8"
        >
          <VStack align="start" spacing="4">
            <Heading size="lg" color="white">
              Vidrios Premium
            </Heading>
            <Text color="gray.400" maxW="300px">
              Especialistas en vidrios de alta calidad. 
              Transformamos tu espacio con productos y servicios profesionales.
            </Text>
            <HStack spacing="4">
              <Text fontSize="xl" cursor="pointer" _hover={{ color: 'blue.400' }}>📘</Text>
              <Text fontSize="xl" cursor="pointer" _hover={{ color: 'blue.400' }}>📷</Text>
              <Text fontSize="xl" cursor="pointer" _hover={{ color: 'blue.400' }}>🐦</Text>
            </HStack>
          </VStack>
          
          <VStack align="start" spacing="4">
            <Heading size="md" color="white">
              Servicios
            </Heading>
            <VStack align="start" spacing="2">
              <Text color="gray.400" _hover={{ color: 'white' }} cursor="pointer">
                Vidrios Templados
              </Text>
              <Text color="gray.400" _hover={{ color: 'white' }} cursor="pointer">
                Vidrios Laminados
              </Text>
              <Text color="gray.400" _hover={{ color: 'white' }} cursor="pointer">
                Espejos
              </Text>
              <Text color="gray.400" _hover={{ color: 'white' }} cursor="pointer">
                Instalación
              </Text>
            </VStack>
          </VStack>
          
          <VStack align="start" spacing="4">
            <Heading size="md" color="white">
              Contacto
            </Heading>
            <VStack align="start" spacing="2">
              <HStack>
                <Text fontSize="sm">📞</Text>
                <Text color="gray.400">+1 (555) 123-4567</Text>
              </HStack>
              <HStack>
                <Text fontSize="sm">✉️</Text>
                <Text color="gray.400">info@vidriospremium.com</Text>
              </HStack>
              <HStack>
                <Text fontSize="sm">📍</Text>
                <Text color="gray.400">Av. Principal 123, Ciudad</Text>
              </HStack>
            </VStack>
          </VStack>
        </Flex>
        
        <Divider my="8" borderColor="gray.700" />
        
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          gap="4"
        >
          <Text color="gray.400" fontSize="sm">
            © 2024 Vidrios Premium. Todos los derechos reservados.
          </Text>
          <HStack spacing="6">
            <Text color="gray.400" fontSize="sm" _hover={{ color: 'white' }} cursor="pointer">
              Política de Privacidad
            </Text>
            <Text color="gray.400" fontSize="sm" _hover={{ color: 'white' }} cursor="pointer">
              Términos de Servicio
            </Text>
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}

