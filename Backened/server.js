require("dotenv").config({ path: "./Backened/config/.env" });
const app = require("./app");
const connectDatabase = require("./db/Database");

process.on("uncaughtException", (err) => {
  console.log(`Error is ${err}`);
  console.log("SHutting down the server for handling uncaught exception");
});

//config

if (process.env.NODE_ENV !== "PROD") {
  require("dotenv").config({
    path: "/backened/config/.env",
  });
}

//connect DB
connectDatabase();
//create server

const server = app.listen(process.env.PORT, () => {
  try {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
  } catch (error) {
    console.log("your error is ", error);
  }
});

//unhandle promise rejextion

process.on("unhandledRejection", (err) => {
  console.log("Shutting down the server for ", err.message);
  console.log(
    "Shutting down the server unhandle promise rejection ",
    err.message
  );
  server.close(() => {
    process.exit(1);
  });
});
