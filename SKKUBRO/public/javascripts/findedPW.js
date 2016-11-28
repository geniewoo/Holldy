$(function() {
    var isFindedID = $.getUrlVar('isFinded');
    if (isFindedID === "true") {
        $('#findedPW_text').text('찾으시는 계정의 이메일로 메일이 발송되었습니다');
    } else if (isFindedID === "false") {
        $('#findedPW_text').text('입력하신 정보에 해당하는 비밀번호가 없습니다.');
    }
    $('#localLogin_btn').on('click', function(event) {
        event.preventDefault();
        $('a[data-modal-id]').trigger('click'); //header_nav에 있는 버튼 누르기 trigger
    });
});

$.extend({
    getUrlVars: function() {
        var vars = [],
            hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function(name) {
        return $.getUrlVars()[name];
    }
});
