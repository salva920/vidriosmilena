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
    id: 'cortinas',
    title: 'Cortinas',
    image: '/img/cortinas1.jpg'
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
    image: '/img/baranda3.jpg'
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

export default function ArquitecturaSection({ onOpenModal }: ArquitecturaSectionProps) {
  return (
    <Box id="arquitectura">
      {/* Stats Section - Beige background */}
      <Box 
        py={{ base: '12', md: '16' }} 
        bgGradient="linear(to-br, gray.50, yellow.50)"
      >
        <Container maxW="container.xl">
          <SimpleGrid 
            columns={{ base: 1, sm: 3 }} 
            spacing={{ base: '6', md: '8' }}
          >
            {stats.map((stat, index) => (
              <Box
                key={index}
                textAlign="center"
                p={{ base: '6', md: '8' }}
                bg="blue.900"
                borderRadius="lg"
                boxShadow="lg"
                _hover={{
                  transform: 'translateY(-4px)',
                  boxShadow: 'xl',
                  transition: 'all 0.3s'
                }}
                transition="all 0.3s"
              >
                <Heading
                  size="xl"
                  color="white"
                  fontWeight="bold"
                  lineHeight="1"
                  mb="2"
                >
                  {stat.number}
                </Heading>
                <Text
                  color="white"
                  fontSize={{ base: 'sm', md: 'md' }}
                  fontWeight="medium"
                >
                  {stat.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Partners Section - White background */}
      <Box 
        py={{ base: '8', md: '12' }} 
        bg="white"
      >
        <Container maxW="container.xl">
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            justify="space-around"
            wrap="wrap"
            gap={{ base: '6', md: '8' }}
          >
            {partners.map((partner, index) => (
              <Box
                key={index}
                flex="1"
                minW={{ base: '120px', md: '150px' }}
                maxW={{ base: '150px', md: '200px' }}
                h={{ base: '60px', md: '80px' }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                opacity="0.7"
                _hover={{
                  opacity: 1,
                  transform: 'scale(1.05)',
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
                  filter="grayscale(100%)"
                  _hover={{
                    filter: 'grayscale(0%)',
                    transition: 'filter 0.3s'
                  }}
                />
              </Box>
            ))}
          </Flex>
        </Container>
      </Box>

      {/* Main Content Section */}
      <Box py={{ base: '12', md: '16', lg: '20' }} bgGradient="linear(to-br, blue.300, blue.400)">
        <Container maxW="container.xl">
          <VStack spacing="8">
            <Box textAlign="center" maxW="900px" mx="auto" px={{ base: '4', md: '6' }} w="100%">
            <Heading 
              fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
              color="blue.900"
              fontWeight="800"
              letterSpacing={{ base: '-0.02em', md: '-0.03em' }}
              textTransform="uppercase"
              mb={{ base: '3', md: '4' }}
              lineHeight="1.1"
            >
              ARQUITECTURA
            </Heading>
            
            <Box
              w={{ base: '60px', md: '80px' }}
              h="4px"
              bgGradient="linear(to-r, blue.500, blue.700)"
              borderRadius="full"
              mx="auto"
              mb={{ base: '6', md: '8' }}
              boxShadow="0 2px 8px rgba(37, 99, 235, 0.3)"
            />
            
            <Text 
              fontSize={{ base: 'md', md: 'lg' }}
              color="blue.700"
              maxW="800px"
              mx="auto"
              lineHeight="1.7"
              mb="4"
            >
              <Text as="span" fontWeight="700" color="blue.900">Innovación, diseño y seguridad</Text>
            </Text>
            
            <Text 
              fontSize={{ base: 'md', md: 'lg' }}
              color="blue.800"
              maxW="800px"
              mx="auto"
              lineHeight="1.7"
            >
              En Arte Cristal ofrecemos cristales de alta calidad para todo tipo de proyectos arquitectónicos, combinando diseño, funcionalidad y seguridad con un acabado impecable.
            </Text>
            </Box>

            {/* Services Gallery */}
            <SimpleGrid 
              columns={{ base: 2, md: 3 }} 
              spacing={{ base: '4', md: '6' }}
              w="100%"
              mt="8"
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
                    h={{ base: '200px', md: '250px', lg: '280px' }}
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
                      p="4"
                    >
                      <Heading
                        size="sm"
                        color="white"
                        fontWeight="bold"
                        textTransform="uppercase"
                      >
                        {service.title}
                      </Heading>
                    </Box>
                  </Box>
                </Card>
              ))}
            </SimpleGrid>
              
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
                mt="8"
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
        </Container>
      </Box>
    </Box>
  )
}

