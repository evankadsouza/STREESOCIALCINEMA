const {DataTypes}= require('sequelize');
const seque = require('../config/db');
const videoTable = require('./videoTable');
const brandTable = require('./brandTable');

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
  optionNumber:{
    type:DataTypes.INTEGER,//added manually in workbench after the table was created
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
  padX:{
    type:DataTypes.STRING,
  },
  padY:{
    type:DataTypes.STRING,
  },
  font:{
    type:DataTypes.STRING,
  },
  x:{
    type:DataTypes.STRING,
  },
  y:{
    type:DataTypes.STRING,
  },
  colours:{
    type:DataTypes.STRING,
  },
  brandID:{
    type:DataTypes.INTEGER,
  },
  brandName:{
    type:DataTypes.STRING,
  }
});

videoData.belongsTo(videoTable, { foreignKey: 'videoID' });
videoData.belongsTo(brandTable, { foreignKey: 'brandID'});


seque.sync().then(() => {
  console.log('videoData table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

module.exports = videoData;