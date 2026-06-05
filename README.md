# 🎵 Vinyl Shop Backend

API REST para una tienda de discos de vinilo. Backend construido con **Node.js**, **Express** y **MongoDB** que proporciona un sistema completo de gestión de vinilos.

## 📋 Descripción

Este proyecto es el backend del sistema de la Vinyl Shop, una plataforma de e-commerce especializada en la venta de discos de vinilo. Proporciona endpoints RESTful para obtener información sobre los vinilos disponibles en el catálogo, incluyendo detalles de cada producto, precios e inventario.

## 🚀 Requisitos Previos

Asegúrate de tener instalado:

- **Node.js** (versión 16 o superior)
- **npm** o **yarn**
- **MongoDB** (local o en la nube, ej: MongoDB Atlas)
- **Git**

## 📦 Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/wilson82490/proyecto-final-vinyl-shop-backend.git
   ```

2. **Navega al directorio del proyecto:**

   ```bash
   cd proyecto-final-vinyl-shop-backend
   ```

3. **Instala las dependencias:**

   ```bash
   npm install
   ```

4. **Crea un archivo `.env`** con tus variables de entorno:

   ```bash
   touch .env
   ```

   Configura el archivo `.env` con los siguientes valores:

   ```env
   PORT=3001
   MONGODB_URI=mongodb+srv://<usuario>:<contraseña>@cluster.mongodb.net/vinyl-shop
   NODE_ENV=development
   ```

5. **Inicia el servidor:**

   - Modo producción:
     ```bash
     npm start
     ```

   - Modo desarrollo (con recarga automática):
     ```bash
     npm run dev
     ```

El servidor estará disponible en `http://localhost:3001`

## 📁 Estructura del Proyecto

```
proyecto-final-vinyl-shop-backend/
├── src/
│   ├── config/
│   │   └── db.js              # Configuración de conexión a MongoDB
│   ├── controlers/
│   │   └── vinyl.controler.js # Controladores de lógica de vinilos
│   ├── models/
│   │   └── Vinilos.js         # Esquema de Mongoose para vinilos
│   ├── routes/
│   │   └── vinyl.router.js    # Rutas de la API
│   └── seeders/
│       └── vinilos.seeder.js  # Script para poblar la BD con datos iniciales
├── index.js                   # Archivo principal de la aplicación
├── package.json               # Dependencias y scripts
└── README.md                  # Este archivo
```

## 🔧 Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Puerto del servidor
PORT=3001

# URL de conexión a MongoDB
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/vinyl-shop

# Ambiente (development, production)
NODE_ENV=development
```

## 🌐 Endpoints de la API

La API está disponible en `http://localhost:3001/api/vinyls`

### 1. Obtener todos los vinilos

**Endpoint:** `GET /api/vinyls`

**Descripción:** Obtiene una lista de todos los vinilos disponibles en el catálogo.

**Ejemplo de solicitud:**
```bash
curl http://localhost:3001/api/vinyls
```

**Respuesta exitosa (200):**
```json
[
  {
    "_id": "6a21d27f7ffeb808cc7bf304",
    "title": "Abbey Road",
    "artist": "The Beatles",
    "year": 1969,
    "description": "The iconic 1969 album from The Beatles, featuring the famous zebra crossing cover.",
    "genre": "Rock",
    "image": "https://example.com/abbey-road.jpg",
    "price": 29.99,
    "stock": 10,
    "feature": false,
    "__v": 0,
    "createdAt": "2026-06-04T19:31:11.965Z",
    "updatedAt": "2026-06-04T19:31:11.965Z"
  },
  {
    "_id": "6a21d27f7ffeb808cc7bf305",
    "title": "Thriller",
    "artist": "Michael Jackson",
    "year": 1982,
    "description": "Michael Jackson's best-selling album with the hit single \"Thriller\".",
    "genre": "Pop",
    "image": "https://example.com/thriller.jpg",
    "price": 24.99,
    "stock": 15,
    "feature": false,
    "__v": 0,
    "createdAt": "2026-06-04T19:31:11.966Z",
    "updatedAt": "2026-06-04T19:31:11.966Z"
  },
  {
    "_id": "6a21d27f7ffeb808cc7bf306",
    "title": "Back in Black",
    "artist": "AC/DC",
    "year": 1980,
    "description": "AC/DC's legendary hard rock album released in 1980.",
    "genre": "Rock",
    "image": "https://example.com/back-in-black.jpg",
    "price": 19.99,
    "stock": 20,
    "feature": false,
    "__v": 0,
    "createdAt": "2026-06-04T19:31:11.967Z",
    "updatedAt": "2026-06-04T19:31:11.967Z"
  }
]
```

### 2. Obtener un vinilo por ID

**Endpoint:** `GET /api/vinyls/:id`

**Descripción:** Obtiene los detalles de un vinilo específico usando su ID.

**Parámetros:**
- `id` (path parameter, requerido): El ID del vinilo a obtener

**Ejemplo de solicitud:**
```bash
curl http://localhost:3001/api/vinyls/6a21d27f7ffeb808cc7bf304
```

**Respuesta exitosa (200):**
```json
{
  "_id": "6a21d27f7ffeb808cc7bf304",
  "title": "Abbey Road",
  "artist": "The Beatles",
  "year": 1969,
  "description": "The iconic 1969 album from The Beatles, featuring the famous zebra crossing cover.",
  "genre": "Rock",
  "image": "https://example.com/abbey-road.jpg",
  "price": 29.99,
  "stock": 10,
  "feature": false,
  "__v": 0,
  "createdAt": "2026-06-04T19:31:11.965Z",
  "updatedAt": "2026-06-04T19:31:11.965Z"
}
```

**Respuesta error (404):**
```json
{
  "message": "Vinilo no encontrado"
}
```

**Respuesta error (500):**
```json
{
  "message": "Error al obtener el vinilo por ID"
}
```

## 📊 Esquema del Modelo - Vinilo

```javascript
{
  _id: ObjectId,
  title: String,              // Título del álbum
  artist: String,             // Artista o banda
  year: Number,               // Año de lanzamiento
  description: String,        // Descripción detallada
  genre: String,              // Género musical
  image: String,              // URL de la imagen del vinilo
  price: Number,              // Precio en USD
  stock: Number,              // Cantidad disponible
  feature: Boolean,           // Si es destacado o no
  createdAt: Date,            // Fecha de creación
  updatedAt: Date             // Fecha de última actualización
}
```

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web minimalista
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **dotenv** - Gestión de variables de entorno

## 📦 Dependencias

```json
{
  "dotenv": "^17.4.2",
  "express": "^5.2.1",
  "mongoose": "^9.6.3"
}
```

## 📝 Scripts Disponibles

- `npm start` - Inicia el servidor en producción
- `npm run dev` - Inicia el servidor en modo desarrollo con recarga automática

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes, abre un issue primero para discutir los cambios propuestos.

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Vincenzo Acconcia**

- GitHub: [@wilson82490](https://github.com/wilson82490)
- Email: vincenzo@example.com

## 🔗 Enlaces Útiles

- [Repositorio](https://github.com/wilson82490/proyecto-final-vinyl-shop-backend)
- [Issues](https://github.com/wilson82490/proyecto-final-vinyl-shop-backend/issues)
- [Documentación de Express](https://expressjs.com/)
- [Documentación de MongoDB](https://docs.mongodb.com/)
- [Documentación de Mongoose](https://mongoosejs.com/)
    "createdAt": "2026-06-04T19:31:11.966Z",
    "updatedAt": "2026-06-04T19:31:11.966Z"
  }
]
'''