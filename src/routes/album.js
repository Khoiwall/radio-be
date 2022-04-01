const express = require('express');
const router = express.Router();

const AlbumController = require('../app/controller/albumsController');

router.get('/',AlbumController.getAllAlbums);

module.exports = router; 