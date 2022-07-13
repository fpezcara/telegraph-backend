const express = require('express');

// ROUTER WILL BE ADDED AS MIDDLEWAREE AND WILL TAKE CONTROL OF REQUESTS
const Routes = express.Router();

// GET CONNECTED TO THE DATABASE
const dbo = require("../db/conn");

// GET ALL POSTS "JUST TESTING TO SEE THE ATLAS RESPONSE"
Routes.route("/").get(async (req, res) => {

  const dbConnect = dbo.getDb();

  dbConnect
    .collection("posts")
    .find({}).limit(50)
    .toArray(function (err, result) {
      try {
        res.json(result);
      } catch (err) {
        res.status(400).send("Error Fetching Telegraphs!");
      }
    });

});

Routes.route("/").post(function (req, res) {

  const dbConnect = dbo.getDb();

  const newPost = {
    title: req.body.title,
    name: req.body.name,
    story: req.body.story,
    date: new Date(),
    url: req.body.url
  };

  dbConnect
    .collection("posts")
    .insertOne(newPost, (err, result) => {
      try {
        console.log(`Added a new data with Title ${result}`);
        res.status(204).send();

      } catch (err) {
        res.status(400).send("Could not insert this data" + err);
      }
    });
});


module.exports = Routes
