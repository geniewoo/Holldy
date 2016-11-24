$(function() {
    $chatContent = $('#chatContent');
    $chatTextArea = $('#chatTextArea');
    $chatSendBtn = $('#chatSendBtn');
    $chatForm = $('#chatForm');
    resizeWindow($chatContent, $chatForm, $chatSendBtn, $chatTextArea);

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
            $chatContent.scrollTop($chatContent.prop("scrollHeight"));
        });
        $chatTextArea.on('keydown', function(event){
            if(event.keyCode == 13){
                $chatSendBtn.trigger('click');
            }
        });
        connectMecros(socket, roomName);
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
var resizeWindow = function($chatContent, $chatForm, $chatSendBtn, $chatTextArea){
    $(window).on('resize',function(){
        var height = $(window).innerHeight();
        var width = $(window).innerWidth();
        $chatContent.height(height-220);
        $('#chatTitle').css('padding-left', width/2 - 25);
        $('#chatTextArea').css('width', width - 75);
    });
    $(window).trigger('resize');
}

var connectMecros = function(socket, roomName){
    $('div.mecro > a').each(function(index){
        console.log($(this).text());
        $(this).on('click', function(event){
            event.preventDefault();
            socket.emit('help_send_msg', {
                'msg': 'close' + $(this).text(),
                'roomName': roomName,
                'isClient': false
            });
        });
    });
}
