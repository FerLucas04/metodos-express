# Instrucciones del workspace

## Estructura
- Este repositorio contiene dos aplicaciones independientes: `backend/` (API REST) y `frontend/` (SPA). Ejecuta comandos desde la carpeta de la aplicación correspondiente; no hay scripts definidos en la raíz.
- Mantén cada cambio en el módulo responsable. En el backend, los módulos de dominio se organizan en rutas, controladores, servicios, repositorios y entidades; reutiliza esa separación.
- En el frontend, sigue la organización existente de `src/api`, `src/components`, `src/modules`, `src/pages` y `src/routes`.

## Backend
- Usa TypeScript con modo estricto, módulos ES, Express 5 y TypeORM con MySQL. Conserva los decoradores de TypeORM y las extensiones `.js` en las rutas de importación del código TypeScript existente.
- Mantén las rutas REST bajo `/api/users` y valida los cuerpos de entrada con los middlewares y patrones existentes. Coordina cualquier cambio de endpoint con el cliente frontend.
- Centraliza la lógica de negocio en servicios y el acceso a datos en repositorios; evita duplicar endpoints o lógica de dominio en `src/index.ts`.
- Para desarrollo, ejecuta `npm run dev` desde `backend/`. `npm start` también inicia la API. No hay pruebas backend configuradas actualmente; no asumas que `npm test` valida el proyecto.

## Frontend
- Usa React con JavaScript/JSX, Vite, React Router y Axios; el React Compiler está habilitado. Sigue los componentes y hooks existentes y evita añadir TypeScript al frontend sin una necesidad explícita.
- Centraliza las llamadas HTTP en `src/api/api.js`. La URL base se configura con `VITE_API_URL` y, si no está definida, apunta a `http://localhost:8080/api/users`.
- Para validar cambios, ejecuta `npm run lint` y `npm run build` desde `frontend/`.

## Seguridad y configuración
- No incluyas secretos, credenciales ni archivos `.env` en el código, logs o commits. Usa variables de entorno para la configuración de la base de datos, el puerto y la URL de la API.
- No devuelvas ni registres contraseñas en texto plano; conserva el hashing y la comparación con bcrypt en los flujos de autenticación.
- Evita cambios incompatibles en el formato de solicitudes o respuestas sin actualizar ambos lados de la API.

## Cambios y validación
- Conserva el estilo y los nombres establecidos en el área que modificas; mantén los cambios enfocados y no reformatees archivos ajenos a la tarea.
- Antes de terminar, ejecuta las comprobaciones disponibles para la aplicación modificada y comunica cualquier validación que no haya podido ejecutarse.