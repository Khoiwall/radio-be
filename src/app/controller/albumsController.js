const albumDB = require('../models/albumdb');
const artistsDB = require('../models/artistsdb');


function getAlbumCountry(artists, albums) {
    const tmpArtists = artists.map(artist => {
        return artist.idArtists
    });
    const tmpAlbums = [];
    for (let i = 0; i < albums.length; i++) {
        for (let j = 0; j < albums[i].artists.length; j++) {
            if (tmpArtists.indexOf(albums[i].artists[j].idArtists) !== -1) {
                tmpAlbums.push(albums[i]);
                break;
            }
        }
    }
    return tmpAlbums;
}

class AlbumController {
    // [GET]
    getAllAlbums(req, res, next) {
        albumDB.find()
            .then((album) => {
                res.status(200).json({
                    album: album.slice(0, 6)
                })
            })
            .catch(next)
    }
    // [GET] album by id
    getAlbumById(req, res, next) {
        albumDB.find({
                idAlbum: req.params.idAlbum
            })
            .then((album) => {
                res.status(200).json(album);
            })
            .catch(next)
    }
    // [GET]
    async loadMoreAlbums(req, res, next) {
        if (req.query.genre === 'All Genres') {
            const artists = await artistsDB.find({
                nation: req.query.nation
            });
            albumDB.find()
                .then((albums) => {
                    const _albums = getAlbumCountry(artists, albums);
                    if (_albums.length === req.query.allAlbum.length) {
                        res.status(200).json({
                            message: "The singer has run out",
                            outOfArtist: true
                        })
                    } else {
                        res.status(200).json({
                            albums: _albums.slice(req.query.allAlbum.length, req.query.allAlbum.length + 6),
                            outOfArtist: false
                        })
                    }
                })
                .catch(next)
        }
        if (req.query.nation === 'All Country') {
            albumDB.find()
                .then((albums) => {
                    const tmpAlbums = albums.filter((album) => {
                        return album.type.indexOf(req.query.genre) !== -1;
                    })
                    if (tmpAlbums.length === req.query.allAlbum.length) {
                        res.status(200).json({
                            message: "The singer has run out",
                            outOfArtist: true
                        })
                    } else {
                        res.status(200).json({
                            albums: tmpAlbums.slice(req.query.allAlbum.length, req.query.allAlbum.length + 6),
                            outOfArtist: false
                        })
                    }
                })
                .catch(next)
        }
        if (req.query.genre !== 'All Genres' && req.query.nation !== 'All Country') {
            const artists = await artistsDB.find({
                nation: req.query.nation
            });
            albumDB.find()
                .then((albums) => {
                    const _albums = getAlbumCountry(artists, albums);
                    const tmpAlbums = _albums.filter((album) => {
                        return album.type.indexOf(req.query.genre) !== -1;
                    })
                    if (tmpAlbums.length === req.query.allAlbum.length) {
                        res.status(200).json({
                            message: "The singer has run out",
                            outOfArtist: true
                        })
                    } else {
                        res.status(200).json({
                            albums: tmpAlbums.slice(req.query.allAlbum.length, req.query.allAlbum.length + 6),
                            outOfArtist: false
                        })
                    }
                })
                .catch(next)
        }
    }
    //[GET]
    async searchByCountryAndGenre(req, res, next) {
        if (req.query.genre === 'All Genres') {
            const artists = await artistsDB.find({
                nation: req.query.nation
            });
            albumDB.find()
                .then((albums) => {
                    const _albums = getAlbumCountry(artists, albums);
                    res.status(200).json({
                        albums: _albums.slice(0, 6)
                    })
                })
                .catch(next)
        }
        if (req.query.nation === 'All Country') {
            albumDB.find()
                .then((albums) => {
                    const tmpAlbums = albums.filter((album) => {
                        return album.type.indexOf(req.query.genre) !== -1;
                    })
                    res.status(200).json({
                        albums: tmpAlbums.slice(0, 6)
                    })
                })
                .catch(next)
        }
        if (req.query.genre !== 'All Genres' && req.query.nation !== 'All Country') {
            const artists = await artistsDB.find({
                nation: req.query.nation
            });
            albumDB.find()
                .then((albums) => {
                    const _albums = getAlbumCountry(artists, albums);
                    const tmpAlbums = _albums.filter((album) => {
                        return album.type.indexOf(req.query.genre) !== -1;
                    })
                    res.status(200).json({
                        albums: tmpAlbums.slice(0, 6)
                    })
                })
                .catch(next)
        }
    }
    async search(req, res, next) {
        if (req.query.genre === 'All Genres' && req.query.nation === 'All Country') {
            albumDB.find({
                    name: {
                        $regex: '.*' + req.query.textField + '.*',
                        $options: "i"
                    }
                })
                .then((albums) => {
                    res.status(200).json({
                        albums: albums.slice(0, 6)
                    })
                })
                .catch(next)
        } else if (req.query.genre === 'All Genres' && req.query.nation !== 'All Country') {
            const artists = await artistsDB.find({
                nation: req.query.nation
            });
            albumDB.find({
                    name: {
                        $regex: '.*' + req.query.textField + '.*',
                        $options: "i"
                    }
                })
                .then((albums) => {
                    const _albums = getAlbumCountry(artists, albums);
                    res.status(200).json({
                        albums: _albums.slice(0, 6)
                    })
                })
                .catch(next)
        } else if (req.query.nation === 'All Country' && req.query.genre !== 'All Genres') {
            albumDB.find({
                    name: {
                        $regex: '.*' + req.query.textField + '.*',
                        $options: "i"
                    }
                })
                .then((albums) => {
                    const tmpAlbums = albums.filter((album) => {
                        return album.type.indexOf(req.query.genre) !== -1;
                    })
                    res.status(200).json({
                        albums: tmpAlbums.slice(0, 6)
                    })
                })
                .catch(next)
        } else {
            const artists = await artistsDB.find({
                nation: req.query.nation
            });
            albumDB.find({
                    name: {
                        $regex: '.*' + req.query.textField + '.*',
                        $options: "i"
                    }
                })
                .then((albums) => {
                    const _albums = getAlbumCountry(artists, albums);
                    const tmpAlbums = _albums.filter((album) => {
                        return album.type.indexOf(req.query.genre) !== -1;
                    })
                    res.status(200).json({
                        albums: tmpAlbums.slice(0, 6)
                    })
                })
                .catch(next)
        }
    }
    //[PUT] add comments
    async addComment(req, res, next) {
        req.body._album.comments.push(req.body.comment);
        console.log(req.body._album);
        albumDB.updateOne({
                idAlbum: req.body._album.idAlbum
            }, {
                $set: {
                    comments: req.body._album.comments
                }
            })
            .then(() => {
                res.status(200).json({
                    message: 'commented'
                })
            })
            .catch(() => {
                res.status(200).json({
                    message: 'fail'
                })
            })
    }
}

module.exports = new AlbumController();