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

interface CortinasSectionProps {
  onOpenModal?: () => void
}

const galleryImages = [
  '/img/cortinas1.jpg',
  '/img/cortinas2.jpg',
  '/img/cortinas3.jpg',
  '/img/cortinas4.jpg',
  '/img/cortinas5.webp',
  '/img/cortinas6.jpg',
]

export default function CortinasSection({ onOpenModal }: CortinasSectionProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const handleImageClick = (image: string) => {
    setSelectedImage(image)
    onOpen()
  }

  const additionalDescription = "Nuestras cortinas de cristal están diseñadas para crear espacios abiertos y luminosos con separación visual elegante. Ofrecemos soluciones modernas con sistemas de cortinas y divisiones de vidrio que combinan funcionalidad, estética y durabilidad. Cada producto está fabricado con los más altos estándares de calidad, permitiendo crear ambientes versátiles que se adaptan a tus necesidades específicas, ya sea para espacios residenciales o comerciales."

  return (
    <Box id="cortinas" py={{ base: '12', md: '16', lg: '20' }} bg="white">
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
                CORTINAS DE CRISTAL
              </Heading>
              
              {/* Subtitle */}
              <Text 
                fontSize={{ base: 'lg', md: 'xl' }}
                color="gray.700"
                fontWeight="600"
              >
                Espacios abiertos y luminosos
              </Text>
              
              {/* Description */}
              <Text 
                fontSize={{ base: 'md', md: 'lg' }}
                color="gray.600"
                lineHeight="1.7"
              >
                Soluciones modernas con cortinas y divisiones de vidrio para crear espacios abiertos y luminosos con separación visual elegante.
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
                      alt={`Cortina ${index + 1}`}
                      w="100%"
                      h="100%"
                      objectFit="cover"
                      objectPosition="center"
                    />
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
              alt="Cortinas de cristal"
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
                <Box
                  w="100%"
                  h={{ base: '300px', md: '400px', lg: '500px' }}
                  borderRadius="lg"
                  overflow="hidden"
                  bg="gray.100"
                >
                  <Image
                    src={selectedImage}
                    alt="Cortina ampliada"
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
                  CORTINAS DE CRISTAL
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

