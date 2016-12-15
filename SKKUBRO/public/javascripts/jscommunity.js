$(function() {
    $('a[name="notice"]').on('click', function(event){
        event.preventDefault();
        $.get('/community/get_noticeCat?index=1', function(data) {
            console.log(data, data.nowIndex);
            if (data.code === 1) {
                makeNoticeCont(data.data, data.count, data.index);
            }
        });
    });

    $('a[name="event"]').on('click', function(event){
        event.preventDefault();
        $.get('/community/get_eventCat?index=1', function(data) {
            console.log(data, data.nowIndex);
            if (data.code === 1) {
                makeEventCont(data.data, data.count, data.index);
            }
        });
    });

    $('a[name="QnA"]').on('click', function(event){
        event.preventDefault();
        $.get('/community/get_QnACat?index=1', function(data) {
            if (data.code === 1) {
                makeQnACont(data.data, data.count, data.index);
            }
        });
    });
    $('a[name="notice"]').trigger('click');
});

function makeNoticeCont(data, count, index) {
    console.log('data', data);
    $('#commContTitle').text('공지사항');
    var theadStr = '';
    theadStr += '<tr>';
    theadStr += '<th>제목</th><th>작성일</th>';
    theadStr += '</tr>';
    $('#commContThead').html('');
    $('#commContThead').append(theadStr);

    var tbodyStr = '';
    data.forEach(function(item) {
        tbodyStr += '<tr>';
        var uploadDate = new Date(item.uploadDate);
        tbodyStr += '<th><a href="#" name="commContOpen" class="commContTbodyTitle" id="' + item._id + '">' + item.title + '</a></th>';
        tbodyStr += '<th><p class="commContTbodyDate">' + getDate(uploadDate) + '</p></th>';
        tbodyStr += '</tr>';
    });
    $('#commContTbody').html('');
    $('#commContTbody').append(tbodyStr);

    makeCommCatIndex(index, count); //밑에 페이지 1|2|3 만드는것

    $('a[name="commContOpen"]').each(function() {
        $(this).on('click', function(event) {
            event.preventDefault();
            noticeNum = $(this).attr('id');
            noticeNum = noticeNum.substring(11, noticeNum.length);
            window.location.href = "/community/readNotice?noticeNum=" + noticeNum;
        });
    });

    $('a[name="index_a"]').each(function(){//인덱스용
        $(this).on('click', function(event){
            event.preventDefault();
            var index = $(this).text();
            $.get('/community/get_noticeCat?index=' + index, function(data) {
                console.log(data, data.nowIndex);
                if (data.code === 1) {
                    makeNoticeCont(data.data, data.count, data.index);
                }
            });
        });
    });
}

function makeCommCatIndex(index, count) {
    var page10 = (index - 1) % 10;
    var indexStr = '';
    if (index == page10 + 1) {
        indexStr += '<a class = "commNowIndex">' + (page10 + 1) + '</a>';
    } else {
        indexStr += '<a name="index_a" href="#">' + (page10 + 1) + '</a>';
    }
    for (var i = 1; i < 10; i++) {
        if (count > page10 * 100 + 10 * i) {
            if (page10 + i + 1 == index) {
                indexStr += ' | ' + '<a class = "commNowIndex">' + (page10 + i + 1) + '</a>';
            } else {
                indexStr += ' | ' + '<a name="index_a" href="#">' + (page10 + i + 1) + '</a>';
            }
        }
    }
    $('#commCatIndex').html('');
    $('#commCatIndex').append(indexStr);
}

function makeEventCont(data, count, index) {
    console.log('data', data);
    $('#commContTitle').text('이벤트');
    var theadStr = '';
    theadStr += '<tr>';
    theadStr += '<th>제목</th><th>작성일</th><th>이벤트 기간</th>';
    theadStr += '</tr>';
    $('#commContThead').html('');
    $('#commContThead').append(theadStr);

    var tbodyStr = '';
    data.forEach(function(item) {
        tbodyStr += '<tr>';
        var uploadDate = new Date(item.uploadDate);
        tbodyStr += '<th><a href="#" name="commContOpen" class="commContTbodyTitle" id="' + item._id + '">' + item.title + '</a></th>';
        tbodyStr += '<th><p class="commContTbodyDate">' + getDate(uploadDate) + '</p></th>';
        tbodyStr += '<th><p> ' + item.startDate + ' ~ ' + item.endDate + ' </p></th>';
        tbodyStr += '</tr>';
    });
    $('#commContTbody').html('');
    $('#commContTbody').append(tbodyStr);

    makeCommCatIndex(index, count); //밑에 페이지 1|2|3 만드는것

    var activeStr = '';

    $('a[name="commContOpen"]').each(function() {
        $(this).on('click', function(event) {
            event.preventDefault();
            var eventNum = $(this).attr('id');
            eventNum = eventNum.substring(11, eventNum.length);
            window.location.href = "/community/readEvent?eventNum=" + eventNum;
        });
    });

    $('a[name="index_a"]').each(function(){
        $(this).on('click', function(event){
            event.preventDefault();
            var index = $(this).text();
            $.get('/community/get_eventCat?index=' + index, function(data) {
                console.log(data, data.nowIndex);
                if (data.code === 1) {
                    makeEventCont(data.data, data.count, data.index);
                }
            });
        });
    });
}

function makeQnACont(data, count, index) {
    console.log('data', data);
    $('#commContTitle').text('QnA');
    var theadStr = '';
    theadStr += '<tr>';
    theadStr += '<th>공개 여부</th><th>제목</th><th>작성자</th><th>작성일</th>';
    theadStr += '</tr>';
    $('#commContThead').html('');
    $('#commContThead').append(theadStr);

    var tbodyStr = '';
    data.forEach(function(item) {
        tbodyStr += '<tr>';
        var uploadDate = new Date(item.uploadDate);
        if(item.locked == false){
            tbodyStr += '<th><p class="commContTbodyOpen">비공개</p></th>';   
        }else if(item.locked == true){
            tbodyStr += '<th><p class="commContTbodyOpen">공개</p></th>';
        }else if(item.isLogined == true){
            tbodyStr += '<th><p class="commContTbodyOpen">회원</p></th>';
        }
        tbodyStr += '<th><a href="#" name="commContOpen" class="commContTbodyTitle" id="' + item._id + '">' + item.title + '</a></th>';
        if(item.isLogined == true){
            tbodyStr += '<th><p class="commContTbodyWriter">' + item.email + '</p></th>';
        }else if(item.isLogined == false){
            tbodyStr += '<th><p class="commContTbodyWriter">' + item.name + '</p></th>';
        }
        tbodyStr += '<th><p class="commContTbodyDate">' + getDate(uploadDate) + '</p></th>';
        tbodyStr += '</tr>';
    });
    $('#commContTbody').html('');
    $('#commContTbody').append(tbodyStr);

    makeCommCatIndex(index, count); //밑에 페이지 1|2|3 만드는것

    $('a[name="commContOpen"]').each(function() {
        $(this).on('click', function(event) {
            event.preventDefault();
            QnANum = $(this).attr('id');
            QnANum = QnANum.substring(11, QnANum.length);
            window.location.href = "/community/readQnA?QnANum=" + QnANum;
        });
    });

    $('a[name="index_a"]').each(function(){//인덱스용
        $(this).on('click', function(event){
            event.preventDefault();
            var index = $(this).text();
            $.get('/community/get_QnACat?index=' + index, function(data) {
                console.log(data, data.nowIndex);
                if (data.code === 1) {
                    makeQnACont(data.data, data.count, data.index);
                }
            });
        });
    });

    var commActiveStr = '';
    commActiveStr += '<a href="/community/writeQnA">글쓰기</a>';
    $('#commActive').html('');
    $('#commActive').append(commActiveStr);
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
