const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Notification = new Schema({
    idNotification: { type: String, maxlength: 255 },
    title: { type: String, maxlength: 255},
    idSNEA: { type: String, maxlength: 255 },
    type: String,
    image: String,
    content: String
},
{
    timestamps: true,
});

module.exports = mongoose.model('notificationDB', Notification, 'Notifications');
