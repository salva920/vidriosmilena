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
} from '@chakra-ui/react'
import { useState } from 'react'

interface CierresSectionProps {
  onOpenModal?: () => void
}

interface GalleryItem {
  src: string
  type: 'image' | 'video'
}

const galleryItems: GalleryItem[] = [
  { src: '/img/vidrioT.jpg', type: 'image' },
  { src: '/img/vidriot2.jpg', type: 'image' },
  { src: '/img/vidriot3.jpg', type: 'image' },
  { src: '/img/cierre.jpg', type: 'image' },
  { src: '/img/cierre2.jpg', type: 'image' },
  { src: '/img/baranda.mp4', type: 'video' },
  { src: '/img/cierre3.jpg', type: 'image' },
  { src: '/img/baranda2.mp4', type: 'video' },
  { src: '/img/baranda3.jpg', type: 'image' },
]

export default function CierresSection({ onOpenModal }: CierresSectionProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  const handleItemClick = (item: GalleryItem) => {
    setSelectedItem(item)
    onOpen()
  }

  const additionalDescription = "En Vidrios Dellorto, contamos con una amplia variedad de sistemas de cerramientos, tanto horizontales como verticales, que te ayudan a transformar cualquier tipo de espacio. Nuestros cierres y barandas de vidrio templado están diseñados para ofrecer máxima seguridad, durabilidad y estética moderna. Trabajamos con los mejores materiales y tecnologías para garantizar soluciones personalizadas que se adapten a tus necesidades específicas, ya sea para terrazas, balcones, escaleras o espacios comerciales."

  return (
    <Box id="cierres" py={{ base: '12', md: '16', lg: '20' }} bg="white">
      <Container maxW="container.xl">
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          gap={{ base: '8', lg: '12' }}
          align="stretch"
        >
          {/* Left Side - Content */}
          <Box 
            flex={{ base: '1', lg: '1' }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            order={{ base: 1, lg: 1 }}
          >
            <VStack spacing="6" align="stretch">
              {/* Title */}
              <Heading 
                fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
                color="gray.900"
                fontWeight="800"
                letterSpacing={{ base: '-0.02em', md: '-0.03em' }}
                textTransform="uppercase"
                lineHeight="1.1"
              >
                CIERRE DE TERRAZAS
              </Heading>
              
              {/* Subtitle */}
              <Text 
                fontSize={{ base: 'lg', md: 'xl' }}
                color="gray.700"
                fontWeight="600"
              >
                Versatilidad e innovación en cada espacio
              </Text>
              
              {/* Description */}
              <Text 
                fontSize={{ base: 'md', md: 'lg' }}
                color="gray.600"
                lineHeight="1.7"
              >
                En Vidrios Dellorto, contamos con una amplia variedad de sistemas de cerramientos, tanto horizontales como verticales, que te ayudan a transformar cualquier tipo de espacio.
              </Text>

              {/* CTA Button */}
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
                mt="4"
                alignSelf="flex-start"
                _hover={{
                  bg: 'red.700',
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg'
                }}
                transition="all 0.3s"
              >
                Cotizar
              </Button>
            </VStack>
          </Box>

          {/* Right Side - Gallery */}
          <Box 
            flex={{ base: '1', lg: '1' }}
            order={{ base: 2, lg: 2 }}
          >
            <SimpleGrid columns={2} spacing="4">
              {galleryItems.map((item, index) => (
                <Box
                  key={index}
                  position="relative"
                  borderRadius="lg"
                  overflow="hidden"
                  bg="gray.100"
                  h={{ base: '150px', md: '180px', lg: '200px' }}
                  _hover={{
                    transform: 'scale(1.05)',
                    transition: 'transform 0.3s'
                  }}
                  transition="transform 0.3s"
                  cursor="pointer"
                  onClick={() => handleItemClick(item)}
                >
                  {item.type === 'image' ? (
                    <Image
                      src={item.src}
                      alt={`Cierre ${index + 1}`}
                      w="100%"
                      h="100%"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  ) : (
                    <Box
                      as="video"
                      src={item.src}
                      w="100%"
                      h="100%"
                      objectFit="cover"
                      objectPosition="center"
                      muted
                      loop
                      playsInline
                    />
                  )}
                </Box>
              ))}
            </SimpleGrid>
          </Box>
        </Flex>
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

