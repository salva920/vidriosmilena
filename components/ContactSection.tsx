'use client'

import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  IconButton,
} from '@chakra-ui/react'
import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG } from '@/app/config/emailjs'
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'

interface ContactSectionProps {
  numeroWhatsApp: string
  onOpenModal: () => void
}

export default function ContactSection({ numeroWhatsApp, onOpenModal }: ContactSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    message: ''
  })

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
      const mensaje = `🏠 *Nueva Solicitud de Cotización - ARTECRISTAL*

👤 *Información del Cliente:*
• Nombre: ${formData.name}
• Teléfono: ${formData.phone}

🔧 *Servicio Solicitado:*
• ${formData.service}

${formData.message ? `📝 *Mensaje:*\n${formData.message}\n\n` : ''}⏰ *Fecha:* ${new Date().toLocaleString('es-VE', { dateStyle: 'long', timeStyle: 'short' })}

_Generado desde el formulario de contacto de ARTECRISTAL_`

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

  const scrollToForm = () => {
    const form = document.querySelector('form')
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleWhatsAppClick = () => {
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}`
    window.open(urlWhatsApp, '_blank')
  }

  const handleEmailClick = () => {
    window.location.href = 'mailto:Artecristales@gmail.com'
  }

  const handlePhoneClick = () => {
    window.location.href = 'tel:+56949932178'
  }

  const handleLocationClick = () => {
    const address = encodeURIComponent('Coronel souper 4400, Estación Central, Chile')
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank')
  }

  return (
    <>
      {/* Botón flotante de WhatsApp */}
      <IconButton
        aria-label="Chatear por WhatsApp"
        icon={<FaWhatsapp />}
        position="fixed"
        bottom={{ base: '20px', md: '30px' }}
        right={{ base: '20px', md: '30px' }}
        zIndex={1000}
        size="lg"
        bg="#25D366"
        color="white"
        borderRadius="50%"
        w={{ base: '56px', md: '64px' }}
        h={{ base: '56px', md: '64px' }}
        boxShadow="0 4px 12px rgba(37, 211, 102, 0.4)"
        _hover={{
          bg: '#20BA5A',
          transform: 'scale(1.1)',
          boxShadow: '0 6px 20px rgba(37, 211, 102, 0.6)'
        }}
        _active={{
          bg: '#1DA851',
          transform: 'scale(0.95)'
        }}
        transition="all 0.3s ease"
        onClick={handleWhatsAppClick}
      />

      <Box id="contact" py={{ base: '12', md: '16' }} bg="blue.500" color="white">
      <Container maxW="container.xl">
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          align="stretch"
          gap={{ base: '6', md: '8' }}
        >
          <Box flex="1">
            <VStack align="start" spacing={{ base: '4', md: '5' }}>
              <Heading 
                fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}
                color="white"
                fontWeight="800"
                lineHeight="1.2"
              >
                ¿Listo para transformar tu espacio?
              </Heading>
              <Text 
                fontSize={{ base: 'sm', md: 'md' }}
                color="blue.100" 
                maxW="500px"
                lineHeight="1.6"
              >
                Contáctanos hoy mismo para una cotización gratuita. 
                Nuestros expertos te ayudarán a encontrar la solución perfecta.
              </Text>
              
              <VStack align="start" spacing="3" pt="2">
                <HStack
                  as="button"
                  onClick={handlePhoneClick}
                  cursor="pointer"
                  _hover={{ opacity: 0.8, transform: 'translateX(4px)' }}
                  transition="all 0.2s"
                  spacing="2.5"
                >
                  <FaPhone fontSize="18px" />
                  <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight="semibold">+56949932178</Text>
                </HStack>
                <HStack
                  as="button"
                  onClick={handleEmailClick}
                  cursor="pointer"
                  _hover={{ opacity: 0.8, transform: 'translateX(4px)' }}
                  transition="all 0.2s"
                  spacing="2.5"
                >
                  <FaEnvelope fontSize="18px" />
                  <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight="semibold">Artecristales@gmail.com</Text>
                </HStack>
                <HStack
                  as="button"
                  onClick={handleLocationClick}
                  cursor="pointer"
                  _hover={{ opacity: 0.8, transform: 'translateX(4px)' }}
                  transition="all 0.2s"
                  spacing="2.5"
                >
                  <FaMapMarkerAlt fontSize="18px" />
                  <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight="semibold">Coronel souper 4400 - Estacion central</Text>
                </HStack>
              </VStack>
              
              <HStack spacing="3" pt="2" flexWrap="wrap">
                <Button
                  size={{ base: 'md', md: 'lg' }}
                  bg="white"
                  color="blue.500"
                  _hover={{ bg: 'gray.100', transform: 'translateY(-2px)' }}
                  px={{ base: '5', md: '6' }}
                  py={{ base: '4', md: '5' }}
                  fontSize={{ base: 'sm', md: 'md' }}
                  fontWeight="semibold"
                  borderRadius="md"
                  boxShadow="md"
                  onClick={scrollToForm}
                  transition="all 0.2s"
                >
                  Solicitar Cotización
                </Button>
                <Button
                  size={{ base: 'md', md: 'lg' }}
                  variant="outline"
                  borderColor="white"
                  borderWidth="2px"
                  color="white"
                  _hover={{ bg: 'white', color: 'blue.500' }}
                  px={{ base: '5', md: '6' }}
                  py={{ base: '4', md: '5' }}
                  fontSize={{ base: 'sm', md: 'md' }}
                  fontWeight="semibold"
                  borderRadius="md"
                  onClick={onOpenModal}
                  transition="all 0.2s"
                >
                  Ver Galería
                </Button>
              </HStack>
            </VStack>
          </Box>
          
          <Box flex="1" maxW={{ base: '100%', lg: '500px' }}>
            <Box
              bg="white"
              borderRadius="xl"
              p={{ base: '5', md: '6' }}
              color="gray.800"
              boxShadow="2xl"
              border="1px solid"
              borderColor="gray.100"
            >
              <VStack spacing={{ base: '4', md: '5' }} align="stretch">
                <Heading 
                  fontSize={{ base: 'lg', md: 'xl' }}
                  color="gray.800"
                  fontWeight="700"
                  mb="1"
                >
                  Contáctanos
                </Heading>
                
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                  <VStack spacing="3" width="full">
                    <Box width="full">
                      <Text fontSize="xs" fontWeight="600" mb="1.5" color="gray.700" textTransform="uppercase" letterSpacing="0.5px">
                        Nombre Completo
                      </Text>
                      <Box
                        as="input"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        width="full"
                        p={{ base: '2.5', md: '3' }}
                        border="1px solid"
                        borderColor="gray.300"
                        borderRadius="md"
                        placeholder="Tu nombre completo"
                        fontSize={{ base: 'sm', md: 'md' }}
                        _focus={{ borderColor: 'cyan.500', outline: 'none', boxShadow: '0 0 0 1px #06b6d4' }}
                        _hover={{ borderColor: 'gray.400' }}
                        transition="all 0.2s"
                        required
                      />
                    </Box>
                    
                    <Box width="full">
                      <Text fontSize="xs" fontWeight="600" mb="1.5" color="gray.700" textTransform="uppercase" letterSpacing="0.5px">
                        Teléfono
                      </Text>
                      <Box
                        as="input"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        width="full"
                        p={{ base: '2.5', md: '3' }}
                        border="1px solid"
                        borderColor="gray.300"
                        borderRadius="md"
                        placeholder="Tu número de teléfono"
                        fontSize={{ base: 'sm', md: 'md' }}
                        _focus={{ borderColor: 'cyan.500', outline: 'none', boxShadow: '0 0 0 1px #06b6d4' }}
                        _hover={{ borderColor: 'gray.400' }}
                        transition="all 0.2s"
                        required
                      />
                    </Box>
                    
                    <Box width="full">
                      <Text fontSize="xs" fontWeight="600" mb="1.5" color="gray.700" textTransform="uppercase" letterSpacing="0.5px">
                        Tipo de Servicio
                      </Text>
                      <Box
                        as="select"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        width="full"
                        p={{ base: '2.5', md: '3' }}
                        border="1px solid"
                        borderColor="gray.300"
                        borderRadius="md"
                        fontSize={{ base: 'sm', md: 'md' }}
                        _focus={{ borderColor: 'cyan.500', outline: 'none', boxShadow: '0 0 0 1px #06b6d4' }}
                        _hover={{ borderColor: 'gray.400' }}
                        transition="all 0.2s"
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
                      <Text fontSize="xs" fontWeight="600" mb="1.5" color="gray.700" textTransform="uppercase" letterSpacing="0.5px">
                        Mensaje
                      </Text>
                      <Box
                        as="textarea"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        width="full"
                        p={{ base: '2.5', md: '3' }}
                        border="1px solid"
                        borderColor="gray.300"
                        borderRadius="md"
                        placeholder="Cuéntanos sobre tu proyecto..."
                        rows={3}
                        fontSize={{ base: 'sm', md: 'md' }}
                        resize="vertical"
                        _focus={{ borderColor: 'cyan.500', outline: 'none', boxShadow: '0 0 0 1px #06b6d4' }}
                        _hover={{ borderColor: 'gray.400' }}
                        transition="all 0.2s"
                        required
                      />
                    </Box>

                    {/* Mensajes de estado */}
                    {submitStatus === 'success' && (
                      <Alert status="success" borderRadius="md" fontSize="sm">
                        <AlertIcon />
                        <Box>
                          <AlertTitle fontSize="sm">¡Mensaje enviado!</AlertTitle>
                          <AlertDescription fontSize="xs">
                            Se abrió WhatsApp para contactarnos directamente.
                          </AlertDescription>
                        </Box>
                      </Alert>
                    )}
                    
                    {submitStatus === 'error' && (
                      <Alert status="error" borderRadius="md" fontSize="sm">
                        <AlertIcon />
                        <Box>
                          <AlertTitle fontSize="sm">Error al enviar</AlertTitle>
                          <AlertDescription fontSize="xs">
                            Inténtalo de nuevo o contáctanos directamente.
                          </AlertDescription>
                        </Box>
                      </Alert>
                    )}
                    
                    <Button
                      type="submit"
                      width="full"
                      size={{ base: 'md', md: 'lg' }}
                      bg="cyan.500"
                      color="white"
                      py={{ base: '4', md: '5' }}
                      fontSize={{ base: 'sm', md: 'md' }}
                      fontWeight="semibold"
                      borderRadius="md"
                      boxShadow="0 4px 14px rgba(6, 182, 212, 0.4)"
                      isLoading={isSubmitting}
                      loadingText="Enviando..."
                      disabled={isSubmitting}
                      _hover={{
                        bg: 'cyan.600',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 20px rgba(6, 182, 212, 0.5)'
                      }}
                      _active={{
                        bg: 'cyan.700',
                        transform: 'translateY(0px)'
                      }}
                      transition="all 0.2s ease"
                      leftIcon={<FaWhatsapp />}
                    >
                      Enviar y Abrir WhatsApp
                    </Button>
                  </VStack>
                </form>
              </VStack>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
    </>
  )
}

