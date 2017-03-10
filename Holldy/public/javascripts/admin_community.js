$(function() {
    $('a[name="notice"]').on('click', function(event){
        event.preventDefault();
        $.get('/admin12345abcde/community/get_noticeCat?index=1', function(data) {
            console.log(data, data.nowIndex);
            if (data.code === 1) {
                makeNoticeCont(data.data, data.count, data.index);
            }
        });
    });

    $('a[name="event"]').on('click', function(event){
        event.preventDefault();
        $.get('/admin12345abcde/community/get_eventCat?index=1', function(data) {
            console.log(data, data.nowIndex);
            if (data.code === 1) {
                makeEventCont(data.data, data.count, data.index);
            }
        });
    });

    $('a[name="QnA"]').on('click', function(event){
        event.preventDefault();
        $.get('/admin12345abcde/community/get_QnACat?index=1', function(data) {
            if (data.code === 1) {
                makeQnACont(data.data, data.count, data.index);
            }
        });
    });
    $('a[name="review"]').on('click', function(event){
        event.preventDefault();
        $.get('/admin12345abcde/community/get_reviewCat?index=1', function(data) {
            if (data.code === 1) {
                makeReviewCont(data.data, data.count, data.index);
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
    theadStr += '<th></th><th>제목</th><th>작성일</th>';
    theadStr += '</tr>';
    $('#commContThead').html('');
    $('#commContThead').append(theadStr);

    var tbodyStr = '';
    data.forEach(function(item) {
        tbodyStr += '<tr>';
        var uploadDate = new Date(item.uploadDate);
        tbodyStr += '<th><a href="#" name="commContDel" id="' + item._id + '">삭제</a></th>';
        tbodyStr += '<th><a href="#" name="commContOpen" class="commContTbodyTitle" id="' + item._id + '">' + item.title + '</a></th>';
        tbodyStr += '<th><p class="commContTbodyDate">' + getDate(uploadDate) + '</p></th>';
        tbodyStr += '</tr>';
    });
    $('#commContTbody').html('');
    $('#commContTbody').append(tbodyStr);

    makeCommCatIndex(index, count); //밑에 페이지 1|2|3 만드는것

    var activeStr = '';
    activeStr += '<a href="/admin12345abcde/community/writeNotice">글쓰기</a>';
    $('#commActive').html('');
    $('#commActive').append(activeStr);

    $('a[name="commContOpen"]').each(function() {
        $(this).on('click', function(event) {
            event.preventDefault();
            noticeNum = $(this).attr('id');
            noticeNum = noticeNum.substring(11, noticeNum.length);
            window.location.href = "/community/readNotice?noticeNum=" + noticeNum;
        });
    });
    $('a[name="commContDel"]').each(function() {
        $(this).on('click', function(event) {
            event.preventDefault();
            noticeNum = $(this).attr('id');
            noticeNum = noticeNum.substring(11, noticeNum.length);
            $.get('/admin12345abcde/community/get_delNotice?noticeNum=' + noticeNum, function(result) {
                if(result.code ===1){
                    window.location.reload(true);
                }
            });
        });
    });

    $('a[name="index_a"]').each(function(){//인덱스용
        $(this).on('click', function(event){
            event.preventDefault();
            var index = $(this).text();
            $.get('/admin12345abcde/community/get_noticeCat?index=' + index, function(data) {
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
    theadStr += '<th></th><th>제목</th><th>작성일</th><th>이벤트 기간</th>';
    theadStr += '</tr>';
    $('#commContThead').html('');
    $('#commContThead').append(theadStr);

    var tbodyStr = '';
    data.forEach(function(item) {
        tbodyStr += '<tr>';
        var uploadDate = new Date(item.uploadDate);
        tbodyStr += '<th><a href="#" name="commContDel" id="' + item._id + '">삭제</a></th>';
        tbodyStr += '<th><a href="#" name="commContOpen" class="commContTbodyTitle" id="' + item._id + '">' + item.title + '</a></th>';
        tbodyStr += '<th><p class="commContTbodyDate">' + getDate(uploadDate) + '</p></th>';
        tbodyStr += '<th><p> ' + item.startDate + ' ~ ' + item.endDate + ' </p></th>';
        tbodyStr += '</tr>';
    });
    $('#commContTbody').html('');
    $('#commContTbody').append(tbodyStr);

    makeCommCatIndex(index, count); //밑에 페이지 1|2|3 만드는것

    var activeStr = '';
    activeStr += '<a href="/admin12345abcde/community/writeEvent">글쓰기</a>';
    $('#commActive').html('');
    $('#commActive').append(activeStr);

    $('a[name="commContOpen"]').each(function() {
        $(this).on('click', function(event) {
            event.preventDefault();
            var eventNum = $(this).attr('id');
            eventNum = eventNum.substring(11, eventNum.length);
            window.location.href = "/community/readEvent?eventNum=" + eventNum;
        });
    });
    $('a[name="commContDel"]').each(function() {
        $(this).on('click', function(event) {
            event.preventDefault();
            var eventNum = $(this).attr('id');
            eventNum = eventNum.substring(11, eventNum.length);
            $.get('/admin12345abcde/community/get_delEvent?eventNum=' + eventNum, function(result) {
                if(result.code ===1){
                    window.location.reload(true);
                }
            });
        });
    });

    $('a[name="index_a"]').each(function(){
        $(this).on('click', function(event){
            event.preventDefault();
            var index = $(this).text();
            $.get('/admin12345abcde/community/get_eventCat?index=' + index, function(data) {
                console.log(data, data.nowIndex);
                if (data.code === 1) {
                    makeEventCont(data.data, data.count, data.index);
                }
            });
        });
    });
}

function makeQnACont(data) {
    $('#commContTitle').text('QnA');
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
