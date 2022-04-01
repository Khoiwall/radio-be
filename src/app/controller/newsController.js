const newsDB = require('../models/newsdb');

class NewsController{
    // [GET]
    getAllNews(req,res, next){
        newsDB.find()
            .then((news)=>{
                res.json(news);
            })
            .catch(next)
    }
}

module.exports = new NewsController();