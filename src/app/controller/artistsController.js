const artistsDB = require('../models/artistsdb');
const UserDB = require('../models/userdb');
const jwt = require('jsonwebtoken');

class ArtistController {
    //Middelware
    authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader.split(' ')[1];
        if (token == null) return res.send(401);

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403)
            req.user = user
            next()
        })
    }
    // [GET]
    getAllArtists(req, res, next) {
        artistsDB.find()
            .then((artist) => {
                artist.sort((a, b) => (a.like < b.like) ? 1 : (b.like < a.like) ? -1 : 0)
                res.status(200).json(artist)
            })
            .catch(next)
    }
    // [GET]
    getTopArtists(req, res, next) {
        artistsDB.find()
            .then((artist) => {
                artist.sort((a, b) => (a.like < b.like) ? 1 : (b.like < a.like) ? -1 : 0)
                res.status(200).json(artist.slice(0, 6))
            })
            .catch(next)
    }
    //[GET]
    getLoadMoreArtistTop(req, res, next) {
        const length = 1;
        res.status(200).json({
            message: "hello"
        })
    }
    //[GET] /country
    getArtistsByCountry(req, res, next) {
        artistsDB.find({
                nation: req.query.nation
            })
            .then((artists) => {
                res.status(200).json({
                    artists
                })
            })
            .catch(next)
    }
    //[PUT]
    likeArtists(req, res, next) {
        const liked = req.body.like + 1;
        artistsDB.updateOne({
                idArtists: req.body.idArtists
            }, {
                $set: {
                    like: liked
                }
            })
            .then(() => {
                res.status(200).json({
                    message: 'liked'
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
    dislikeArtists(req, res, next) {
        const liked = req.body.like - 1;
        artistsDB.updateOne({
                idArtists: req.body.idArtists
            }, {
                $set: {
                    like: liked
                }
            })
            .then(() => {
                res.status(200).json({
                    message: 'disliked'
                })
            })
            .catch(() => {
                res.status(200).json({
                    message: 'fail'
                })
            })
        next()
    }
    //[GET]
    search(req, res, next) {
        if (req.query.nation === 'All Artists') {
            artistsDB.find({
                    stageName: {
                        $regex: '.*' + req.query.textField + '.*'
                    }
                })
                .then((artists) => {
                    res.status(200).json({
                        artists
                    })
                })
                .catch(next)
        } else {
            artistsDB.find({
                    stageName: {
                        $regex: '.*' + req.query.textField + '.*'
                    },
                    nation: req.query.nation
                })
                .then((artists) => {
                    res.status(200).json({
                        artists
                    })
                })
                .catch(next)
        }
    }
}

module.exports = new ArtistController();