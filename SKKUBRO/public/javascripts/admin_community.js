$(function() {
    $('div.commCat>a').each(function() {
        $(this).on('click', function(event) {
            event.preventDefault();
            if ($(this).attr('name') === "notice") {
                $.get('/admin12345abcde/community/get_noticeCat', function(data) {
                    console.log(data);
                    if (data.code === 1) {
                        makeNoticeCont(data.data);
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
});

function makeNoticeCont(data) {
    $('#commContTitle').text('공지사항');
    var theadStr = '';
    theadStr += '<tr>';
    theadStr += '<th></th><th>제목</th><th>작성일</th>';
    theadStr += '</tr>';
    $('#commContThead').append(theadStr);

    var tbodyStr = '';
    tbodyStr += '<tr>';
    data.forEach(function(item) {
        tbodyStr += '<th><a href="#" name="commContDel" id="' + data._id + '"></th>';
        tbodyStr += '<th><a href="#" class="commContTbodyTitle" id="' + data._id + '">' + data.subject + '</th>';
        tbodyStr += '<th><p href="#" class="commContTbodyDate">' + data.date + '</th>';
    });
    tbodyStr += '</tr>';
    $('#commContTbody').append(tbodyStr);

    var activeStr = '';
    activeStr += '<a href="/admin12345abcde/community/writeNotice">글쓰기</a>';
    $('#commActive').append(activeStr);
}

function makeEventCont(data) {
    $('#commContTitle').text('이벤트');

}

function makeQnACont(data) {
    $('#commContTitle').text('QnA');

}
