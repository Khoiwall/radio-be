const mongoose = require('mongoose');

const option = {
	// socketTimeoutMS: 30000,
	// keepAlive: true,
	// reconnectTries: 30000,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

async function connectDB(){
    try{
        await mongoose.connect('mongodb+srv://RadioUIT:radiouit@cluster0.eannm.mongodb.net/Music?retryWrites=true&w=majority',option);
        console.log('Connect sucessful!!!!!!!!')
    }catch(e) {
        console.log('Connect failed!!!!!!!!')
    }
}

module.exports = { connectDB };
