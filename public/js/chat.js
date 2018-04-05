let socket = io();

let messageField = $("input[name='message']");

let messages = $('#messages');

let messageThread = $('#message-thread');

let eventEmitter = (eventName, data, callback) => {

    socket.emit(eventName, data, callback);

};

let scrollToBottom = () => {

    // Selectors

    let newMessage = messages.children('li:last-child');

    // Heigths

    let clientHeight = messageThread.prop('clientHeight');

    let scrollTop = messageThread.scrollTop();

    let scrollHeight = messageThread.prop('scrollHeight');

    let newMessageHeight = newMessage.innerHeight();

    let lastMessageHeight = newMessage.prev().innerHeight();

    if (scrollTop + clientHeight + newMessageHeight + lastMessageHeight >=
        scrollHeight) {

        messageThread.scrollTop(scrollHeight);

    }

}

socket.on('connect', () => {

    console.log('Connected to server.');

});

socket.on('disconnect', () => console.log('Disconnected from server.'));

socket.on('newMessage', (message) => {

    let formattedTime = moment(message.createdAt).format('h:mm a');

    let template = $('#message-template').html();

    let li = Mustache.render(template, {
        from: message.from,
        text: message.text,
        time: formattedTime,
    });

    messages.append(li);

    scrollToBottom();

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

    let template = $('#location-message-template').html();

    let li = Mustache.render(template, {

        from: message.from,
        time: formattedTime,
        url: message.url,

    })

    messages.append(li);

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