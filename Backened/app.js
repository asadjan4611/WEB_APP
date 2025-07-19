const express = require("express");
const ErrorHandler = require("./utils/ErrorHandler");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("expres.fileupload")
app.use(express.json());
app.use(cookieParser());
app.use(bodyParsee.urlEncoded({extended:true}));
app.use(fileUpload({useTempFiles:true}));

//config

if (process.env.NODE_ENV !== "PROD") {
    require("dotenv").config({
        path:"/backened/config/.env"
    });
}

//its for errorhandler 

app.use(ErrorHandler);

module.exports = app