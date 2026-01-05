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
        <VStack spacing="16">
          <VStack spacing="6" align="center" maxW="900px" mx="auto">
            <Heading 
              size="2xl" 
              color="gray.800"
              fontWeight="700"
              letterSpacing="tight"
              textTransform="uppercase"
            >
              PRODUCTOS Y SERVICIOS
            </Heading>
            <Box
              w="80px"
              h="4px"
              bg="red.500"
              borderRadius="full"
            />
            <VStack spacing="4" align="center" mt="2">
              <Text 
                fontSize={{ base: 'md', md: 'lg' }}
                color="gray.700"
                lineHeight="1.8"
                textAlign="center"
                fontWeight="400"
                letterSpacing="0.01em"
              >
                Nos caracterizamos por nuestro <Text as="span" fontWeight="600" color="gray.800">diseño tecnológico, innovador y funcional</Text>. Nuestra línea de maquinarias modernas nos ha permitido dar un paso más en la fabricación de vidrio templado y laminado.
              </Text>
              <Text 
                fontSize={{ base: 'md', md: 'lg' }}
                color="gray.600"
                lineHeight="1.8"
                textAlign="center"
                fontWeight="400"
                letterSpacing="0.01em"
              >
                Brindamos una <Text as="span" fontWeight="600" color="gray.800">amplia y moderna selección de productos</Text> que se adaptan a las necesidades de tu proyecto. Si necesitas más información, no dudes en contactarnos y solicitar un presupuesto sin compromiso.
              </Text>
            </VStack>
          </VStack>
          
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="8">
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
      </Container>
    </Box>
  )
}

