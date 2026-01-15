@echo off
REM Script para eliminar archivos generados del repositorio git (Windows)
REM Ejecutar desde la raíz del proyecto

echo Eliminando archivos generados del repositorio...

git rm --cached product-code.ts 2>nul || echo product-code.ts no encontrado en git
git rm --cached products-from-html.ts 2>nul || echo products-from-html.ts no encontrado en git
git rm --cached all-products-code.ts 2>nul || echo all-products-code.ts no encontrado en git
git rm --cached product-data.json 2>nul || echo product-data.json no encontrado en git
git rm --cached all-products-data.json 2>nul || echo all-products-data.json no encontrado en git
git rm --cached products-from-html.json 2>nul || echo products-from-html.json no encontrado en git

echo.
echo Archivos eliminados del indice de git
echo.
echo Ahora haz commit y push:
echo    git add .gitignore
echo    git commit -m "Fix: Eliminar archivos generados del repositorio"
echo    git push

pause
