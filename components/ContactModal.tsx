'use client'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  VStack,
  Box,
  Heading,
  Text,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  HStack,
  Flex,
  Container,
} from '@chakra-ui/react'
import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG } from '@/app/config/emailjs'
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  numeroWhatsApp?: string
}

export default function ContactModal({ isOpen, onClose, numeroWhatsApp = '56949932178' }: ContactModalProps) {
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
      
      // Cerrar el modal después de 2 segundos si fue exitoso
      setTimeout(() => {
        onClose()
        setSubmitStatus('idle')
      }, 2000)
    } catch (error) {
      console.error('Error al enviar el email:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setFormData({
      name: '',
      phone: '',
      service: '',
      message: ''
    })
    setSubmitStatus('idle')
    onClose()
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
    <Modal isOpen={isOpen} onClose={handleClose} size="6xl" isCentered>
      <ModalOverlay />
      <ModalContent maxW="1200px" maxH="90vh" overflowY="auto">
        <ModalCloseButton zIndex={2} />
        <ModalBody p={0}>
          <Flex
            direction={{ base: 'column', lg: 'row' }}
            align="stretch"
            minH={{ base: 'auto', lg: '600px' }}
          >
            {/* Left Section - Blue Background */}
            <Box 
              flex="1" 
              bg="blue.500" 
              color="white"
              p={{ base: '8', md: '10', lg: '12' }}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <VStack align="start" spacing="6">
                <Heading size="2xl" color="white">
                  ¿Listo para transformar tu espacio?
                </Heading>
                <Text fontSize="lg" color="blue.100" maxW="500px">
                  Contáctanos hoy mismo para una cotización gratuita. 
                  Nuestros expertos te ayudarán a encontrar la solución perfecta.
                </Text>
                
                <VStack align="start" spacing="4" pt="4">
                  <HStack
                    as="button"
                    onClick={handlePhoneClick}
                    cursor="pointer"
                    _hover={{ opacity: 0.8, transform: 'translateX(4px)' }}
                    transition="all 0.2s"
                    spacing="3"
                  >
                    <FaPhone fontSize="20px" />
                    <Text fontWeight="semibold">+56949932178</Text>
                  </HStack>
                  <HStack
                    as="button"
                    onClick={handleEmailClick}
                    cursor="pointer"
                    _hover={{ opacity: 0.8, transform: 'translateX(4px)' }}
                    transition="all 0.2s"
                    spacing="3"
                  >
                    <FaEnvelope fontSize="20px" />
                    <Text fontWeight="semibold">Artecristales@gmail.com</Text>
                  </HStack>
                  <HStack
                    as="button"
                    onClick={handleLocationClick}
                    cursor="pointer"
                    _hover={{ opacity: 0.8, transform: 'translateX(4px)' }}
                    transition="all 0.2s"
                    spacing="3"
                  >
                    <FaMapMarkerAlt fontSize="20px" />
                    <Text fontWeight="semibold">Coronel souper - Estacion central</Text>
                  </HStack>
                </VStack>
              </VStack>
            </Box>
            
            {/* Right Section - White Background with Form */}
            <Box 
              flex="1" 
              bg="white"
              p={{ base: '8', md: '10', lg: '12' }}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <Box
                bg="white"
                borderRadius="xl"
                color="gray.800"
                w="100%"
              >
                <VStack spacing="6" align="stretch">
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
                          <option value="Arquitectura">Arquitectura</option>
                          <option value="Ventanas de PVC y Aluminio">Ventanas de PVC y Aluminio</option>
                          <option value="Shower o Mamparas">Shower o Mamparas</option>
                          <option value="Cierres y Barandas">Cierres y Barandas</option>
                          <option value="Espejos">Espejos</option>
                          <option value="Vidrios Templados">Vidrios Templados</option>
                          <option value="Vidrios Laminados">Vidrios Laminados</option>
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
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

