'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  SimpleGrid,
  Image,
  Card,
  Flex,
  HStack,
} from '@chakra-ui/react'

interface ArquitecturaSectionProps {
  onOpenModal?: () => void
}

interface ServiceCard {
  id: string
  title: string
  image: string
}

const services: ServiceCard[] = [
  {
    id: 'shower',
    title: 'Shower Door',
    image: '/img/shower2.jpg'
  },
  {
    id: 'ventanas',
    title: 'Ventanas',
    image: '/img/ventana pvc.jpg'
  },
  {
    id: 'cierres',
    title: 'Cierres',
    image: '/img/cierre.jpg'
  },
  {
    id: 'espejos',
    title: 'Espejos',
    image: '/img/espejo decorativo.jpg'
  },
  {
    id: 'shower',
    title: 'Puertas',
    image: '/img/shower3.jpg'
  },
  {
    id: 'ventanas',
    title: 'Sistemas de Acceso',
    image: '/img/ventarpt.jpg'
  },
  {
    id: 'cierres',
    title: 'Barandas',
    image: '/img/cortinas5.webp'
  },
  {
    id: 'espejos',
    title: 'Espejos LED',
    image: '/img/4.png'
  }
]

const scrollToSection = (id: string) => {
  const section = document.getElementById(id)
  if (section) {
    const yOffset = -120
    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}

const stats = [
  {
    number: '25+',
    description: 'años de experiencia'
  },
  {
    number: '1000+',
    description: 'proyectos exitosos'
  },
  {
    number: '95%',
    description: 'clientes nos recomiendan'
  }
]

const partners = [
  {
    name: 'Reynaers Aluminium',
    logo: '/img/reynaers.png' // Asumiendo que el logo estará en public/img/
  },
  {
    name: 'kuraray',
    logo: '/img/kuraray.png'
  },
  {
    name: 'T-TEC',
    logo: '/img/ttec.png'
  },
  {
    name: 'BTS ALUMINIUM',
    logo: '/img/bts.png'
  },
  {
    name: 'ALBERTGENAU',
    logo: '/img/albertgenau.png'
  }
]

// Partners para mobile (solo 3)
const mobilePartners = [
  {
    name: 'BTS ALUMINIUM',
    logo: '/img/bts.png'
  },
  {
    name: 'kuraray',
    logo: '/img/kuraray.png'
  },
  {
    name: 'Reynaers Aluminium',
    logo: '/img/reynaers.png'
  }
]

export default function ArquitecturaSection({ onOpenModal }: ArquitecturaSectionProps) {
  return (
    <Box id="arquitectura">
      {/* Stats and Partners Section */}
      <Box 
        bgGradient="linear(to-br, gray.50, yellow.50)"
      >
        <Container maxW="container.xl">
          {/* Stats Section */}
          <Box py={{ base: '8', sm: '10', md: '16' }}>
            <SimpleGrid 
              columns={3} 
              spacing={{ base: '3', sm: '4', md: '8' }}
            >
              {stats.map((stat, index) => (
                <Box
                  key={index}
                  textAlign="center"
                  p={{ base: '4', sm: '5', md: '8' }}
                  bg="blue.900"
                  borderRadius={{ base: 'md', md: 'lg' }}
                  boxShadow="lg"
                  _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: 'xl',
                    transition: 'all 0.3s'
                  }}
                  transition="all 0.3s"
                >
                  <Heading
                    size={{ base: 'md', sm: 'lg', md: 'xl' }}
                    color="white"
                    fontWeight="bold"
                    lineHeight="1"
                    mb={{ base: '1', md: '2' }}
                  >
                    {stat.number}
                  </Heading>
                  <Text
                    color="white"
                    fontSize={{ base: '2xs', sm: 'xs', md: 'md' }}
                    fontWeight="medium"
                    lineHeight={{ base: '1.2', sm: '1.3', md: '1.5' }}
                  >
                    {stat.description}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          {/* Partners Section - Aligned with stats */}
          <Box 
            py={{ base: '6', sm: '8', md: '10' }} 
            borderTop="1px solid"
            borderColor="gray.200"
          >
            {/* Mobile: Solo 3 logos en fila */}
            <Flex
              display={{ base: 'flex', md: 'none' }}
              direction="row"
              align="center"
              justify="space-around"
              gap={{ base: '1', sm: '2', md: '4' }}
              px={{ base: '2', sm: '4' }}
            >
              {mobilePartners.map((partner, index) => (
                <Box
                  key={index}
                  flex="1"
                  minW={{ base: '90px', sm: '100px' }}
                  maxW={{ base: '110px', sm: '120px' }}
                  h={{ base: '50px', sm: '60px' }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  px={{ base: '2', sm: '3' }}
                  py={{ base: '2', sm: '3' }}
                  bg="white"
                  borderRadius={{ base: 'md', sm: 'lg' }}
                  boxShadow="sm"
                  border="1px solid"
                  borderColor="gray.100"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    maxH="100%"
                    maxW="100%"
                    objectFit="contain"
                    filter="grayscale(80%) opacity(0.8)"
                    transition="all 0.3s"
                  />
                </Box>
              ))}
            </Flex>

            {/* Desktop: Todos los logos */}
            <Flex
              display={{ base: 'none', md: 'flex' }}
              direction="row"
              align="center"
              justify="space-between"
              wrap="wrap"
              gap={{ base: '4', lg: '6' }}
            >
              {partners.map((partner, index) => (
                <Box
                  key={index}
                  flex="1"
                  minW={{ md: '160px', lg: '180px' }}
                  maxW={{ md: '200px', lg: '220px' }}
                  h={{ md: '90px', lg: '100px' }}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  px="6"
                  py="6"
                  bg="white"
                  borderRadius="lg"
                  boxShadow="sm"
                  border="1px solid"
                  borderColor="gray.100"
                  _hover={{
                    transform: 'translateY(-4px)',
                    boxShadow: 'md',
                    borderColor: 'blue.200',
                    transition: 'all 0.3s'
                  }}
                  transition="all 0.3s"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    maxH="100%"
                    maxW="100%"
                    objectFit="contain"
                    filter="grayscale(80%) opacity(0.8)"
                    transition="all 0.3s"
                    _hover={{
                      filter: 'grayscale(0%) opacity(1)',
                    }}
                  />
                </Box>
              ))}
            </Flex>
          </Box>
        </Container>
      </Box>

      {/* Main Content Section */}
      <Box py={{ base: '4', sm: '6', md: '8', lg: '10' }} bg="white">
        <Container maxW="container.xl">
          <VStack spacing={{ base: '6', md: '8' }}>
            <Box textAlign="center" maxW="900px" mx="auto" px={{ base: '4', sm: '5', md: '6' }} w="100%">
            <Heading 
              fontSize={{ base: 'xl', sm: '2xl', md: '3xl', lg: '4xl' }}
              color="gray.900"
              fontWeight="800"
              letterSpacing={{ base: '-0.01em', md: '-0.03em' }}
              textTransform="uppercase"
              mb={{ base: '2', sm: '3', md: '4' }}
              lineHeight="1.1"
            >
              ARQUITECTURA
            </Heading>
            
            <Box
              w={{ base: '50px', sm: '60px', md: '80px' }}
              h={{ base: '3px', md: '4px' }}
              bgGradient="linear(to-r, red.400, red.600)"
              borderRadius="full"
              mx="auto"
              mb={{ base: '4', sm: '5', md: '8' }}
              boxShadow="0 2px 8px rgba(229, 62, 62, 0.3)"
            />
            
            <Text 
              fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
              color="gray.700"
              maxW="800px"
              mx="auto"
              lineHeight={{ base: '1.6', md: '1.7' }}
              mb={{ base: '3', md: '4' }}
            >
              <Text as="span" fontWeight="700" color="gray.900">Innovación, diseño y seguridad</Text>
            </Text>
            
            <Text 
              fontSize={{ base: 'sm', sm: 'md', md: 'lg' }}
              color="gray.600"
              maxW="800px"
              mx="auto"
              lineHeight={{ base: '1.6', md: '1.7' }}
            >
              En Arte Cristal ofrecemos cristales de alta calidad para todo tipo de proyectos arquitectónicos, combinando diseño, funcionalidad y seguridad con un acabado impecable.
            </Text>
            </Box>

            {/* Services Gallery */}
            <SimpleGrid 
              columns={{ base: 2, md: 3 }} 
              spacing={{ base: '2', sm: '3', md: '4' }}
              w="100%"
              mt={{ base: '4', md: '6' }}
              px={{ base: '2', sm: '4', md: '0' }}
            >
              {services.map((service, index) => (
                <Card
                  key={index}
                  overflow="hidden"
                  borderRadius="lg"
                  cursor="pointer"
                  bg="white"
                  boxShadow="md"
                  _hover={{
                    transform: 'translateY(-8px)',
                    boxShadow: 'xl',
                    transition: 'all 0.3s'
                  }}
                  transition="all 0.3s"
                  onClick={() => scrollToSection(service.id)}
                >
                  <Box
                    position="relative"
                    h={{ base: '120px', sm: '140px', md: '180px', lg: '200px' }}
                    w="100%"
                    overflow="hidden"
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      w="100%"
                      h="100%"
                      objectFit="cover"
                      objectPosition="center"
                      transition="transform 0.3s"
                      _groupHover={{
                        transform: 'scale(1.1)'
                      }}
                    />
                    <Box
                      position="absolute"
                      bottom="0"
                      left="0"
                      right="0"
                      bgGradient="linear(to-t, rgba(0,0,0,0.7), transparent)"
                      p={{ base: '2', sm: '3', md: '4' }}
                    >
                      <Heading
                        size={{ base: 'xs', sm: 'sm' }}
                        color="white"
                        fontWeight="bold"
                        textTransform="uppercase"
                        fontSize={{ base: '10px', sm: 'xs', md: 'sm' }}
                      >
                        {service.title}
                      </Heading>
                    </Box>
                  </Box>
                </Card>
              ))}
            </SimpleGrid>

            {/* Divider Line */}
            <Box
              w="100%"
              h="1px"
              bg="gray.200"
              mt={{ base: '4', md: '6' }}
              mb={{ base: '1', md: '2' }}
            />
              
              <Button
                onClick={onOpenModal}
                bg="cyan.500"
                color="white"
                fontWeight="bold"
                textTransform="uppercase"
                fontSize={{ base: 'sm', md: 'md' }}
                px={{ base: '6', md: '8' }}
                py={{ base: '5', md: '6' }}
                borderRadius="md"
                mt={{ base: '1', md: '2' }}
                boxShadow="0 4px 14px rgba(6, 182, 212, 0.4)"
                _hover={{
                  bg: 'cyan.600',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(6, 182, 212, 0.5)'
                }}
                _active={{
                  bg: 'cyan.700',
                  transform: 'translateY(0px)',
                  boxShadow: '0 2px 10px rgba(6, 182, 212, 0.4)'
                }}
                transition="all 0.2s ease"
              >
                Cotizar
              </Button>
          </VStack>
        </Container>
      </Box>
    </Box>
  )
}

