$(function() {
    $admin_help_container = $('#admin_help_container');
    var socket = io.connect();
    socket.on('isThereAdmin', function(clientID) {
        console.log('isThereAdmin');
        socket.emit('yesAdminHere', clientID);
        window.open('/admin12345abcde/helpPopUp?clientID=' + clientID,"상담 " + clientID, "fullscreen=no,toolbar=no,status=no,menubar=no,scrollbars=no,resizeable=no,width=300,height=500");
    });
    socket.emit('join', 'admin_room_123');
});
