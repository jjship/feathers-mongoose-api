const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

class MessageService {
  constructor() {
    this.messages = [];
  }

  async find() {
    return this.messages;
  }

  async create(data) {
    const message = {
      id: this.messages.length,
      text: data.text,
    };
    this.messages.push(message);
    return message;
  }
}

const app = express(feathers());

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

//REST & socket configuration
app.configure(express.rest());
app.configure(socketio());

//registering route
app.use('/messages', new MessageService());

app.use(express.errorHandler());

// setup socket channels
app.on('connection', (connection) => {
  app.channel('everybody').join(connection);
});

// publish events to channel
app.publish(() => app.chanel('everybody'));

app.listen(3030).on('listening', () => {
  console.log('Feathers server listening on localhost:3030');
});

app.service('messages').create({
  text: 'Hello world from the server',
});
