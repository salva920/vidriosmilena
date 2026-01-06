'use client'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
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
} from '@chakra-ui/react'
import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG } from '@/app/config/emailjs'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  numeroWhatsApp?: string
}

export default function ContactModal({ isOpen, onClose, numeroWhatsApp = '56940665690' }: ContactModalProps) {
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
      const mensaje = `🏠 *Nueva Solicitud de Cotización - MILEGLASS*

👤 *Información del Cliente:*
• Nombre: ${formData.name}
• Teléfono: ${formData.phone}

🔧 *Servicio Solicitado:*
• ${formData.service}

${formData.message ? `📝 *Mensaje:*\n${formData.message}\n\n` : ''}⏰ *Fecha:* ${new Date().toLocaleString('es-VE', { dateStyle: 'long', timeStyle: 'short' })}

_Generado desde el formulario de contacto de MILEGLASS_`

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

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg" color="gray.800">
            Solicitar Cotización
          </Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing="6" align="stretch">
            <Text color="gray.600">
              Completa el formulario y te contactaremos a la brevedad. También se abrirá WhatsApp para que puedas contactarnos directamente.
            </Text>
            
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <VStack spacing="4" width="full">
                <Box width="full">
                  <Text fontSize="sm" fontWeight="semibold" mb="2" color="gray.700">
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
                    _focus={{ borderColor: 'red.500', outline: 'none' }}
                    required
                  />
                </Box>
                
                <Box width="full">
                  <Text fontSize="sm" fontWeight="semibold" mb="2" color="gray.700">
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
                    _focus={{ borderColor: 'red.500', outline: 'none' }}
                    required
                  />
                </Box>
                
                <Box width="full">
                  <Text fontSize="sm" fontWeight="semibold" mb="2" color="gray.700">
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
                    _focus={{ borderColor: 'red.500', outline: 'none' }}
                    required
                  >
                    <option value="">Selecciona un servicio</option>
                    <option value="Arquitectura">Arquitectura</option>
                    <option value="Ventanas de PVC y Aluminio">Ventanas de PVC y Aluminio</option>
                    <option value="Shower o Mamparas">Shower o Mamparas</option>
                    <option value="Cierres y Barandas">Cierres y Barandas</option>
                    <option value="Espejos">Espejos</option>
                    <option value="Cortinas de Cristal">Cortinas de Cristal</option>
                    <option value="Vidrios Templados">Vidrios Templados</option>
                    <option value="Vidrios Laminados">Vidrios Laminados</option>
                    <option value="Instalación">Instalación</option>
                    <option value="Reparación">Reparación</option>
                    <option value="Otro">Otro</option>
                  </Box>
                </Box>
                
                <Box width="full">
                  <Text fontSize="sm" fontWeight="semibold" mb="2" color="gray.700">
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
                    _focus={{ borderColor: 'red.500', outline: 'none' }}
                    required
                  />
                </Box>

                {/* Mensajes de estado */}
                {submitStatus === 'success' && (
                  <Alert status="success" borderRadius="md">
                    <AlertIcon />
                    <Box>
                      <AlertTitle>¡Mensaje enviado exitosamente!</AlertTitle>
                      <AlertDescription>
                        Tu mensaje ha sido enviado por correo y se abrió WhatsApp para que puedas contactarnos directamente.
                      </AlertDescription>
                    </Box>
                  </Alert>
                )}
                
                {submitStatus === 'error' && (
                  <Alert status="error" borderRadius="md">
                    <AlertIcon />
                    <Box>
                      <AlertTitle>Error al enviar el mensaje</AlertTitle>
                      <AlertDescription>
                        Por favor, inténtalo de nuevo o contáctanos directamente.
                      </AlertDescription>
                    </Box>
                  </Alert>
                )}
                
                <Button
                  type="submit"
                  width="full"
                  size="lg"
                  bg="red.600"
                  color="white"
                  py="6"
                  fontSize="lg"
                  fontWeight="semibold"
                  isLoading={isSubmitting}
                  loadingText="Enviando..."
                  disabled={isSubmitting}
                  _hover={{
                    bg: 'red.700'
                  }}
                >
                  💬 Enviar Mensaje y Abrir WhatsApp
                </Button>
              </VStack>
            </form>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

