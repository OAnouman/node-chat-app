const path = require('path');

const express = require('express');

const http = require('http');

const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

const app = express();

const { isRealString } = require('./utils/validation');

const { Users } = require('./utils/users');

const port = process.env.PORT || 3000;

const { generateMessage, generateLocationMessage } = require('./utils/message');

const { singleEventEmitter } = require('./utils/event');



let server = http.createServer(app);

let io = socketIO(server);

let users = new Users();


io.on('connection', (socket) => {

    socket.on('join', (params, callback) => {

        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Display name and room name are required');
        }

        // Join user to specified room

        socket.join(params.room);

        // add the new user

        users.removeUser(socket.id);

        users.addUser(null, socket.id, params.name, params.room);

        // Send users list

        io.to(params.room).emit('updateUserList', users.getUsersList(params.room));

        // Sent only to jsut connected user

        socket.emit('newMessage', generateMessage('@Admin', `${params.name}, welcome to the Chat App ! You are in the room '${params.room}'`));

        // Sent to everyone in the room

        socket.broadcast.to(params.room).emit('newMessage',
            generateMessage('@Admin', `${params.name} has joined !`));

        callback();
    })

    socket.on('createMessage', (message, callback) => {

        message.createdAt = new Date().getTime();

        // console.log('createMessage', message);

        io.emit('newMessage', generateMessage(message.from, message.text));

        callback('Send from the server');

    });

    socket.on('createLocationMessage', (coords, callback) => {

        singleEventEmitter(io, 'newLocationMessage', generateLocationMessage('@Admin', coords.latitude, coords.longitude), null);

        callback();

    });

    socket.on('disconnect', () => {

        let user = users.removeUser(socket.id);

        if (user) {

            io.to(user.room).emit('updateUserList', users.getUsersList(user.room));

            io.to(user.room).emit('newMessage', generateMessage('@Admin', `${user.name} has left.`));
        }


    })

});

// Serve static files

app.use(express.static(publicPath));

server.listen(port,
    () => console.log(`Server up and running on port ${port}...`));