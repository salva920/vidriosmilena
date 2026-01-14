import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Vidrios Premium - Soluciones en Vidrio',
  description: 'Especialistas en venta e instalación de vidrios de alta calidad. Cristales templados, laminados, espejos y más.',
  keywords: 'vidrios, cristales, templados, laminados, espejos, instalación',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}