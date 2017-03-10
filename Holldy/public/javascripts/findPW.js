$(function() {
    $('#findPW_email').on('focus keyup change', function() {
        if ((/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/).test($('#findPW_email').val())) {
            $('#findPW_emailText').text('검색 가능합니다').removeClass('incorrect').addClass('correct');
        } else {
            $('#findPW_emailText').text('이메일 형식이 옳지않습니다').removeClass('correct').addClass('incorrect');
        }
    });
    $('#findPW_name').on('focus keyup change', function() {
        if (!(/^[가-힣]{2,4}$/).test($('#findPW_name').val())) {
            $('#findPW_nameText').text('이름은 한글 2~4로 작성해 주세요').removeClass('correct').addClass('incorrect');
        } else {
            $('#findPW_nameText').text('검색 가능합니다').removeClass('incorrect').addClass('correct');
        }
    });
    $('#findPW_btn').on('click', function(event) {
        event.preventDefault();
        console.log('click');
        if ((/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/).test($('#findPW_email').val())) {
            console.log('123');
        } else {
            $('#findPW_email').focus();
            console.log('124');
            return;
        }
        if (!(/^[가-힣]{2,4}$/).test($('#findPW_name').val())) {
            $('#join_nameText').focus();
            console.log('125');
            return;
        } else {
            console.log('126');
            $.get('/login/findPW/sendEmail?id=' + $('#findPW_ID').val() + '&email=' + $('#findPW_email').val() + '&name=' + $('#findPW_name').val(), function(result) {
                if (result.code === 1) {
                    window.location.href = "/login/findedPW?isFinded=true";
                } else if (result.code === 0) {
                    window.location.href = "/login/findedPW?isFinded=false";
                }
            });
        }
    });
});
