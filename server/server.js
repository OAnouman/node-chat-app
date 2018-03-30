const path = require('path');

const express = require('express');

const http = require('http');

const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

const app = express();

let server = http.createServer(app);

let io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {

    console.log('New user connected');

    io.on('disconnect', () => console.log('User disconnected from server'));

});

io.on('disconnect', () => console.log('User disconnected from server'));

// Serve static files

app.use(express.static(publicPath));


server.listen(port,
    () => console.log(`Server up and running on port ${port}...`));