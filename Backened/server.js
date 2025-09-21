require("dotenv").config({ path: __dirname + "/config/.env" });
const app = require("./app");
const connectDatabase = require("./db/Database");

process.on("uncaughtException", (err) => {
  console.log(`Error is ${err}`);
  console.log("Shutting down the server for handling uncaught exception");
});

// connect DB
connectDatabase();

// create server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log("Shutting down the server for ", err.message);
  console.log(
    "Shutting down the server unhandled promise rejection ",
    err.message
  );
  server.close(() => {
    process.exit(1);
  });
});
