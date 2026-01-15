# Guía para Copiar HTML y Procesar Productos

Como dellorto.cl tiene protección anti-bot, puedes copiar el HTML manualmente y procesarlo.

## 🎯 Método Rápido: Copiar HTML de Páginas de Producto

### Paso 1: Abrir Página de Producto

1. Abre una página de producto en dellorto.cl (ej: https://dellorto.cl/producto/espejo-circular-marco-aluminio-negro-70-cm-lucca/)
2. Espera a que la página cargue completamente

### Paso 2: Copiar el HTML

**Opción A: Desde el Código Fuente**
1. Presiona `Ctrl+U` (o clic derecho > "Ver código fuente")
2. Selecciona todo (`Ctrl+A`)
3. Copia (`Ctrl+C`)
4. Pega en un archivo de texto y guárdalo como `producto1.html`

**Opción B: Desde las Herramientas de Desarrollador**
1. Presiona `F12` para abrir herramientas de desarrollador
2. Ve a la pestaña "Elements" (Elementos)
3. Haz clic derecho en `<html>` > "Copy" > "Copy outerHTML"
4. Pega en un archivo y guárdalo como `producto1.html`

### Paso 3: Procesar el HTML

```bash
# Procesar un archivo
node scripts/process-html-manual.js producto1.html

# Procesar múltiples archivos
node scripts/process-html-manual.js producto1.html producto2.html producto3.html
```

### Paso 4: Revisar Resultados

El script generará:
- `products-from-html.json` - Datos en JSON
- `products-from-html.ts` - Código TypeScript listo para usar

## 📋 Proceso Completo Ejemplo

```bash
# 1. Copia el HTML de 3 productos y guárdalos como:
#    - espejo-lucca.html
#    - espejo-spello.html
#    - espejo-viso.html

# 2. Procesa todos los archivos
node scripts/process-html-manual.js espejo-lucca.html espejo-spello.html espejo-viso.html

# 3. Revisa products-from-html.ts

# 4. Copia el contenido a data/products.ts
```

## 🚀 Extraer Múltiples Productos de una Categoría

### Método: Copiar HTML de la Página de Categoría

1. Abre la página de categoría: https://dellorto.cl/categoria-producto/banos/espejos/
2. Espera a que carguen todos los productos
3. Presiona `F12` > "Elements"
4. Busca el contenedor de productos
5. Copia el HTML de ese contenedor
6. Guárdalo como `categoria-espejos.html`
7. El script puede extraer múltiples productos si están en el HTML

## 💡 Consejos

1. **Asegúrate de que la página esté completamente cargada** antes de copiar el HTML
2. **Guarda cada producto en un archivo separado** para mejor organización
3. **Revisa los resultados** antes de agregar a tu tienda
4. **Ajusta precios e imágenes** si es necesario

## ⚠️ Nota

Si el HTML no contiene toda la información (porque se carga con JavaScript), puedes:
- Esperar unos segundos después de que la página cargue
- Hacer scroll para cargar más contenido
- O copiar el HTML después de que todo esté visible

---

**¡Con este método puedes procesar productos aunque el sitio tenga protección anti-bot!** 🎉
