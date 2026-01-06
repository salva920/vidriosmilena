'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Image,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  IconButton,
  HStack,
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface CierresSectionProps {
  onOpenModal?: () => void
}

interface GalleryItem {
  src: string
  type: 'image' | 'video'
}

const videos: string[] = [
  '/img/baranda.mp4',
  '/img/baranda2.mp4',
]

const images: string[] = [
  '/img/vidrioT.jpg',
  '/img/vidriot2.jpg',
  '/img/vidriot3.jpg',
  '/img/cierre.jpg',
  '/img/cierre2.jpg',
  '/img/cierre3.jpg',
  '/img/baranda3.jpg',
]

export default function CierresSection({ onOpenModal }: CierresSectionProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  // Auto-play carousel para videos
  useEffect(() => {
    if (videos.length > 1) {
      const interval = setInterval(() => {
        setCurrentVideoIndex((prev) => (prev + 1) % videos.length)
      }, 5000) // Cambia cada 5 segundos
      return () => clearInterval(interval)
    }
  }, [])

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length)
  }

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length)
  }

  const handleImageClick = (src: string) => {
    setSelectedItem({ src, type: 'image' })
    onOpen()
  }

  const handleVideoClick = (src: string) => {
    setSelectedItem({ src, type: 'video' })
    onOpen()
  }

  const additionalDescription = "En Arte cristal, contamos con una amplia variedad de sistemas de cerramientos, tanto horizontales como verticales, que te ayudan a transformar cualquier tipo de espacio. Nuestros cierres y barandas de vidrio templado están diseñados para ofrecer máxima seguridad, durabilidad y estética moderna. Trabajamos con los mejores materiales y tecnologías para garantizar soluciones personalizadas que se adapten a tus necesidades específicas, ya sea para terrazas, balcones, escaleras o espacios comerciales."

  return (
    <Box id="cierres" py={{ base: '12', md: '16', lg: '20' }} bg="white">
      <Container maxW="container.xl">
        <VStack spacing="12" align="stretch">
          {/* Header Section */}
          <Box textAlign={{ base: 'center', lg: 'left' }} maxW="900px" mx={{ base: 'auto', lg: '0' }}>
            <Heading 
              fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
              color="gray.900"
              fontWeight="800"
              letterSpacing={{ base: '-0.02em', md: '-0.03em' }}
              textTransform="uppercase"
              lineHeight="1.1"
              mb="4"
            >
              CIERRE DE TERRAZAS
            </Heading>
            
            <Text 
              fontSize={{ base: 'lg', md: 'xl' }}
              color="gray.700"
              fontWeight="600"
              mb="4"
            >
              Versatilidad e innovación en cada espacio
            </Text>
            
            <Text 
              fontSize={{ base: 'md', md: 'lg' }}
              color="gray.600"
              lineHeight="1.7"
              mb="6"
            >
              En Vidrios Dellorto, contamos con una amplia variedad de sistemas de cerramientos, tanto horizontales como verticales, que te ayudan a transformar cualquier tipo de espacio.
            </Text>

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

          {/* Video Carousel */}
          {videos.length > 0 && (
            <Box position="relative" w="100%">
              <Box
                position="relative"
                borderRadius="2xl"
                overflow="hidden"
                bg="gray.900"
                h={{ base: '300px', md: '400px', lg: '500px' }}
                boxShadow="2xl"
                cursor="pointer"
                onClick={() => handleVideoClick(videos[currentVideoIndex])}
              >
                {videos.map((video, index) => (
                  <Box
                    key={index}
                    as="video"
                    src={video}
                    position="absolute"
                    top="0"
                    left="0"
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    opacity={index === currentVideoIndex ? 1 : 0}
                    transition="opacity 0.8s ease-in-out"
                    zIndex={index === currentVideoIndex ? 1 : 0}
                    pointerEvents="none"
                  />
                ))}
                
                {/* Navigation Buttons */}
                {videos.length > 1 && (
                  <>
                    <IconButton
                      aria-label="Video anterior"
                      icon={<FiChevronLeft />}
                      position="absolute"
                      left="4"
                      top="50%"
                      transform="translateY(-50%)"
                      zIndex={2}
                      bg="rgba(0, 0, 0, 0.5)"
                      color="white"
                      borderRadius="full"
                      size="lg"
                      _hover={{ bg: 'rgba(0, 0, 0, 0.7)' }}
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation()
                        prevVideo()
                      }}
                    />
                    <IconButton
                      aria-label="Video siguiente"
                      icon={<FiChevronRight />}
                      position="absolute"
                      right="4"
                      top="50%"
                      transform="translateY(-50%)"
                      zIndex={2}
                      bg="rgba(0, 0, 0, 0.5)"
                      color="white"
                      borderRadius="full"
                      size="lg"
                      _hover={{ bg: 'rgba(0, 0, 0, 0.7)' }}
                      onClick={(e: React.MouseEvent) => {
                        e.stopPropagation()
                        nextVideo()
                      }}
                    />
                  </>
                )}

                {/* Pagination Dots */}
                {videos.length > 1 && (
                  <HStack
                    position="absolute"
                    bottom="4"
                    left="50%"
                    transform="translateX(-50%)"
                    zIndex={2}
                    spacing="2"
                  >
                    {videos.map((_, index) => (
                      <Box
                        key={index}
                        w="10px"
                        h="10px"
                        borderRadius="full"
                        bg={index === currentVideoIndex ? 'white' : 'rgba(255, 255, 255, 0.5)'}
                        cursor="pointer"
                        transition="all 0.3s"
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation()
                          setCurrentVideoIndex(index)
                        }}
                      />
                    ))}
                  </HStack>
                )}
              </Box>
            </Box>
          )}

          {/* Images Grid */}
          {images.length > 0 && (
            <Box>
              <Heading 
                size="md" 
                mb="6" 
                color="gray.800"
                fontWeight="700"
                textAlign={{ base: 'center', lg: 'left' }}
              >
                Galería de Imágenes
              </Heading>
              <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing="4">
                {images.map((image, index) => (
                  <Box
                    key={index}
                    position="relative"
                    borderRadius="xl"
                    overflow="hidden"
                    bg="gray.100"
                    h={{ base: '180px', md: '220px', lg: '250px' }}
                    boxShadow="md"
                    _hover={{
                      transform: 'scale(1.05)',
                      boxShadow: 'xl',
                      transition: 'all 0.3s'
                    }}
                    transition="all 0.3s"
                    cursor="pointer"
                    onClick={() => handleImageClick(image)}
                  >
                    <Image
                      src={image}
                      alt={`Cierre ${index + 1}`}
                      w="100%"
                      h="100%"
                      objectFit="cover"
                      objectPosition="center"
                    />
                    <Box
                      position="absolute"
                      top="0"
                      left="0"
                      w="100%"
                      h="100%"
                      bg="rgba(0, 0, 0, 0)"
                      _hover={{ bg: 'rgba(0, 0, 0, 0.1)' }}
                      transition="background 0.3s"
                    />
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          )}
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
                  {selectedItem.type === 'image' ? (
                    <Image
                      src={selectedItem.src}
                      alt="Cierre ampliado"
                      w="100%"
                      h="100%"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  ) : (
                    <Box
                      as="video"
                      src={selectedItem.src}
                      w="100%"
                      h="100%"
                      objectFit="cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      controls
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
                  CIERRE DE TERRAZAS
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

