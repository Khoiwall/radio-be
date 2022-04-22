const express = require('express');
const router = express.Router();

const AlbumController = require('../app/controller/albumsController');

router.get('/get-album/load-more', AlbumController.loadMoreAlbums);
router.get('/search-by-coutry-and-genres',AlbumController.searchByCountryAndGenre);
router.get('/search', AlbumController.search);
router.get('/',AlbumController.getAllAlbums);

module.exports = router; 