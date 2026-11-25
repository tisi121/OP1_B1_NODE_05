// Carreguem les variables d'entorn abans de configurar la connexió.
require('dotenv').config({ quiet: true });

const mongoose = require('mongoose');
const app = require('./app');

const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error('Falta definir MONGO_URI al fitxer .env');
  process.exit(1);
}

// El servidor només s'inicia quan MongoDB està disponible.
mongoose.connect(mongoUri)
  .then(() => {
    app.listen(port, () => {
      console.log(`Servidor actiu a http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('No s’ha pogut connectar amb MongoDB:', error.message);
    process.exit(1);
  });
