const express = require('express');
const router = express.Router();

const trackController = require('../app/controller/trackController');
const UserController = require('../app/controller/userController')

router.get('/get-track-into-album', trackController.getTrackIntoAlbum);
router.put('/dislike-track', UserController.authenticateToken, trackController.dislikeTrack, UserController.putOutTrackToUser);
router.put('/like-track', UserController.authenticateToken, trackController.likeTrack, UserController.addTracktoUser);
router.get('/', trackController.getTrackAll);

module.exports = router;