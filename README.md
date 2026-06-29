# AdoptMe — Backend III

API y aplicación web para gestionar usuarios, mascotas y adopciones. El proyecto aplica una arquitectura de DAO, repositorios y servicios, e incluye autenticación por sesión, carga de documentos, pruebas de integración y contenedores Docker.

## Funcionalidades

- Gestión de usuarios y mascotas.
- Registro de adopciones entre usuarios y mascotas.
- Inicio de sesión y sesiones persistentes.
- Carga de documentos con Multer.
- DTOs para normalizar respuestas.
- Repositorios sobre DAOs de MongoDB.
- Vistas con Handlebars.
- Pruebas de sesiones y adopciones.
- Entorno Docker con `docker-compose`.

## Stack

- Node.js y Express
- MongoDB y Mongoose
- Express Session
- Handlebars
- bcrypt y JSON Web Tokens
- Multer
- Mocha, Chai y Supertest
- Docker

## Arquitectura

El flujo principal separa `routes`, `controllers`, `services`, `repository`, `dao` y modelos de Mongoose. Esta organización desacopla la capa HTTP de la persistencia.

## Configuración

Crear `.env` con:

```env
PORT=8080
MONGO_URI=mongodb://localhost:27017/adoptme
SESSION_SECRET=una_clave_segura
```

## Ejecución

```bash
npm install
npm run dev
```

Pruebas: `npm test`. Con Docker: `docker compose up --build`.

Endpoints principales: `/api/users`, `/api/sessions`, `/api/pets` y `/api/adoptions`.

> Proyecto educativo. No incluir secretos reales en `env.txt` ni en archivos versionados.