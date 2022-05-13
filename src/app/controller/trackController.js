const trackDb = require('../models/trackdb');

function queryTrack(track, tracks) {
    return tracks.indexOf(track)
}

class TrackController {
    // [GET]
    getTrackAll(req, res, next) {
        trackDb.find()
            .then((track) => {
                res.json(track)
            })
            .catch(next)
    }
    //[GET] get track into album
    getTrackIntoAlbum(req, res, next) {
        trackDb.find()
            .then((tracks) => {
                const tmpTracks = tracks.map((track) => {
                    return track.idTrack;
                })
                const sendTracks = [];
                req.query.tracks.map((track) => {
                    queryTrack(track, tmpTracks) !== -1 ? sendTracks.push(tracks[queryTrack(track, tmpTracks)]) : null
                })
                res.status(200).json(
                    sendTracks
                )
            })
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