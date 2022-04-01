const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Singer = new Schema({
    idArtists: { type: String, maxlength: 255 },
    name: { type: String, maxlength: 50 },
    stageName: { type: String, maxlength: 50 },
    birthday: { type: String, maxlength: 20 },
    nation: String,
    prize: Array,
    description: { type: String, maxlength: 1000 },
    image: String,
    like: Number,
    type: Array
},
{
    timestamps: true,
});

module.exports = mongoose.model('artistsDB', Singer, 'Singer');
