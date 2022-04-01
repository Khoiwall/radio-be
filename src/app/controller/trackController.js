const trackDb = require('../models/trackdb')

class TrackController{
    // [GET]
    getTrackAll(req,res, next){
        trackDb.find()
            .then((track)=>{
                res.json(track)
            })
            .catch(next)
    }
}

module.exports = new TrackController();