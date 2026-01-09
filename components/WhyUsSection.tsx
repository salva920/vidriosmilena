'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
  Image,
} from '@chakra-ui/react'
import { FiCheck, FiChevronDown } from 'react-icons/fi'

interface WhyUsSectionProps {
  onScrollToContact: () => void
}

const whyUsItems = [
  {
    title: 'LEALTAD',
    description: 'Somos la tercera generación en la industria de vidrios en Venezuela.',
    defaultIndex: 0
  },
  {
    title: 'CONOCIMIENTO Y EXPERIENCIA',
    description: 'Más de 25 años de experiencia en el mercado, brindando soluciones de calidad y confianza.'
  },
  {
    title: 'MAQUINARIAS',
    description: 'Contamos con tecnología de vanguardia y maquinarias modernas para garantizar la mejor calidad en nuestros productos.'
  },
  {
    title: 'DIVERSIDAD',
    description: 'Amplia gama de productos y servicios para satisfacer todas tus necesidades en vidrios, aluminio y acero inoxidable.'
  }
]

export default function WhyUsSection({ onScrollToContact }: WhyUsSectionProps) {
  return (
    <Box bg="gray.50">
      {/* Blue Header Bar */}
      <Box bg="blue.600" py={{ base: '4', md: '5' }}>
        <Container maxW="container.xl">
          <Flex
            justify="space-between"
            align="center"
            flexDirection={{ base: 'column', md: 'row' }}
            gap={{ base: '4', md: '0' }}
          >
            <Text
              color="white"
              fontSize={{ base: 'sm', md: 'md', lg: 'lg' }}
              fontWeight="600"
              textAlign={{ base: 'center', md: 'left' }}
            >
              Líderes en vidrios templados, laminados, blindados y monolíticos.
            </Text>
            <Button
              bg="cyan.500"
              color="white"
              fontWeight="bold"
              fontSize={{ base: 'xs', md: 'sm' }}
              textTransform="uppercase"
              px={{ base: '4', md: '6' }}
              py={{ base: '2', md: '3' }}
              borderRadius="md"
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
              onClick={onScrollToContact}
            >
              SOLICITA COTIZACIÓN
            </Button>
          </Flex>
        </Container>
      </Box>

      {/* Main Content Section */}
      <Box py={{ base: '12', md: '16', lg: '20' }} bg="gray.50">
        <Container maxW="container.xl">
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            gap={{ base: '8', lg: '12' }}
            align="stretch"
          >
            {/* Left Column - Image */}
            <Box
              flex="1"
              display={{ base: 'none', lg: 'block' }}
              position="relative"
              borderRadius="xl"
              overflow="hidden"
              boxShadow="2xl"
            >
              <Image
                src="/img/Brown Macro Coffee Brand Guidelines Presentation.png"
                alt="Maquinaria de vidrios"
                objectFit="cover"
                w="100%"
                h="100%"
                minH="500px"
              />
            </Box>

            {/* Right Column - Accordion */}
            <Box flex="1" w="100%">
              <VStack spacing="8" align="stretch">
                <Box>
                  <Heading
                    fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
                    color="gray.900"
                    fontWeight="800"
                    letterSpacing={{ base: '-0.02em', md: '-0.03em' }}
                    textTransform="uppercase"
                    mb={{ base: '3', md: '4' }}
                    lineHeight="1.1"
                  >
                    ¿POR QUÉ NOSOTROS?
                  </Heading>
                  
                  <Box
                    w={{ base: '60px', md: '80px' }}
                    h="4px"
                    bgGradient="linear(to-r, cyan.400, cyan.600)"
                    borderRadius="full"
                    boxShadow="0 2px 8px rgba(6, 182, 212, 0.3)"
                  />
                </Box>

                <Accordion defaultIndex={[0]} allowMultiple>
                  {whyUsItems.map((item, index) => (
                    <AccordionItem
                      key={index}
                      border="none"
                      mb="4"
                      bg="white"
                      borderRadius="lg"
                      boxShadow="md"
                      overflow="hidden"
                      _hover={{
                        boxShadow: 'lg'
                      }}
                      transition="all 0.3s"
                    >
                      {({ isExpanded }: { isExpanded: boolean }) => (
                        <>
                          <AccordionButton
                            bg={isExpanded ? 'cyan.500' : 'white'}
                            color={isExpanded ? 'white' : 'gray.800'}
                            py={{ base: '4', md: '5' }}
                            px={{ base: '4', md: '6' }}
                            _hover={{
                              bg: isExpanded ? 'cyan.600' : 'gray.50'
                            }}
                            transition="all 0.3s"
                          >
                            <HStack flex="1" textAlign="left" spacing="4">
                              <Box
                                color={isExpanded ? 'white' : 'gray.600'}
                                fontSize="xl"
                              >
                                <FiCheck />
                              </Box>
                              <Heading
                                fontSize={{ base: 'md', md: 'lg' }}
                                fontWeight="700"
                                textTransform="uppercase"
                                flex="1"
                              >
                                {item.title}
                              </Heading>
                            </HStack>
                            <AccordionIcon
                              color={isExpanded ? 'white' : 'gray.600'}
                              fontSize="xl"
                            />
                          </AccordionButton>
                          
                          <AccordionPanel
                            pb={{ base: '4', md: '5' }}
                            px={{ base: '4', md: '6' }}
                            bg="white"
                          >
                            <Text
                              color="gray.700"
                              fontSize={{ base: 'sm', md: 'md' }}
                              lineHeight="1.7"
                              pt="2"
                            >
                              {item.description}
                            </Text>
                          </AccordionPanel>
                        </>
                      )}
                    </AccordionItem>
                  ))}
                </Accordion>
              </VStack>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  )
}

