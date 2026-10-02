# Plan de integración frontend y backend

## 1. Objetivo del Plan

Documentar la integración segura de la SPA en React con Vite y Axios con la API REST en Express, TypeScript y TypeORM. El flujo contempla autenticación, consumo de usuarios y respuestas que no expongan hashes de contraseñas.

## 2. Cambios Implementados en Backend

- Se añadió `GET /api/users`, protegido por autenticación JWT. El repositorio ordena los resultados por ID ascendente y el servicio proyecta solo `id`, `nombre`, `email` y `creadoEn`, excluyendo `passwordHash`.
- El login verifica la contraseña con bcrypt y responde con `{ token, user }`. El JWT expira en una hora; las respuestas de login y registro no incluyen `passwordHash`.
- Se eliminó el handler de registro duplicado en memoria de `backend/src/index.ts`.
- Se quitaron los logs que imprimían variables de conexión a MySQL.
- El backend requiere `JWT_SECRET` para firmar y verificar tokens. Debe configurarse fuera del código y tener al menos 32 caracteres.

## 3. Cambios Implementados en Frontend

- La instancia de Axios en `frontend/src/api/api.js` usa `VITE_API_URL` o, por defecto, `http://localhost:8080/api/users`. Si hay un token guardado, adjunta `Authorization: Bearer <token>`.
- `Users.jsx` reemplaza la lista estática por `GET /`; muestra estados de carga, error y lista vacía.
- `useAuth.js` guarda el token devuelto por el login en `localStorage`. `Login.jsx` redirige a `/users` después de un inicio de sesión exitoso.

## 4. Validaciones y Verificaciones

- Comprobaciones ejecutadas correctamente: `npx tsc --noEmit -p backend/tsconfig.json`, `npm run lint` y `npm run build` desde `frontend/`, y `git diff --check`.
- La prueba en vivo queda pendiente hasta configurar `JWT_SECRET`, las variables de conexión MySQL (`DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASS`) y disponer de MySQL activo. `VITE_API_URL` es opcional si se usa la URL predeterminada.