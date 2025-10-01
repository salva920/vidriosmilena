# Configuración de EmailJS para el Formulario de Contacto

## Pasos para configurar EmailJS

### 1. Crear cuenta en EmailJS
- Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
- Crea una cuenta gratuita
- Confirma tu email

### 2. Configurar Email Service
- Ve a "Email Services" en el dashboard
- Haz clic en "Add New Service"
- Selecciona tu proveedor de email (Gmail, Outlook, Yahoo, etc.)
- Sigue las instrucciones para conectar tu cuenta de email
- Anota el **Service ID** que se genera

### 3. Crear Email Template
- Ve a "Email Templates" en el dashboard
- Haz clic en "Create New Template"
- Configura el template con las siguientes variables:

```
Asunto: Nuevo mensaje de contacto - {{from_name}}

Hola,

Has recibido un nuevo mensaje de contacto desde tu sitio web:

Nombre: {{from_name}}
Teléfono: {{from_phone}}
Servicio: {{service_type}}
Mensaje: {{message}}

Saludos,
Sistema de Contacto
```

- Anota el **Template ID** que se genera

### 4. Obtener Public Key
- Ve a "Account" > "API Keys"
- Copia tu **Public Key**

### 5. Configurar en el proyecto
- Abre el archivo `app/config/emailjs.ts`
- Reemplaza los valores placeholder con tus credenciales reales:

```typescript
export const EMAILJS_CONFIG = {
  SERVICE_ID: 'tu_service_id_real', // Reemplaza con tu Service ID
  TEMPLATE_ID: 'tu_template_id_real', // Reemplaza con tu Template ID
  PUBLIC_KEY: 'tu_public_key_real', // Reemplaza con tu Public Key
  
  TO_EMAIL: 'tu-email@ejemplo.com' // Cambia por tu email de destino
}
```

### 6. Probar el formulario
- Ejecuta el proyecto: `npm run dev`
- Ve a la sección de contacto
- Llena el formulario y envía un mensaje de prueba
- Verifica que recibas el email

## Variables del Template

El formulario envía las siguientes variables que puedes usar en tu template:

- `{{from_name}}`: Nombre del cliente
- `{{from_phone}}`: Teléfono del cliente  
- `{{service_type}}`: Tipo de servicio solicitado
- `{{message}}`: Mensaje del cliente
- `{{to_email}}`: Email de destino

## Límites de la cuenta gratuita

- 200 emails por mes
- 2 servicios de email
- 2 templates
- Soporte por email

## Solución de problemas

### Error: "Invalid service ID"
- Verifica que el Service ID sea correcto
- Asegúrate de que el servicio esté activo

### Error: "Invalid template ID"  
- Verifica que el Template ID sea correcto
- Asegúrate de que el template esté publicado

### Error: "Invalid public key"
- Verifica que el Public Key sea correcto
- Asegúrate de que la cuenta esté verificada

### No se reciben emails
- Verifica que el servicio de email esté conectado correctamente
- Revisa la carpeta de spam
- Verifica que el template tenga el formato correcto
