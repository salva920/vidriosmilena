# Guía Completa: Importar Productos de dellorto.cl

Esta guía te ayudará a importar productos desde `dellorto.cl` a tu tienda. Debido a las medidas anti-bot del sitio, hay varias estrategias disponibles.

## 📋 Tabla de Contenidos

1. [Método 1: Puppeteer (Recomendado)](#método-1-puppeteer-recomendado)
2. [Método 2: Procesamiento Manual de HTML](#método-2-procesamiento-manual-de-html)
3. [Método 3: Extracción Manual de URLs](#método-3-extracción-manual-de-urls)
4. [Integrar Productos en la Tienda](#integrar-productos-en-la-tienda)

---

## Método 1: Puppeteer (Recomendado)

Este método usa un navegador real para renderizar JavaScript y evitar bloqueos.

### Paso 1: Instalar Puppeteer

```bash
npm install puppeteer
```

### Paso 2: Preparar URLs

Crea un archivo de texto con las URLs de productos (una por línea):

```
https://dellorto.cl/producto/espejo-circular-marco-aluminio-negro-70-cm-lucca/
https://dellorto.cl/producto/espejo-ovalado-marco-dorado-50x80-cm-spello/
https://dellorto.cl/producto/espejo-circular-modelo-viso-con-bastidor/
```

Guarda este archivo como `urls-productos.txt`.

### Paso 3: Ejecutar el Script

```bash
node scripts/fetch-with-puppeteer.js urls-productos.txt
```

### Paso 4: Revisar Resultados

El script generará dos archivos:
- `products-puppeteer.json`: Datos en formato JSON
- `products-puppeteer.ts`: Código TypeScript listo para usar

---

## Método 2: Procesamiento Manual de HTML

Si Puppeteer no funciona o prefieres un método más controlado, puedes copiar el HTML manualmente.

### Paso 1: Obtener HTML de la Página

1. Abre la página del producto en `dellorto.cl` (ej: `https://dellorto.cl/producto/espejo-circular-marco-aluminio-negro-70-cm-lucca/`)
2. Presiona `F12` para abrir las herramientas de desarrollador
3. Ve a la pestaña "Elements" (o "Elementos")
4. Haz clic derecho en el elemento `<html>` y selecciona "Copy" > "Copy outerHTML"
5. Pega el contenido en un archivo de texto (ej: `espejo-lucca.html`)

### Paso 2: Procesar el HTML

```bash
node scripts/process-html-manual.js espejo-lucca.html espejo-spello.html espejo-viso.html
```

### Paso 3: Revisar Resultados

El script generará:
- `products-from-html.json`: Datos en formato JSON
- `products-from-html.ts`: Código TypeScript listo para usar

---

## Método 3: Extracción Manual de URLs

Si necesitas obtener muchas URLs de productos, puedes extraerlas desde la consola del navegador.

### Paso 1: Abrir la Página de Categoría

Abre una página de categoría en `dellorto.cl`, por ejemplo:
- `https://dellorto.cl/categoria-producto/banos/espejos/`

### Paso 2: Extraer URLs desde la Consola

1. Presiona `F12` para abrir las herramientas de desarrollador
2. Ve a la pestaña "Console"
3. Pega y ejecuta este código:

```javascript
// Extraer todos los enlaces de productos
const links = Array.from(document.querySelectorAll('a[href*="/producto/"]'))
  .map(a => a.href)
  .filter((url, index, self) => self.indexOf(url) === index)
  .filter(url => url.includes('/producto/'));

console.log('URLs encontradas:', links.length);
console.log(links.join('\n'));

// Copiar al portapapeles
navigator.clipboard.writeText(links.join('\n')).then(() => {
  console.log('✅ URLs copiadas al portapapeles');
});
```

4. Las URLs se mostrarán en la consola y se copiarán al portapapeles
5. Pega las URLs en un archivo de texto (ej: `urls-productos.txt`)

### Paso 3: Procesar las URLs

Usa el método 1 (Puppeteer) o método 2 (HTML manual) con las URLs obtenidas.

---

## Integrar Productos en la Tienda

Una vez que tengas los productos extraídos, sigue estos pasos:

### Paso 1: Revisar los Productos Extraídos

Abre el archivo `products-puppeteer.ts` o `products-from-html.ts` y revisa que los datos sean correctos:
- Nombres correctos
- Precios correctos
- Imágenes válidas
- Categorías correctas

### Paso 2: Agregar a `data/products.ts`

1. Abre `data/products.ts`
2. Copia el contenido del array `importedProducts` desde el archivo generado
3. Pega los productos en el array `products` de `data/products.ts`

Ejemplo:

```typescript
import { importedProducts } from './products-puppeteer';

export const products: Product[] = [
  ...importedProducts,
  // ... otros productos existentes
];
```

O simplemente copia y pega cada objeto del array `importedProducts` dentro del array `products`.

### Paso 3: Verificar Categorías

Asegúrate de que las categorías de los productos importados coincidan con las categorías definidas en `data/products.ts`:

```typescript
export const categories: Category[] = [
  { id: 'banos', name: 'Baños', slug: 'banos', ... },
  { id: 'cocinas', name: 'Cocinas', slug: 'cocinas', ... },
  // ...
]
```

Si necesitas agregar nuevas categorías, agrégalas a este array.

### Paso 4: Probar la Tienda

1. Ejecuta `npm run dev`
2. Navega a `/tienda`
3. Verifica que los productos se muestren correctamente
4. Revisa las imágenes, precios y descripciones

---

## 🔧 Solución de Problemas

### Error: "Puppeteer no está instalado"
```bash
npm install puppeteer
```

### Error: "No se pudo extraer producto"
- Verifica que la URL sea correcta
- Intenta el método 2 (procesamiento manual de HTML)
- Revisa que el HTML contenga la información del producto

### Error: "Precio no encontrado"
- El precio puede estar en formato dinámico
- Revisa manualmente el HTML y ajusta los patrones de búsqueda en el script
- O agrega el precio manualmente después de importar

### Error: "Imágenes no encontradas"
- Las imágenes pueden estar cargadas dinámicamente
- Usa el método 2 (procesamiento manual) después de que la página cargue completamente
- O descarga las imágenes manualmente y súbelas a `/public/img/`

---

## 📝 Notas Importantes

1. **Respeto a los Términos de Uso**: Asegúrate de tener permiso para usar el contenido de `dellorto.cl`
2. **Delays entre Requests**: Los scripts incluyen delays para evitar sobrecargar el servidor
3. **Revisión Manual**: Siempre revisa los datos extraídos antes de publicarlos
4. **Imágenes**: Las URLs de imágenes apuntan a `dellorto.cl`. Considera descargarlas y alojarlas en tu servidor

---

## 🚀 Próximos Pasos

1. Importa productos de todas las categorías
2. Revisa y corrige datos manualmente si es necesario
3. Descarga y aloja las imágenes localmente
4. Configura precios y stock según tu negocio
5. Agrega descripciones personalizadas si es necesario

---

¿Necesitas ayuda? Revisa los archivos de guía adicionales:
- `GUIA_COPIAR_HTML.md`: Instrucciones detalladas para copiar HTML
- `GUIA_OBTENER_URLS_MANUAL.md`: Cómo extraer URLs desde la consola
- `GUIA_IMPORTAR_PRODUCTOS.md`: Guía anterior (métodos alternativos)
