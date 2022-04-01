const express = require('express');
const router = express.Router();

const trackController = require('../app/controller/trackController');

router.get('/',trackController.getTrackAll);

module.exports = router; 