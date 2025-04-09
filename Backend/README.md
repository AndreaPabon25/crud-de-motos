# 🏍️ Crud de Motos

Este es un proyecto fullstack contenedorizado con Docker que implementa un CRUD (Crear, Leer, Actualizar, Eliminar) de motos. El stack incluye:

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Base de datos:** MySQL
- **Adminer:** Herramienta de gestión de base de datos en web

## 📁 Estructura del proyecto

```
CrudDeMotos/
├── backend/         # Código del backend (API REST)
├── frontend/        # Aplicación web React
├── db/              # Archivos relacionados con la base de datos
├── docker-compose.yml
└── README.md
```

## 🚀 ¿Cómo ejecutar el proyecto?

Asegúrate de tener instalado **Docker** y **Docker Compose**. Luego, sigue estos pasos:

```bash
# Clona el repositorio (si aplica)
git clone <url-del-repo>
cd CrudDeMotos

# Levanta todos los servicios
docker-compose up --build
```

Una vez iniciado, podrás acceder a:

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:3000](http://localhost:3000)
- Adminer: [http://localhost:8080](http://localhost:8080)

## ⚙️ Variables de entorno

Puedes configurar tus credenciales de base de datos en un archivo `.env` (dependiendo de cómo lo tengas en tu backend).

Ejemplo de variables necesarias:

```env
DB_HOST=db
DB_USER=root
DB_PASSWORD=123456
DB_NAME=motos_db
```

## 🧱 Tecnologías usadas

- React
- Vite
- Node.js
- Express
- MySQL
- Docker
- Adminer

## ✍️ Autora

Este proyecto fue desarrollado por Andrea Pabón como parte de una actividad final de Docker en el programa de Tecnología en Análisis y Desarrollo de Software.
