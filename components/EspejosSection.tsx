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
  Badge,
} from '@chakra-ui/react'
import { useState } from 'react'

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
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          gap={{ base: '8', lg: '12' }}
          align="stretch"
        >
          {/* Right Side - Content */}
          <Box 
            flex={{ base: '1', lg: '1' }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            order={{ base: 1, lg: 2 }}
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
                ESPEJOS
              </Heading>
              
              {/* Subtitle */}
              <Text 
                fontSize={{ base: 'lg', md: 'xl' }}
                color="gray.700"
                fontWeight="600"
              >
                Decoración y funcionalidad con iluminación LED
              </Text>
              
              {/* Description */}
              <Text 
                fontSize={{ base: 'md', md: 'lg' }}
                color="gray.600"
                lineHeight="1.7"
              >
                Espejos de alta calidad para decoración y funcionalidad, disponibles en diferentes estilos y tamaños. <Text as="span" fontWeight="700" color="gray.900">Destacamos nuestros espejos con iluminación LED integrada</Text> que proporcionan una luz perfecta para cualquier ambiente.
              </Text>

              {/* Gallery Images */}
              <SimpleGrid columns={2} spacing="4" mt="4">
                {galleryImages.map((image, index) => (
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
                    onClick={() => handleImageClick(image)}
                  >
                    <Image
                      src={image}
                      alt={`Espejo ${index + 1}`}
                      w="100%"
                      h="100%"
                      objectFit="cover"
                      objectPosition="center"
                    />
                    {isLedImage(image) && (
                      <Badge
                        position="absolute"
                        top="2"
                        right="2"
                        bg="yellow.400"
                        color="gray.900"
                        fontWeight="bold"
                        fontSize="xs"
                        px="2"
                        py="1"
                        borderRadius="md"
                        boxShadow="md"
                      >
                        LED
                      </Badge>
                    )}
                  </Box>
                ))}
              </SimpleGrid>

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

          {/* Left Side - Main Image (Desktop only) */}
          <Box 
            flex={{ base: '1', lg: '1' }}
            position="relative"
            borderRadius="xl"
            overflow="hidden"
            bg="gray.100"
            minH={{ base: '300px', md: '400px', lg: '600px' }}
            display={{ base: 'none', lg: 'block' }}
          >
            <Image
              src={galleryImages[0]}
              alt="Espejos decorativos"
              w="100%"
              h="100%"
              objectFit="cover"
              objectPosition="center"
            />
          </Box>
        </Flex>
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

