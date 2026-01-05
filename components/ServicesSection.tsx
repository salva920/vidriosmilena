'use client'

import { Box, Container, Heading, Text, VStack, SimpleGrid, Card, CardBody } from '@chakra-ui/react'

interface Service {
  icon: string
  title: string
  description: string
}

const services: Service[] = [
  {
    icon: '🔲',
    title: 'Vidrios Templados',
    description: 'Cristales de seguridad resistentes y duraderos para ventanas, puertas y divisiones.'
  },
  {
    icon: '🪟',
    title: 'Vidrios Laminados',
    description: 'Protección adicional contra impactos y ruido, ideales para zonas de alto tráfico.'
  },
  {
    icon: '🪞',
    title: 'Espejos Decorativos',
    description: 'Espejos de diferentes tamaños y formas para decorar y ampliar visualmente tu espacio.'
  },
  {
    icon: '🪑',
    title: 'Cristales para Muebles',
    description: 'Vidrios especializados para estanterías, mesas, vitrinas y muebles modernos.'
  },
  {
    icon: '🔧',
    title: 'Instalación Profesional',
    description: 'Servicio de instalación con técnicos especializados y herramientas profesionales.'
  },
  {
    icon: '🛠️',
    title: 'Reparación y Mantenimiento',
    description: 'Servicio de reparación de vidrios dañados y mantenimiento preventivo.'
  }
]

interface ServicesSectionProps {
  onScrollToContact: () => void
}

export default function ServicesSection({ onScrollToContact }: ServicesSectionProps) {
  return (
    <Box id="servicios" py="20" bg="white">
      <Container maxW="container.xl">
        <VStack spacing="12">
          {/* Header Section */}
          <Box textAlign="center" maxW="850px" mx="auto" px={{ base: '4', md: '6' }} w="100%">
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
            
            <Text 
              fontSize={{ base: 'md', md: 'lg' }}
              color="gray.600"
              maxW="700px"
              mx="auto"
              lineHeight="1.7"
            >
              Nos caracterizamos por nuestro <Text as="span" fontWeight="700" color="gray.900">diseño tecnológico, innovador y funcional</Text>. Nuestra línea de maquinarias modernas nos ha permitido dar un paso más en la fabricación de vidrio templado y laminado, brindándote una <Text as="span" fontWeight="700" color="gray.900">amplia y moderna selección de productos</Text> que se adaptan a las necesidades de tu proyecto.
            </Text>
          </Box>
          
          {/* Services Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: '6', md: '8' }} w="100%">
            {services.map((service, index) => (
              <Card 
                key={index} 
                bg="white" 
                boxShadow="xl" 
                borderRadius="xl"
                border="1px solid"
                borderColor="gray.100"
                _hover={{
                  transform: 'translateY(-4px)',
                  boxShadow: '2xl',
                  transition: 'all 0.3s'
                }}
                transition="all 0.3s"
              >
                <CardBody textAlign="center" p={{ base: '6', md: '8' }}>
                  {/* Icon in red square */}
                  <Box
                    w={{ base: '14', md: '16' }}
                    h={{ base: '14', md: '16' }}
                    bg="red.600"
                    borderRadius="lg"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mb="5"
                    mx="auto"
                    boxShadow="0 4px 12px rgba(229, 62, 62, 0.3)"
                  >
                    <Text color="white" fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold">
                      {service.icon}
                    </Text>
                  </Box>
                  
                  <Heading 
                    size="md" 
                    mb="3" 
                    color="gray.800"
                    fontWeight="700"
                    fontSize={{ base: 'lg', md: 'xl' }}
                  >
                    {service.title}
                  </Heading>
                  
                  <Text 
                    color="gray.600" 
                    fontSize={{ base: 'sm', md: 'md' }}
                    lineHeight="1.6"
                  >
                    {service.description}
                  </Text>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  )
}

