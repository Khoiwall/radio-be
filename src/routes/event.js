const express = require('express');
const router = express.Router();

const EventController = require('../app/controller/eventsController');

router.get('/',EventController.getAllEvents);

module.exports = router; 