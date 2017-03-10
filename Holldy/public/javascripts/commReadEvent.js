$(function() {
    var eventNum = $.getUrlVar('eventNum');
    $.get('/community/get_commEvent?eventNum=' + eventNum, function(data) {
        if (data.code === 1) {
            $('#readCommTitle').text(data.data.title);
            $('#readCommDate').text(data.data.startDate + ' ~ ' + data.data.endDate);
            $('#readCommCont').text(data.data.cont);
            if (data.data.imagePaths) { //이미지 없을수도 있음
                connImage(data.data.imagePaths);
            }
        }
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

function connImage(imagePaths) {
    var imgStr = '';
    imagePaths.forEach(function(item) {
        imgStr += '<img class="commImg" src="../uploadFolder/event/' + item + '"></img>';
    });
    $('#readCommImg').append(imgStr);
}
