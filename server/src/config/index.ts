
import express from "express";
import mongoose from "mongoose";
import { routes } from "../routes/index.routes"

const PORT = process.env.PORT || 3001;

import dotenv from "dotenv";
dotenv.config()
const app = express();


// nullish coalescing operator
const uri: string = process.env.REACT_APP_MONGO_URL ?? ''
mongoose.connect(uri);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


// to use req.body
app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

app.use('/', routes)
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});