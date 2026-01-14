# Integración de Webpay (Transbank)

Esta guía explica cómo configurar y usar la integración de Webpay en la tienda online.

## Configuración

### 1. Variables de Entorno

Agrega las siguientes variables de entorno en tu archivo `.env.local` o en la configuración de Vercel:

```env
# Ambiente de Webpay (integration o production)
WEBPAY_ENVIRONMENT=integration

# Código de comercio (obtener de Transbank)
WEBPAY_COMMERCE_CODE=tu_codigo_comercio

# API Key (obtener de Transbank)
WEBPAY_API_KEY=tu_api_key

# URL base de tu aplicación
NEXT_PUBLIC_BASE_URL=https://artecristal.vercel.app

# URLs de retorno (se generan automáticamente, pero puedes personalizarlas)
WEBPAY_RETURN_URL=https://artecristal.vercel.app/tienda/webpay/return
WEBPAY_FINAL_URL=https://artecristal.vercel.app/tienda/webpay/final
```

### 2. Obtener Credenciales de Transbank

1. **Registro en Transbank:**
   - Visita [Transbank Developers](https://www.transbankdevelopers.cl/)
   - Crea una cuenta de comercio
   - Solicita acceso a Webpay Plus

2. **Credenciales de Integración (Pruebas):**
   - Código de Comercio: `597055555532`
   - API Key: `579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C`
   - Estas credenciales son solo para pruebas

3. **Credenciales de Producción:**
   - Transbank te proporcionará credenciales únicas
   - Cambia `WEBPAY_ENVIRONMENT` a `production`
   - Actualiza `WEBPAY_COMMERCE_CODE` y `WEBPAY_API_KEY`

### 3. Instalación del SDK (Opcional)

Para una integración más robusta, puedes instalar el SDK oficial de Transbank:

```bash
npm install transbank-sdk
```

Luego actualiza las rutas API para usar el SDK en lugar de llamadas HTTP directas.

## Flujo de Pago

1. **Cliente completa el checkout** → `/tienda/checkout`
2. **Se crea la transacción** → API `/api/webpay/create`
3. **Redirección a Webpay** → Cliente paga en Webpay
4. **Retorno a la tienda** → `/tienda/webpay/return`
5. **Confirmación del pago** → API `/api/webpay/confirm`
6. **Página de éxito** → `/tienda/webpay/success`

## Notas Importantes

### Seguridad
- ⚠️ **NUNCA** expongas tus credenciales de producción en el código
- Usa variables de entorno para todas las credenciales
- Valida siempre las respuestas de Webpay en el servidor

### Producción
- Cambia `WEBPAY_ENVIRONMENT` a `production`
- Usa las credenciales reales de Transbank
- Configura las URLs de retorno correctamente
- Implementa logging y monitoreo de transacciones
- Guarda las transacciones en una base de datos

### Mejoras Futuras
- [ ] Implementar guardado de transacciones en base de datos
- [ ] Agregar webhook para notificaciones de Webpay
- [ ] Implementar sistema de órdenes/pedidos
- [ ] Agregar email de confirmación automático
- [ ] Implementar historial de compras para usuarios

## Documentación Oficial

- [Documentación Webpay Plus](https://www.transbankdevelopers.cl/documentacion/webpay-plus)
- [API Reference](https://www.transbankdevelopers.cl/referencia/webpay)
- [Ambiente de Integración](https://www.transbankdevelopers.cl/documentacion/ambiente-de-integracion)

## Soporte

Para problemas con la integración:
1. Revisa los logs del servidor
2. Verifica las credenciales en Transbank
3. Consulta la documentación oficial de Transbank
4. Contacta al soporte de Transbank si es necesario

