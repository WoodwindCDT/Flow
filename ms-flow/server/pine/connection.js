const { PineconeClient } = require("@pinecone-database/pinecone");
require('dotenv').config();

const pinecone = new PineconeClient();

const connectPine = async () => {
  try {
    await pinecone.init({
      environment: process.env.PINE_ENV,
      apiKey: process.env.PINE_KEY,
    });
    console.log("PineCone Connected!");
  } catch (err) {
    console.log('PineCone error:', err);
    throw err;
  }
};

module.exports = {
  pinecone,  // Export the pinecone object
  connectPine
};