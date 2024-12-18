const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('juanito', 'postgres', '12345678', {
  host: '127.0.0.1',
  dialect: 'postgres'
});

module.exports = sequelize;
