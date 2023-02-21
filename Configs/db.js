const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
require("dotenv").config();
const url = process.env.mongoUrl;

const connection = mongoose.connect(url);

module.exports= {connection};