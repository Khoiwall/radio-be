const UserDB = require('../models/userdb');
const jwt = require('jsonwebtoken');
const randomId = require('random-id');
require('dotenv').config();
const bcrypt = require("bcrypt");

const linkAvartDefault = 'https://vsmcamp.com/wp-content/uploads/2020/11/JaZBMzV14fzRI4vBWG8jymplSUGSGgimkqtJakOV.jpeg';

function _randomID() {
    const length = 50;
    const pattern = 'US';
    return randomId(length, pattern)
}

class userController {
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
    getUserByToken(req, res, next) {
        UserDB.find({
                idUser: req.user.idUser
            })
            .then((user) => {
                res.status(200).json({
                    user: req.user,
                    avatar: user[0].avatar,
                    blance: user[0].blance,
                    likeTracks: user[0].likeTracks,
                    likeArtists: user[0].likeArtists,
                    likeAlbum: user[0].likeAlbum
                })
            })
            .catch(next)
    }
    // [GET]
    getAllUser(req, res, next) {
        UserDB.find()
            .then((user) => {
                res.json(user)
                console.log(user)
            })
            .catch(next)
    }
    // [POST]
    async RegisterUser(req, res, next) {
        const users = await UserDB.find({
            $or: [{
                email: req.body.email
            }, {
                userName: req.body.userName
            }]
        });
        if (users.length !== 0) {
            res.json({
                userCreated: true,
                message: 'Email or UserName already exists !!!!'
            })
        } else {
            const idUser = _randomID();
            const userJWT = {
                idUser: idUser,
                email: req.body.email,
                userName: req.body.userName
            }
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(req.body.password, salt);
            const user = {
                idUser: idUser,
                fullName: req.body.userName,
                userName: req.body.userName,
                email: req.body.email,
                password: passwordHash,
                avatar: linkAvartDefault,
                background: null,
                blance: 0,
                likeTracks: [],
                likeArtists: [],
                likeAlbum: []
            }
            const accessToken = jwt.sign(userJWT, process.env.ACCESS_TOKEN_SECRET);
            const userCreate = new UserDB(user)
            userCreate.save()
                .then(() => console.log('sucessful resgister'))
                .catch(next)
            res.json({
                userCreated: false,
                message: 'Register sucessful !!!!',
                accessToken: accessToken,
                user: userJWT,
                avatar: user.avatar,
                blance: user.blance,
                likeTracks: user.likeTracks,
                likeArtists: user.likeArtists,
                likeAlbum: user.likeAlbum
            })
        }
    }
    //[POST]
    async login(req, res, next) {
        const users = await UserDB.find({
            $or: [{
                email: req.body.emailOrUserName
            }, {
                userName: req.body.emailOrUserName
            }]
        });
        if (users.length !== 0) {
            bcrypt.compare(req.body.password, users[0].password, function (err, result) {
                if (result) {
                    const userJWT = {
                        idUser: users[0].idUser,
                        email: users[0].email,
                        userName: users[0].userName
                    }
                    const accessToken = jwt.sign(userJWT, process.env.ACCESS_TOKEN_SECRET);
                    res.status(200).json({
                        Login: true,
                        message: 'Login sucessful !!!!',
                        accessToken: accessToken,
                        user: userJWT,
                        avatar: users[0].avatar,
                        blance: users[0].blance,
                        likeTracks: users[0].likeTracks,
                        likeArtists: users[0].likeArtists,
                        likeAlbum: users[0].likeAlbum
                    })
                } else {
                    res.status(200).json({
                        Login: false,
                        message: 'Login failed !!!!',
                    })
                }
            });
        } else {
            res.status(200).json({
                Login: false,
                message: 'Login failed !!!!',
            })
        }
    }
    // add Artist to user
    addArtistToUser(req, res, next) {
        UserDB.updateOne({
                idUser: req.user.idUser
            }, {
                $push: {
                    likeArtists: req.body.idArtists
                }
            })
            .then(() => {
                console.log('updated !!')
            })
            .catch(() => {
                console.log('update fail!!')
            })
    }
    // put out Artist to user
    putOutArtistToUser(req, res, next) {
        UserDB.updateOne({
                idUser: req.user.idUser
            }, {
                $pull: {
                    likeArtists: req.body.idArtists
                }
            })
            .then(() => {
                console.log('updated !!')
            })
            .catch(() => {
                console.log('update fail!!')
            })
    }
    // add track to user
    addTracktoUser(req, res, next) {
        UserDB.updateOne({
                idUser: req.user.idUser
            }, {
                $push: {
                    likeTracks: req.body.idTrack
                }
            })
            .then(() => {
                console.log('updated !!')
            })
            .catch(() => {
                console.log('update fail!!')
            })
    }
    //put out Artist to user
    putOutTrackToUser(req, res, next) {
        UserDB.updateOne({
                idUser: req.user.idUser
            }, {
                $pull: {
                    likeTracks: req.body.idTrack
                }
            })
            .then(() => {
                console.log('updated !!')
            })
            .catch(() => {
                console.log('update fail!!')
            })
    }
    //[GET]
    getMusicByUserId(req, res, next) {}
}

module.exports = new userController();