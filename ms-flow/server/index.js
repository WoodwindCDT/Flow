const express = require("express");
const mongoose = require('mongoose');
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(require("./routes/routes"));

// get driver connection
const dbo = require("./db/connection");
dbo();

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(port, () => console.log(`Server running on port ${port}`))
});

mongoose.connection.on('error', err => {
    console.log(err)
});
