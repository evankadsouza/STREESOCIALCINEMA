const { Sequelize } = require('sequelize');

const seque = new Sequelize(
  'mediaPlayerAndClickerDB',
  'root',
  'Abc#12345',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

seque.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });

module.exports = seque;
