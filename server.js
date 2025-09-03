import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import routes from "./app/routes/index.routes.js";
import mongoose from "mongoose";
import passport from "passport";
import configurePassport from "./app/shared/config/passport.config.js";
dotenv.config();

import errorHandler from "./app/shared/middleware/error.js";

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// passport
app.use(passport.initialize());
configurePassport(passport);

import db from "./app/shared/config/db.config.js";

mongoose
  .connect(db.url)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bluedotbook.com Test." });
});

//routes

routes(app);
app.use(errorHandler);

// set port, listen for requests
const PORT = process.env.PORT || 9000;
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}.`);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  process.exit(0);
});
