// sequelize.js
const { Sequelize } = require('sequelize');

// Replace 'database', 'username', 'password', and 'host' with your MySQL configuration
const sequelize = new Sequelize('sampleDB', 'root', 'Abc#12345', {
    host: 'localhost',
    dialect: 'mysql',
  });
  
  module.exports = sequelize;