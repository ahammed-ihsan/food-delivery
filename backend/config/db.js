const mongoose =require('mongoose') 
const env = require('dotenv')

env.config()

const connectionString = process.env.dblink;

const connectDB = async () => {
    try{
        await mongoose.connect(connectionString)
        console.log('db connected');
    }catch(err){
        console.log('db connection error',err); 
    } 
}

module.exports = connectDB 
