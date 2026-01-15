# Guía para Obtener Productos de dellorto.cl

Esta guía explica diferentes métodos para extraer información de productos del sitio web dellorto.cl.

## Métodos Disponibles

### Método 1: API REST de WooCommerce (Recomendado)

Si el sitio tiene la API REST de WooCommerce habilitada, puedes obtener productos directamente:

```bash
# Verificar si la API está disponible
curl https://dellorto.cl/wp-json/wc/v3/products
```

**Ventajas:**
- Datos estructurados y limpios
- Información completa del producto
- No requiere parsing de HTML

**Desventajas:**
- Puede requerir autenticación (Consumer Key/Secret)
- Puede estar deshabilitada por seguridad

### Método 2: Scraping Básico (Node.js)

Usa el script `fetch-single-product.js`:

```bash
node scripts/fetch-single-product.js
```

Este script:
- Descarga el HTML de la página del producto
- Extrae información básica (nombre, precio, descripción, imágenes)
- Guarda los datos en `product-data.json`

### Método 3: Scraping Avanzado con Puppeteer

Para sitios con contenido dinámico (JavaScript):

```bash
npm install puppeteer
```

Luego modifica `scripts/fetch-products.ts` para usar Puppeteer.

### Método 4: Usar Herramientas Externas

#### Opción A: WooCommerce API Browser Extension
- Instala una extensión del navegador que explore la API REST
- Útil para descubrir endpoints disponibles

#### Opción B: Postman
- Importa la colección de WooCommerce REST API
- Explora los endpoints disponibles

#### Opción C: Scraping con Python (BeautifulSoup/Scrapy)
```python
import requests
from bs4 import BeautifulSoup

url = 'https://dellorto.cl/producto/mampara-corredera-vidrio-templado-8-mm-modelo-scala-con-herrajes-acero-cepillado/'
response = requests.get(url)
soup = BeautifulSoup(response.content, 'html.parser')

# Extraer información
name = soup.find('h1').text
price = soup.find(class_='price').text
```

## Información que se puede Extraer

Basado en la página de ejemplo, puedes obtener:

1. **Información Básica:**
   - Nombre del producto
   - SKU
   - Descripción
   - Precio (y precio original si hay descuento)

2. **Medidas/Variaciones:**
   - Tabla de medidas disponibles
   - Opciones de tamaño (120-130 x 190 cm, etc.)

3. **Especificaciones Técnicas:**
   - Materialidad
   - Acabado
   - Accesorios incluidos
   - Peso y dimensiones

4. **Imágenes:**
   - Imágenes del producto
   - Galería de fotos

5. **Información Adicional:**
   - Categoría
   - Tags
   - Stock disponible

## Consideraciones Legales y Éticas

⚠️ **IMPORTANTE:**
- Verifica los términos de servicio del sitio web
- Respeta el `robots.txt` del sitio
- No hagas demasiadas solicitudes (rate limiting)
- Considera contactar al sitio para acceso oficial a la API
- Usa los datos extraídos de manera responsable

## Integración con tu Tienda

Una vez que tengas los datos, puedes:

1. **Convertir al formato de tu tienda:**
```typescript
// Ejemplo de conversión
const convertedProduct: Product = {
  id: generateId(),
  name: scrapedData.name,
  slug: slugify(scrapedData.name),
  description: scrapedData.description,
  price: scrapedData.price,
  images: scrapedData.images,
  category: mapCategory(scrapedData.category),
  // ... más campos
}
```

2. **Agregar a `data/products.ts`:**
```typescript
export const products: Product[] = [
  // ... productos existentes
  convertedProduct,
]
```

3. **Automatizar con un script:**
```bash
node scripts/import-products.js
```

## Solución de Problemas

### Error: "Cannot find module"
```bash
npm install
```

### Error: "CORS policy"
- El scraping debe hacerse desde el servidor, no desde el navegador
- Usa Node.js o un servicio backend

### Error: "Rate limited"
- Agrega delays entre solicitudes
- Usa un User-Agent apropiado
- Considera usar un proxy

### Datos incompletos
- El sitio puede usar JavaScript para cargar contenido
- Usa Puppeteer o similar para renderizar JavaScript
- Verifica la estructura HTML del sitio

## Recursos Adicionales

- [WooCommerce REST API Documentation](https://woocommerce.github.io/woocommerce-rest-api-docs/)
- [Puppeteer Documentation](https://pptr.dev/)
- [BeautifulSoup Documentation](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)
