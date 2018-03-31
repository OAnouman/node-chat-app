let socket = io();

socket.on('connect', () => {

    // socket.emit('createMessage', {
    //     to: '@Andrew',
    //     text: 'Hi dude !',
    // });

});

socket.on('disconnect', () => console.log('Disconnected from server.'));

socket.on('newMessage', (message) => {

    console.log('New message', message);

});

socket.on('newUser', (message) => {

    console.log('Welcome user', message);

})

socket.on('userJoined', (message) => {

    console.log('New user joined', message);

})