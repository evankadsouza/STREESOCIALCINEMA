const {DataTypes}= require('sequelize');
const seque = require('../config/db');

const schedulerData = seque.define('schedulerData',{
    scheduler_id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    theatre_id:{
        type: DataTypes.INTEGER,
    },
    start_date:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    slot_index:{
        type: DataTypes.INTEGER,
    },
    video_links:{
        type: DataTypes.STRING(200),
        allowNull: false,
    },
});

seque.sync().then(() => {
    console.log('schedulerData table created successfully!');
  }).catch((error) => {
    console.error('Unable to create table : ', error);
  });

module.exports = schedulerData;