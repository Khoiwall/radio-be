const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tracks = new Schema({
    idTrack: { type: String, maxlength: 255 },
    nameSong: { type: String, maxlength: 600 },
    url: { type: String, maxlength: 255 },
    mainImg: String,
    duration: Number,
    numberListen: Number,
    like: Number,
    artists: Array,
    country: String,
    type: Array,
    weeklyViews: Number,
    likeOfWeek: Number,

},
{
    timestamps: true,
});

module.exports = mongoose.model('trackDB', Tracks, 'Tracks');
