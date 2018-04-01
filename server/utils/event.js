let singleEventEmitter = (socket, eventName, data, callback) => {

    socket.emit(eventName, data, callback);

};


module.exports = { singleEventEmitter };