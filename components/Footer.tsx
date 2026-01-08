'use client'

import { Box, Container, Heading, Text, VStack, HStack, Flex, Divider, Link } from '@chakra-ui/react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'

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
              ARTECRISTAL
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
                Ventanas de PVC y Aluminio
              </Text>
              <Text color="gray.400" _hover={{ color: 'white' }} cursor="pointer">
                Shower o Mamparas
              </Text>
              <Text color="gray.400" _hover={{ color: 'white' }} cursor="pointer">
                Cierres y Barandas
              </Text>
              <Text color="gray.400" _hover={{ color: 'white' }} cursor="pointer">
                Espejos
              </Text>
              <Text color="gray.400" _hover={{ color: 'white' }} cursor="pointer">
                Arquitectura
              </Text>
            </VStack>
          </VStack>
          
          <VStack align="start" spacing="4">
            <Heading size="md" color="white">
              Contacto
            </Heading>
            <VStack align="start" spacing="2">
              <HStack
                as={Link}
                href="tel:+56949932178"
                _hover={{ color: 'white', transform: 'translateX(4px)' }}
                transition="all 0.2s"
                cursor="pointer"
              >
                <FaPhone fontSize="14px" />
                <Text color="gray.400">+56949932178</Text>
              </HStack>
              <HStack
                as={Link}
                href="mailto:Artecristales@gmail.com"
                _hover={{ color: 'white', transform: 'translateX(4px)' }}
                transition="all 0.2s"
                cursor="pointer"
              >
                <FaEnvelope fontSize="14px" />
                <Text color="gray.400">Artecristales@gmail.com</Text>
              </HStack>
              <HStack
                as={Link}
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Coronel souper 4400, Estación Central, Chile')}`}
                target="_blank"
                rel="noopener noreferrer"
                _hover={{ color: 'white', transform: 'translateX(4px)' }}
                transition="all 0.2s"
                cursor="pointer"
              >
                <FaMapMarkerAlt fontSize="14px" />
                <Text color="gray.400">Coronel souper 4400 - Estacion central</Text>
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
            © 2026 ARTECRISTAL. Todos los derechos reservados.
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

