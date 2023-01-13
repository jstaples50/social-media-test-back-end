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

// EXAMPLE SERVER FILE

// const express = require('express');
// const db = require('./config/connection');
// const routes = require('./routes');

// const cwd = process.cwd();

// const PORT = 3001;
// const app = express();

// // Note: not necessary for the Express server to function. This just helps indicate what activity's server is running in the terminal.
// const activity = cwd.includes('01-Activities')
//   ? cwd.split('/01-Activities/')[1]
//   : cwd;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(routes);

// db.once('open', () => {
//   app.listen(PORT, () => {
//     console.log(`API server for ${activity} running on port ${PORT}!`);
//   });
// });
