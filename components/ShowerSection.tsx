'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Flex,
  Image,
  Button,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'

interface ShowerSectionProps {
  onOpenModal?: () => void
}

const galleryImages = [
  '/img/shower2.jpg',
  '/img/shower3.jpg',
  '/img/shower 4.jpg',
  '/img/shower5.jpg'
]

export default function ShowerSection({ onOpenModal }: ShowerSectionProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleImageClick = (image: string) => {
    setSelectedImage(image)
    onOpen()
  }

  const additionalDescription = "Nuestras mamparas de vidrio templado están fabricadas con los más altos estándares de calidad y seguridad. Ofrecemos una amplia variedad de diseños, desde mamparas corredizas hasta puertas pivotantes, todas personalizables según tus necesidades. Cada producto está diseñado para maximizar el espacio, mejorar la iluminación natural y crear ambientes modernos y elegantes."

  return (
    <Box id="shower" py={{ base: '12', md: '16', lg: '20' }} bg="white">
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
                SHOWER DOOR 
              </Heading>
              
              {/* Subtitle */}
              <Text 
                fontSize={{ base: 'lg', md: 'xl' }}
                color="gray.700"
                fontWeight="600"
              >
                Aislamiento, confort y estilo
              </Text>
              
              {/* Description */}
              <Text 
                fontSize={{ base: 'md', md: 'lg' }}
                color="gray.600"
                lineHeight="1.7"
              >
                Soluciones modernas y elegantes para baños con mamparas de vidrio templado que combinan funcionalidad, seguridad y diseño. Nuestros productos están diseñados para crear espacios más cómodos y sostenibles.
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
                      alt={`Shower ${index + 1}`}
                      w="100%"
                      h="100%"
                      objectFit="cover"
                      objectPosition="center"
                    />
                  </Box>
                ))}
              </SimpleGrid>

              {/* Video - Mobile only (appears after gallery, before button) */}
              <Box 
                display={{ base: 'block', lg: 'none' }}
                position="relative"
                borderRadius="xl"
                overflow="hidden"
                bg="gray.100"
                minH="300px"
                mt="6"
              >
                <Box
                  as="video"
                  autoPlay
                  loop
                  muted
                  playsInline
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  position="absolute"
                  top="0"
                  left="0"
                  src="/img/shower1.mp4"
                />
              </Box>

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

          {/* Left Side - Video (Desktop only) */}
          <Box 
            flex={{ base: '1', lg: '1' }}
            position="relative"
            borderRadius="xl"
            overflow="hidden"
            bg="gray.100"
            minH={{ base: '300px', md: '400px', lg: '600px' }}
            display={{ base: 'none', lg: 'block' }}
          >
            <Box
              as="video"
              autoPlay
              loop
              muted
              playsInline
              w="100%"
              h="100%"
              objectFit="cover"
              position="absolute"
              top="0"
              left="0"
              src="/img/shower1.mp4"
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
                <Box
                  w="100%"
                  h={{ base: '300px', md: '400px', lg: '500px' }}
                  borderRadius="lg"
                  overflow="hidden"
                  bg="gray.100"
                >
                  <Image
                    src={selectedImage}
                    alt="Shower ampliado"
                    w="100%"
                    h="100%"
                    objectFit="cover"
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

