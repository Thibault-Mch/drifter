
import express from "express";
import mongoose from "mongoose";
import routes from "../routes/index.routes"
import bodyParser from 'body-parser'

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



app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.use('/', routes)
app.use(bodyParser.json())
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});