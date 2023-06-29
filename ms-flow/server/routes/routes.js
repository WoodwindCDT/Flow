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
const { v4: uuidv4 } = require('uuid')

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
          const { password, ...updatedUser } = result;
          res.json({ message: "Login successful", user: updatedUser });
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

dataRoutes.route("/auth/pine/add").post(WithAuth, async function (req, res) {
  const {text, organization, organization_id, level_access, user} = req.body; // user will provide some text and in addition, they will specify which level/collection they want to store it to
  const index = pinecone.Index("info-store");
  try {
    const moderationResponse = await openai.createModeration({ input: text });
    const [results] = moderationResponse.data.results;
    if (results.flagged) {
      res.status(500).json({message: "Text does not comply with OpenAi API."});
      return;
    }

    const embeddingResponse = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: text,
    });
    
    const [{ embedding }] = embeddingResponse.data.data;
    const dataId = uuidv4();
    const upsertRequest = {
      vectors: [
        {
          id: dataId,
          values: embedding,
          metadata: {
            text,
            organization: organization,
            organization_id: organization_id, // can store org ID here?
            posted_by: user
          }
        }
      ],
      namespace: level_access
    };

    const upsertResponse = await index.upsert({ upsertRequest });
    console.log(upsertResponse);
    res.status(200).json({ message: "Transmission Complete." });
  } catch (err) {
    console.error('Error: ', err);
    res.status(500).json({message: 'Internal Server Error'});
  }
});

dataRoutes.route("/auth/pine/search").post(WithAuth, async function(req, res) {
  const {text, organization, organization_id, level_access} = req.body;
  const index = pinecone.Index("info-store");
  try {
    const moderationResponse = await openai.createModeration({ input: text });
    const [results] = moderationResponse.data.results;
    if (results.flagged) {
      res.status(500).json({message: "Text does not comply with OpenAi API."});
      return;
    }

    const embeddingResponse = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: text,
    });
    
    const [{ embedding }] = embeddingResponse.data.data;

    const queryRequest = {
      vector: embedding,
      // filter search to only looking at matching org, org_id when possible
      filter: {
        "organization": {"$eq": organization},
        "organization_id": {"$eq": organization_id}
      },
      topK: 2,
      includeValues: false,
      includeMetadata: true,
      namespace: level_access,
    };

    const queryResponse = await index.query({ queryRequest });
    
    const matches = queryResponse.matches;
    console.log(matches)
    if (matches.length === 0 || matches[0].score < 0.75) {
      res.status(200).json({ summary: "No information found!", query: text });
      return;
    }

    const topMatches = matches.slice(0, 2).filter(match => match.score > 0.75);
    if (topMatches.length === 0) {
      res.status(200).json({ summary: "No matches above threshold found!", query: text });
      return;
    }
    
    const readableMatches = topMatches.map(match => ({
      text: match.metadata.text,
      score: match.score
    }));
    
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content": `Based on the user's search vs result, provide a friendly, short/sweet summary. Queried: ${text}. Note: Results may contain 2 likely responses, so you may combine them if necessary to provide further context in summary.`,
        },
        { "role": "user", "content": JSON.stringify(readableMatches) },
      ],
      max_tokens: 150
    });

    res.status(200).json({ summary: completion.data.choices[0].message.content, query: text});
    return;
  } catch (err) {
    console.error('Error: ', err);
    res.status(500).json({ summary: 'Internal Server Error', query: text });
  }
});

// dataRoutes.route("/auth/pine/delete-all").delete(WithAuth, async function (req, res) {
//   const index = pinecone.Index("info-store");
//   try {
//     const result = await index.delete1({deleteAll: true, namespace: "test"}); // only for testing purposes
//     if (result) {
//       res.status(200).json(result);
//     }
//   } catch (error) {
//     console.log('Error: ', error);
//   }
// })

// dataRoutes.route("/auth/openai").post(WithAuth, async function(req, res) {
//   try {
//     const {text} = req.body;
//     const response = await openai.createCompletion({
//       model: "text-ada-001",
//       prompt: text,
//       max_tokens: 30,
//       temperature: 0,
//       logprobs: 0,
//     });

//     const completion = response.data.choices[0].text.trim();

//     res.status(200).send({ response: completion });
//   } catch (err) {
//     console.log(err.response);
//   }
// });

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

dataRoutes.route('/torch-my-cookie').delete(WithAuth, function (req, res) {
  res.clearCookie('accessToken');
  res.status(200).send({message: "Batch Torched!"});
});

module.exports = dataRoutes;