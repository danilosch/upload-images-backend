require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

console.log(process.env.MONGO_URL);

/**
 * Database setup
 */
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

app.use(require("./routes"));

app.listen(3001);
