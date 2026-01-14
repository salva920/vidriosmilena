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
  const { isOpen: isCartOpen, onOpen: onCartOpen, onClose: onCartClose } = useDisclosure()
  const { isOpen: isMobileOpen, onOpen: onMobileOpen, onClose: onMobileClose } = useDisclosure()
  const { getItemCount, isOpen: cartIsOpen, openCart } = useCart()
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
      <Box position="sticky" top="0" zIndex="1000" bg="white" boxShadow="sm">
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
            <Flex justify="space-between" align="center" gap="4" flexWrap="wrap">
              {/* Left: Tienda Empresas Button */}
              <Button
                bg="yellow.50"
                color="blue.900"
                size="sm"
                fontSize="xs"
                fontWeight="bold"
                _hover={{ bg: 'yellow.100' }}
                display={{ base: 'none', md: 'block' }}
              >
                TIENDA EMPRESAS
              </Button>

              {/* Center: Search Bar */}
              <Box flex="1" maxW={{ base: '100%', md: '400px' }}>
                <form onSubmit={handleSearch}>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FiSearch color="gray.400" />
                    </InputLeftElement>
                    <Input
                      placeholder="¿Qué buscas hoy?"
                      bg="white"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      borderRadius="md"
                    />
                  </InputGroup>
                </form>
              </Box>

              {/* Right: Navigation Links & Actions */}
              <HStack spacing={{ base: '2', md: '4' }} display={{ base: 'none', md: 'flex' }}>
                <Link href="/tienda/proyectos" color="white" _hover={{ textDecoration: 'underline' }} fontSize="sm">
                  NUESTROS PROYECTOS
                </Link>
                <Link href="/tienda/nosotros" color="white" _hover={{ textDecoration: 'underline' }} fontSize="sm">
                  QUIENES SOMOS
                </Link>
                <Link href="/tienda/ayuda" color="white" _hover={{ textDecoration: 'underline' }} fontSize="sm">
                  CENTRO DE AYUDA
                </Link>

                {/* Social Icons */}
                <HStack spacing="2">
                  <IconButton
                    as={Link}
                    href="https://www.facebook.com"
                    target="_blank"
                    aria-label="Facebook"
                    icon={<FaFacebook />}
                    size="sm"
                    bg="green.600"
                    color="white"
                    borderRadius="full"
                    _hover={{ bg: 'green.700' }}
                  />
                  <IconButton
                    as={Link}
                    href="https://www.pinterest.com"
                    target="_blank"
                    aria-label="Pinterest"
                    icon={<FaPinterest />}
                    size="sm"
                    bg="blue.600"
                    color="white"
                    borderRadius="full"
                    _hover={{ bg: 'blue.700' }}
                  />
                  <IconButton
                    as={Link}
                    href="https://www.instagram.com/artecristal.spa?igsh=MTFzb3B1bWtqOXFqdw=="
                    target="_blank"
                    aria-label="Instagram"
                    icon={<FaInstagram />}
                    size="sm"
                    bg="pink.500"
                    color="white"
                    borderRadius="full"
                    _hover={{ bg: 'pink.600' }}
                  />
                </HStack>

                <Button
                  bg="red.500"
                  color="white"
                  size="sm"
                  fontSize="xs"
                  fontWeight="bold"
                  _hover={{ bg: 'red.600' }}
                >
                  Cotizar
                </Button>

                <IconButton
                  aria-label="Carrito de compras"
                  icon={<FiShoppingCart />}
                  size="sm"
                  color="white"
                  position="relative"
                  onClick={openCart}
                  _hover={{ bg: 'blue.800' }}
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
                    >
                      {cartItemCount}
                    </Badge>
                  )}
                </IconButton>

                <IconButton
                  aria-label="Ubicación"
                  icon={<FaMapMarkerAlt />}
                  size="sm"
                  color="white"
                  _hover={{ bg: 'blue.800' }}
                />
              </HStack>

              {/* Mobile Menu Button */}
              <IconButton
                aria-label="Menú"
                icon={<FiMenu />}
                display={{ base: 'block', md: 'none' }}
                color="white"
                onClick={onMobileOpen}
                _hover={{ bg: 'blue.800' }}
              />
            </Flex>
          </Container>
        </Box>

        {/* Secondary Navigation - White */}
        <Box bg="white" borderBottom="1px" borderColor="gray.200">
          <Container maxW="container.xl">
            <Flex justify="space-between" align="center" py="3">
              {/* Logo */}
              <Link href="/tienda" style={{ textDecoration: 'none' }}>
                <Heading size="md" color="blue.900" fontWeight="bold">
                  ARTECRISTAL
                </Heading>
              </Link>

              {/* Category Links */}
              <HStack spacing="6" display={{ base: 'none', lg: 'flex' }}>
                {categories.map((category) => (
                  <Menu key={category.id}>
                    <MenuButton
                      as={Button}
                      rightIcon={<FiChevronDown />}
                      variant="ghost"
                      color="gray.700"
                      fontWeight="medium"
                      _hover={{ color: 'blue.600' }}
                    >
                      {category.name}
                    </MenuButton>
                    <MenuList>
                      <MenuItem as={Link} href={`/tienda/${category.slug}`}>
                        Ver todos los productos
                      </MenuItem>
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
                <Link
                  key={category.id}
                  href={`/tienda/${category.slug}`}
                  onClick={onMobileClose}
                  fontWeight="medium"
                  py="2"
                >
                  {category.name}
                </Link>
              ))}
              <Link href="/tienda/proyectos" onClick={onMobileClose} py="2">
                Nuestros Proyectos
              </Link>
              <Link href="/tienda/nosotros" onClick={onMobileClose} py="2">
                Quienes Somos
              </Link>
              <Link href="/tienda/ayuda" onClick={onMobileClose} py="2">
                Centro de Ayuda
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Shopping Cart Sidebar */}
      <ShoppingCart isOpen={cartIsOpen} onClose={onCartClose} />
    </>
  )
}

