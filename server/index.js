const express = require("express");
const app = express();
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan');
const connectDB = require("./utils/mongo");
require('dotenv').config()

// declaring the port
const port = process.env.PORT || 5000;

//applevel middleware
app.use(helmet());
app.use(morgan("common"));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));

// connect database
connectDB()

app.get("/", (req, res) => {
  res.send({
    message: "Api for connect - ene",
  });
});

//not found handler
app.use((req, res, next) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

//error hanling middleware
app.use((error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  consola.error(error);
  res.json({
    message: error.message,
    stack:
      process.env.NODE_ENV === "production"
        ? "you are in production"
        : error.stack,
  });
});

// the listener
app.listen(port, (err) => {
  if (err) {
    console.log("There was an error :- ", err);
  } else {
    console.log(`Server Up On Port ${port}`);
  }
});
