const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const News = new Schema({
    idNews: { type: String, maxlength: 255 },
    nameNews: String,
    timeUp: Date,
    like: Number,
    content: String,
    comments: Array,
    image: String
},
{
    timestamps: true,
});

module.exports = mongoose.model('newsDB', News , 'News');
