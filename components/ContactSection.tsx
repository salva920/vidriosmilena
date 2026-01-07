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
import { FaWhatsapp } from 'react-icons/fa'

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
                  onClick={scrollToForm}
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
                  onClick={onOpenModal}
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
    </>
  )
}

