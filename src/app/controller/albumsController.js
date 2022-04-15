const albumDB = require('../models/albumdb');

class AlbumController{
    // [GET]
    getAllAlbums(req,res, next){
        albumDB.find()
            .then((album)=>{
                res.status(200).json(
                    {
                        album: album.slice(0, 6)
                    }
                )
            })
            .catch(next)
    }
    // [GET]
    loadMoreAlbums(req,res,next){
        albumDB.find()
                .then((albums) => {
                    if (albums.length === req.query.allAlbum.length) {
                        res.status(200).json({
                            message: "The singer has run out",
                            outOfArtist: true
                        })
                    } else {
                        res.status(200).json({
                            albums: albums.slice(req.query.allAlbum.length, req.query.allAlbum.length + 6),
                            outOfArtist: false
                        })
                    }
                })
                .catch(next)
    }
}

module.exports = new AlbumController();