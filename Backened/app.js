const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true }));

//import Routes

const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const event = require("./controller/event");
const coupan = require("./controller/couponCode");
const payment = require("./controller/payment");
const order = require("./controller/order");
const conversation = require("./controller/conversation");
const messages = require("./controller/messages");
const withDraw = require("./controller/withDraw");


app.use("/api/user", user);
app.use("/api/product", product);
app.use("/api/shop", shop);
app.use("/api/event", event);
app.use("/api/coupan", coupan);
app.use("/api/stripe", payment);
app.use("/api/order", order);
app.use("/api/conversation", conversation);
app.use("/api/messages", messages);
app.use("/api/withDraw", withDraw);

//config

if (process.env.NODE_ENV !== "PROD") {
  require("dotenv").config({
    path: "/config/.env",
  });
}

//its for errorhandler

app.use(ErrorHandler);

module.exports = app;
