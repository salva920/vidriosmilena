# Eliminar Archivos Generados del Repositorio

El archivo `product-code.ts` y otros archivos generados por los scripts están causando errores de compilación en Vercel porque están en el repositorio remoto.

## Solución Rápida (Windows):

Ejecuta el script:
```bash
scripts\eliminar-archivos-generados.bat
```

Luego haz commit y push:
```bash
git add .gitignore
git commit -m "Fix: Eliminar archivos generados del repositorio"
git push
```

## Solución Manual:

1. **Eliminar los archivos del repositorio (mantener localmente):**
   ```bash
   git rm --cached product-code.ts
   git rm --cached products-from-html.ts
   git rm --cached all-products-code.ts
   git rm --cached product-data.json
   git rm --cached all-products-data.json
   git rm --cached products-from-html.json
   ```

2. **Hacer commit:**
   ```bash
   git add .gitignore
   git commit -m "Fix: Eliminar archivos generados del repositorio y actualizar .gitignore"
   ```

3. **Hacer push:**
   ```bash
   git push
   ```

## Nota:

Los scripts ahora generan los archivos en `scripts/output/` en lugar de la raíz del proyecto, y esta carpeta está en `.gitignore`. Esto evita que se generen archivos problemáticos en el futuro.
