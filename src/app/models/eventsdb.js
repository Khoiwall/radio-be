const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Event = new Schema({
    idEvents: { type: String, maxlength: 255 },
    name: { type: String, maxlength: 255 },
    image: String,
    date: String,
    time: String,
    address: { type: String, maxlength: 255},
    typeTicket: [
        {
            nameTicket: String,
            price: Number,
        }
    ],
    ticket: Number,
    description: String,
},
{
    timestamps: true,
});

module.exports = mongoose.model('eventDB', Event, 'Events');
