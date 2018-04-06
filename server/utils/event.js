let singleEventEmitter = (socket, to, eventName, data, callback) => {

    if (to) {

        socket.to(to).emit(eventName, data, callback);

    } else {

        socket.emit(eventName, data, callback);

    }

};


module.exports = { singleEventEmitter };