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
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaWhatsapp } from 'react-icons/fa'

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
            minH={{ base: 'auto', lg: '500px' }}
          >
            {/* Left Section - Blue Background */}
            <Box 
              flex="1" 
              bg="blue.500" 
              color="white"
              p={{ base: '6', md: '8', lg: '10' }}
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
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
                    <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight="semibold">Coronel souper - Estacion central</Text>
                  </HStack>
                </VStack>
              </VStack>
            </Box>
            
            {/* Right Section - White Background with Form */}
            <Box 
              flex="1" 
              bg="white"
              p={{ base: '6', md: '8', lg: '10' }}
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
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

