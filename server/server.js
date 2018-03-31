const path = require('path');

const express = require('express');

const http = require('http');

const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

const app = express();

let server = http.createServer(app);

let io = socketIO(server);

const port = process.env.PORT || 3000;

const { generateMessage } = require('./utils/message');

io.on('connection', (socket) => {

    console.log('New user connected');

    socket.emit('newUser', generateMessage('@Admin', 'Welcome to the Chat App !'));

    socket.broadcast.emit('userJoined', generateMessage('@Admin', 'New user joined !'));

    // socket.emit('newMessage', {
    //     from: '@Martial',
    //     text: 'Hey girl !',
    //     createdAt: new Date().getTime(),
    // });

    socket.on('createMessage', (message) => {

        message.createdAt = new Date().getTime();

        console.log('createMessage', message);

        // io.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime(),
        // });

        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime(),
        // });

    });

});

// Serve static files

app.use(express.static(publicPath));


server.listen(port,
    () => console.log(`Server up and running on port ${port}...`));