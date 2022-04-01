const express = require('express');
const router = express.Router();

const notificationController = require('../app/controller/notificationsController');

router.get('/',notificationController.getAllNotification);

module.exports = router; 