'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'

export default function ArquitecturaSection() {
  return (
    <Box id="arquitectura" py={{ base: '12', md: '16', lg: '20' }} bg="white">
      <Container maxW="container.xl">
        <VStack spacing="8">
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
              ARQUITECTURA
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
              mb="4"
            >
              <Text as="span" fontWeight="700" color="gray.900">Innovación, diseño y seguridad</Text>
            </Text>
            
            <Text 
              fontSize={{ base: 'md', md: 'lg' }}
              color="gray.700"
              maxW="800px"
              mx="auto"
              lineHeight="1.7"
            >
              En MILEGLASS ofrecemos cristales de alta calidad para todo tipo de proyectos arquitectónicos, combinando diseño, funcionalidad y seguridad con un acabado impecable.
            </Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  )
}

