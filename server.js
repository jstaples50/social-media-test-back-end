const User = require("./models/User");
const Thought = require("./models/Thought");

const db = require("./config/connection");
const express = require("express");
const routes = require("./routes");

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once("open", async () => {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});
