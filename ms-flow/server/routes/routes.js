// routes used for handling and requesting our data
const express = require("express");
const axios = require('axios');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const WithAuth = require('../auth/index');
const { connectPine, pinecone} = require('../pine/connection');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();
const jwt = require('jsonwebtoken');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

// The router will be added as a middleware and will take control of requests starting with path /record.
const dataRoutes = express.Router();

// pine cone periph
connectPine();
 
// signin route for user
dataRoutes.route("/auth/signin").post(function (req, res) {
  const db_connect = mongoose.connection;
  const db_collection = db_connect.collection("zombies");
  let user = {
    username: req.body.username,
    password: req.body.password
  };
  db_collection.findOne({username: user.username}, function (err, result) {
    if (err) throw err;

    if (result) {
        const isMatch = bcrypt.compareSync(user.password, result.password);
        if (isMatch) {
          const { lastlogged, password, ...updatedUser } = result;
          // Update the lastLogged field in the document with the current timestamp
          const currentTimestamp = new Date().getTime();
          db_collection.updateOne(
            { _id: result._id },
            { $set: { lastlogged: currentTimestamp } },
            function (err, updateResult) {
              if (err) throw err;
              if (updateResult.ok) console.log("Successful timestamp update");
              // Passwords match, return a success message or relevant data
              res.json({ message: "Login successful", user: updatedUser });
            }
          );
        } else {
            // Passwords don't match
            res.status(401).json({ message: "Invalid username or password" });
        }
        } else {
        // User not found
        res.status(401).json({ message: "Invalid username or password" });
        }
    });
});

dataRoutes.route("/auth/pine").post(WithAuth, function (req, res) {
  try {
    const PINECONE_INDEX = pinecone.Index("info-store");
    res.status(200).json({message: PINECONE_INDEX});
  } catch (err) {
    console.error('Error: ', err);
    res.status(500).json({message: 'Internal Server Error'});
  }
});

dataRoutes.route("/auth/openai").post(WithAuth, async function(req, res) {
  try {
    const response = await openai.createCompletion({
      model: "text-ada-001",
      prompt: "How many stars explode in 0.25 seconds?",
      max_tokens: 30,
      temperature: 0,
    });

    const completion = response.data.choices[0].text.trim();
    console.log(response.data)
    res.status(200).send({ response: completion });
  } catch (err) {
    console.log(err.response);
  }
});

// route for setting the cookie
dataRoutes.route('/bake-my-cookie').post(function (req, res) {
  const accessToken = req.headers.authorization.split(' ')[1];
  const encodedToken = jwt.sign({ accessToken }, process.env.COOKIE_SECRET);
  const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // Add 24 hours to current date
  res.cookie('accessToken', encodedToken, {
    expires: expirationDate,
    httpOnly: true,
    path: "http://localhost:3000/",
  });
  res.status(200).send({message: "Successful Batch!"});
});

module.exports = dataRoutes;