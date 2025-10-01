'use client'

import {
  Box,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'
import { FiMenu, FiPhone } from 'react-icons/fi'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bgColor = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')

  const menuItems = [
    { label: 'Inicio', href: '#home' },
    { label: 'Servicios', href: '#services' },
    { label: 'Nosotros', href: '#about' },
    { label: 'Contacto', href: '#contact' },
  ]

  return (
    <MotionBox
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="1000"
      bg={bgColor}
      borderBottom="1px solid"
      borderColor={borderColor}
      backdropFilter="blur(10px)"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Container maxW="container.xl">
        <Flex
          justify="space-between"
          align="center"
          py="4"
        >
          <Heading size="lg" color="brand.500">
            Vidrios Premium
          </Heading>

          {/* Desktop Menu */}
          <HStack spacing="8" display={{ base: 'none', md: 'flex' }}>
            {menuItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                color="gray.600"
                _hover={{ color: 'brand.500' }}
                fontWeight="medium"
              >
                {item.label}
              </Button>
            ))}
            <Button
              colorScheme="brand"
              leftIcon={<FiPhone />}
              size="sm"
            >
              Llamar
            </Button>
          </HStack>

          {/* Mobile Menu Button */}
          <IconButton
            display={{ base: 'flex', md: 'none' }}
            onClick={onOpen}
            variant="ghost"
            icon={<FiMenu />}
            aria-label="Abrir menú"
          />
        </Flex>
      </Container>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Vidrios Premium
          </DrawerHeader>
          <DrawerBody>
            <VStack spacing="4" align="start" pt="8">
              {menuItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  width="full"
                  justifyContent="start"
                  color="gray.600"
                  _hover={{ color: 'brand.500' }}
                  fontWeight="medium"
                >
                  {item.label}
                </Button>
              ))}
              <Button
                colorScheme="brand"
                leftIcon={<FiPhone />}
                width="full"
                mt="4"
              >
                Llamar Ahora
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </MotionBox>
  )
}
