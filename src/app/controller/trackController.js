const trackDb = require('../models/trackdb');

class TrackController {
    // [GET]
    getTrackAll(req, res, next) {
        trackDb.find()
            .then((track) => {
                res.json(track)
            })
            .catch(next)
    }
    //[PUT]
    likeTrack(req, res, next) {
        trackDb.updateOne({
                idTrack: req.body.idTrack
            }, {
                $set: {
                    like: req.body.like + 1
                }
            })
            .then(() => {
                res.status(200).json({
                    message: 'like'
                })
            })
            .catch(() => {
                res.status(200).json({
                    message: 'fail'
                })
            })
        next()
    }
    //[PUT]
    dislikeTrack(req, res, next) {
        trackDb.updateOne({
                idTrack: req.body.idTrack
            }, {
                $set: {
                    like: req.body.like - 1
                }
            })
            .then(() => {
                res.status(200).json({
                    message: 'like'
                })
            })
            .catch(() => {
                res.status(200).json({
                    message: 'fail'
                })
            })
        next()
    }
}

module.exports = new TrackController();