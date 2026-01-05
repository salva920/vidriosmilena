'use client'

import {
  Box,
  Container,
  SimpleGrid,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react'

interface Stat {
  number: string
  description: string
}

const stats: Stat[] = [
  {
    number: '25+',
    description: 'Más de 25 años de experiencia en el mercado.'
  },
  {
    number: '4',
    description: 'Capacidad máxima de templado es de 2.30m x 4.20m'
  },
  {
    number: '1000+',
    description: 'Clientes satisfechos'
  },
  {
    number: '19',
    description: 'Medida de templado de vidrios desde 4mm a 19mm'
  }
]

export default function StatsSection() {
  return (
    <Box 
      py={{ base: '16', md: '20' }} 
      bg="blue.900"
      position="relative"
      overflow="hidden"
    >
      {/* Background pattern overlay */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        opacity="0.1"
        backgroundImage="radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)"
        backgroundSize="20px 20px"
      />
      
      {/* Blurred figures in background */}
      <Box
        position="absolute"
        top="50%"
        left="10%"
        transform="translateY(-50%)"
        w="200px"
        h="200px"
        bg="white"
        opacity="0.05"
        borderRadius="full"
        filter="blur(40px)"
        display={{ base: 'none', lg: 'block' }}
      />
      <Box
        position="absolute"
        top="30%"
        right="15%"
        w="150px"
        h="150px"
        bg="white"
        opacity="0.05"
        borderRadius="full"
        filter="blur(40px)"
        display={{ base: 'none', lg: 'block' }}
      />

      <Container maxW="container.xl" position="relative" zIndex={1}>
        <SimpleGrid 
          columns={{ base: 1, sm: 2, lg: 4 }} 
          spacing={{ base: '8', md: '12' }}
        >
          {stats.map((stat, index) => (
            <VStack
              key={index}
              spacing="3"
              textAlign="center"
              p={{ base: '4', md: '6' }}
              bg="white"
              borderRadius="lg"
              boxShadow="xl"
              _hover={{
                transform: 'translateY(-4px)',
                boxShadow: '2xl',
                transition: 'all 0.3s'
              }}
              transition="all 0.3s"
            >
              <Heading
                size="2xl"
                color="blue.600"
                fontWeight="bold"
                lineHeight="1"
              >
                {stat.number}
              </Heading>
              <Text
                color="gray.700"
                fontSize={{ base: 'sm', md: 'md' }}
                fontWeight="medium"
                maxW="200px"
              >
                {stat.description}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}

