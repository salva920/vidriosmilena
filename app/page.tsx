'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  SimpleGrid,
  Card,
  CardBody,
  Flex,
  Image,
  Badge,
  Divider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'
import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG } from './config/emailjs'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: ''
  })

  // Configuración de EmailJS desde archivo externo
  // Número de WhatsApp - puede configurarse mediante variable de entorno
  const numeroWhatsApp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '584122176537'

  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Configurar EmailJS
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)

      // Preparar los parámetros del template
      const templateParams = {
        from_name: formData.name,
        from_phone: formData.phone,
        service_type: formData.service,
        message: formData.message,
        to_email: EMAILJS_CONFIG.TO_EMAIL
      }

      // Enviar el email
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      )

      // Formatear el mensaje para WhatsApp
      const mensaje = `🏠 *Nueva Solicitud de Cotización - Vidrios Premium*

👤 *Información del Cliente:*
• Nombre: ${formData.name}
• Teléfono: ${formData.phone}

🔧 *Servicio Solicitado:*
• ${formData.service}

${formData.message ? `📝 *Mensaje:*\n${formData.message}\n\n` : ''}⏰ *Fecha:* ${new Date().toLocaleString('es-VE', { dateStyle: 'long', timeStyle: 'short' })}

_Generado desde el formulario de contacto de Vidrios Premium_`

      // Codificar el mensaje para la URL de WhatsApp
      const mensajeCodificado = encodeURIComponent(mensaje)
      const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`

      // Abrir WhatsApp en una nueva ventana
      window.open(urlWhatsApp, '_blank')

      setSubmitStatus('success')
      setFormData({
        name: '',
        phone: '',
        service: '',
        message: ''
      })
    } catch (error) {
      console.error('Error al enviar el email:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
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
              <VStack align="start" spacing="6">
                <Badge
                  colorScheme="blue"
                  variant="subtle"
                  px="4"
                  py="2"
                  borderRadius="full"
                  fontSize="sm"
                  fontWeight="semibold"
                >
                  ✨ Calidad Premium Garantizada
                </Badge>
                
                <Heading
                  as="h1"
                  size="4xl"
                  fontWeight="800"
                  lineHeight="1.2"
                  color="gray.800"
                >
                  Vidrios de{' '}
                  <Text as="span" color="blue.500">
                    Alta Calidad
                  </Text>
                  {' '}para tu Hogar
                </Heading>
                
                <Text
                  fontSize="xl"
                  color="gray.600"
                  lineHeight="1.6"
                  maxW="600px"
                >
                  Especialistas en venta e instalación de vidrios templados, 
                  laminados, espejos y cristales de seguridad. 
                  Transformamos tu espacio con la mejor calidad del mercado.
                </Text>
                
                <HStack spacing="4" pt="4">
                  <Button
                    size="lg"
                    colorScheme="blue"
                    px="8"
                    py="6"
                    fontSize="lg"
                    fontWeight="semibold"
                    onClick={scrollToContact}
                  >
                    Solicitar Cotización
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    px="8"
                    py="6"
                    fontSize="lg"
                    fontWeight="semibold"
                    onClick={onOpen}
                  >
                    Llamar Ahora
                  </Button>
                </HStack>
              </VStack>
            </Box>
            
            <Box flex="1">
              <Box
                position="relative"
                borderRadius="2xl"
                overflow="hidden"
                boxShadow="2xl"
              >
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU8TM-w_EZrFzBsb_gdsGFVT885m_FMv6KPA&s"
                  alt="Vidrios de alta calidad"
                  width="100%"
                  height="500px"
                  objectFit="cover"
                />
              </Box>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Features Section */}
      <Box py="20" bg="white">
        <Container maxW="container.xl">
          <VStack spacing="16">
            <Box textAlign="center">
              <Heading size="2xl" mb="4" color="gray.800">
                ¿Por qué elegirnos?
              </Heading>
              <Text fontSize="lg" color="gray.600" maxW="600px">
                Ofrecemos los mejores productos y servicios en el mercado de vidrios
              </Text>
            </Box>
            
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing="8">
              <Card bg="white" boxShadow="xl" borderRadius="xl">
                <CardBody textAlign="center" p="8">
                  <Box
                    w="12"
                    h="12"
                    bg="blue.500"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mb="4"
                    mx="auto"
                  >
                    <Text color="white" fontSize="xl" fontWeight="bold">🛡️</Text>
                  </Box>
                  <Heading size="md" mb="3" color="gray.800">
                    Calidad Garantizada
                  </Heading>
                  <Text color="gray.600" fontSize="sm">
                    Todos nuestros vidrios cumplen con los más altos estándares de calidad y seguridad.
                  </Text>
                </CardBody>
              </Card>

              <Card bg="white" boxShadow="xl" borderRadius="xl">
                <CardBody textAlign="center" p="8">
                  <Box
                    w="12"
                    h="12"
                    bg="blue.500"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mb="4"
                    mx="auto"
                  >
                    <Text color="white" fontSize="xl" fontWeight="bold">🚚</Text>
                  </Box>
                  <Heading size="md" mb="3" color="gray.800">
                    Instalación Rápida
                  </Heading>
                  <Text color="gray.600" fontSize="sm">
                    Servicio de instalación profesional y puntual en toda la ciudad.
                  </Text>
                </CardBody>
              </Card>

              <Card bg="white" boxShadow="xl" borderRadius="xl">
                <CardBody textAlign="center" p="8">
                  <Box
                    w="12"
                    h="12"
                    bg="blue.500"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mb="4"
                    mx="auto"
                  >
                    <Text color="white" fontSize="xl" fontWeight="bold">🔧</Text>
                  </Box>
                  <Heading size="md" mb="3" color="gray.800">
                    Mantenimiento
                  </Heading>
                  <Text color="gray.600" fontSize="sm">
                    Servicio de mantenimiento y reparación para mantener tus vidrios en perfecto estado.
                  </Text>
                </CardBody>
              </Card>

              <Card bg="white" boxShadow="xl" borderRadius="xl">
                <CardBody textAlign="center" p="8">
                  <Box
                    w="12"
                    h="12"
                    bg="blue.500"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    mb="4"
                    mx="auto"
                  >
                    <Text color="white" fontSize="xl" fontWeight="bold">⭐</Text>
                  </Box>
                  <Heading size="md" mb="3" color="gray.800">
                    Atención Premium
                  </Heading>
                  <Text color="gray.600" fontSize="sm">
                    Atención personalizada y asesoramiento experto para cada proyecto.
                  </Text>
                </CardBody>
              </Card>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Services Section */}
      <Box py="20" bg="gray.50">
        <Container maxW="container.xl">
          <VStack spacing="16">
            <Box textAlign="center">
              <Heading size="2xl" mb="4" color="gray.800">
                Nuestros Servicios
              </Heading>
              <Text fontSize="lg" color="gray.600" maxW="600px">
                Soluciones completas en vidrios para hogares y empresas
              </Text>
            </Box>
            
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="8">
              <Card bg="white" overflow="hidden" boxShadow="xl" borderRadius="xl">
                <Image
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Vidrios Templados"
                  height="200px"
                  objectFit="cover"
                />
                <CardBody p="6">
                  <Heading size="md" mb="3" color="gray.800">
                    Vidrios Templados
                  </Heading>
                  <Text color="gray.600" fontSize="sm" mb="4">
                    Cristales de seguridad resistentes y duraderos para ventanas, puertas y divisiones.
                  </Text>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant="outline"
                      width="full"
                      onClick={scrollToContact}
                    >
                      Más Información
                    </Button>
                </CardBody>
              </Card>

              <Card bg="white" overflow="hidden" boxShadow="xl" borderRadius="xl">
                <Image
                  src="https://ve.all.biz/img/ve/catalog/7014.jpeg"
                  alt="Vidrios Laminados"
                  height="200px"
                  objectFit="cover"
                />
                <CardBody p="6">
                  <Heading size="md" mb="3" color="gray.800">
                    Vidrios Laminados
                  </Heading>
                  <Text color="gray.600" fontSize="sm" mb="4">
                    Protección adicional contra impactos y ruido, ideales para zonas de alto tráfico.
                  </Text>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant="outline"
                      width="full"
                      onClick={scrollToContact}
                    >
                      Más Información
                    </Button>
                </CardBody>
              </Card>

              <Card bg="white" overflow="hidden" boxShadow="xl" borderRadius="xl">
                <Image
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Espejos Decorativos"
                  height="200px"
                  objectFit="cover"
                />
                <CardBody p="6">
                  <Heading size="md" mb="3" color="gray.800">
                    Espejos Decorativos
                  </Heading>
                  <Text color="gray.600" fontSize="sm" mb="4">
                    Espejos de diferentes tamaños y formas para decorar y ampliar visualmente tu espacio.
                  </Text>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant="outline"
                      width="full"
                      onClick={scrollToContact}
                    >
                      Más Información
                    </Button>
                </CardBody>
              </Card>

              <Card bg="white" overflow="hidden" boxShadow="xl" borderRadius="xl">
                <Image
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Cristales para Muebles"
                  height="200px"
                  objectFit="cover"
                />
                <CardBody p="6">
                  <Heading size="md" mb="3" color="gray.800">
                    Cristales para Muebles
                  </Heading>
                  <Text color="gray.600" fontSize="sm" mb="4">
                    Vidrios especializados para estanterías, mesas, vitrinas y muebles modernos.
                  </Text>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant="outline"
                      width="full"
                      onClick={scrollToContact}
                    >
                      Más Información
                    </Button>
                </CardBody>
              </Card>

              <Card bg="white" overflow="hidden" boxShadow="xl" borderRadius="xl">
                <Image
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Instalación Profesional"
                  height="200px"
                  objectFit="cover"
                />
                <CardBody p="6">
                  <Heading size="md" mb="3" color="gray.800">
                    Instalación Profesional
                  </Heading>
                  <Text color="gray.600" fontSize="sm" mb="4">
                    Servicio de instalación con técnicos especializados y herramientas profesionales.
                  </Text>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant="outline"
                      width="full"
                      onClick={scrollToContact}
                    >
                      Más Información
                    </Button>
                </CardBody>
              </Card>

              <Card bg="white" overflow="hidden" boxShadow="xl" borderRadius="xl">
                <Image
                  src="https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Reparación y Mantenimiento"
                  height="200px"
                  objectFit="cover"
                />
                <CardBody p="6">
                  <Heading size="md" mb="3" color="gray.800">
                    Reparación y Mantenimiento
                  </Heading>
                  <Text color="gray.600" fontSize="sm" mb="4">
                    Servicio de reparación de vidrios dañados y mantenimiento preventivo.
                  </Text>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      variant="outline"
                      width="full"
                      onClick={scrollToContact}
                    >
                      Más Información
                    </Button>
                </CardBody>
              </Card>
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box id="contact" py="20" bg="blue.500" color="white">
        <Container maxW="container.xl">
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            align="center"
            gap="12"
          >
            <Box flex="1">
              <VStack align="start" spacing="6">
                <Heading size="2xl" color="white">
                  ¿Listo para transformar tu espacio?
                </Heading>
                <Text fontSize="lg" color="blue.100" maxW="500px">
                  Contáctanos hoy mismo para una cotización gratuita. 
                  Nuestros expertos te ayudarán a encontrar la solución perfecta.
                </Text>
                
                <VStack align="start" spacing="4" pt="4">
                  <HStack>
                    <Text fontSize="lg">📞</Text>
                    <Text fontWeight="semibold">+1 (555) 123-4567</Text>
                  </HStack>
                  <HStack>
                    <Text fontSize="lg">✉️</Text>
                    <Text fontWeight="semibold">info@vidriospremium.com</Text>
                  </HStack>
                  <HStack>
                    <Text fontSize="lg">📍</Text>
                    <Text fontWeight="semibold">Av. Principal 123, Ciudad</Text>
                  </HStack>
                </VStack>
                
                <HStack spacing="4" pt="4">
                  <Button
                    size="lg"
                    bg="white"
                    color="blue.500"
                    _hover={{ bg: 'gray.100' }}
                    px="8"
                    py="6"
                    fontSize="lg"
                    fontWeight="semibold"
                    onClick={() => {
                      const form = document.querySelector('form')
                      if (form) {
                        form.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                  >
                    Solicitar Cotización
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    borderColor="white"
                    color="white"
                    _hover={{ bg: 'white', color: 'blue.500' }}
                    px="8"
                    py="6"
                    fontSize="lg"
                    fontWeight="semibold"
                    onClick={onOpen}
                  >
                    Ver Galería
                  </Button>
                </HStack>
              </VStack>
            </Box>
            
            <Box flex="1">
              <Box
                bg="white"
                borderRadius="xl"
                p="8"
                color="gray.800"
              >
                <VStack spacing="6">
                  <Heading size="lg" color="gray.800">
                    Contáctanos
                  </Heading>
                  
                  <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <VStack spacing="4" width="full">
                      <Box width="full">
                        <Text fontSize="sm" fontWeight="semibold" mb="2">
                          Nombre Completo
                        </Text>
                        <Box
                          as="input"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          width="full"
                          p="3"
                          border="1px solid"
                          borderColor="gray.300"
                          borderRadius="md"
                          placeholder="Tu nombre completo"
                          _focus={{ borderColor: 'blue.500', outline: 'none' }}
                          required
                        />
                      </Box>
                      
                      <Box width="full">
                        <Text fontSize="sm" fontWeight="semibold" mb="2">
                          Teléfono
                        </Text>
                        <Box
                          as="input"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          width="full"
                          p="3"
                          border="1px solid"
                          borderColor="gray.300"
                          borderRadius="md"
                          placeholder="Tu número de teléfono"
                          _focus={{ borderColor: 'blue.500', outline: 'none' }}
                          required
                        />
                      </Box>
                      
                      <Box width="full">
                        <Text fontSize="sm" fontWeight="semibold" mb="2">
                          Tipo de Servicio
                        </Text>
                        <Box
                          as="select"
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          width="full"
                          p="3"
                          border="1px solid"
                          borderColor="gray.300"
                          borderRadius="md"
                          _focus={{ borderColor: 'blue.500', outline: 'none' }}
                          required
                        >
                          <option value="">Selecciona un servicio</option>
                          <option value="Vidrios Templados">Vidrios Templados</option>
                          <option value="Vidrios Laminados">Vidrios Laminados</option>
                          <option value="Espejos">Espejos</option>
                          <option value="Instalación">Instalación</option>
                          <option value="Reparación">Reparación</option>
                          <option value="Otro">Otro</option>
                        </Box>
                      </Box>
                      
                      <Box width="full">
                        <Text fontSize="sm" fontWeight="semibold" mb="2">
                          Mensaje
                        </Text>
                        <Box
                          as="textarea"
                          name="message"
                          value={formData.message}
                          onChange={handleInputChange}
                          width="full"
                          p="3"
                          border="1px solid"
                          borderColor="gray.300"
                          borderRadius="md"
                          placeholder="Cuéntanos sobre tu proyecto..."
                          rows={4}
                          _focus={{ borderColor: 'blue.500', outline: 'none' }}
                          required
                        />
                      </Box>

                      {/* Mensajes de estado */}
                      {submitStatus === 'success' && (
                        <Alert status="success" borderRadius="md">
                          <AlertIcon />
                          <AlertTitle>¡Mensaje enviado exitosamente!</AlertTitle>
                          <AlertDescription>
                            Tu mensaje ha sido enviado por correo y se abrió WhatsApp para que puedas contactarnos directamente.
                          </AlertDescription>
                        </Alert>
                      )}
                      
                      {submitStatus === 'error' && (
                        <Alert status="error" borderRadius="md">
                          <AlertIcon />
                          <AlertTitle>Error al enviar el mensaje</AlertTitle>
                          <AlertDescription>
                            Por favor, inténtalo de nuevo o contáctanos directamente.
                          </AlertDescription>
                        </Alert>
                      )}
                      
                      <Button
                        type="submit"
                        width="full"
                        size="lg"
                        colorScheme="blue"
                        py="6"
                        fontSize="lg"
                        fontWeight="semibold"
                        isLoading={isSubmitting}
                        loadingText="Enviando..."
                        disabled={isSubmitting}
                      >
                        💬 Enviar Mensaje y Abrir WhatsApp
                      </Button>
                    </VStack>
                  </form>
                </VStack>
              </Box>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Footer */}
      <Box bg="gray.900" color="white" py="12">
        <Container maxW="container.xl">
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            justify="space-between"
            align="start"
            gap="8"
          >
            <VStack align="start" spacing="4">
              <Heading size="lg" color="white">
                Vidrios Premium
              </Heading>
              <Text color="gray.400" maxW="300px">
                Especialistas en vidrios de alta calidad. 
                Transformamos tu espacio con productos y servicios profesionales.
              </Text>
              <HStack spacing="4">
                <Text fontSize="xl" cursor="pointer" _hover={{ color: 'blue.400' }}>📘</Text>
                <Text fontSize="xl" cursor="pointer" _hover={{ color: 'blue.400' }}>📷</Text>
                <Text fontSize="xl" cursor="pointer" _hover={{ color: 'blue.400' }}>🐦</Text>
              </HStack>
            </VStack>
            
            <VStack align="start" spacing="4">
              <Heading size="md" color="white">
                Servicios
              </Heading>
              <VStack align="start" spacing="2">
                <Text color="gray.400" _hover={{ color: 'white' }} cursor="pointer">
                  Vidrios Templados
                </Text>
                <Text color="gray.400" _hover={{ color: 'white' }} cursor="pointer">
                  Vidrios Laminados
                </Text>
                <Text color="gray.400" _hover={{ color: 'white' }} cursor="pointer">
                  Espejos
                </Text>
                <Text color="gray.400" _hover={{ color: 'white' }} cursor="pointer">
                  Instalación
                </Text>
              </VStack>
            </VStack>
            
            <VStack align="start" spacing="4">
              <Heading size="md" color="white">
                Contacto
              </Heading>
              <VStack align="start" spacing="2">
                <HStack>
                  <Text fontSize="sm">📞</Text>
                  <Text color="gray.400">+1 (555) 123-4567</Text>
                </HStack>
                <HStack>
                  <Text fontSize="sm">✉️</Text>
                  <Text color="gray.400">info@vidriospremium.com</Text>
                </HStack>
                <HStack>
                  <Text fontSize="sm">📍</Text>
                  <Text color="gray.400">Av. Principal 123, Ciudad</Text>
                </HStack>
              </VStack>
            </VStack>
          </Flex>
          
          <Divider my="8" borderColor="gray.700" />
          
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            align="center"
            gap="4"
          >
            <Text color="gray.400" fontSize="sm">
              © 2024 Vidrios Premium. Todos los derechos reservados.
            </Text>
            <HStack spacing="6">
              <Text color="gray.400" fontSize="sm" _hover={{ color: 'white' }} cursor="pointer">
                Política de Privacidad
              </Text>
              <Text color="gray.400" fontSize="sm" _hover={{ color: 'white' }} cursor="pointer">
                Términos de Servicio
              </Text>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Modal de Contacto */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Información de Contacto</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing="6" align="start">
              <Box>
                <Heading size="md" mb="3" color="blue.500">
                  📞 Teléfono
                </Heading>
                <Text fontSize="lg" fontWeight="semibold">
                  +1 (555) 123-4567
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Lunes a Viernes: 8:00 AM - 6:00 PM
                </Text>
              </Box>
              
              <Box>
                <Heading size="md" mb="3" color="blue.500">
                  ✉️ Email
                </Heading>
                <Text fontSize="lg" fontWeight="semibold">
                  info@vidriospremium.com
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Respuesta en menos de 24 horas
                </Text>
              </Box>
              
              <Box>
                <Heading size="md" mb="3" color="blue.500">
                  📍 Ubicación
                </Heading>
                <Text fontSize="lg" fontWeight="semibold">
                  Av. Principal 123, Ciudad
                </Text>
                <Text fontSize="sm" color="gray.600">
                  Visitas con cita previa
                </Text>
              </Box>
              
              <Box width="full">
                <Button
                  width="full"
                  colorScheme="blue"
                  size="lg"
                  onClick={() => {
                    window.open('tel:+15551234567', '_self')
                  }}
                >
                  Llamar Ahora
                </Button>
              </Box>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}