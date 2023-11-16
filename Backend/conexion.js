const mongoose = require('mongoose');

// Cadena de conexión de Cosmos DB en Azure
const connectionString = 'tu-url-cosmodb';

// Conexión a Cosmos DB
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'peticiones',  // Nombre de tu base de datos en Cosmos DB
});

// Verificar la conexión
const db = mongoose.connection;
db.on('connected', () => {
  console.log('Conexión correcta a Cosmos DB en Azure');
});

db.on('error', (err) => {
  console.log('Error de conexión a Cosmos DB en Azure:', err);
});

module.exports = mongoose;
