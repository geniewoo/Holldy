$(function() {
    $chatContent = $('#chatContent');
    $chatTextArea = $('#chatTextArea');
    $chatSendBtn = $('#chatSendBtn');

    $.get('/admin12345abcde/get_help_clineID', function(data) {
        var roomName = data.clientID;
        var socket = io.connect();
        socket.emit('join', roomName);
        $chatSendBtn.on('click', function() { //전송 클릭하면 메세지 보냄
            var msg = $chatTextArea.val();
            $chatTextArea.val('');
            socket.emit('help_send_msg', {
                'msg': msg,
                'roomName': roomName,
                'isClient': false
            });
        });
        socket.on('help_get_msg', function(data) {
            var msg = data.msg;
            var isClient = data.isClient;
            var text = makeOthersText(msg, isClient);
            $chatContent.append(text);
        });
    });
});

var makeOthersText = function(msg, isClient) {
    var text = '';
    var classStr;
    if (isClient) { //반대로 함. 어드민 입장에선 반대로 적혀야 하니깐.
        classStr = 'admin';
    } else {
        classStr = 'client'
    }
    text += '<p class="' + classStr + '">' + msg + '</p>';
    return text;
}
