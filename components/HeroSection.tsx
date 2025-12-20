'use client'

import { Box, Container, Text, Button, VStack, HStack, Flex, Badge } from '@chakra-ui/react'
import TitleCarousel from './TitleCarousel'
import ImageCarousel from './ImageCarousel'

interface RotatingTitle {
  line1: string
  line2: string
  line3: string
}

interface HeroSectionProps {
  rotatingTitles: RotatingTitle[]
  images: string[]
  onScrollToContact: () => void
  onOpenModal: () => void
}

export default function HeroSection({ 
  rotatingTitles, 
  images, 
  onScrollToContact, 
  onOpenModal 
}: HeroSectionProps) {
  return (
    <Box
      id="inicio"
      bg="linear(to-br, blue.50, gray.50)"
      minH="100vh"
      display="flex"
      alignItems="center"
      position="relative"
      overflow="hidden"
    >
      <Container maxW="container.xl">
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          gap="8"
          py="20"
        >
          <Box flex="1">
            <VStack align="start" spacing="8">
              <Badge
                bg="blue.500"
                color="white"
                px="5"
                py="2.5"
                borderRadius="full"
                fontSize="sm"
                fontWeight="bold"
                letterSpacing="wide"
                textTransform="uppercase"
                boxShadow="sm"
              >
                ⭐ Expertos en Vidrios desde 2010
              </Badge>
              
              <TitleCarousel titles={rotatingTitles} />
              
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="gray.700"
                lineHeight="1.8"
                maxW="600px"
                fontWeight="500"
                pt="1"
              >
                Soluciones integrales para tu hogar y negocio. 
                <Text as="span" color="blue.600" fontWeight="semibold">
                  Vidrios templados, laminados, espejos decorativos
                </Text>
                {' '}y más. Calidad profesional que transforma espacios.
              </Text>
              
              <HStack spacing="4" pt="6">
                <Button
                  size="lg"
                  bg="blue.600"
                  color="white"
                  px="10"
                  py="7"
                  fontSize="md"
                  fontWeight="bold"
                  borderRadius="md"
                  _hover={{ 
                    bg: 'blue.700',
                    transform: 'translateY(-2px)',
                    boxShadow: 'xl'
                  }}
                  transition="all 0.3s"
                  boxShadow="lg"
                  letterSpacing="wide"
                  textTransform="uppercase"
                  onClick={onScrollToContact}
                >
                  Solicitar Cotización
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  borderWidth="2px"
                  borderColor="gray.300"
                  color="gray.700"
                  px="10"
                  py="7"
                  fontSize="md"
                  fontWeight="bold"
                  borderRadius="md"
                  _hover={{ 
                    bg: 'gray.50',
                    borderColor: 'blue.500',
                    color: 'blue.600',
                    transform: 'translateY(-2px)'
                  }}
                  transition="all 0.3s"
                  letterSpacing="wide"
                  textTransform="uppercase"
                  onClick={onOpenModal}
                >
                  Llamar Ahora
                </Button>
              </HStack>
            </VStack>
          </Box>
          
          <Box flex="1">
            <ImageCarousel images={images} />
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

