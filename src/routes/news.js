const express = require('express');
const router = express.Router();

const NewsController = require('../app/controller/newsController');

router.get('/',NewsController.getAllNews);

module.exports = router; 