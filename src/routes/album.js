const express = require('express');
const router = express.Router();

const AlbumController = require('../app/controller/albumsController');
const UserController = require('../app/controller/userController');

router.get('/get-album/load-more', AlbumController.loadMoreAlbums);
router.get('/search-by-coutry-and-genres', AlbumController.searchByCountryAndGenre);
router.get('/:idAlbum', AlbumController.getAlbumById);
router.get('/search', AlbumController.search);
router.put('/add-comment', UserController.authenticateToken, AlbumController.addComment)
router.get('/', AlbumController.getAllAlbums);

module.exports = router;