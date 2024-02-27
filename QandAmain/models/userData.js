const {DataTypes}= require('sequelize');
const seque = require('../config/db');

const userData = seque.define('userData', {
userID:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
},
userName:{
    type: DataTypes.STRING(200),
    allowNull: false,
},
phoneNumber:{
    type: DataTypes.BIGINT,
    allowNull: false,
},
cardID:{type: DataTypes.BIGINT,
    allowNull: false,
},
dateAndTime: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
});

seque.sync().then(() => {
    console.log('userData table created successfully!');
  }).catch((error) => {
    console.error('Unable to create table : ', error);
  });

module.exports = userData;