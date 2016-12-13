$(function() {
    $('div.commCat>a').each(function() {
        $(this).on('click', function(event) {
            event.preventDefault();
            if ($(this).attr('name') === "notice") {
                $.get('/admin12345abcde/community/get_noticeCat?index=1', function(data) {
                    console.log(data, data.nowIndex);
                    if (data.code === 1) {
                        makeNoticeCont(data.data, data.count, data.index);
                    }
                });
            } else if ($(this).attr('name') === "event") {
                $.get('/admin12345abcde/community/get_eventCat', function(data) {
                    if (data.code === 1) {
                        makeEventCont(data.data);
                    }
                });
            } else if ($(this).attr('name') === "QnA") {
                $.get('/admin12345abcde/community/get_QnACat', function(data) {
                    if (data.code === 1) {
                        makeQnACont(data.data);
                    }
                });
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
        tbodyStr += '<th><a href="#" name="commContDel" id="' + item._id + '">삭제</th>';
        tbodyStr += '<th><a href="#" name="commContOpen" class="commContTbodyTitle" id="' + item._id + '">' + item.title + '</th>';
        tbodyStr += '<th><p href="#" class="commContTbodyDate">' + getDate(uploadDate) + '</th>';
        tbodyStr += '</tr>';
    });
    $('#commContTbody').html('');
    $('#commContTbody').append(tbodyStr);

    makeCommCatIndex(index, count);//밑에 페이지 1|2|3 만드는것

    var activeStr = '';
    activeStr += '<a href="/admin12345abcde/community/writeNotice">글쓰기</a>';
    $('#commActive').html('');
    $('#commActive').append(activeStr);

    $('a[name="commContOpen"]').each(function(){
        $(this).on('click', function(event){
            event.preventDefault();
            noticeNum = $(this).attr('id');
            noticeNum = noticeNum.substring(11, noticeNum.length);
            window.location.href="/community/readNotice?noticeNum=" + noticeNum;
        });
    });
}
function makeCommCatIndex(index, count){
    var page10 = (index-1) % 10;
    var indexStr = '';
    if(index == page10 + 1){
        indexStr += '<a class = "commNowIndex">' + (page10 + 1) + '</a>';
    }else{
        indexStr += '<a>' + (page10 + 1) + '</a>';
    }
    for(var i = 1 ; i < 10 ; i ++){
        if(count > page10 * 100 + 10 * i){
            if(page10 + i +1 == index){
                indexStr += '|' + '<a class = "commNowIndex">' + (page10 + i + 1) + '</a>';
            }else{
                indexStr += '|' + '<a>' + (page10 + i + 1) + '</a>';
            }
        }
    }
    $('#commCatIndex').html('');
    $('#commCatIndex').append(indexStr);
}

function makeEventCont(data) {
    $('#commContTitle').text('이벤트');

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