const mongoose = require('mongoose');
keys = require('./keys.json');

const connectDB = async () => {
    try{
        await mongoose.connect(keys.mongoURI,
            {
                useNewUrlParser: true, 
                useUnifiedTopology: true,
                useCreateIndex:true
            });
            console.log("Connected Successfully to the database");
    }
    catch(err){
        console.error('Failed connection to the database');
        process.exit(1);
    }
}

module.exports = connectDB;