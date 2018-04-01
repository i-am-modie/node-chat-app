const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
let app = express();
let server = http.createServer(app);
let io = socketIO(server);

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room name are required')
        }
        socket.join(params.room);
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the soldier side!'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined!`));
        callback();
    });

    socket.on('createMessage', (newMessage, callback) => {
        console.log(`Message from ${newMessage.from}`, newMessage);
        io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage(coords.from, coords.latitude, coords.longtitude));
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, () => {
    console.log(`Started on port ${port}`);
});