const notificationDB = require('../models/notificationdb')

class notificationController{
    // [GET]
    getAllNotification(req,res, next){
        notificationDB.find()
            .then((notification)=>{
                res.json(notification)
            })
            .catch(next)
    }
}

module.exports = new notificationController();