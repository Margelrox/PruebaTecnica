const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());  // Middleware para parsear JSON
app.use('/api', userRoutes);  // Rutas de la API

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

// Sincronizar Sequelize con la base de datos y empezar el servidor
sequelize.sync()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server running on port 3000');
    });
  })
  .catch(err => console.log(err));
