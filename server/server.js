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

   socket.on('createMessage',(newMessage)=>{
       console.log(`Message from ${newMessage.from}`, newMessage);
       let message = _.pick(newMessage, ['from', 'text']);
       message.CreatedAt = new Date().getTime();
       socket.emit('newMessage', message);
   });

   socket.on('disconnect', ()=>{
       console.log('User disconnected');
   });
});

server.listen(port, ()=>{
    console.log(`Started on port ${port}`);
});