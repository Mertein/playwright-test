Playwright Test Repo

📌 Propósito

El objetivo de este repositorio es mostrar habilidades para desarrollar pruebas automatizadas en Playwright y como esto puede ayudar a detectar errores en una aplicación. En este caso, una prueba está diseñada para pasar correctamente, mientras que otras dos fallan a propósito para resaltar un bug en la aplicación.

🚀 Instalación y ejecución

Clona este repositorio:

git clone https://github.com/Mertein/playwright-test.git
cd playwright-test

Instala las dependencias:

npm install

Ejecuta las pruebas:

npx playwright test

✅ Pruebas

Prueba Exitosa: Una de las pruebas está configurada para pasar correctamente.

Pruebas Fallidas: Dos pruebas están diseñadas para fallar intencionalmente con el fin de evidenciar un error en la aplicación.

🔧 Posibles Mejoras

Gestión de Base de Datos: Para evitar problemas si la base de datos se limpia frecuentemente, se puede implementar una estrategia en la que:

Se corrar un script que limpie la base de datos de prueba y la llene solo con los datos que necesitamos para el test.
Esto garantizaría que las pruebas sean consistentes y no se vean afectadas por cambios inesperados en la base de datos.
