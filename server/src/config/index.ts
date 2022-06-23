
const express = require("express");
import user from '../controllers/user'
const PORT = process.env.PORT || 3001;

const app = express();

user('Heisenberg')

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});