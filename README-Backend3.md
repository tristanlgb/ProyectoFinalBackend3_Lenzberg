# 🧾 Proyecto Final Backend 3 – Sistema de Gestión de Productos y Usuarios

**Entrega final del curso de Backend en Coderhouse**  
Desarrollado con Node.js, Express, MongoDB y EJS.

## 📚 Descripción

Este proyecto es una aplicación web que permite gestionar productos y usuarios, incluyendo funcionalidades como:

- Registro y autenticación de usuarios.
- CRUD de productos.
- Gestión de roles (administrador y usuario).
- Vistas dinámicas con EJS.
- Persistencia de datos con MongoDB.

## 🛠️ Tecnologías Utilizadas

- Node.js
- Express.js
- MongoDB y Mongoose
- EJS (Embedded JavaScript templates)
- JavaScript
- HTML y CSS

## 🚀 Instrucciones para Ejecutar el Proyecto

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tristanlgb/ProyectoFinalBackend3_Lenzberg.git
   cd ProyectoFinalBackend3_Lenzberg
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:
   Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
   ```
   PORT=3000
   MONGODB_URI=tu_uri_de_mongodb
   SECRET_KEY=tu_clave_secreta
   ```

4. **Iniciar el servidor**:
   ```bash
   npm start
   ```

5. **Acceder a la aplicación**:
   Abre tu navegador en `http://localhost:3000/`.

## 📁 Estructura del Proyecto

```
ProyectoFinalBackend3_Lenzberg/
├── src/
│   ├── controllers/         # Controladores de la aplicación
│   ├── models/              # Modelos de Mongoose
│   ├── routes/              # Rutas de la aplicación
│   ├── views/               # Plantillas EJS
│   ├── public/              # Archivos estáticos (CSS, JS, imágenes)
│   └── app.js               # Configuración principal del servidor
├── .env                     # Variables de entorno
├── package.json             # Dependencias y scripts del proyecto
└── README.md                # Documentación del proyecto
```

## 📌 Notas Adicionales

- Asegúrate de tener MongoDB en funcionamiento y accesible desde la URI proporcionada en `.env`.
- Se recomienda utilizar herramientas como Postman para probar las rutas de la API.

## 👨‍💻 Autor

**Tristan Lenzberg**  
Desarrollador Full Stack  
[GitHub](https://github.com/tristanlgb) | [LinkedIn](https://ar.linkedin.com/in/tristan-lenzberg-9b13422b3)
