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
} from '@chakra-ui/react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  return (
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
  )
}

