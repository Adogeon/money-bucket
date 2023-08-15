const express = require("express");
//const jwt = require("express-jwt");
const logger = require("morgan");

const router = require("./routes");

const app = express();

app.use(logger("dev"));
app.use(express.json());

/*app.use(
  "/",
  jwt({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    credentialsRequired: false,
  })
);*/

app.use("/", router);

module.exports = app;
