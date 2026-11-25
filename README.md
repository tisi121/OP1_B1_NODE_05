# Gestor de tasques

API REST creada amb Node.js, Express i MongoDB per crear, consultar, actualitzar i eliminar tasques.

## Requisits

- Node.js i npm.
- MongoDB en marxa al mateix ordinador o accessible mitjançant una URI.

## Instal·lació i arrencada

1. Obre un terminal dins la carpeta del projecte i instal·la les dependències:

   ```bash
   npm install
   ```

2. Copia `.env.example` amb el nom `.env` i, si cal, adapta les variables:

   ```env
   PORT=3000
   MONGO_URI=mongodb://127.0.0.1:27017/taskmanager
   ```

   A PowerShell, pots crear el fitxer amb:

   ```powershell
   Copy-Item .env.example .env
   ```

3. Assegura’t que MongoDB està en marxa i inicia l’API:

   ```bash
   npm run dev
   ```

   L’API estarà disponible a `http://localhost:3000`. Per iniciar-la sense nodemon, fes servir `npm start`.

## Rutes

| Mètode | Ruta | Acció |
| --- | --- | --- |
| `POST` | `/api/tasks` | Crea una tasca. |
| `GET` | `/api/tasks` | Retorna totes les tasques. |
| `GET` | `/api/tasks/:id` | Retorna una tasca pel seu identificador. |
| `PUT` | `/api/tasks/:id` | Actualitza els camps enviats de la tasca. |
| `DELETE` | `/api/tasks/:id` | Elimina una tasca. |

El cos de les peticions `POST` i `PUT` és JSON. Per crear una tasca, `title`, `cost` i `hours_estimated` són obligatoris. El cost i les hores no poden ser negatius. Els camps `description`, `hours_real` i `image` són opcionals.

Quan `completed` és `true`, l’API estableix `finished_at`; quan es canvia a `false`, el torna a `null`. `createdAt` s’assigna en crear la tasca.

Les respostes principals són `201` en crear, `200` en consultar/actualitzar/eliminar, `400` per dades invàlides o un identificador mal format, i `404` quan no existeix el recurs.

## Proves amb Postman

Importa `postman/gestor-tasques.postman_collection.json` a Postman. La col·lecció inclou set peticions i exemples desats per als codis de resposta de l’enunciat. La variable `baseUrl` apunta al servidor local; després de crear una tasca, assigna el seu `_id` a `taskId` per provar les peticions d’un recurs concret.

## Estructura

- `index.js`: carrega la configuració, connecta amb MongoDB i inicia el servidor.
- `app.js`: configura Express, els middleware i les rutes.
- `models/Task.js`: esquema i validacions de Mongoose.
- `controllers/taskController.js`: operacions CRUD sobre MongoDB.
- `routes/taskRoutes.js`: rutes de l’API.
