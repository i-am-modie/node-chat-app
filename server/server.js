const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const _ = require('lodash');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
   console.log('New user connected');

   socket.emit('newMessage', {
       from: 'Admin',
       text: 'Welcome to the soldier side',
       CreatedAt: new Date().getTime()
   });

   socket.broadcast.emit('newMessage', {
       from: 'Admin',
       text: 'Someone joined will he say "Hi" or it\' ordinary creep?',
       CreatedAt: new Date().getTime()
   });

   socket.on('createMessage',(newMessage)=>{
       console.log(`Message from ${newMessage.from}`, newMessage);
       let message = _.pick(newMessage, ['from', 'text']);
       message.CreatedAt = new Date().getTime();
       socket.broadcast.emit('newMessage', message);
   });

   socket.on('disconnect', ()=>{
       console.log('User disconnected');
   });
});

server.listen(port, ()=>{
    console.log(`Started on port ${port}`);
});