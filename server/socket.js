// const State = require('./db/models/state');
const socketio = require('socket.io');

// const Player = require('./db/models/player');
let io;
let sockets = [];
function establishSocket(server) {
    io = socketio(server)

    io.on('connection', function(socket) {
        sockets.push(socket);
    })
}

function createRoom(roomName) {
    // rooms[roomName] = io.of(`/${roomName}`);
}

function emitMessage(roomName, data) {
    io.emit('data', {
        roomName,
        data
    })
}

module.exports = {
    establishSocket,
    createRoom,
    emitMessage
}