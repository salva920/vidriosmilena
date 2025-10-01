// Configuración de EmailJS
// Para obtener estas credenciales:
// 1. Ve a https://www.emailjs.com/
// 2. Crea una cuenta gratuita
// 3. Ve a "Email Services" y conecta tu proveedor de email (Gmail, Outlook, etc.)
// 4. Ve a "Email Templates" y crea un template
// 5. Ve a "Account" > "API Keys" para obtener tu Public Key

export const EMAILJS_CONFIG = {
  // Credenciales de EmailJS configuradas
  SERVICE_ID: 'service_04yyb0w',
  TEMPLATE_ID: 'template_efpgqlk',
  PUBLIC_KEY: 'D3hoofBMWyDXdJOnt',
  
  // Email de destino donde recibirás los mensajes
  TO_EMAIL: 'vidriosmilena@gmail.com'
}

// Template variables que se enviarán al email:
// - {{from_name}}: Nombre del cliente
// - {{from_phone}}: Teléfono del cliente
// - {{service_type}}: Tipo de servicio solicitado
// - {{message}}: Mensaje del cliente
// - {{to_email}}: Email de destino

// Ejemplo de template en EmailJS:
/*
Asunto: Nuevo mensaje de contacto - {{from_name}}

Hola,

Has recibido un nuevo mensaje de contacto desde tu sitio web:

Nombre: {{from_name}}
Teléfono: {{from_phone}}
Servicio: {{service_type}}
Mensaje: {{message}}

Saludos,
Sistema de Contacto
*/
