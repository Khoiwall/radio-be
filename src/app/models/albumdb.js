const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Album = new Schema({
    idAlbum: { type: String, maxlength: 255 },
    idTrack: Array,
    artists: Array,
    like: Number,
    name: { type: String, maxlength: 255},
    image: String
},
{
    timestamps: true,
});

module.exports = mongoose.model('albumDB', Album, 'Albums');
