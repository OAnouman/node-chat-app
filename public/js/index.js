let socket = io();

let messageField = $("input[name='message']");

let messageThread = $('#message-thread');

let eventEmitter = (eventName, data, callback) => {

    socket.emit(eventName, data, callback);

};

socket.on('connect', () => {

    console.log('Connected to server.');

});

socket.on('disconnect', () => console.log('Disconnected from server.'));

socket.on('newMessage', (message) => {

    let formattedTime = moment(message.createdAt).format('h:mm a');

    let li = $('<li></li>');

    let small = $('<small class="text-muted"></small>')

    small.text(`${formattedTime}`)

    li.text(`${message.from} : ${message.text} - `).append(small);


    messageThread.append(li);

});

$('#message-form').on('submit', (e) => {

    e.preventDefault();

    socket.emit('createMessage', {

        from: 'User',
        text: messageField.val(),

    }, () => {

        messageField.val('');

    });

});

socket.on('newLocationMessage', (message) => {

    let formattedTime = moment(message.createdAt).format('h:mm a');

    let li = $('<li></li>');

    let a = $(`<a>My current location</a>`);

    let small = $('<small class="text-muted"></small>')

    small.text(`${formattedTime}`)

    a.attr('target', '_blank')
        .attr('href', message.url);

    li.text(`${message.from} : `)
        .append(a)
        .append(' - ')
        .append(small);

    messageThread.append(li);

}, () => {



});


let geolocationButton = $('#send-geolocation');

geolocationButton.on('click', (e) => {

    if (!'geolocation' in navigator) {

        return alert('Your browser doesn\'t support geolcation');

    }

    geolocationButton.text('Sending Location...')
        .attr('disabled', 'true');

    navigator.geolocation.getCurrentPosition((position) => {

        eventEmitter('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        }, () => {

            geolocationButton.removeAttr('disabled')
                .text('Send Location');

        });

    }, () => {
        alert('Unable to fetch your position.');
        geolocationButton.removeAttr('disabled')
            .text('Send Location');
    });

})