const path = require('path');
const express = require('express');
const { Server } = require('socket.io');

//* Server Settings
const app = express();
app.set('port', process.env.PORT || 3000);

//* Middlewares
app.use(express.static('public'));

//* Starting Server
const server = app.listen(app.get('port'), () => {
  console.log('Server Succesfully created!')
  console.log(`Server on Port: ${app.get('port')}`);
});

let messageHistory = [];
const io = new Server(server);
io.on('connection', (socket) => {
  console.log(`A new user has logged in, the ID is: ${socket.id}`);
  socket.emit('chat:Initialize',messageHistory);
  // WebSocket Events
  socket.on('disconnect', () => {
    console.log(`A user has logged out, the ID is: ${socket.id}`);
  });
  socket.on('chat:MessageFromClient', (data) => {
    console.log(`The user ${data.username} sent this message: ${data.message}`);
    messageHistory.push({...data});
    io.emit('chat:MessageFromServer', data);
  })
});