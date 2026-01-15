# Guía Completa para Importar Productos de dellorto.cl

## 🎯 Método Recomendado: Lista Manual de URLs

Dado que dellorto.cl carga productos dinámicamente con JavaScript y tiene protecciones, el método más confiable es:

### Paso 1: Obtener URLs de Productos Manualmente

1. **Visita dellorto.cl** en tu navegador
2. **Navega por las categorías** y abre cada producto
3. **Copia la URL** de cada producto que quieras importar
4. **Guarda las URLs** en un archivo de texto

### Paso 2: Crear Archivo de URLs

Crea un archivo `urls-productos.txt` con las URLs, una por línea:

```
https://dellorto.cl/producto/mampara-corredera-vidrio-templado-8-mm-modelo-scala-con-herrajes-acero-cepillado/
https://dellorto.cl/producto/otro-producto/
https://dellorto.cl/producto/otro-producto-mas/
```

### Paso 3: Ejecutar el Script

```bash
node scripts/fetch-products-from-list.js urls-productos.txt
```

O agrega las URLs directamente en el script:

```javascript
// En scripts/fetch-products-from-list.js
const PRODUCT_URLS = [
  'https://dellorto.cl/producto/producto-1/',
  'https://dellorto.cl/producto/producto-2/',
  // ... más URLs
];
```

Luego ejecuta:
```bash
node scripts/fetch-products-from-list.js
```

## 📋 Cómo Obtener las URLs Rápidamente

### Opción A: Desde el Navegador

1. Abre las herramientas de desarrollador (F12)
2. Ve a la pestaña "Network"
3. Filtra por "producto"
4. Navega por la tienda
5. Copia las URLs de las solicitudes

### Opción B: Desde el Código Fuente

1. Abre la página de categoría en dellorto.cl
2. Haz clic derecho > "Ver código fuente"
3. Busca (Ctrl+F) "producto/"
4. Copia todas las URLs que encuentres

### Opción C: Usar Extensión del Navegador

Instala una extensión como "Link Grabber" que extrae todos los enlaces de una página.

## 🔧 Solución de Problemas

### Error 403/202: Forbidden/Accepted

**Causa**: El sitio detecta que es un bot.

**Solución**:
1. Usa el método manual (copiar URLs)
2. O ejecuta el script desde un servidor/VPS
3. O usa un servicio de proxy

### Precios No Se Extraen Correctamente

**Solución Manual**:
1. Abre `all-products-data.json`
2. Revisa cada producto
3. Ajusta los precios manualmente
4. O edita `all-products-code.ts` antes de agregar

### Imágenes No Se Extraen

**Solución**:
1. Revisa `all-products-data.json`
2. Busca las imágenes manualmente en dellorto.cl
3. Agrega las URLs correctas

## 📝 Proceso Completo Paso a Paso

### 1. Preparar Lista de URLs

```bash
# Crea el archivo
touch urls-productos.txt

# Agrega URLs (una por línea)
# Puedes usar cualquier editor de texto
```

### 2. Ejecutar Extracción

```bash
node scripts/fetch-products-from-list.js urls-productos.txt
```

### 3. Revisar Resultados

```bash
# Ver JSON con los datos
cat all-products-data.json

# Ver código TypeScript generado
cat all-products-code.ts
```

### 4. Agregar a tu Tienda

Abre `all-products-code.ts` y copia el contenido a `data/products.ts`:

```typescript
// En data/products.ts
import { importedProducts } from './all-products-code'

export const products: Product[] = [
  ...existingProducts,
  ...importedProducts,
]
```

O agrega selectivamente solo los productos que quieras.

## 🎨 Ajustes Recomendados Después de Importar

1. **Precios**: Verifica y ajusta según tu estrategia de precios
2. **Imágenes**: Descarga y aloja localmente si es necesario
3. **Categorías**: Confirma que estén correctas
4. **Stock**: Ajusta según disponibilidad real
5. **Featured**: Marca productos destacados
6. **Tags**: Agrega tags como "OFERTA", "NUEVO", etc.

## 📊 Ejemplo de Uso

```bash
# 1. Crear archivo con URLs
echo "https://dellorto.cl/producto/mampara-corredera-vidrio-templado-8-mm-modelo-scala-con-herrajes-acero-cepillado/" > urls.txt

# 2. Ejecutar script
node scripts/fetch-products-from-list.js urls.txt

# 3. Revisar resultados
# Abre all-products-code.ts y revisa los productos

# 4. Agregar a tu tienda
# Copia el contenido de all-products-code.ts a data/products.ts
```

## ⚠️ Consideraciones Importantes

### Legales
- ✅ Verifica términos de servicio de dellorto.cl
- ✅ No abuses del scraping
- ✅ Considera contactar para acceso oficial
- ✅ Usa los datos de manera responsable

### Técnicas
- ⚠️ Algunos datos pueden necesitar ajuste manual
- ⚠️ Las imágenes son URLs externas
- ⚠️ Los precios pueden cambiar
- 💡 Considera sincronización periódica

## 🚀 Alternativa: Usar API de WooCommerce

Si dellorto.cl tiene la API REST de WooCommerce habilitada:

```bash
# Probar si está disponible
curl https://dellorto.cl/wp-json/wc/v3/products
```

Si funciona, puedes obtener todos los productos directamente desde la API.

## 📞 Próximos Pasos

1. ✅ Obtener lista de URLs de productos
2. ✅ Ejecutar script de extracción
3. ✅ Revisar y ajustar datos
4. ✅ Agregar a tu tienda
5. ✅ Probar que todo funcione

---

**¡Listo!** Con esta guía puedes importar productos de dellorto.cl de forma sistemática. 🎉
