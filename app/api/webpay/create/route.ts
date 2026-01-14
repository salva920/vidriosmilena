import { NextRequest, NextResponse } from 'next/server'

// Configuración de Webpay
// IMPORTANTE: Estas credenciales deben estar en variables de entorno
const WEBPAY_CONFIG = {
  // Ambiente de integración (para pruebas)
  // Cambiar a 'production' cuando esté listo para producción
  environment: process.env.WEBPAY_ENVIRONMENT || 'integration',
  
  // Credenciales de integración (para pruebas)
  // En producción, usar las credenciales reales de Transbank
  commerceCode: process.env.WEBPAY_COMMERCE_CODE || '597055555532',
  apiKey: process.env.WEBPAY_API_KEY || '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C',
  
  // URLs de Webpay
  urls: {
    integration: 'https://webpay3gint.transbank.cl/webpayserver/init_transaction',
    production: 'https://webpay3g.transbank.cl/webpayserver/init_transaction',
  },
  
  // URL de retorno (debe ser accesible desde internet)
  returnUrl: process.env.WEBPAY_RETURN_URL || `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/tienda/webpay/return`,
  finalUrl: process.env.WEBPAY_FINAL_URL || `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/tienda/webpay/final`,
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, items, customer } = body

    // Validar datos
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'El monto debe ser mayor a 0' },
        { status: 400 }
      )
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'El carrito está vacío' },
        { status: 400 }
      )
    }

    // Generar orden de compra única
    const buyOrder = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Crear sesión de compra (guardar en base de datos o cache)
    // Por ahora, solo lo guardamos en memoria (en producción usar Redis o DB)
    const sessionId = `SESSION-${Date.now()}`

    // Preparar datos para Webpay
    const webpayData = {
      buy_order: buyOrder,
      session_id: sessionId,
      amount: Math.round(amount), // Webpay requiere monto en centavos (CLP)
      return_url: WEBPAY_CONFIG.returnUrl,
    }

    // Determinar URL según ambiente
    const webpayUrl = WEBPAY_CONFIG.urls[WEBPAY_CONFIG.environment as keyof typeof WEBPAY_CONFIG.urls] || WEBPAY_CONFIG.urls.integration

    // Crear transacción en Webpay
    // NOTA: En producción, usar el SDK oficial de Transbank o hacer la llamada HTTPS correctamente
    const response = await fetch(webpayUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Tbk-Api-Key-Id': WEBPAY_CONFIG.commerceCode,
        'Tbk-Api-Key-Secret': WEBPAY_CONFIG.apiKey,
      },
      body: JSON.stringify(webpayData),
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Error de Webpay:', errorData)
      return NextResponse.json(
        { error: 'Error al crear la transacción en Webpay' },
        { status: 500 }
      )
    }

    const webpayResponse = await response.json()

    // En producción, guardar la sesión de compra en base de datos
    // con el buy_order, session_id, items, customer, etc.

    return NextResponse.json({
      token: webpayResponse.token,
      url: webpayResponse.url,
      buyOrder,
      sessionId,
    })
  } catch (error) {
    console.error('Error en create webpay:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

