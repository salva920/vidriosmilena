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

  const handleImageClick = (image: string) => {
    setSelectedImage(image)
    onOpen()
  }

  const additionalDescription = "Nuestras ventanas de PVC y aluminio están diseñadas para ofrecer la máxima calidad, eficiencia energética y durabilidad. Trabajamos con los mejores materiales y tecnologías del mercado, incluyendo sistemas de Rotura de Puente Térmico (RPT) que garantizan un aislamiento superior. Ofrecemos soluciones personalizadas para proyectos residenciales y comerciales, combinando estética moderna con funcionalidad excepcional. Cada ventana está fabricada con precisión para garantizar hermeticidad, resistencia a la intemperie y máximo confort térmico y acústico."

  return (
    <Box id="ventanas" py={{ base: '12', md: '16', lg: '20' }} bg="white">
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
                VENTANAS DE PVC Y ALUMINIO
              </Heading>
              
              {/* Subtitle */}
              <Text 
                fontSize={{ base: 'lg', md: 'xl' }}
                color="gray.700"
                fontWeight="600"
              >
                Tecnología, estilo y eficiencia
              </Text>
              
              {/* Description */}
              <Text 
                fontSize={{ base: 'md', md: 'lg' }}
                color="gray.600"
                lineHeight="1.7"
              >
                Contar con nuestras ventanas de alto rendimiento marca la diferencia en cualquier espacio. Ofrecemos opciones en PVC, aluminio y RPT (Rotura de Puente Térmico) que combinados con nuestros cristales de alto rendimiento.
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
                    alt={`Ventana ${index + 1}`}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </Box>
              ))}
            </SimpleGrid>
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
                    alt="Ventana ampliada"
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

