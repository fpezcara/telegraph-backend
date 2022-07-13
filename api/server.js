// LOAD CONFIGURATION FROM CONFIG.ENV TO PROCESS.ENV
require("dotenv").config({ path: "./config.env" });

// MAIN IMPORTS FOR EXPRESS.JS SERVER
const express = require('express');
const cors = require('cors');

// BRING DB-CONFIG TO EXECUTE CONNECTION WITH MONGO ATLAS
const dbo = require("./db/conn");

// SETTING ALL MAIN IMPORTS
const server = express();
server.use(cors());
server.use(express.json());

// ROUTER
const routePosts = require('./routes/routePosts')
server.use('/posts', routePosts)


server.get('/', (req, res) => {
  res.send('Hello')
})

// EXECUTE ATLAS CONNECTION
dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }
});

module.exports = server
