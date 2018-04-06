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

    let params = $.deparam(window.location.search);

    eventEmitter('join', params, (err) => {

        if (err) {

            alert(err);

            window.location.href('/')

        }

    })

});

socket.on('disconnect', () => console.log('Disconnected from server.'));

socket.on('updateUserList', (userList) => {

    let div = $(`<div class="list-group bg-transparent "></div>`);

    userList.forEach(user => {

        let a = $('<a href="#" class="border-0 text-dark bg-light list-group-item list-group-item-action pt-1 pb-1 mb-2"></a>');

        a.text(user);

        div.append(a);

    });

    $('#users-list').html(div);

});

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