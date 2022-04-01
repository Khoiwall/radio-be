const express = require('express');
const router = express.Router();

const userController = require('../app/controller/userController');

router.get('/',userController.getAllUser);
router.get('/get-user-by-token', userController.authenticateToken ,userController.getUserByToken);
router.post('/register',userController.RegisterUser);
router.post('/login',userController.login);
router.get('/track-by-userId', userController.authenticateToken ,userController.getMusicByUserId);

module.exports = router; 