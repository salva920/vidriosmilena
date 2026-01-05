'use client'

import {
  Box,
  Container,
  Flex,
  HStack,
  Text,
  Input,
  InputGroup,
  InputRightElement,
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
} from '@chakra-ui/react'
import { FiSearch, FiMenu } from 'react-icons/fi'
import { useState } from 'react'

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeLink, setActiveLink] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Lógica de búsqueda aquí
    console.log('Buscando:', searchQuery)
  }

  const scrollToSection = (id: string) => {
    // Mapear los IDs correctamente según las secciones existentes
    const sectionMap: Record<string, string> = {
      'NOSOTROS': 'nosotros',
      'SERVICIOS': 'servicios',
      'CONTACTO': 'contact'
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
              <HStack spacing="2">
                <Text fontSize="lg" color="red.500">📍</Text>
                <Text>Maipu, Santiago, Chile</Text>
              </HStack>
              <HStack spacing="2">
                <Text fontSize="lg" color="red.500">📞</Text>
                <Text>+58 (412) 239 0689</Text>
              </HStack>
            </HStack>
            
            <HStack spacing="4">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                fontSize="xl"
                _hover={{ color: 'blue.300' }}
              >
                f
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                fontSize="xl"
                _hover={{ color: 'blue.300' }}
              >
                📷
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
            <HStack spacing={{ base: '2', md: '3' }} flexShrink={0}>
              <Box
                position="relative"
                w={{ base: '32px', md: '40px' }}
                h={{ base: '32px', md: '40px' }}
              >
                {/* Logo geométrico rojo y azul */}
                <Box
                  position="absolute"
                  w="100%"
                  h="100%"
                  bgGradient="linear(to-br, red.500, blue.500)"
                  clipPath="polygon(0 0, 100% 0, 50% 100%)"
                  borderRadius="sm"
                />
              </Box>
              <Heading
                size={{ base: 'md', md: 'lg' }}
                fontWeight="bold"
                letterSpacing="tight"
                textTransform="uppercase"
                display={{ base: 'none', sm: 'block' }}
              >
                <Text as="span" color="blue.600">MILE</Text>
                <Text as="span" color="gray.900">GLASS</Text>
              </Heading>
            </HStack>

            {/* Navigation Links - Desktop */}
            <HStack
              spacing="8"
              display={{ base: 'none', md: 'flex' }}
              flex="1"
              justify="center"
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
                onClick={() => scrollToSection('SERVICIOS')}
                fontWeight="semibold"
                color={activeLink === 'SERVICIOS' ? 'gray.900' : 'gray.600'}
                position="relative"
                _hover={{ color: 'gray.900' }}
                cursor="pointer"
                textTransform="uppercase"
                fontSize="sm"
              >
                ¿QUÉ HACEMOS?
                {activeLink === 'SERVICIOS' && (
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

            {/* Search Bar - Desktop */}
            <Box flex="1" maxW="300px" display={{ base: 'none', lg: 'block' }}>
              <form onSubmit={handleSearch}>
                <InputGroup size="sm">
                  <Input
                    placeholder="Type and hit enter..."
                    value={searchQuery}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                    borderRadius="md"
                    borderColor="gray.300"
                    _focus={{ borderColor: 'blue.500', boxShadow: 'none' }}
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label="Buscar"
                      icon={<FiSearch />}
                      size="sm"
                      variant="ghost"
                      type="submit"
                      color="gray.600"
                      _hover={{ color: 'blue.500' }}
                    />
                  </InputRightElement>
                </InputGroup>
              </form>
            </Box>

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
            <HStack spacing="2">
              <Box
                position="relative"
                w="32px"
                h="32px"
              >
                <Box
                  position="absolute"
                  w="100%"
                  h="100%"
                  bgGradient="linear(to-br, red.500, blue.500)"
                  clipPath="polygon(0 0, 100% 0, 50% 100%)"
                  borderRadius="sm"
                />
              </Box>
              <Heading size="md" fontWeight="bold" letterSpacing="tight" textTransform="uppercase">
                <Text as="span" color="blue.600">MILE</Text>
                <Text as="span" color="gray.900">GLASS</Text>
              </Heading>
            </HStack>
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
                color={activeLink === 'SERVICIOS' ? 'blue.600' : 'gray.700'}
                onClick={() => scrollToSection('SERVICIOS')}
                textTransform="uppercase"
                fontSize="sm"
                _hover={{ bg: 'gray.100', color: 'blue.600' }}
              >
                ¿QUÉ HACEMOS?
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

              {/* Contact Info in Mobile Menu */}
              <Box pt="6" borderTopWidth="1px" borderColor="gray.200">
                <VStack spacing="3" align="stretch">
                  <HStack spacing="2">
                    <Text fontSize="lg" color="red.500">📍</Text>
                    <Text fontSize="sm" color="gray.600">
                      Paracotos 1201, Miranda, Venezuela
                    </Text>
                  </HStack>
                  <HStack spacing="2">
                    <Text fontSize="lg" color="red.500">📞</Text>
                    <Text fontSize="sm" color="gray.600">
                      +58 (412) 239 0689
                    </Text>
                  </HStack>
                  <HStack spacing="4" pt="2">
                    <Link
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      fontSize="xl"
                      color="blue.600"
                      _hover={{ color: 'blue.700' }}
                    >
                      f
                    </Link>
                    <Link
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      fontSize="xl"
                      color="blue.600"
                      _hover={{ color: 'blue.700' }}
                    >
                      📷
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
