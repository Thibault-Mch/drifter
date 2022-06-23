
const express = require("express");
const mongoose = require("mongoose");

import user from '../controllers/user.controllers'
const PORT = process.env.PORT || 3001;

const dotenv = require("dotenv")
dotenv.config()
const app = express();

user('Heisenberg')


console.log(process.env.MONGO_URL)

mongoose.connect(process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});