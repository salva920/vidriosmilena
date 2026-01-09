'use client'

import {
  Box,
  Container,
  Flex,
  HStack,
  Text,
  IconButton,
  Link,
  Heading,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  useDisclosure,
  Button,
  Image,
} from '@chakra-ui/react'
import { FiMenu } from 'react-icons/fi'
import { FaInstagram, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import { useState } from 'react'

interface NavbarProps {
  onOpenModal?: () => void
}

export default function Navbar({ onOpenModal }: NavbarProps) {
  const [activeLink, setActiveLink] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const scrollToSection = (id: string) => {
    // Mapear los IDs correctamente según las secciones existentes
    const sectionMap: Record<string, string> = {
      
      'ARQUITECTURA': 'arquitectura',
      'VENTANAS': 'ventanas',
      'CIERRES': 'cierres',
      'ESPEJOS': 'espejos',
      'CONTACTO': 'contact',
      'NOSOTROS': 'nosotros'
    }
    
    const sectionId = sectionMap[id] || id.toLowerCase()
    const section = document.getElementById(sectionId)
    if (section) {
      // Ajustar el scroll para compensar el navbar fijo
      const yOffset = -120
      const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
    setActiveLink(id)
    onClose() // Cerrar el drawer en mobile después de hacer clic
  }

  return (
    <Box position="fixed" top="0" left="0" right="0" zIndex="1000" bg="white">
      {/* Top Bar - Dark Blue */}
      <Box bg="blue.900" py={{ base: '1', md: '2' }} display={{ base: 'none', md: 'block' }}>
        <Container maxW="container.xl">
          <Flex
            justify="space-between"
            align="center"
            fontSize="sm"
            color="white"
            flexWrap="wrap"
            gap="4"
          >
            <HStack spacing="6">
              <HStack
                as={Link}
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Coronel souper 4400, Estación Central, Chile')}`}
                target="_blank"
                rel="noopener noreferrer"
                spacing="2"
                _hover={{ opacity: 0.8, transform: 'translateX(4px)' }}
                transition="all 0.2s"
                cursor="pointer"
              >
                <FaMapMarkerAlt fontSize="18px" />
                <Text>Coronel souper 4400 - Estacion central</Text>
              </HStack>
              <HStack
                as={Link}
                href="tel:+56949932178"
                spacing="2"
                _hover={{ opacity: 0.8, transform: 'translateX(4px)' }}
                transition="all 0.2s"
                cursor="pointer"
              >
                <FaPhone fontSize="18px" />
                <Text>+56949932178</Text>
              </HStack>
            </HStack>
            
            <HStack spacing="4">
              <Link
                href="https://www.instagram.com/artecristal.spa?igsh=MTFzb3B1bWtqOXFqdw=="
                target="_blank"
                rel="noopener noreferrer"
                fontSize="xl"
                _hover={{ color: 'blue.300', transform: 'scale(1.1)' }}
                transition="all 0.2s"
              >
                <FaInstagram />
              </Link>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Bottom Bar - White */}
      <Box bg="white" borderBottom="1px solid" borderColor="gray.200" py={{ base: '3', md: '4' }}>
        <Container maxW="container.xl">
          <Flex
            justify="space-between"
            align="center"
            flexWrap="nowrap"
            gap="4"
          >
            {/* Logo */}
            <Box flexShrink={0}>
              <Image
                src="/logo.png"
                alt="Logo ARTECRISTAL"
                h={{ base: '80px', md: '100px', lg: '120px' }}
                w="auto"
                maxW={{ base: '200px', md: '250px', lg: '300px' }}
                objectFit="contain"
                cursor="pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              />
            </Box>

            {/* Navigation Links - Desktop */}
            <HStack
              spacing={{ base: '4', md: '6', lg: '8' }}
              display={{ base: 'none', md: 'flex' }}
              flex="1"
              justify="center"
              flexWrap="wrap"
            >
              <Link
                onClick={() => scrollToSection('NOSOTROS')}
                fontWeight="semibold"
                color={activeLink === 'NOSOTROS' ? 'gray.900' : 'gray.600'}
                position="relative"
                _hover={{ color: 'gray.900' }}
                cursor="pointer"
                textTransform="uppercase"
                fontSize="sm"
              >
                NOSOTROS
                {activeLink === 'NOSOTROS' && (
                  <Box
                    position="absolute"
                    bottom="-8px"
                    left="0"
                    right="0"
                    h="2px"
                    bg="red.500"
                  />
                )}
              </Link>
              <Link
                onClick={() => scrollToSection('ARQUITECTURA')}
                fontWeight="semibold"
                color={activeLink === 'ARQUITECTURA' ? 'gray.900' : 'gray.600'}
                position="relative"
                _hover={{ color: 'gray.900' }}
                cursor="pointer"
                textTransform="uppercase"
                fontSize="sm"
              >
                ARQUITECTURA
                {activeLink === 'ARQUITECTURA' && (
                  <Box
                    position="absolute"
                    bottom="-8px"
                    left="0"
                    right="0"
                    h="2px"
                    bg="red.500"
                  />
                )}
              </Link>
              <Link
                onClick={() => scrollToSection('VENTANAS')}
                fontWeight="semibold"
                color={activeLink === 'VENTANAS' ? 'gray.900' : 'gray.600'}
                position="relative"
                _hover={{ color: 'gray.900' }}
                cursor="pointer"
                textTransform="uppercase"
                fontSize="sm"
              >
                VENTANAS
                {activeLink === 'VENTANAS' && (
                  <Box
                    position="absolute"
                    bottom="-8px"
                    left="0"
                    right="0"
                    h="2px"
                    bg="red.500"
                  />
                )}
              </Link>
              <Link
                onClick={() => scrollToSection('CIERRES')}
                fontWeight="semibold"
                color={activeLink === 'CIERRES' ? 'gray.900' : 'gray.600'}
                position="relative"
                _hover={{ color: 'gray.900' }}
                cursor="pointer"
                textTransform="uppercase"
                fontSize="sm"
              >
                CIERRES
                {activeLink === 'CIERRES' && (
                  <Box
                    position="absolute"
                    bottom="-8px"
                    left="0"
                    right="0"
                    h="2px"
                    bg="red.500"
                  />
                )}
              </Link>
              <Link
                onClick={() => scrollToSection('ESPEJOS')}
                fontWeight="semibold"
                color={activeLink === 'ESPEJOS' ? 'gray.900' : 'gray.600'}
                position="relative"
                _hover={{ color: 'gray.900' }}
                cursor="pointer"
                textTransform="uppercase"
                fontSize="sm"
              >
                ESPEJOS
                {activeLink === 'ESPEJOS' && (
                  <Box
                    position="absolute"
                    bottom="-8px"
                    left="0"
                    right="0"
                    h="2px"
                    bg="red.500"
                  />
                )}
              </Link>
              <Link
                onClick={() => scrollToSection('CONTACTO')}
                fontWeight="semibold"
                color={activeLink === 'CONTACTO' ? 'gray.900' : 'gray.600'}
                position="relative"
                _hover={{ color: 'gray.900' }}
                cursor="pointer"
                textTransform="uppercase"
                fontSize="sm"
              >
                CONTACTO
                {activeLink === 'CONTACTO' && (
                  <Box
                    position="absolute"
                    bottom="-8px"
                    left="0"
                    right="0"
                    h="2px"
                    bg="red.500"
                  />
                )}
              </Link>
            </HStack>

            {/* Cotiza Button - Desktop */}
            <Button
              onClick={() => {
                onOpenModal?.()
                onClose() // Cerrar el drawer si está abierto
              }}
              bg="cyan.500"
              color="white"
              fontWeight="bold"
              textTransform="uppercase"
              fontSize="sm"
              px={{ base: '4', md: '6' }}
              py="6"
              borderRadius="md"
              boxShadow="0 4px 14px rgba(6, 182, 212, 0.4)"
              _hover={{
                bg: 'cyan.600',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(6, 182, 212, 0.5)'
              }}
              _active={{
                bg: 'cyan.700',
                transform: 'translateY(0px)',
                boxShadow: '0 2px 10px rgba(6, 182, 212, 0.4)'
              }}
              transition="all 0.2s ease"
              display={{ base: 'none', md: 'flex' }}
            >
              Cotiza
            </Button>

            {/* Mobile Menu Button */}
            <IconButton
              aria-label="Abrir menú"
              icon={<FiMenu />}
              variant="ghost"
              size="md"
              display={{ base: 'flex', md: 'none' }}
              onClick={onOpen}
              color="gray.700"
            />
          </Flex>
        </Container>
      </Box>

      {/* Mobile Drawer Menu */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            <Image
              src="/logo.png"
              alt="Logo ARTECRISTAL"
              h="99px"
              w="auto"
              maxW="200px"
              objectFit="contain"
            />
          </DrawerHeader>

          <DrawerBody pt="6">
            <VStack spacing="4" align="stretch">
              <Button
                variant="ghost"
                justifyContent="flex-start"
                fontWeight="semibold"
                color={activeLink === 'NOSOTROS' ? 'blue.600' : 'gray.700'}
                onClick={() => scrollToSection('NOSOTROS')}
                textTransform="uppercase"
                fontSize="sm"
                _hover={{ bg: 'gray.100', color: 'blue.600' }}
              >
                NOSOTROS
              </Button>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                fontWeight="semibold"
                color={activeLink === 'ARQUITECTURA' ? 'blue.600' : 'gray.700'}
                onClick={() => scrollToSection('ARQUITECTURA')}
                textTransform="uppercase"
                fontSize="sm"
                _hover={{ bg: 'gray.100', color: 'blue.600' }}
              >
                ARQUITECTURA
              </Button>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                fontWeight="semibold"
                color={activeLink === 'VENTANAS' ? 'blue.600' : 'gray.700'}
                onClick={() => scrollToSection('VENTANAS')}
                textTransform="uppercase"
                fontSize="sm"
                _hover={{ bg: 'gray.100', color: 'blue.600' }}
              >
                VENTANAS
              </Button>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                fontWeight="semibold"
                color={activeLink === 'CIERRES' ? 'blue.600' : 'gray.700'}
                onClick={() => scrollToSection('CIERRES')}
                textTransform="uppercase"
                fontSize="sm"
                _hover={{ bg: 'gray.100', color: 'blue.600' }}
              >
                CIERRES
              </Button>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                fontWeight="semibold"
                color={activeLink === 'ESPEJOS' ? 'blue.600' : 'gray.700'}
                onClick={() => scrollToSection('ESPEJOS')}
                textTransform="uppercase"
                fontSize="sm"
                _hover={{ bg: 'gray.100', color: 'blue.600' }}
              >
                ESPEJOS
              </Button>
              <Button
                variant="ghost"
                justifyContent="flex-start"
                fontWeight="semibold"
                color={activeLink === 'CONTACTO' ? 'blue.600' : 'gray.700'}
                onClick={() => scrollToSection('CONTACTO')}
                textTransform="uppercase"
                fontSize="sm"
                _hover={{ bg: 'gray.100', color: 'blue.600' }}
              >
                CONTACTO
              </Button>

              {/* Cotiza Button - Mobile */}
              <Button
                onClick={() => {
                  onOpenModal?.()
                  onClose() // Cerrar el drawer
                }}
                bg="cyan.500"
                color="white"
                fontWeight="bold"
                textTransform="uppercase"
                fontSize="sm"
                w="100%"
                py="6"
                borderRadius="md"
                mt="4"
                boxShadow="0 4px 14px rgba(6, 182, 212, 0.4)"
                _hover={{
                  bg: 'cyan.600',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(6, 182, 212, 0.5)'
                }}
                _active={{
                  bg: 'cyan.700',
                  transform: 'translateY(0px)',
                  boxShadow: '0 2px 10px rgba(6, 182, 212, 0.4)'
                }}
                transition="all 0.2s ease"
              >
                Cotiza
              </Button>

              {/* Contact Info in Mobile Menu */}
              <Box pt="6" borderTopWidth="1px" borderColor="gray.200">
                <VStack spacing="3" align="stretch">
                  <HStack
                    as={Link}
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Coronel souper 4400, Estación Central, Chile')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    spacing="2"
                    _hover={{ color: 'blue.600', transform: 'translateX(4px)' }}
                    transition="all 0.2s"
                    cursor="pointer"
                  >
                    <FaMapMarkerAlt fontSize="18px" color="red.500" />
                    <Text fontSize="sm" color="gray.600">
                      Coronel souper 4400 - Estacion central
                    </Text>
                  </HStack>
                  <HStack
                    as={Link}
                    href="tel:+56949932178"
                    spacing="2"
                    _hover={{ color: 'blue.600', transform: 'translateX(4px)' }}
                    transition="all 0.2s"
                    cursor="pointer"
                  >
                    <FaPhone fontSize="18px" color="red.500" />
                    <Text fontSize="sm" color="gray.600">
                      +56949932178
                    </Text>
                  </HStack>
                  <HStack spacing="4" pt="2">
                    <Link
                      href="https://www.instagram.com/artecristal.spa?igsh=MTFzb3B1bWtqOXFqdw=="
                      target="_blank"
                      rel="noopener noreferrer"
                      fontSize="xl"
                      color="blue.600"
                      _hover={{ color: 'blue.700', transform: 'scale(1.1)' }}
                      transition="all 0.2s"
                    >
                      <FaInstagram />
                    </Link>
                  </HStack>
                </VStack>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}
