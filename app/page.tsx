'use client'

import { Box, IconButton } from '@chakra-ui/react'
import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ArquitecturaSection from '@/components/ArquitecturaSection'
import VentanasSection from '@/components/VentanasSection'
import ShowerSection from '@/components/ShowerSection'
import CierresSection from '@/components/CierresSection'
import EspejosSection from '@/components/EspejosSection'
import FeaturesSection from '@/components/FeaturesSection'
import StatsSection from '@/components/StatsSection'
import WhyUsSection from '@/components/WhyUsSection'
import Footer from '@/components/Footer'
import ContactModal from '@/components/ContactModal'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)

  // Lista de títulos rotativos para el carrusel
  const rotatingTitles = [
    {
      line1: 'TODO LO QUE NECESITAS',
      line2: 'EN VIDRIOS, ALUMINIO',
      line3: 'Y ACERO INOXIDABLE'
    },
    {
      line1: 'VIDRIOS TEMPLADOS',
      line2: 'DE ALTA CALIDAD',
      line3: 'PARA TU HOGAR'
    },
    {
      line1: 'ESPEJOS Y CRISTALES',
      line2: 'DECORATIVOS',
      line3: 'QUE TRANSFORMAN ESPACIOS'
    },
    {
      line1: 'INSTALACIÓN PROFESIONAL',
      line2: 'Y REPARACIÓN',
      line3: 'CON LA MEJOR CALIDAD'
    },
    {
      line1: 'SOLUCIONES INTEGRALES',
      line2: 'EN VIDRIOS Y ALUMINIO',
      line3: 'PARA TU PROYECTO'
    }
  ]

  // Lista de imágenes del carrusel
  const images = [
    '/img/photo_2025-09-29_16-45-15.jpg',
    '/img/photo_2025-09-29_16-45-17.jpg',
    '/img/photo_2025-09-29_16-45-18.jpg',
    '/img/photo_2025-09-29_16-45-19.jpg',
    '/img/photo_2025-09-29_16-45-20.jpg',
    '/img/photo_2025-09-29_16-45-21.jpg',
    '/img/photo_2025-09-29_16-45-22.jpg',
    '/img/photo_2025-09-29_16-45-23.jpg',
    '/img/photo_2025-09-29_16-45-25.jpg',
    '/img/photo_2025-09-29_16-45-26.jpg',
    '/img/photo_2025-09-29_16-45-27.jpg',
    '/img/photo_2025-09-29_16-45-30.jpg',
    '/img/photo_2025-09-29_16-45-32.jpg',
    '/img/photo_2025-09-29_16-45-33.jpg',
    '/img/photo_2025-09-29_16-45-34.jpg',
    '/img/photo_2025-09-29_16-45-35.jpg',
    '/img/photo_2025-09-30_07-27-03.jpg',
  ]

  // Número de WhatsApp - puede configurarse mediante variable de entorno
  const numeroWhatsApp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '56940665690'

  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleWhatsAppClick = () => {
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}`
    window.open(urlWhatsApp, '_blank')
  }

  return (
    <Box>
      <Navbar onOpenModal={onOpen} />
      <Box pt={{ base: '80px', md: '120px' }}>
        <HeroSection
        rotatingTitles={rotatingTitles}
        images={images}
        onScrollToContact={scrollToContact}
        onOpenModal={onOpen}
      />

      <ArquitecturaSection onOpenModal={onOpen} />

      <VentanasSection onOpenModal={onOpen} />

      <ShowerSection onOpenModal={onOpen} />

      <CierresSection onOpenModal={onOpen} />

      <EspejosSection onOpenModal={onOpen} />

      <FeaturesSection />

      <StatsSection />

      <WhyUsSection onScrollToContact={scrollToContact} />

      <Footer />

      <ContactModal isOpen={isOpen} onClose={onClose} numeroWhatsApp={numeroWhatsApp} />
      </Box>

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
    </Box>
  )
}
