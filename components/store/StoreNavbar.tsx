'use client'

import {
  Box,
  Container,
  Flex,
  HStack,
  Text,
  IconButton,
  Link as ChakraLink,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Badge,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react'
import { FiMenu, FiSearch, FiShoppingCart, FiHeart, FiChevronDown } from 'react-icons/fi'
import { FaPhone, FaMapMarkerAlt, FaInstagram, FaFacebook, FaPinterest } from 'react-icons/fa'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { useFavorites } from '@/contexts/FavoritesContext'
import { categories } from '@/data/products'
import ShoppingCart from './ShoppingCart'

export default function StoreNavbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const { isOpen: isMobileOpen, onOpen: onMobileOpen, onClose: onMobileClose } = useDisclosure()
  const { getItemCount, isOpen: cartIsOpen, openCart, closeCart } = useCart()
  const { favorites } = useFavorites()
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/tienda?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  const cartItemCount = getItemCount()

  return (
    <>
      <Box position="sticky" top="0" zIndex="1000" bg="white" boxShadow="sm" mb="0" pb="0">
        {/* Top Bar - Green */}
        <Box bg="green.500" py="1" display={{ base: 'none', md: 'block' }}>
          <Container maxW="container.xl">
            <Flex justify="center" align="center" fontSize="sm" color="white">
              <HStack spacing="2">
                <Text>🚚</Text>
                <Text>Envíos a todo Chile desde $9.990</Text>
              </HStack>
            </Flex>
          </Container>
        </Box>

        {/* Main Header - Dark Blue */}
        <Box bg="blue.900" py={{ base: '2', md: '3' }}>
          <Container maxW="container.xl">
            <Flex justify="space-between" align="center" gap={{ base: '2', md: '4' }} flexWrap="wrap">
              {/* Left: Tienda Empresas Button */}
              <Button
                as={Link}
                href="/"
                bg="yellow.50"
                color="blue.900"
                size="sm"
                fontSize="xs"
                fontWeight="bold"
                borderRadius="md"
                px="4"
                _hover={{ bg: 'yellow.100', transform: 'translateY(-1px)' }}
                transition="all 0.2s"
                display={{ base: 'none', md: 'flex' }}
              >
                TIENDA EMPRESAS
              </Button>

              {/* Center: Search Bar */}
              <Box flex="1" maxW={{ base: '100%', md: '450px', lg: '500px' }} order={{ base: 3, md: 2 }}>
                <form onSubmit={handleSearch}>
                  <InputGroup size="md">
                    <InputLeftElement pointerEvents="none" h="100%">
                      <FiSearch color="gray.400" size="18px" />
                    </InputLeftElement>
                    <Input
                      placeholder="¿Qué buscas hoy?"
                      bg="white"
                      value={searchQuery}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                      borderRadius="md"
                      h={{ base: '36px', md: '40px' }}
                      fontSize={{ base: 'sm', md: 'md' }}
                      _focus={{ borderColor: 'blue.400', boxShadow: '0 0 0 1px #3182CE' }}
                    />
                  </InputGroup>
                </form>
              </Box>

              {/* Right: Navigation Links & Actions */}
              <HStack spacing={{ base: '1', md: '3', lg: '4' }} display={{ base: 'none', md: 'flex' }} order={{ base: 2, md: 3 }}>
                {/* Navigation Links */}
                <HStack spacing={{ base: '2', md: '3', lg: '4' }} display={{ base: 'none', lg: 'flex' }}>
                  <ChakraLink 
                    as={Link} 
                    href="/tienda/proyectos" 
                    color="white" 
                    fontSize="sm"
                    fontWeight="medium"
                    _hover={{ textDecoration: 'underline', opacity: 0.9 }}
                    transition="all 0.2s"
                  >
                    NUESTROS PROYECTOS
                  </ChakraLink>
                  <ChakraLink 
                    as={Link} 
                    href="/tienda/nosotros" 
                    color="white" 
                    fontSize="sm"
                    fontWeight="medium"
                    _hover={{ textDecoration: 'underline', opacity: 0.9 }}
                    transition="all 0.2s"
                  >
                    QUIENES SOMOS
                  </ChakraLink>
                  <ChakraLink 
                    as={Link} 
                    href="/tienda/ayuda" 
                    color="white" 
                    fontSize="sm"
                    fontWeight="medium"
                    _hover={{ textDecoration: 'underline', opacity: 0.9 }}
                    transition="all 0.2s"
                  >
                    CENTRO DE AYUDA
                  </ChakraLink>
                </HStack>

                {/* Separator */}
                <Box 
                  w="1px" 
                  h="24px" 
                  bg="rgba(255,255,255,0.3)" 
                  display={{ base: 'none', lg: 'block' }}
                />

                {/* Social Icons */}
                <HStack spacing="2">
                  <IconButton
                    as="a"
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    icon={<FaFacebook size="16px" />}
                    size="md"
                    bg="green.600"
                    color="white"
                    borderRadius="full"
                    _hover={{ bg: 'green.700', transform: 'scale(1.1)' }}
                    transition="all 0.2s"
                  />
                  <IconButton
                    as="a"
                    href="https://www.pinterest.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Pinterest"
                    icon={<FaPinterest size="16px" />}
                    size="md"
                    bg="blue.600"
                    color="white"
                    borderRadius="full"
                    _hover={{ bg: 'blue.700', transform: 'scale(1.1)' }}
                    transition="all 0.2s"
                  />
                  <IconButton
                    as="a"
                    href="https://www.instagram.com/artecristal.spa?igsh=MTFzb3B1bWtqOXFqdw=="
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    icon={<FaInstagram size="16px" />}
                    size="md"
                    bg="pink.500"
                    color="white"
                    borderRadius="full"
                    _hover={{ bg: 'pink.600', transform: 'scale(1.1)' }}
                    transition="all 0.2s"
                  />
                </HStack>

                {/* Separator */}
                <Box 
                  w="1px" 
                  h="24px" 
                  bg="rgba(255,255,255,0.3)" 
                />

                {/* Cotizar Button */}
                <Button
                  as="a"
                  href="https://wa.me/56949932178"
                  target="_blank"
                  rel="noopener noreferrer"
                  bg="red.500"
                  color="white"
                  size="sm"
                  fontSize="xs"
                  fontWeight="bold"
                  borderRadius="md"
                  px="4"
                  _hover={{ bg: 'red.600', transform: 'translateY(-1px)', boxShadow: 'md' }}
                  transition="all 0.2s"
                >
                  Cotizar
                </Button>

                {/* Cart Icon */}
                <IconButton
                  aria-label="Carrito de compras"
                  icon={<FiShoppingCart size="18px" />}
                  size="md"
                  bg="transparent"
                  color="white"
                  position="relative"
                  onClick={openCart}
                  _hover={{ bg: 'blue.800', transform: 'scale(1.1)' }}
                  transition="all 0.2s"
                >
                  {cartItemCount > 0 && (
                    <Badge
                      position="absolute"
                      top="-1"
                      right="-1"
                      bg="red.500"
                      color="white"
                      borderRadius="full"
                      fontSize="xs"
                      minW="20px"
                      h="20px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontWeight="bold"
                    >
                      {cartItemCount}
                    </Badge>
                  )}
                </IconButton>

                {/* Location Icon */}
                <IconButton
                  as="a"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Coronel souper 4400, Estación Central, Chile')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ubicación"
                  icon={<FaMapMarkerAlt size="18px" />}
                  size="md"
                  bg="transparent"
                  color="white"
                  _hover={{ bg: 'blue.800', transform: 'scale(1.1)' }}
                  transition="all 0.2s"
                />
              </HStack>

              {/* Mobile Menu Button */}
              <IconButton
                aria-label="Menú"
                icon={<FiMenu size="20px" />}
                display={{ base: 'flex', md: 'none' }}
                color="white"
                bg="transparent"
                size="md"
                onClick={onMobileOpen}
                _hover={{ bg: 'blue.800' }}
                order={{ base: 1, md: 4 }}
              />
            </Flex>
          </Container>
        </Box>

        {/* Secondary Navigation - White */}
        <Box bg="white" borderBottom="1px" borderColor="gray.200" boxShadow="sm">
          <Container maxW="container.xl">
            <Flex justify="space-between" align="center" py={{ base: '2', md: '3' }}>
              {/* Logo */}
              <ChakraLink 
                as={Link} 
                href="/tienda" 
                style={{ textDecoration: 'none' }}
                _hover={{ opacity: 0.8 }}
                transition="opacity 0.2s"
              >
                <Heading 
                  size={{ base: 'sm', md: 'md' }} 
                  color="blue.900" 
                  fontWeight="bold"
                  letterSpacing="wide"
                >
                  ARTECRISTAL
                </Heading>
              </ChakraLink>

              {/* Category Links */}
              <HStack spacing={{ base: '2', md: '4', lg: '6' }} display={{ base: 'none', lg: 'flex' }} flexWrap="wrap">
                {categories.map((category) => (
                  <Menu key={category.id}>
                    <MenuButton
                      as={Button}
                      rightIcon={<FiChevronDown size="14px" />}
                      variant="ghost"
                      color="gray.700"
                      fontWeight="medium"
                      fontSize="sm"
                      px="3"
                      py="2"
                      _hover={{ color: 'blue.600', bg: 'blue.50' }}
                      _active={{ bg: 'blue.100' }}
                      transition="all 0.2s"
                    >
                      {category.name}
                    </MenuButton>
                    <MenuList>
                      {category.slug === 'banos' ? (
                        <>
                          <MenuItem as={Link} href="/tienda/banos?tipo=mamparas">
                            Mamparas
                          </MenuItem>
                          <MenuItem as={Link} href="/tienda/banos?tipo=espejos">
                            Espejos
                          </MenuItem>
                          <MenuItem as={Link} href="/tienda/banos?tipo=espejos-led">
                            Espejos LED
                          </MenuItem>
                          <MenuItem as={Link} href={`/tienda/${category.slug}`}>
                            Ver todos los productos
                          </MenuItem>
                        </>
                      ) : category.slug === 'habitaciones-oficinas' ? (
                        <>
                          <MenuItem as={Link} href="/tienda/habitaciones-oficinas?subcategoria=cubiertas">
                            Cubiertas
                          </MenuItem>
                          <MenuItem as={Link} href="/tienda/habitaciones-oficinas?subcategoria=espejos">
                            Espejos
                          </MenuItem>
                          <MenuItem as={Link} href="/tienda/habitaciones-oficinas?subcategoria=pisos-escaleras">
                            Pisos y Escaleras
                          </MenuItem>
                          <MenuItem as={Link} href="/tienda/habitaciones-oficinas?subcategoria=pizzarras">
                            Pizzarras
                          </MenuItem>
                          <MenuItem as={Link} href="/tienda/habitaciones-oficinas?subcategoria=puertas-ventanas">
                            Puertas y Ventanas
                          </MenuItem>
                          <MenuItem as={Link} href="/tienda/habitaciones-oficinas?subcategoria=tabiquerias">
                            Tabiquerías
                          </MenuItem>
                          <MenuItem as={Link} href={`/tienda/${category.slug}`}>
                            Ver todas las categorías
                          </MenuItem>
                        </>
                      ) : category.slug === 'fachadas' ? (
                        <>
                          <MenuItem as={Link} href="/tienda/fachadas?subcategoria=antibalas">
                            Vidrios Antibalas
                          </MenuItem>
                          <MenuItem as={Link} href="/tienda/fachadas?subcategoria=frentes-templados">
                            Frentes Templados
                          </MenuItem>
                          <MenuItem as={Link} href={`/tienda/${category.slug}`}>
                            Ver todas las categorías
                          </MenuItem>
                        </>
                      ) : (
                        <MenuItem as={Link} href={`/tienda/${category.slug}`}>
                          Ver todos los productos
                        </MenuItem>
                      )}
                    </MenuList>
                  </Menu>
                ))}
              </HStack>

              {/* Mobile: Cart & Favorites */}
              <HStack spacing="2" display={{ base: 'flex', lg: 'none' }}>
                <IconButton
                  aria-label="Favoritos"
                  icon={<FiHeart />}
                  size="sm"
                  color="gray.700"
                  position="relative"
                  onClick={() => router.push('/tienda/favoritos')}
                >
                  {favorites.length > 0 && (
                    <Badge
                      position="absolute"
                      top="-1"
                      right="-1"
                      bg="red.500"
                      color="white"
                      borderRadius="full"
                      fontSize="xs"
                      minW="16px"
                      h="16px"
                    >
                      {favorites.length}
                    </Badge>
                  )}
                </IconButton>
                <IconButton
                  aria-label="Carrito"
                  icon={<FiShoppingCart />}
                  size="sm"
                  color="gray.700"
                  position="relative"
                  onClick={openCart}
                >
                  {cartItemCount > 0 && (
                    <Badge
                      position="absolute"
                      top="-1"
                      right="-1"
                      bg="red.500"
                      color="white"
                      borderRadius="full"
                      fontSize="xs"
                      minW="16px"
                      h="16px"
                    >
                      {cartItemCount}
                    </Badge>
                  )}
                </IconButton>
              </HStack>
            </Flex>
          </Container>
        </Box>
      </Box>

      {/* Mobile Drawer */}
      <Drawer isOpen={isMobileOpen} placement="left" onClose={onMobileClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menú</DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" spacing="4">
              {categories.map((category) => (
                <Box key={category.id}>
                  {category.slug === 'banos' ? (
                    <VStack align="stretch" spacing="2" pl="4">
                      <ChakraLink
                        as={Link}
                        href={`/tienda/${category.slug}`}
                        onClick={onMobileClose}
                        fontWeight="bold"
                        py="2"
                      >
                        {category.name}
                      </ChakraLink>
                      <ChakraLink
                        as={Link}
                        href="/tienda/banos?tipo=mamparas"
                        onClick={onMobileClose}
                        fontWeight="medium"
                        py="1"
                        pl="4"
                        fontSize="sm"
                        color="gray.600"
                      >
                        • Mamparas
                      </ChakraLink>
                      <ChakraLink
                        as={Link}
                        href="/tienda/banos?tipo=espejos"
                        onClick={onMobileClose}
                        fontWeight="medium"
                        py="1"
                        pl="4"
                        fontSize="sm"
                        color="gray.600"
                      >
                        • Espejos
                      </ChakraLink>
                      <ChakraLink
                        as={Link}
                        href="/tienda/banos?tipo=espejos-led"
                        onClick={onMobileClose}
                        fontWeight="medium"
                        py="1"
                        pl="4"
                        fontSize="sm"
                        color="gray.600"
                      >
                        • Espejos LED
                      </ChakraLink>
                    </VStack>
                  ) : category.slug === 'habitaciones-oficinas' ? (
                    <VStack align="stretch" spacing="2" pl="4">
                      <ChakraLink
                        as={Link}
                        href={`/tienda/${category.slug}`}
                        onClick={onMobileClose}
                        fontWeight="bold"
                        py="2"
                      >
                        {category.name}
                      </ChakraLink>
                      <ChakraLink
                        as={Link}
                        href="/tienda/habitaciones-oficinas?subcategoria=cubiertas"
                        onClick={onMobileClose}
                        fontWeight="medium"
                        py="1"
                        pl="4"
                        fontSize="sm"
                        color="gray.600"
                      >
                        • Cubiertas
                      </ChakraLink>
                      <ChakraLink
                        as={Link}
                        href="/tienda/habitaciones-oficinas?subcategoria=espejos"
                        onClick={onMobileClose}
                        fontWeight="medium"
                        py="1"
                        pl="4"
                        fontSize="sm"
                        color="gray.600"
                      >
                        • Espejos
                      </ChakraLink>
                      <ChakraLink
                        as={Link}
                        href="/tienda/habitaciones-oficinas?subcategoria=pisos-escaleras"
                        onClick={onMobileClose}
                        fontWeight="medium"
                        py="1"
                        pl="4"
                        fontSize="sm"
                        color="gray.600"
                      >
                        • Pisos y Escaleras
                      </ChakraLink>
                      <ChakraLink
                        as={Link}
                        href="/tienda/habitaciones-oficinas?subcategoria=pizzarras"
                        onClick={onMobileClose}
                        fontWeight="medium"
                        py="1"
                        pl="4"
                        fontSize="sm"
                        color="gray.600"
                      >
                        • Pizzarras
                      </ChakraLink>
                      <ChakraLink
                        as={Link}
                        href="/tienda/habitaciones-oficinas?subcategoria=puertas-ventanas"
                        onClick={onMobileClose}
                        fontWeight="medium"
                        py="1"
                        pl="4"
                        fontSize="sm"
                        color="gray.600"
                      >
                        • Puertas y Ventanas
                      </ChakraLink>
                      <ChakraLink
                        as={Link}
                        href="/tienda/habitaciones-oficinas?subcategoria=tabiquerias"
                        onClick={onMobileClose}
                        fontWeight="medium"
                        py="1"
                        pl="4"
                        fontSize="sm"
                        color="gray.600"
                      >
                        • Tabiquerías
                      </ChakraLink>
                    </VStack>
                  ) : category.slug === 'fachadas' ? (
                    <VStack align="stretch" spacing="2" pl="4">
                      <ChakraLink
                        as={Link}
                        href={`/tienda/${category.slug}`}
                        onClick={onMobileClose}
                        fontWeight="bold"
                        py="2"
                      >
                        {category.name}
                      </ChakraLink>
                      <ChakraLink
                        as={Link}
                        href="/tienda/fachadas?subcategoria=antibalas"
                        onClick={onMobileClose}
                        fontWeight="medium"
                        py="1"
                        pl="4"
                        fontSize="sm"
                        color="gray.600"
                      >
                        • Vidrios Antibalas
                      </ChakraLink>
                      <ChakraLink
                        as={Link}
                        href="/tienda/fachadas?subcategoria=frentes-templados"
                        onClick={onMobileClose}
                        fontWeight="medium"
                        py="1"
                        pl="4"
                        fontSize="sm"
                        color="gray.600"
                      >
                        • Frentes Templados
                      </ChakraLink>
                    </VStack>
                  ) : (
                    <ChakraLink
                      as={Link}
                      href={`/tienda/${category.slug}`}
                      onClick={onMobileClose}
                      fontWeight="medium"
                      py="2"
                    >
                      {category.name}
                    </ChakraLink>
                  )}
                </Box>
              ))}
              <ChakraLink as={Link} href="/tienda/proyectos" onClick={onMobileClose} py="2">
                Nuestros Proyectos
              </ChakraLink>
              <ChakraLink as={Link} href="/tienda/nosotros" onClick={onMobileClose} py="2">
                Quienes Somos
              </ChakraLink>
              <ChakraLink as={Link} href="/tienda/ayuda" onClick={onMobileClose} py="2">
                Centro de Ayuda
              </ChakraLink>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Shopping Cart Sidebar */}
      <ShoppingCart isOpen={cartIsOpen} onClose={closeCart} />
    </>
  )
}

