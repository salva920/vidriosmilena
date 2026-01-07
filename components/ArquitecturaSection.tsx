'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  SimpleGrid,
} from '@chakra-ui/react'

interface ArquitecturaSectionProps {
  onOpenModal?: () => void
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
        </VStack>
      </Container>
    </Box>
  )
}

