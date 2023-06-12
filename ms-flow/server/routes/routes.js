// routes used for handling and requesting our data
const express = require("express");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

// The router will be added as a middleware and will take control of requests starting with path /record.
const dataRoutes = express.Router();
 
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



module.exports = dataRoutes;