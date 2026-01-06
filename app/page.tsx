'use client'

import { Box } from '@chakra-ui/react'
import { useState } from 'react'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ArquitecturaSection from '@/components/ArquitecturaSection'
import VentanasSection from '@/components/VentanasSection'
import ShowerSection from '@/components/ShowerSection'
import CierresSection from '@/components/CierresSection'
import EspejosSection from '@/components/EspejosSection'
import CortinasSection from '@/components/CortinasSection'
import FeaturesSection from '@/components/FeaturesSection'
import StatsSection from '@/components/StatsSection'
import WhyUsSection from '@/components/WhyUsSection'
import ContactSection from '@/components/ContactSection'
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

  return (
    <Box>
      <Navbar />
      <Box pt={{ base: '80px', md: '120px' }}>
        <HeroSection
        rotatingTitles={rotatingTitles}
        images={images}
        onScrollToContact={scrollToContact}
        onOpenModal={onOpen}
      />

      <ArquitecturaSection />

      <VentanasSection />

      <ShowerSection />

      <CierresSection />

      <EspejosSection />

      <CortinasSection />

      <FeaturesSection />

      <StatsSection />

      <WhyUsSection onScrollToContact={scrollToContact} />

      <ContactSection
        numeroWhatsApp={numeroWhatsApp}
        onOpenModal={onOpen}
      />

      <Footer />

      <ContactModal isOpen={isOpen} onClose={onClose} />
      </Box>
    </Box>
  )
}
