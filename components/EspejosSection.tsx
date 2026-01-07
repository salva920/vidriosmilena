'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Image,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Badge,
  IconButton,
  HStack,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface EspejosSectionProps {
  onOpenModal?: () => void
}

const galleryImages = [
  '/img/espejo decorativo.jpg',
  '/img/espejo decorativo2.jpg',
  '/img/espejo decorativo3.jpg',
  '/img/4.png',
  '/img/9.png',
]

export default function EspejosSection({ onOpenModal }: EspejosSectionProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Auto-play carousel para imágenes
  useEffect(() => {
    if (galleryImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
      }, 5000) // Cambia cada 5 segundos
      return () => clearInterval(interval)
    }
  }, [])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const handleImageClick = (image: string) => {
    setSelectedImage(image)
    onOpen()
  }

  // Identificar imágenes con LED (4.png y 9.png probablemente sean espejos con LED)
  const ledImages = ['/img/4.png', '/img/9.png']
  const isLedImage = (image: string) => ledImages.includes(image)

  const additionalDescription = "Nuestros espejos están diseñados para combinar funcionalidad y estética, transformando cualquier espacio con elegancia y estilo. Ofrecemos una amplia variedad de opciones, desde espejos decorativos hasta espejos con iluminación LED integrada que proporcionan una luz perfecta para cualquier ambiente. Cada espejo está fabricado con los más altos estándares de calidad, disponible en diferentes tamaños, formas y acabados para adaptarse a tus necesidades específicas."

  return (
    <Box id="espejos" py={{ base: '12', md: '16', lg: '20' }} bg="white">
      <Container maxW="container.xl">
        <VStack spacing="8" align="stretch">
          {/* Header Section - Centered */}
          <Box textAlign="center" maxW="900px" mx="auto" w="100%">
            <Heading 
              fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
              color="gray.900"
              fontWeight="800"
              letterSpacing={{ base: '-0.02em', md: '-0.03em' }}
              textTransform="uppercase"
              lineHeight="1.1"
              mb="4"
            >
              ESPEJOS
            </Heading>
            
            <Text 
              fontSize={{ base: 'lg', md: 'xl' }}
              color="gray.700"
              fontWeight="600"
              mb="4"
            >
              Decoración y funcionalidad con iluminación LED
            </Text>
            
            <Text 
              fontSize={{ base: 'md', md: 'lg' }}
              color="gray.600"
              lineHeight="1.7"
              maxW="800px"
              mx="auto"
            >
              Espejos de alta calidad para decoración y funcionalidad, disponibles en diferentes estilos y tamaños. <Text as="span" fontWeight="700" color="gray.900">Destacamos nuestros espejos con iluminación LED integrada</Text> que proporcionan una luz perfecta para cualquier ambiente.
            </Text>
          </Box>

          {/* Image Carousel - Centered */}
          <Box 
            position="relative"
            borderRadius="xl"
            overflow="hidden"
            bg="gray.100"
            w="100%"
            maxW="800px"
            mx="auto"
            h={{ base: '350px', md: '450px', lg: '550px' }}
            cursor="pointer"
            onClick={() => handleImageClick(galleryImages[currentImageIndex])}
          >
            {galleryImages.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Espejo ${index + 1}`}
                position="absolute"
                top="0"
                left="0"
                w="100%"
                h="100%"
                objectFit="contain"
                objectPosition="center"
                opacity={index === currentImageIndex ? 1 : 0}
                transition="opacity 0.8s ease-in-out"
                zIndex={index === currentImageIndex ? 1 : 0}
                pointerEvents="none"
              />
            ))}
            
            {/* Navigation Buttons */}
            {galleryImages.length > 1 && (
              <>
                <IconButton
                  aria-label="Imagen anterior"
                  icon={<FiChevronLeft />}
                  position="absolute"
                  left="4"
                  top="50%"
                  transform="translateY(-50%)"
                  zIndex={2}
                  bg="rgba(0, 0, 0, 0.5)"
                  color="white"
                  borderRadius="full"
                  size={{ base: 'md', md: 'lg' }}
                  _hover={{ bg: 'rgba(0, 0, 0, 0.7)' }}
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation()
                    prevImage()
                  }}
                />
                <IconButton
                  aria-label="Imagen siguiente"
                  icon={<FiChevronRight />}
                  position="absolute"
                  right="4"
                  top="50%"
                  transform="translateY(-50%)"
                  zIndex={2}
                  bg="rgba(0, 0, 0, 0.5)"
                  color="white"
                  borderRadius="full"
                  size={{ base: 'md', md: 'lg' }}
                  _hover={{ bg: 'rgba(0, 0, 0, 0.7)' }}
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation()
                    nextImage()
                  }}
                />
                
                {/* Pagination Dots */}
                <HStack
                  position="absolute"
                  bottom="4"
                  left="50%"
                  transform="translateX(-50%)"
                  zIndex={2}
                  spacing="2"
                >
                  {galleryImages.map((_, index) => (
                    <Box
                      key={index}
                      w={{ base: '8px', md: '10px' }}
                      h={{ base: '8px', md: '10px' }}
                      borderRadius="full"
                      bg={index === currentImageIndex ? 'white' : 'rgba(255, 255, 255, 0.5)'}
                      cursor="pointer"
                      transition="all 0.3s"
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation()
                        setCurrentImageIndex(index)
                      }}
                    />
                  ))}
                </HStack>
              </>
            )}
            
            {/* LED Badge if current image has LED */}
            {isLedImage(galleryImages[currentImageIndex]) && (
              <Badge
                position="absolute"
                top="4"
                right="4"
                bg="yellow.400"
                color="gray.900"
                fontWeight="bold"
                fontSize={{ base: 'sm', md: 'md' }}
                px={{ base: '2', md: '3' }}
                py={{ base: '1', md: '2' }}
                borderRadius="md"
                boxShadow="lg"
                zIndex={2}
              >
                ✨ LED
              </Badge>
            )}
          </Box>

          {/* CTA Button - Centered */}
          <Box textAlign="center">
            <Button
              onClick={onOpenModal}
              bg="cyan.500"
              color="white"
              fontWeight="bold"
              textTransform="uppercase"
              fontSize={{ base: 'sm', md: 'md' }}
              px={{ base: '6', md: '8' }}
              py={{ base: '5', md: '6' }}
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
            >
              Cotizar
            </Button>
          </Box>
        </VStack>
      </Container>

      {/* Divider Line */}
      <Box
        w="100%"
        h="4px"
        bgGradient="linear(to-r, yellow.100, yellow.200, yellow.100)"
        mt={{ base: '4', md: '6' }}
        mb="0"
      />

      {/* Image Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={0}>
            <VStack spacing="6" p={{ base: '6', md: '8' }}>
              {/* Expanded Image */}
              {selectedImage && (
                <Box position="relative" w="100%">
                  <Box
                    w="100%"
                    h={{ base: '300px', md: '400px', lg: '500px' }}
                    borderRadius="lg"
                    overflow="hidden"
                    bg="gray.100"
                  >
                    <Image
                      src={selectedImage}
                      alt="Espejo ampliado"
                      w="100%"
                      h="100%"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </Box>
                  {isLedImage(selectedImage) && (
                    <Badge
                      position="absolute"
                      top="4"
                      right="4"
                      bg="yellow.400"
                      color="gray.900"
                      fontWeight="bold"
                      fontSize="md"
                      px="3"
                      py="2"
                      borderRadius="md"
                      boxShadow="lg"
                    >
                      ✨ ILUMINACIÓN LED
                    </Badge>
                  )}
                </Box>
              )}

              {/* Additional Description */}
              <Box w="100%">
                <Heading 
                  size="lg" 
                  mb="4" 
                  color="gray.900"
                  textTransform="uppercase"
                >
                  ESPEJOS
                </Heading>
                <Text 
                  fontSize={{ base: 'md', md: 'lg' }}
                  color="gray.600"
                  lineHeight="1.7"
                  mb="6"
                >
                  {additionalDescription}
                </Text>

                {/* CTA Button */}
                <Button
                  onClick={() => {
                    onClose()
                    onOpenModal?.()
                  }}
                  bg="cyan.500"
                  color="white"
                  fontWeight="bold"
                  textTransform="uppercase"
                  fontSize={{ base: 'sm', md: 'md' }}
                  px={{ base: '6', md: '8' }}
                  py={{ base: '5', md: '6' }}
                  borderRadius="md"
                  w={{ base: '100%', md: 'auto' }}
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
                  Cotizar
                </Button>
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

