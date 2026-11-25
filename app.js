const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middleware per permetre peticions externes i llegir cossos JSON.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Gestor de tasques en funcionament!' });
});

app.use('/api/tasks', taskRoutes);

// Resposta JSON per a qualsevol ruta que no existeixi.
app.use((req, res) => {
  res.status(404).json({
    error: 'Ruta no trobada',
    path: req.originalUrl
  });
});

// express.json pot generar aquest error si el cos rebut no és JSON vàlid.
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return res.status(400).json({ error: 'JSON mal format a la petició' });
  }

  console.error('Error no controlat a l’aplicació:', error);
  return res.status(500).json({ error: 'Error intern del servidor' });
});

module.exports = app;
