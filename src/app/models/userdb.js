const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
    idUser: { type: String, maxlength: 255 },
    fullName: String,
    userName:String,
    email: String,
    password: String,
    avatar: String,
    backgound: String,
    blance: Number,
    likeTracks: Array,
    likeArtists: Array,
    likeAlbum: Array,
},
{
    timestamps: true,
});

module.exports = mongoose.model('UserDB', Users, 'Users');
