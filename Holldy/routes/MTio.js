module.exports = function(io) {
    var express = require('express');
    var router = express.Router();
    var adminRoom = 'admin_room_123';
    io.sockets.on('connection', function(socket) {
        console.log('/help/ + ', socket.id);
        socket.on('join', function(roomName) {
            console.log('join', roomName);
            socket.join(roomName);
        });
        socket.on('help_request', function() {
            console.log('help_request');
            io.sockets.to(adminRoom).emit('isThereAdmin', socket.id);
        });
        socket.on('yesAdminHere', function(clientID) {
            console.log('yesAdminHere', clientID);
            io.sockets.to(clientID).emit('help_reply', clientID);
        });
        socket.on('help_send_msg', function(data) {
            io.sockets.to(data.roomName).emit('help_get_msg', {
                'msg': data.msg,
                'isClient': data.isClient
            });
        });
    });
    return router;
}
