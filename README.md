# proyecto-final-vinyl-shop-backend



## Instalación

1. Clona el repositorio:

   ```bash
   git clone <repository_url>
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd backend-proyecto-peliculas-series-jean-paul
   ```

3. Instala las dependencias:

   ```bash
   git switch dev
   ```

4. Crea un archivo `.env` basado en el archivo `.env-example` y configura tus variables de entorno:

   ```bash
   cp .env-example .env
   ```

   Luego, edita el archivo `.env` para agregar tu configuración personalizada, como el puerto y la URI de MongoDB.

5. Inicia el servidor:
   ```bash
   npm start
   ```
   Para desarrollo con recarga automática, puedes usar:
   ```bash
   npm run dev
   ```

   ## Uso

  Una vez que el servidor esté en funcionamiento, puedes acceder a la API a través de `http://localhost:<PORT>/api`, donde `<PORT>` es el puerto que configuraste en tu archivo `.env`.



   ### Obtener todas los vinilos

   metodo GET a '/api/vinilos' para obtener una lista de todos los vinilos

   response:
   

   status: 200

   '''json
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
    "createdAt": "2026-06-04T19:31:11.966Z",
    "updatedAt": "2026-06-04T19:31:11.966Z"
  }
]
'''