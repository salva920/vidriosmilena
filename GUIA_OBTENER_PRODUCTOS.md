# Guía para Obtener Productos de dellorto.cl

## Resumen

He creado scripts para extraer información de productos de dellorto.cl. El sitio usa WordPress/WooCommerce y carga algunos datos dinámicamente con JavaScript.

## Métodos Disponibles

### ✅ Método 1: Script Básico (Funciona Parcialmente)

**Archivo:** `scripts/fetch-product-improved.js`

**Uso:**
```bash
node scripts/fetch-product-improved.js
```

**Qué extrae:**
- ✅ Nombre del producto
- ✅ Descripción
- ✅ Medidas/variaciones
- ✅ Imágenes (parcial)
- ⚠️ Precio (puede no extraerse correctamente si se carga con JS)
- ✅ SKU (si está visible en HTML)

**Resultado:** Guarda `product-data.json` y `product-code.ts`

### 🔧 Método 2: Usar Puppeteer (Recomendado para Precios)

Para extraer precios que se cargan con JavaScript, necesitas Puppeteer:

```bash
npm install puppeteer
```

Luego modifica el script para usar Puppeteer (ver ejemplo en `scripts/fetch-products.ts`).

### 🌐 Método 3: API REST de WooCommerce (Ideal)

Si el sitio tiene la API habilitada:

```bash
# Probar si está disponible
curl https://dellorto.cl/wp-json/wc/v3/products
```

Si funciona, necesitarás:
- Consumer Key
- Consumer Secret

Puedes obtenerlos en: `WooCommerce > Configuración > Avanzado > REST API`

### 📋 Método 4: Extracción Manual (Más Confiable)

Para productos específicos, puedes:

1. **Abrir la página del producto en el navegador**
2. **Abrir las herramientas de desarrollador (F12)**
3. **Ir a la pestaña "Network"**
4. **Recargar la página**
5. **Buscar llamadas a la API** (buscar "product", "wc", "api")
6. **Copiar la respuesta JSON**

## Información que Puedes Obtener

Basado en la página de ejemplo, puedes extraer:

### Información Básica
- ✅ Nombre: "Shower Door ancho ajustable Corredera 8 mm con Herraje acero cepillado – Scala"
- ✅ Slug: Generado automáticamente
- ✅ Descripción: Texto completo del producto
- ⚠️ Precio: $369.990 - $419.990 (rango según medida)
- ✅ SKU: Si está disponible

### Medidas/Variaciones
- ✅ 120-130 x 190 cm
- ✅ 130-140 x 190 cm
- ✅ 140-150 x 190 cm
- ✅ 150-160 x 190 cm
- ✅ 160-170 x 190 cm
- ✅ 170-180 x 190 cm

### Especificaciones Técnicas
- Materialidad: Vidrio templado 8mm / Herrajes de acero inoxidable 304
- Acabado: Vidrio incoloro / herrajes acero cepillado
- Accesorios incluidos: Kit corredera + kit de burletes

### Imágenes
- Imágenes del producto (si están en el HTML estático)

## Cómo Usar los Datos Extraídos

### Opción 1: Agregar Manualmente

1. Ejecuta el script:
```bash
node scripts/fetch-product-improved.js
```

2. Revisa `product-code.ts`

3. Copia el código y pégalo en `data/products.ts`

4. Ajusta manualmente:
   - Precios (si no se extrajeron correctamente)
   - Imágenes (verifica las URLs)
   - Categoría
   - Stock

### Opción 2: Script de Conversión Automática

Puedo crear un script que:
- Tome el JSON extraído
- Lo convierta al formato de tu tienda
- Lo agregue automáticamente a `data/products.ts`

## Ejemplo de Producto Extraído

```typescript
{
  id: 'mampara-corredera-scala',
  name: 'Shower Door ancho ajustable Corredera 8 mm con Herraje acero cepillado – Scala',
  slug: 'mampara-corredera-scala',
  description: 'Solución de shower door corredizo de dos hojas...',
  price: 369990, // Precio base (medida más pequeña)
  originalPrice: 419990, // Precio máximo (medida más grande)
  images: [
    'https://dellorto.cl/wp-content/uploads/.../mampara-corredera.jpg',
    // ... más imágenes
  ],
  category: 'Baños',
  categorySlug: 'banos',
  sku: 'N/A',
  stock: 'available',
  measurements: [
    { size: '120-130 x 190 cm', priceAdjustment: 0 },
    { size: '130-140 x 190 cm', priceAdjustment: 50000 },
    // ... más medidas
  ],
  technicalSpecs: [
    { label: 'Materialidad', value: 'Vidrio templado 8mm' },
    { label: 'Acabado', value: 'Acero cepillado' },
    // ... más especificaciones
  ],
}
```

## Solución de Problemas

### El precio no se extrae correctamente

**Causa:** El precio se carga dinámicamente con JavaScript.

**Solución:**
1. Usa Puppeteer (ver Método 2)
2. Extrae manualmente de la página
3. Busca el precio en el código fuente (Ctrl+U) si está embebido

### Las imágenes no son correctas

**Causa:** El script puede capturar logos o imágenes no relacionadas.

**Solución:**
1. Revisa `product-data.json`
2. Filtra manualmente las URLs de imágenes
3. Usa solo las que sean del producto

### La descripción está incompleta

**Causa:** La descripción puede estar en múltiples secciones.

**Solución:**
1. Combina descripción + especificaciones técnicas
2. Extrae manualmente de la página
3. Usa el contenido completo de las pestañas (Descripción, Especificaciones, etc.)

## Próximos Pasos

1. **Mejorar extracción de precios:**
   - Implementar Puppeteer
   - O extraer de JSON embebido en la página

2. **Automatizar múltiples productos:**
   - Crear script que itere sobre lista de URLs
   - Guardar todos en un array

3. **Sincronización:**
   - Script que verifique cambios de precio
   - Actualización automática de stock

## Notas Importantes

⚠️ **Consideraciones Legales:**
- Verifica los términos de servicio de dellorto.cl
- No abuses del scraping (agrega delays)
- Considera contactarlos para acceso a API oficial
- Usa los datos de manera responsable

💡 **Recomendación:**
Para producción, es mejor:
1. Contactar a dellorto.cl para acceso a su API
2. O usar un servicio de sincronización de catálogos
3. O hacer scraping solo ocasionalmente para actualizar datos
