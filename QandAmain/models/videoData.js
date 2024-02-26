const {DataTypes}= require('sequelize');
const seque = require('../config/db');
const videoTable = require('./videoTable');

const videoData = seque.define('videoData', {
  videoDataID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  dateAndTime: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  questionTypeID: {
    type: DataTypes.INTEGER,
  },
  questionDesc: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  videoID: {
    type: DataTypes.INTEGER,
  },
  optionOne: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  optionTwo: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  optionThree: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  optionFour: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  optionFive: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  imageName: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  imageURL: {
    type: DataTypes.STRING(200),
    allowNull: true,
  },
  displayToggle: {
    type: DataTypes.TEXT('medium'),
    allowNull: true,
  },
  correctOption:{
    type:DataTypes.STRING(200),
    allowNull:false,
  },
  userResponseToggle: {  
    type: DataTypes.TEXT('medium'),
    allowNull: true,
  },
});

videoData.belongsTo(videoTable, { foreignKey: 'videoID' });

seque.sync().then(() => {
  console.log('videoData table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

module.exports = videoData;