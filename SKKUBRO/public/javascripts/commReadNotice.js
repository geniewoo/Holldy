$(function() {
    var noticeNum = $.getUrlVar('noticeNum');
    $.get('/community/get_commNotice?noticeNum=' + noticeNum, function(data) {
        if (data.code === 1) {
            var uploadDate = new Date(data.data.uploadDate);
            $('#readCommTitle').text(data.data.title);
            $('#readCommDate').text(getDate(uploadDate));
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
        imgStr += '<img class="commImg" src="../uploadFolder/notice/' + item + '"></img>';
    });
    $('#readCommImg').append(imgStr);
}

var getDate = function(date) {
    var returnDate = date.getFullYear() + '-';
    if (date.getMonth() < 9) {
        returnDate += '0' + (date.getMonth() + 1) + '-';
    } else {
        returnDate += (date.getMonth() + 1) + '-';
    }
    if (date.getDate() < 10) {
        returnDate += '0' + date.getDate();
    } else {
        returnDate += date.getDate();
    }
    return returnDate;
}
