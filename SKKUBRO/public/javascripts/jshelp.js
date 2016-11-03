$(function() {
    $chatContent = $('#chatContent');
    $chatTextArea = $('#chatTextArea');
    $chatSendBtn = $('#chatSendBtn');
    initHelpWindow($chatContent, $chatSendBtn, $chatTextArea);
    var socket = io.connect();
    var roomName = '';
    socket.emit('help_request');
    $chatSendBtn.on('click', function() { //전송 클릭하면 메세지 보냄
        var msg = $chatTextArea.val();
        $chatTextArea.val('');

        socket.emit('help_send_msg', {
            'msg': msg,
            'roomName': roomName,
            'isClient': true
        });
    });
    socket.on('help_reply', function(myID) {
        roomName = myID;
        socket.emit('join', myID);
        resetHelpWindow($chatContent, $chatSendBtn, $chatTextArea);
    });
    socket.on('help_get_msg', function(data) {
        var msg = data.msg;
        var isClient = data.isClient;
        var text = makeOthersText(msg, isClient);
        $chatContent.append(text);
    });
});

var makeOthersText = function(msg, isClient) {
    var text = '';
    var classStr;
    if (isClient) {
        classStr = 'client';
    } else {
        classStr = 'admin';
    }
    text += '<p class="' + classStr + '">' + msg + '</p>';
    return text;
}

var initHelpWindow = function($chatContent, $chatSendBtn, $chatTextArea) {
    var text = '<p class="noAdmin">죄송합니다 관리자가 현재 접속해 있지 않습니다.</p>';
    $chatContent.html(text);
    $chatSendBtn.attr('disabled', 'disabled');
    $chatTextArea.attr('disabled', 'disabled');
}

var resetHelpWindow = function($chatContent, $chatSendBtn, $chatTextArea) {
    var text = '<p class="noAdmin">관리자가 실시간 답변이 가능합니다.</p>';
    $chatSendBtn.removeAttr('disabled');
    $chatTextArea.removeAttr('disabled');
    $chatContent.html(text);
}
