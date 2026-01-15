# Guía para Obtener URLs de Productos Manualmente

Dado que dellorto.cl carga productos dinámicamente con JavaScript, la forma más confiable es obtener las URLs manualmente desde el navegador.

## 🎯 Método 1: Desde las Herramientas de Desarrollador (Recomendado)

### Paso 1: Abrir Herramientas de Desarrollador

1. Abre dellorto.cl en tu navegador (Chrome, Firefox, Edge)
2. Presiona `F12` o clic derecho > "Inspeccionar"
3. Ve a la pestaña **"Network"** (Red)

### Paso 2: Filtrar Solicitudes

1. En el filtro de Network, escribe: `producto`
2. Navega por las categorías de productos
3. Verás las solicitudes que cargan productos

### Paso 3: Extraer URLs

1. Busca solicitudes que contengan `/producto/` en la URL
2. Haz clic derecho en la solicitud > "Copy" > "Copy URL"
3. O copia directamente desde la columna "Name"

### Paso 4: Guardar URLs

Crea un archivo `urls-productos.txt` y pega todas las URLs, una por línea:

```
https://dellorto.cl/producto/espejo-circular-led-touch-60-cm-iluminacion-frontal-capri/
https://dellorto.cl/producto/shower-door-8-mm-empavonado-herrajes-cromados-bagno/
...
```

## 🎯 Método 2: Desde el Código Fuente de la Página

### Paso 1: Ver Código Fuente

1. Abre una página de categoría (ej: https://dellorto.cl/categoria-producto/banos/)
2. Presiona `Ctrl+U` (o clic derecho > "Ver código fuente")

### Paso 2: Buscar Productos

1. Presiona `Ctrl+F` para buscar
2. Busca: `producto/`
3. Copia todas las URLs que encuentres

### Paso 3: Limpiar URLs

Elimina duplicados y URLs que no sean de productos (como categorías, tags, etc.)

## 🎯 Método 3: Desde el HTML Renderizado

### Paso 1: Inspeccionar Elemento

1. Abre una página de categoría
2. Haz clic derecho en un producto > "Inspeccionar"
3. Busca el enlace del producto en el HTML

### Paso 2: Copiar URL

1. Encuentra el elemento `<a>` que contiene el enlace
2. Copia el valor del atributo `href`

## 🎯 Método 4: Usar Extensión del Navegador

### Opción A: Link Grabber

1. Instala la extensión "Link Grabber" en Chrome
2. Abre una página de categoría
3. Haz clic en el ícono de la extensión
4. Filtra por URLs que contengan `/producto/`
5. Exporta las URLs

### Opción B: Web Scraper

1. Instala "Web Scraper" (extensión de Chrome)
2. Crea un scraper que busque enlaces con `/producto/`
3. Ejecuta el scraper
4. Exporta los resultados

## 🎯 Método 5: Desde la Consola del Navegador

### Paso 1: Abrir Consola

1. Abre las herramientas de desarrollador (F12)
2. Ve a la pestaña **"Console"**

### Paso 2: Ejecutar Script

Pega este código en la consola:

```javascript
// Extraer todas las URLs de productos de la página actual
const productLinks = Array.from(document.querySelectorAll('a[href*="/producto/"]'));
const urls = productLinks.map(link => {
  const href = link.getAttribute('href');
  return href.startsWith('http') ? href : 'https://dellorto.cl' + href;
});

// Eliminar duplicados
const uniqueUrls = [...new Set(urls)];

// Mostrar en consola
console.log('URLs encontradas:');
uniqueUrls.forEach(url => console.log(url));

// Copiar al portapapeles (si el navegador lo permite)
navigator.clipboard.writeText(uniqueUrls.join('\n')).then(() => {
  console.log('✅ URLs copiadas al portapapeles');
});
```

### Paso 3: Copiar Resultados

1. Las URLs se mostrarán en la consola
2. Cópialas manualmente o usa el portapapeles si está disponible

## 📋 Lista de Categorías para Revisar

Revisa estas categorías para obtener productos:

1. ✅ https://dellorto.cl/categoria-producto/banos/
2. ✅ https://dellorto.cl/categoria/splashback/
3. ✅ https://dellorto.cl/pergolas-bioclimaticas-v2/
4. ✅ https://dellorto.cl/categoria-producto/terrazas-quinchos/
5. ✅ https://dellorto.cl/categoria/revestimientos/
6. ✅ https://dellorto.cl/categoria/tabiquerias/
7. ✅ https://dellorto.cl/categoria/pisos-y-escaleras/
8. ✅ https://dellorto.cl/categoria/puertas-y-ventanas/
9. ✅ https://dellorto.cl/categoria-producto/banos/espejos/
10. ✅ https://dellorto.cl/categoria-producto/habitaciones-oficinas/pizarra/
11. ✅ https://dellorto.cl/categoria-producto/muebles-decoracion/cubiertas/
12. ✅ https://dellorto.cl/categoria/frentes-templados/

## 🚀 Una Vez que Tengas las URLs

### Opción 1: Usar el Script de Extracción

```bash
# Guarda las URLs en un archivo
# Luego ejecuta:
node scripts/fetch-products-from-list.js urls-productos.txt
```

### Opción 2: Agregar Directamente al Script

Edita `scripts/fetch-products-from-list.js` y agrega las URLs en el array `PRODUCT_URLS`.

## 💡 Consejos

1. **Navega por todas las páginas** de cada categoría (página 1, 2, 3, etc.)
2. **Revisa también subcategorías** (como espejos dentro de baños)
3. **Guarda las URLs** en un archivo de texto para no perderlas
4. **Elimina duplicados** antes de procesar
5. **Verifica que las URLs** sean válidas antes de ejecutar el script

## ⚠️ Nota Importante

Si el sitio tiene paginación, necesitarás:
- Navegar por todas las páginas de cada categoría
- O usar el método de consola del navegador que extrae todos los productos visibles
- O revisar la API/endpoint que carga los productos dinámicamente

---

**¡Con estos métodos puedes obtener todas las URLs de productos de dellorto.cl!** 🎉
