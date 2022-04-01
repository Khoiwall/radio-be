const express = require('express');
const router = express.Router();

const indexController = require('../app/controller/indexController');

router.get('/',indexController.index);

module.exports = router; //