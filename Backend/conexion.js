const mongoose = require('mongoose');

// Cadena de conexión de Cosmos DB en Azure
const connectionString = 'mongodb://db-peticiones:QlXcH97nhsm1M7O4bdpbZP0AUYU7fGH1RO9YxFgHMCFUSfx8PjD2IjNTCIroE2tnqLnepJUtcHYPACDb4Iohkw==@db-peticiones.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@db-peticiones@';

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
