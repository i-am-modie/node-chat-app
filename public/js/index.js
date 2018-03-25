var socket = io();

socket.on('connect', function (){
    console.log('Connected to server');

    socket.emit('createMessage', {
        from: 'MoDie',
        text: 'test1233232',
    })
});

socket.on('newMessage', function (message) {
   console.log('message', message);
});

socket.on('disconnect', function (){
    console.log('disconnected from server');
});
