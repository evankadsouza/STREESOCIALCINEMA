const {DataTypes}= require('sequelize');
const seque = require('../config/db');
//videoTables in mysql
const videoTable = seque.define('videoTable', {
  videoID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  dateAndTime: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  videoURL: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  adStartTime: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  duration : {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  videoType: {
    type: DataTypes.STRING(200),
    allowNull: false,
  }
});


seque.sync().then(() => {
  console.log('videoTable table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

module.exports = videoTable;