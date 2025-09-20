require("dotenv").config();
const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((data) => {
      console.log("Mongo DB is connected with server ");
    })
    .catch((err) => {
      console.log("error while connecting the database  is ", err.message);
      process.exit(1);
    });
};

module.exports = connectDatabase;

// local key
//mongodb://localhost:27017/

//global key
//"mongodb+srv://asadjan4611:e-shop1234@cluster0.rjfugcv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
