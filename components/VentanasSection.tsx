'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Card,
  CardBody,
  Image,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'

interface VentanasSectionProps {
  onOpenModal?: () => void
}

const ventanasTypes = [
  {
    image: '/ventana aluminio.png',
    title: 'Ventanas de Aluminio',
    description: 'Ventanas de alto rendimiento con marco de aluminio, ideales para proyectos modernos y duraderos.',
    additionalDescription: 'Nuestras ventanas de aluminio están diseñadas para ofrecer máxima resistencia y durabilidad. Fabricadas con perfiles de alta calidad, proporcionan excelente resistencia a la intemperie, bajo mantenimiento y una estética moderna que se adapta a cualquier estilo arquitectónico. Ideales para proyectos residenciales y comerciales que requieren soluciones duraderas y elegantes.'
  },
  {
    image: '/img/ventana pvc.jpg',
    title: 'Ventanas de PVC',
    description: 'Excelente aislamiento térmico y acústico, perfectas para mejorar la eficiencia energética de tu hogar.',
    additionalDescription: 'Las ventanas de PVC representan la mejor opción en términos de eficiencia energética. Con propiedades aislantes superiores, ayudan a mantener una temperatura constante en el interior, reduciendo significativamente el consumo de energía. Además, ofrecen excelente aislamiento acústico, creando ambientes más tranquilos y confortables. Perfectas para hogares que buscan sostenibilidad y confort.'
  },
  {
    image: '/img/ventarpt.jpg',
    title: 'Ventanas RPT',
    description: 'Rotura de Puente Térmico para máximo aislamiento y eficiencia energética.',
    additionalDescription: 'Las ventanas con Rotura de Puente Térmico (RPT) combinan lo mejor de ambos mundos: la resistencia del aluminio con la eficiencia energética superior. El sistema RPT incorpora una barrera aislante entre los perfiles interior y exterior, eliminando la transferencia de temperatura. Esta tecnología avanzada garantiza el máximo confort térmico y acústico, siendo la solución ideal para proyectos que requieren los más altos estándares de eficiencia energética.'
  }
]

export default function VentanasSection({ onOpenModal }: VentanasSectionProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedItem, setSelectedItem] = useState<typeof ventanasTypes[0] | null>(null)

  const handleCardClick = (item: typeof ventanasTypes[0]) => {
    setSelectedItem(item)
    onOpen()
  }

  return (
    <Box id="ventanas" py={{ base: '12', md: '16', lg: '20' }} bg="gray.50">
      <Container maxW="container.xl">
        <VStack spacing="12">
          <Box textAlign="center" maxW="900px" mx="auto" px={{ base: '4', md: '6' }} w="100%">
            <Heading 
              fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
              color="gray.900"
              fontWeight="800"
              letterSpacing={{ base: '-0.02em', md: '-0.03em' }}
              textTransform="uppercase"
              mb={{ base: '3', md: '4' }}
              lineHeight="1.1"
            >
              VENTANAS DE PVC Y ALUMINIO
            </Heading>
            
            <Box
              w={{ base: '60px', md: '80px' }}
              h="4px"
              bgGradient="linear(to-r, red.400, red.600)"
              borderRadius="full"
              mx="auto"
              mb={{ base: '6', md: '8' }}
              boxShadow="0 2px 8px rgba(229, 62, 62, 0.3)"
            />
            
            <Text 
              fontSize={{ base: 'md', md: 'lg' }}
              color="gray.600"
              maxW="800px"
              mx="auto"
              lineHeight="1.7"
            >
              <Text as="span" fontWeight="700" color="gray.900">Tecnología, estilo y eficiencia</Text>. Contar con nuestras ventanas de alto rendimiento marca la diferencia en cualquier espacio. Ofrecemos opciones en PVC, aluminio y RPT (Rotura de Puente Térmico) que combinados con nuestros cristales de alto rendimiento.
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
              mt="6"
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

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: '6', md: '8' }} w="100%">
            {ventanasTypes.map((item, index) => (
              <Card 
                key={index} 
                bg="white" 
                boxShadow="xl" 
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.100"
                overflow="hidden"
                _hover={{
                  transform: 'translateY(-4px)',
                  boxShadow: '2xl',
                  transition: 'all 0.3s'
                }}
                transition="all 0.3s"
                cursor="pointer"
                onClick={() => handleCardClick(item)}
              >
                <Box
                  position="relative"
                  h={{ base: '200px', md: '240px' }}
                  w="100%"
                  overflow="hidden"
                  bg="gray.100"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </Box>
                
                <CardBody textAlign="center" p={{ base: '6', md: '8' }}>
                  <Heading 
                    size="md" 
                    mb="3" 
                    color="gray.800"
                    fontWeight="700"
                    fontSize={{ base: 'lg', md: 'xl' }}
                  >
                    {item.title}
                  </Heading>
                  
                  <Text 
                    color="gray.600" 
                    fontSize={{ base: 'sm', md: 'md' }}
                    lineHeight="1.6"
                  >
                    {item.description}
                  </Text>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
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
              {selectedItem && (
                <Box
                  w="100%"
                  h={{ base: '300px', md: '400px', lg: '500px' }}
                  borderRadius="lg"
                  overflow="hidden"
                  bg="gray.100"
                >
                  <Image
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    w="100%"
                    h="100%"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </Box>
              )}

              {/* Additional Description */}
              {selectedItem && (
                <Box w="100%">
                  <Heading 
                    size="lg" 
                    mb="4" 
                    color="gray.900"
                    textTransform="uppercase"
                  >
                    {selectedItem.title}
                  </Heading>
                  <Text 
                    fontSize={{ base: 'md', md: 'lg' }}
                    color="gray.600"
                    lineHeight="1.7"
                    mb="6"
                  >
                    {selectedItem.additionalDescription}
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
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

