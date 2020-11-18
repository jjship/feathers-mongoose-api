const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

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

const app = express(feathers());

app.use(express.json);
// Turn on URL-encoded parser for REST services
app.use(express.urlencoded({ extended: true }));
// Enable REST services
app.configure(express.rest());
// Enable Socket.io services
app.configure(socketio());
// connsect to the dv, create and register a Feathers service
app.use(
  '/messages',
  service({
    Model,
    paginate: {
      default: 2,
      max: 4,
    },
  })
);
app.use(express.errorHandler());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Feathers server listening on port ${PORT}`);
});
