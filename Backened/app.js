const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
     credentials: true,
}));
app.use("/uploads",express.static("uploads"));
app.use(bodyParser.urlencoded({extended:true}));



//import Routes

const user = require("./controller/user")
const shop = require("./controller/shop")


app.use("/api/user",user);
app.use("/api/shop",shop);

//config 

if (process.env.NODE_ENV !== "PROD") {
    require("dotenv").config({
        path:"/config/.env"
    });
}

//its for errorhandler 

app.use(ErrorHandler);

module.exports = app