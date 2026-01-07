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

interface ShowerSectionProps {
  onOpenModal?: () => void
}

interface GalleryItem {
  src: string
  type: 'image' | 'video'
}

const galleryItems: GalleryItem[] = [
  { src: '/img/shower1.mp4', type: 'video' },
  { src: '/img/shower2.jpg', type: 'image' },
  { src: '/img/shower3.jpg', type: 'image' },
  { src: '/img/shower 4.jpg', type: 'image' },
  { src: '/img/shower5.jpg', type: 'image' },
]

export default function ShowerSection({ onOpenModal }: ShowerSectionProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-play carousel
  useEffect(() => {
    if (galleryItems.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % galleryItems.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [])

  const nextItem = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length)
  }

  const prevItem = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length)
  }

  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item)
    onOpen()
  }

  const additionalDescription = "Nuestras mamparas de vidrio templado están fabricadas con los más altos estándares de calidad y seguridad. Ofrecemos una amplia variedad de diseños, desde mamparas corredizas hasta puertas pivotantes, todas personalizables según tus necesidades. Cada producto está diseñado para maximizar el espacio, mejorar la iluminación natural y crear ambientes modernos y elegantes."

  return (
    <Box id="shower" py={{ base: '12', md: '16', lg: '20' }} bg="white">
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
              SHOWER DOOR
            </Heading>
            
            <Text 
              fontSize={{ base: 'lg', md: 'xl' }}
              color="gray.700"
              fontWeight="600"
              mb="4"
            >
              Aislamiento, confort y estilo
            </Text>
            
            <Text 
              fontSize={{ base: 'md', md: 'lg' }}
              color="gray.600"
              lineHeight="1.7"
              maxW="800px"
              mx="auto"
            >
              Soluciones modernas y elegantes para baños con mamparas de vidrio templado que combinan funcionalidad, seguridad y diseño. Nuestros productos están diseñados para crear espacios más cómodos y sostenibles.
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
            onClick={() => handleItemClick(galleryItems[currentIndex])}
          >
            {galleryItems.map((item, index) => (
              <Box
                key={index}
                position="absolute"
                top="0"
                left="0"
                w="100%"
                h="100%"
                opacity={index === currentIndex ? 1 : 0}
                transition="opacity 0.8s ease-in-out"
                zIndex={index === currentIndex ? 1 : 0}
                pointerEvents="none"
              >
                {item.type === 'video' ? (
                  <Box
                    as="video"
                    src={item.src}
                    w="100%"
                    h="100%"
                    objectFit="contain"
                    objectPosition="center"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt={`Shower ${index + 1}`}
                    w="100%"
                    h="100%"
                    objectFit="contain"
                    objectPosition="center"
                  />
                )}
              </Box>
            ))}
            
            {/* Navigation Buttons */}
            {galleryItems.length > 1 && (
              <>
                <IconButton
                  aria-label="Anterior"
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
                    prevItem()
                  }}
                />
                <IconButton
                  aria-label="Siguiente"
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
                    nextItem()
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
                  {galleryItems.map((_, index) => (
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

      {/* Image/Video Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="4xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={0}>
            <VStack spacing="6" p={{ base: '6', md: '8' }}>
              {/* Expanded Image/Video */}
              {selectedItem && (
                <Box
                  w="100%"
                  h={{ base: '300px', md: '400px', lg: '500px' }}
                  borderRadius="lg"
                  overflow="hidden"
                  bg="gray.100"
                >
                  {selectedItem.type === 'video' ? (
                    <Box
                      as="video"
                      src={selectedItem.src}
                      w="100%"
                      h="100%"
                      objectFit="contain"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
                    />
                  ) : (
                    <Image
                      src={selectedItem.src}
                      alt="Shower ampliado"
                      w="100%"
                      h="100%"
                      objectFit="contain"
                      objectPosition="center"
                    />
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
                  SHOWER O MAMPARAS
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

