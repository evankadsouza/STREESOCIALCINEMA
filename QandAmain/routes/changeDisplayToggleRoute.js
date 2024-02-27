const express = require("express");
const changeDisplayToggleRoute = express.Router();
const changeDisplayToggleController = require('../controllers/changeDisplayToggleController');

changeDisplayToggleRoute.put('/changeDisplayToggle', changeDisplayToggleController.changeDisplayToggle);

module.exports=changeDisplayToggleRoute;