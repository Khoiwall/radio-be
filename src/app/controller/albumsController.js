const albumDB = require('../models/albumdb');

class AlbumController{
    // [GET]
    getAllAlbums(req,res, next){
        albumDB.find()
            .then((album)=>{
                res.json(album)
            })
            .catch(next)
    }
}

module.exports = new AlbumController();