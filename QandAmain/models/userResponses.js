const {DataTypes}= require('sequelize');
const seque = require('../config/db');
const userData = require('./userData');
const videoData = require('./videoData');

const userResponse = seque.define('userResponse', {
    userResponseID:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userID:{
        type: DataTypes.INTEGER,
    },
    optionSelected: {
        type: DataTypes.STRING(200),
      },
    videoDataID:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    questionTypeID:{
        type: DataTypes.INTEGER,
    },
    });

    userResponse.belongsTo(userData, { foreignKey: 'userID' });
    userResponse.belongsTo(videoData, { foreignKey: 'videoDataID', onUpdate: 'NO ACTION', onDelete: 'CASCADE' });

   // userResponse.belongsTo(videoData, { foreignKey: 'questionTypeID', onUpdate: 'NO ACTION', onDelete: 'CASCADE' });






    seque.sync().then(() => {
        console.log('userResponse table created successfully!');
      }).catch((error) => {
        console.error('Unable to create table : ', error);
      });
    
    module.exports = userResponse;