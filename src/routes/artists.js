const express = require('express');
const router = express.Router();

const ArtistController = require('../app/controller/artistsController');
const UserController = require('../app/controller/userController');

router.put('/dislike-artist', ArtistController.authenticateToken, ArtistController.dislikeArtists, UserController.putOutArtistToUser);
router.put('/like-artist', ArtistController.authenticateToken, ArtistController.likeArtists, UserController.addArtistToUser);
router.get('/search-by-country-and-genre',ArtistController.getArtistsByCountryAndGenre);
router.get('/get-artist-top/load-more', ArtistController.getLoadMoreArtistTop);
router.get('/get-artist-top', ArtistController.getTopArtists);
router.get('/search', ArtistController.search);
router.get('/',ArtistController.getAllArtists);

module.exports = router; 