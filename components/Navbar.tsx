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
} from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import { useState } from 'react'

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeLink, setActiveLink] = useState('INICIO')

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Lógica de búsqueda aquí
    console.log('Buscando:', searchQuery)
  }

  const scrollToSection = (id: string) => {
    const sectionId = id === 'INICIO' ? 'inicio' : id.toLowerCase()
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
    setActiveLink(id)
  }

  return (
    <Box position="fixed" top="0" left="0" right="0" zIndex="1000" bg="white">
      {/* Top Bar - Dark Blue */}
      <Box bg="blue.900" py="2">
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
                <Text>Paracotos 1201, Miranda, Venezuela</Text>
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
      <Box bg="white" borderBottom="1px solid" borderColor="gray.200" py="4">
        <Container maxW="container.xl">
          <Flex
            justify="space-between"
            align="center"
            flexWrap="wrap"
            gap="4"
          >
            {/* Logo */}
            <HStack spacing="3">
              <Box
                position="relative"
                w="40px"
                h="40px"
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
                size="lg"
                fontWeight="bold"
                letterSpacing="tight"
                textTransform="uppercase"
              >
                <Text as="span" color="blue.600">VITRI</Text>
                <Text as="span" color="gray.900">GLASS</Text>
              </Heading>
            </HStack>

            {/* Navigation Links */}
            <HStack
              spacing="8"
              display={{ base: 'none', md: 'flex' }}
            >
              <Link
                onClick={() => scrollToSection('INICIO')}
                fontWeight="semibold"
                color={activeLink === 'INICIO' ? 'gray.900' : 'gray.600'}
                position="relative"
                _hover={{ color: 'gray.900' }}
                cursor="pointer"
                textTransform="uppercase"
                fontSize="sm"
              >
                INICIO
                {activeLink === 'INICIO' && (
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
                onClick={() => scrollToSection('NOSOTROS')}
                fontWeight="semibold"
                color={activeLink === 'NOSOTROS' ? 'gray.900' : 'gray.600'}
                _hover={{ color: 'gray.900' }}
                cursor="pointer"
                textTransform="uppercase"
                fontSize="sm"
              >
                NOSOTROS
              </Link>
              <Link
                onClick={() => scrollToSection('SERVICIOS')}
                fontWeight="semibold"
                color={activeLink === 'SERVICIOS' ? 'gray.900' : 'gray.600'}
                _hover={{ color: 'gray.900' }}
                cursor="pointer"
                textTransform="uppercase"
                fontSize="sm"
              >
                ¿QUÉ HACEMOS?
              </Link>
              <Link
                onClick={() => scrollToSection('GALERIA')}
                fontWeight="semibold"
                color={activeLink === 'GALERIA' ? 'gray.900' : 'gray.600'}
                _hover={{ color: 'gray.900' }}
                cursor="pointer"
                textTransform="uppercase"
                fontSize="sm"
              >
                GALERÍA
              </Link>
              <Link
                onClick={() => scrollToSection('GALERIA')}
                fontWeight="semibold"
                color={activeLink === 'GALERIA' ? 'gray.900' : 'gray.600'}
                _hover={{ color: 'gray.900' }}
                cursor="pointer"
                textTransform="uppercase"
                fontSize="sm"
              >
                GALERÍA
              </Link>
              <Link
                onClick={() => scrollToSection('CONTACTO')}
                fontWeight="semibold"
                color={activeLink === 'CONTACTO' ? 'gray.900' : 'gray.600'}
                _hover={{ color: 'gray.900' }}
                cursor="pointer"
                textTransform="uppercase"
                fontSize="sm"
              >
                CONTACTO
              </Link>
            </HStack>

            {/* Search Bar */}
            <Box flex="1" maxW="300px" display={{ base: 'none', lg: 'block' }}>
              <form onSubmit={handleSearch}>
                <InputGroup size="sm">
                  <Input
                    placeholder="Type and hit enter..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}
