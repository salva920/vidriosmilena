# 🚀 Instrucciones para Ejecutar la Landing Page de Vidrios

## 📋 Pasos para Iniciar el Proyecto

### 1. Instalar Dependencias
```bash
npm install
```

### 2. Ejecutar en Modo Desarrollo
```bash
npm run dev
```

### 3. Abrir en el Navegador
Visita: [http://localhost:3000](http://localhost:3000)

## 🎨 Características de la Landing Page

### ✨ Secciones Incluidas:
- **Hero Section**: Presentación principal con animaciones
- **Características**: Ventajas competitivas del negocio
- **Servicios**: Catálogo de productos de vidrios
- **Contacto**: Formulario funcional y información de contacto
- **Footer**: Enlaces y redes sociales

### 🎯 Funcionalidades:
- ✅ Diseño completamente responsivo
- ✅ Animaciones suaves con Framer Motion
- ✅ Formulario de contacto interactivo
- ✅ Navegación móvil con drawer
- ✅ Optimizado para SEO
- ✅ Tema personalizado con Chakra UI

## 🛠️ Personalización Rápida

### Cambiar Información de Contacto:
1. Abre `app/page.tsx`
2. Busca la sección de contacto (línea ~400)
3. Modifica:
   - Teléfono: `+1 (555) 123-4567`
   - Email: `info@vidriospremium.com`
   - Dirección: `Av. Principal 123, Ciudad`

### Cambiar Colores del Tema:
1. Abre `app/theme.ts`
2. Modifica los colores en la sección `colors.brand`

### Agregar tus Propias Imágenes:
1. Crea la carpeta `public/images/`
2. Sube tus imágenes
3. Cambia las URLs en `app/page.tsx` de:
   ```typescript
   src="https://images.unsplash.com/..."
   ```
   a:
   ```typescript
   src="/images/tu-imagen.jpg"
   ```

## 📱 Responsive Design
La página está optimizada para:
- 📱 Móviles (320px+)
- 📱 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Pantallas grandes (1440px+)

## 🚀 Despliegue

### Opción 1: Vercel (Recomendado)
1. Conecta tu repositorio GitHub con Vercel
2. Despliega automáticamente

### Opción 2: Netlify
1. Conecta tu repositorio con Netlify
2. Configura build command: `npm run build`
3. Configura publish directory: `.next`

### Opción 3: Build Local
```bash
npm run build
npm start
```

## 🎨 Próximos Pasos Sugeridos

1. **Agregar Analytics**: Google Analytics o similar
2. **Formulario Funcional**: Conectar con servicio de email
3. **Galería de Trabajos**: Mostrar proyectos realizados
4. **Testimonios**: Reseñas de clientes
5. **Blog**: Artículos sobre vidrios y decoración

## 📞 Soporte

Si tienes problemas o necesitas ayuda:
- Revisa la consola del navegador para errores
- Verifica que todas las dependencias estén instaladas
- Asegúrate de tener Node.js 18+ instalado

---

¡Tu landing page está lista para impresionar a tus clientes! 🎉
