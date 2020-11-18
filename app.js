const mongoose = require('mongoose');
const service = require('feathers-mongoose');
require('dotenv/config');

const Model = require('./models/message');

//Make Mongoose use the ES6 promise
mongoose.Promise = global.Promise;

//connect to MongoDB
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log('connected to db!')
);
