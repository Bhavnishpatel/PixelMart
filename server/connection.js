const mongoose = require('mongoose');

const connectToDB=async(req,res)=>{
    const connection=await mongoose.connect(process.env.MONGODB_URI)
    if(connection.STATES.connected) return console.log("Connected to Database");
    if(connection.STATES.disconnected) return console.log("Disconnected from Database");
}

module.exports={connectToDB};