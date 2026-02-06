# 🔐 Guía: Cómo Obtener Credenciales de Webpay

## 📋 Lo que Necesitas

Para que la integración de Webpay funcione, necesitas obtener de Transbank:

1. ✅ **Código de Comercio (Commerce Code)**: Identificador único de tu comercio
2. ✅ **API Key (Secret Key)**: Clave secreta para autenticarte con la API
3. ✅ **URL del Formulario**: Ya la tienes → `https://www.webpay.cl/form-pay/319759`

---

## 🚀 Pasos para Obtener las Credenciales

### Opción 1: Si Ya Tienes Cuenta en Transbank

1. **Inicia sesión** en el [Panel de Transbank](https://www.transbank.cl/)
2. Ve a la sección **"Webpay Plus"** o **"Integraciones"**
3. Busca **"Credenciales"** o **"API Keys"**
4. Copia:
   - **Código de Comercio** (ejemplo: `597055555532`)
   - **API Key** o **Secret Key** (una cadena larga de caracteres)

### Opción 2: Si NO Tienes Cuenta en Transbank

1. **Regístrate** en [Transbank Developers](https://www.transbankdevelopers.cl/)
2. Crea una **cuenta de comercio**
3. Solicita acceso a **Webpay Plus**
4. Transbank te proporcionará:
   - Código de Comercio
   - API Key
   - Instrucciones de integración

---

## ⚙️ Configurar las Variables de Entorno

Una vez que tengas las credenciales, agrégalas en **Vercel** (o tu plataforma de hosting):

### En Vercel:

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega estas variables:

```env
# Ambiente (integration para pruebas, production para producción)
WEBPAY_ENVIRONMENT=integration

# Tu Código de Comercio de Transbank
WEBPAY_COMMERCE_CODE=TU_CODIGO_COMERCIO_AQUI

# Tu API Key de Transbank
WEBPAY_API_KEY=TU_API_KEY_AQUI

# URL base de tu aplicación (reemplaza con tu dominio)
NEXT_PUBLIC_BASE_URL=https://tu-dominio.vercel.app

# URL del formulario de Webpay (ya la tienes)
WEBPAY_FORM_URL=https://www.webpay.cl/form-pay/319759

# URLs de retorno (se generan automáticamente)
WEBPAY_RETURN_URL=https://tu-dominio.vercel.app/tienda/webpay/return
WEBPAY_FINAL_URL=https://tu-dominio.vercel.app/tienda/webpay/final
```

---

## 🧪 Credenciales de Prueba (Solo para Testing)

Si quieres probar antes de obtener tus credenciales reales, puedes usar estas credenciales de **integración** (solo funcionan en ambiente de pruebas):

```env
WEBPAY_ENVIRONMENT=integration
WEBPAY_COMMERCE_CODE=597055555532
WEBPAY_API_KEY=579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C
```

⚠️ **IMPORTANTE**: Estas credenciales solo funcionan en el ambiente de integración y NO procesan pagos reales.

---

## ✅ Verificar que Funciona

Después de configurar las variables de entorno:

1. **Haz un deploy** en Vercel (o reinicia tu servidor local)
2. Ve a tu tienda y agrega productos al carrito
3. Completa el checkout
4. Intenta hacer un pago de prueba

Si todo está bien configurado, deberías ser redirigido a Webpay para completar el pago.

---

## 🔍 Solución de Problemas

### Error: "La API de Webpay devolvió una respuesta HTML"

**Causa**: Las credenciales son incorrectas o el ambiente no coincide.

**Solución**:
- Verifica que `WEBPAY_COMMERCE_CODE` sea correcto
- Verifica que `WEBPAY_API_KEY` sea correcto
- Asegúrate de que `WEBPAY_ENVIRONMENT` coincida con tus credenciales:
  - Si usas credenciales de prueba → `integration`
  - Si usas credenciales de producción → `production`

### Error: "No se recibió el token de Webpay"

**Causa**: La transacción no se creó correctamente.

**Solución**:
- Revisa los logs del servidor para ver el error específico
- Verifica que el monto sea mayor a 0
- Verifica que la URL de retorno sea accesible públicamente

---

## 📞 Contacto

Si tienes problemas:
1. Revisa la [documentación oficial de Transbank](https://www.transbankdevelopers.cl/documentacion/webpay-plus)
2. Contacta al soporte de Transbank
3. Verifica que tu cuenta de comercio esté activa

---

## 📝 Notas Importantes

- ⚠️ **NUNCA** expongas tus credenciales de producción en el código
- ✅ Usa **variables de entorno** siempre
- ✅ En producción, cambia `WEBPAY_ENVIRONMENT` a `production`
- ✅ Guarda las credenciales de forma segura
