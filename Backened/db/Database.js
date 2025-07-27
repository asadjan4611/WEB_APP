require("dotenv").config();
const mongoose = require("mongoose");

const  connectDatabase = ()=>{
    mongoose.connect("mongodb+srv://asadjan4611:e-shop1234@cluster0.rjfugcv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then((data)=>{
        console.log("Mongo DB is connected with server :",data.connection.host );
    }).catch((err)=>{
        console.log("error while connecting the database  is ",err.message)
    })
}

module.exports = connectDatabase