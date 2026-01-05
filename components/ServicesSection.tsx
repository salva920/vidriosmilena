'use client'

import { Box, Container, Heading, Text, VStack, SimpleGrid, Card, CardBody, Button, Image } from '@chakra-ui/react'

interface Service {
  image: string
  title: string
  description: string
}

const services: Service[] = [
  {
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    title: 'Vidrios Templados',
    description: 'Cristales de seguridad resistentes y duraderos para ventanas, puertas y divisiones.'
  },
  {
    image: 'https://ve.all.biz/img/ve/catalog/7014.jpeg',
    title: 'Vidrios Laminados',
    description: 'Protección adicional contra impactos y ruido, ideales para zonas de alto tráfico.'
  },
  {
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    title: 'Espejos Decorativos',
    description: 'Espejos de diferentes tamaños y formas para decorar y ampliar visualmente tu espacio.'
  },
  {
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    title: 'Cristales para Muebles',
    description: 'Vidrios especializados para estanterías, mesas, vitrinas y muebles modernos.'
  },
  {
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    title: 'Instalación Profesional',
    description: 'Servicio de instalación con técnicos especializados y herramientas profesionales.'
  },
  {
    image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    title: 'Reparación y Mantenimiento',
    description: 'Servicio de reparación de vidrios dañados y mantenimiento preventivo.'
  }
]

interface ServicesSectionProps {
  onScrollToContact: () => void
}

export default function ServicesSection({ onScrollToContact }: ServicesSectionProps) {
  return (
    <Box id="servicios" py="20" bg="gray.50">
      <Container maxW="container.xl">
        <VStack spacing="8">
          {/* Header Section */}
          <Box 
            textAlign="center" 
            maxW="850px" 
            mx="auto"
            px={{ base: '4', md: '6' }}
            w="100%"
          >
            <Heading 
              fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
              color="gray.900"
              fontWeight="800"
              letterSpacing={{ base: '-0.02em', md: '-0.03em' }}
              textTransform="uppercase"
              mb={{ base: '3', md: '4' }}
              lineHeight="1.1"
            >
              PRODUCTOS Y SERVICIOS
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
          </Box>

          {/* Integrated Content: Description Card + Service Cards */}
          <VStack spacing="8" w="100%">
            {/* Description Card - Same style as service cards */}
            <Box
              bg="white"
              p={{ base: '6', md: '8', lg: '10' }}
              borderRadius="xl"
              boxShadow="xl"
              w="100%"
              maxW="1200px"
              mx="auto"
            >
              <VStack spacing={{ base: '5', md: '6' }} align="stretch">
                <Text 
                  fontSize={{ base: '16px', md: '18px', lg: '20px' }}
                  color="gray.700"
                  lineHeight={{ base: '1.7', md: '1.8' }}
                  textAlign="center"
                  fontWeight="400"
                  letterSpacing="0.01em"
                >
                  Nos caracterizamos por nuestro <Text as="span" fontWeight="700" color="gray.900" fontSize="inherit">diseño tecnológico, innovador y funcional</Text>. Nuestra línea de maquinarias modernas nos ha permitido dar un paso más en la fabricación de vidrio templado y laminado.
                </Text>
                
                <Box
                  w="40px"
                  h="2px"
                  bg="gray.200"
                  mx="auto"
                  borderRadius="full"
                />
                
                <Text 
                  fontSize={{ base: '16px', md: '18px', lg: '20px' }}
                  color="gray.600"
                  lineHeight={{ base: '1.7', md: '1.8' }}
                  textAlign="center"
                  fontWeight="400"
                  letterSpacing="0.01em"
                >
                  Brindamos una <Text as="span" fontWeight="700" color="gray.900" fontSize="inherit">amplia y moderna selección de productos</Text> que se adaptan a las necesidades de tu proyecto. Si necesitas más información, no dudes en contactarnos y solicitar un presupuesto sin compromiso.
                </Text>
              </VStack>
            </Box>

            {/* Service Cards Grid */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="8" w="100%">
            {services.map((service, index) => (
              <Card key={index} bg="white" overflow="hidden" boxShadow="xl" borderRadius="xl">
                <Image
                  src={service.image}
                  alt={service.title}
                  height="200px"
                  objectFit="cover"
                />
                <CardBody p="6">
                  <Heading size="md" mb="3" color="gray.800">
                    {service.title}
                  </Heading>
                  <Text color="gray.600" fontSize="sm" mb="4">
                    {service.description}
                  </Text>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    variant="outline"
                    width="full"
                    onClick={onScrollToContact}
                  >
                    Más Información
                  </Button>
                </CardBody>
              </Card>
            ))}
            </SimpleGrid>
          </VStack>
        </VStack>
      </Container>
    </Box>
  )
}

