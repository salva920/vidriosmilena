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
} from '@chakra-ui/react'

interface CierresSectionProps {
  onOpenModal?: () => void
}

const cierresTypes = [
  {
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Cierres de Vidrio',
    description: 'Sistemas de cierre modernos con vidrios de alta calidad para espacios interiores y exteriores.'
  },
  {
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Barandas de Vidrio',
    description: 'Barandas de seguridad con vidrio templado para balcones, escaleras y terrazas.'
  },
  {
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    title: 'Pasamanos de Vidrio',
    description: 'Pasamanos de vidrio templado con estructura de acero inoxidable para proyectos arquitectónicos.'
  }
]

export default function CierresSection({ onOpenModal }: CierresSectionProps) {
  return (
    <Box id="cierres" py={{ base: '12', md: '16', lg: '20' }} bg="gray.50">
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
              CIERRES Y BARANDAS
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
              Soluciones de seguridad y diseño con cierres y barandas de vidrio templado para proyectos residenciales y comerciales.
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
            {cierresTypes.map((item, index) => (
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
    </Box>
  )
}

