# Guía para Importar Todos los Productos de dellorto.cl

Este script extrae **todos los productos** de dellorto.cl y los convierte al formato de tu tienda.

## 🚀 Uso Rápido

```bash
node scripts/fetch-all-products.js
```

## 📋 Qué Hace el Script

1. **Busca productos** en todas las categorías de dellorto.cl
2. **Extrae información** de cada producto:
   - Nombre y descripción
   - Precios (rango si aplica)
   - Imágenes
   - Medidas/variaciones
   - Especificaciones técnicas
   - SKU
   - Categoría
3. **Convierte al formato** de tu tienda
4. **Genera archivos** listos para usar

## 📁 Archivos Generados

Después de ejecutar el script, se generan:

- **`all-products-data.json`**: Datos en formato JSON (para revisión)
- **`all-products-code.ts`**: Código TypeScript listo para agregar a `data/products.ts`

## ⏱️ Tiempo Estimado

- **~2 segundos por producto** (rate limiting para no sobrecargar el servidor)
- Si hay 50 productos: ~2 minutos
- Si hay 100 productos: ~4 minutos

## 📝 Proceso Paso a Paso

### 1. Ejecutar el Script

```bash
node scripts/fetch-all-products.js
```

Verás un progreso como:
```
🔍 Buscando URLs de productos...
📂 Procesando categoría: /producto-categoria/banos/
   ✅ Encontrados 15 productos únicos hasta ahora
...
📦 Total de productos a procesar: 50
⏳ Procesando productos (con delay de 2s entre cada uno)...
✅ [1] Shower Door ancho ajustable Corredera 8 mm...
✅ [2] Espejo circular Led touch 60 cm...
...
```

### 2. Revisar los Resultados

Abre `all-products-code.ts` y revisa:
- ✅ Nombres correctos
- ✅ Precios correctos (ajusta manualmente si es necesario)
- ✅ Imágenes válidas
- ✅ Categorías correctas

### 3. Agregar a tu Tienda

**Opción A: Agregar todos de una vez**
```typescript
// En data/products.ts
import { importedProducts } from './all-products-code'
export const products: Product[] = [
  ...existingProducts,
  ...importedProducts,
]
```

**Opción B: Agregar selectivamente**
```typescript
// Revisa all-products-code.ts y copia solo los productos que quieras
// Pega en data/products.ts
```

### 4. Ajustes Manuales Recomendados

Después de importar, revisa y ajusta:

1. **Precios**: Algunos precios pueden necesitar ajuste manual
2. **Imágenes**: Verifica que las URLs sean válidas
3. **Categorías**: Confirma que estén en las categorías correctas
4. **Stock**: Ajusta según disponibilidad real
5. **Featured**: Marca productos destacados si aplica

## ⚙️ Configuración

Puedes ajustar en el script:

```javascript
const DELAY_BETWEEN_REQUESTS = 2000; // Tiempo entre solicitudes (ms)
```

**Recomendación**: Mantén al menos 2 segundos para no sobrecargar el servidor.

## 🔧 Solución de Problemas

### Error: "Cannot find module"
```bash
# Asegúrate de estar en el directorio raíz del proyecto
cd /ruta/al/proyecto
node scripts/fetch-all-products.js
```

### Algunos productos no se extraen correctamente

**Causa**: El sitio puede cargar algunos datos con JavaScript.

**Solución**:
1. Revisa `all-products-data.json` para ver qué se extrajo
2. Completa manualmente los productos faltantes
3. O usa Puppeteer para renderizar JavaScript (más complejo)

### Precios incorrectos

**Causa**: Los precios pueden estar en formato dinámico.

**Solución**:
1. Revisa manualmente en dellorto.cl
2. Ajusta en `all-products-code.ts` antes de agregar
3. O edita después de agregar a `data/products.ts`

### Muchos errores

**Causa**: Puede ser rate limiting o cambios en la estructura del sitio.

**Solución**:
1. Aumenta `DELAY_BETWEEN_REQUESTS` a 3000 o 5000
2. Ejecuta el script nuevamente
3. Los productos ya procesados se guardan, puedes continuar desde donde quedó

## 📊 Estructura de Datos

El script genera productos en este formato:

```typescript
{
  id: 'slug-del-producto',
  name: 'Nombre del Producto',
  slug: 'slug-del-producto',
  category: 'Baños',
  categorySlug: 'banos',
  price: 369990,
  originalPrice: 419990, // Si hay rango de precios
  sku: 'SKU-123',
  images: ['url1', 'url2'],
  description: 'Descripción completa...',
  technicalSpecs: [
    { name: 'Materialidad', value: 'Vidrio templado 8mm' }
  ],
  measurements: [
    { id: '120-130', label: '120-130 x 190 cm', value: '120-130 x 190 cm' }
  ],
  stock: 'available',
}
```

## ⚠️ Consideraciones Importantes

### Legales
- ✅ Verifica los términos de servicio de dellorto.cl
- ✅ No abuses del scraping (el script ya incluye rate limiting)
- ✅ Considera contactar a dellorto.cl para acceso oficial a su catálogo
- ✅ Usa los datos de manera responsable

### Técnicas
- ⚠️ Algunos datos pueden necesitar ajuste manual
- ⚠️ Las imágenes son URLs externas (dependen de dellorto.cl)
- ⚠️ Los precios pueden cambiar en dellorto.cl sin que te enteres
- 💡 Considera sincronización periódica o manual

## 🎯 Próximos Pasos

1. **Ejecutar el script** para obtener todos los productos
2. **Revisar y ajustar** los datos generados
3. **Agregar a tu tienda** en `data/products.ts`
4. **Probar** que todo funcione correctamente
5. **Ajustar precios/imágenes** según necesidad

## 📞 Soporte

Si encuentras problemas:
1. Revisa los logs del script
2. Verifica la estructura de dellorto.cl (puede haber cambiado)
3. Ajusta el script según sea necesario

---

**¡Listo!** Con este script puedes importar todos los productos de dellorto.cl a tu tienda de forma automatizada. 🎉
