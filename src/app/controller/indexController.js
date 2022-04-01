class IndexController{
    // [GET]
    index(req,res, next){
        res.send('hello');
    }
}

module.exports = new IndexController();