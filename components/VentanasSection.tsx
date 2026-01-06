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
  IconButton,
  HStack,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface VentanasSectionProps {
  onOpenModal?: () => void
}

const galleryImages = [
  '/img/ventana pvc.jpg',
  '/img/ventarpt.jpg',
  '/ventana aluminio.png',
  '/img/ventana2.jpg',
  '/img/ventana3.jpg',
  '/img/ventana4.jpg',
  '/img/ventana5.jpg',
  '/img/ventana7.jpg',
  '/img/ventana8.jpg'
]

export default function VentanasSection({ onOpenModal }: VentanasSectionProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-play carousel
  useEffect(() => {
    if (galleryImages.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [])

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const handleImageClick = (image: string) => {
    setSelectedImage(image)
    onOpen()
  }

  const additionalDescription = "Nuestras ventanas de PVC y aluminio están diseñadas para ofrecer la máxima calidad, eficiencia energética y durabilidad. Trabajamos con los mejores materiales y tecnologías del mercado, incluyendo sistemas de Rotura de Puente Térmico (RPT) que garantizan un aislamiento superior. Ofrecemos soluciones personalizadas para proyectos residenciales y comerciales, combinando estética moderna con funcionalidad excepcional. Cada ventana está fabricada con precisión para garantizar hermeticidad, resistencia a la intemperie y máximo confort térmico y acústico."

  return (
    <Box id="ventanas" py={{ base: '12', md: '16', lg: '20' }} bg="white">
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
              VENTANAS DE PVC Y ALUMINIO
            </Heading>
            
            <Text 
              fontSize={{ base: 'lg', md: 'xl' }}
              color="gray.700"
              fontWeight="600"
              mb="4"
            >
              Tecnología, estilo y eficiencia
            </Text>
            
            <Text 
              fontSize={{ base: 'md', md: 'lg' }}
              color="gray.600"
              lineHeight="1.7"
              maxW="800px"
              mx="auto"
            >
              Contar con nuestras ventanas de alto rendimiento marca la diferencia en cualquier espacio. Ofrecemos opciones en PVC, aluminio y RPT (Rotura de Puente Térmico) que combinados con nuestros cristales de alto rendimiento.
            </Text>
          </Box>

          {/* Carousel - Centered */}
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
            onClick={() => handleImageClick(galleryImages[currentIndex])}
          >
            {galleryImages.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Ventana ${index + 1}`}
                position="absolute"
                top="0"
                left="0"
                w="100%"
                h="100%"
                objectFit="contain"
                objectPosition="center"
                opacity={index === currentIndex ? 1 : 0}
                transition="opacity 0.8s ease-in-out"
                zIndex={index === currentIndex ? 1 : 0}
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
                      bg={index === currentIndex ? 'white' : 'rgba(255, 255, 255, 0.5)'}
                      cursor="pointer"
                      transition="all 0.3s"
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation()
                        setCurrentIndex(index)
                      }}
                    />
                  ))}
                </HStack>
              </>
            )}
          </Box>

          {/* CTA Button - Centered */}
          <Box textAlign="center">
            <Button
              onClick={onOpenModal}
              bg="red.600"
              color="white"
              fontWeight="bold"
              textTransform="uppercase"
              fontSize={{ base: 'sm', md: 'md' }}
              px={{ base: '6', md: '8' }}
              py={{ base: '5', md: '6' }}
              borderRadius="md"
              _hover={{
                bg: 'red.700',
                transform: 'translateY(-2px)',
                boxShadow: 'lg'
              }}
              transition="all 0.3s"
            >
              Cotizar
            </Button>
          </Box>
        </VStack>
      </Container>

      {/* Image Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={0}>
            <VStack spacing="6" p={{ base: '6', md: '8' }}>
              {/* Expanded Image */}
              {selectedImage && (
                <Box
                  w="100%"
                  h={{ base: '300px', md: '400px', lg: '500px' }}
                  borderRadius="lg"
                  overflow="hidden"
                  bg="gray.100"
                >
                  <Image
                    src={selectedImage}
                    alt="Ventana ampliada"
                    w="100%"
                    h="100%"
                    objectFit="contain"
                    objectPosition="center"
                  />
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
                  VENTANAS DE PVC Y ALUMINIO
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
                  bg="red.600"
                  color="white"
                  fontWeight="bold"
                  textTransform="uppercase"
                  fontSize={{ base: 'sm', md: 'md' }}
                  px={{ base: '6', md: '8' }}
                  py={{ base: '5', md: '6' }}
                  borderRadius="md"
                  w={{ base: '100%', md: 'auto' }}
                  _hover={{
                    bg: 'red.700',
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg'
                  }}
                  transition="all 0.3s"
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

