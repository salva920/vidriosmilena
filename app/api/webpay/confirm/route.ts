import { NextRequest, NextResponse } from 'next/server'

const WEBPAY_CONFIG = {
  environment: process.env.WEBPAY_ENVIRONMENT || 'integration',
  commerceCode: process.env.WEBPAY_COMMERCE_CODE || '597055555532',
  apiKey: process.env.WEBPAY_API_KEY || '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C',
  urls: {
    integration: 'https://webpay3gint.transbank.cl/webpayserver/transaction_status',
    production: 'https://webpay3g.transbank.cl/webpayserver/transaction_status',
  },
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token } = body

    if (!token) {
      return NextResponse.json(
        { error: 'Token no proporcionado' },
        { status: 400 }
      )
    }

    // Confirmar transacción con Webpay
    const webpayUrl = WEBPAY_CONFIG.urls[WEBPAY_CONFIG.environment as keyof typeof WEBPAY_CONFIG.urls] || WEBPAY_CONFIG.urls.integration

    const response = await fetch(webpayUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Tbk-Api-Key-Id': WEBPAY_CONFIG.commerceCode,
        'Tbk-Api-Key-Secret': WEBPAY_CONFIG.apiKey,
      },
      body: JSON.stringify({ token }),
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Error al confirmar la transacción' },
        { status: 500 }
      )
    }

    const webpayResponse = await response.json()

    // En producción:
    // 1. Verificar que la transacción existe en tu base de datos
    // 2. Actualizar el estado del pedido
    // 3. Enviar confirmación por email
    // 4. Limpiar el carrito del usuario

    return NextResponse.json({
      status: webpayResponse.status,
      responseCode: webpayResponse.response_code,
      amount: webpayResponse.amount,
      buyOrder: webpayResponse.buy_order,
      message: webpayResponse.status === 'AUTHORIZED' 
        ? 'Pago autorizado exitosamente' 
        : 'El pago fue rechazado',
    })
  } catch (error) {
    console.error('Error en confirm webpay:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

