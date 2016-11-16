$(function() {
    console.log('social_join');
    $('#fb_logout').on('click', function(event) {
        event.preventDefault();
        FB.logout(function() {
            window.location.href = '/main';
        });
    });
    $('#join_btn').on('click', function(event) {
        console.log('join_btn');
        event.preventDefault();
        var join_email = $('#join_email').val();
        var join_phoneFirst = $('#join_phoneFirst').val();
        var join_phoneMiddle = $('#join_phoneMiddle').val();
        var join_phoneLast = $('#join_phoneLast').val();
        var join_addressFirst = $('#join_addressFirst').val();
        var join_addressLast = $('#join_addressLast').val();
        console.log(join_phoneFirst, join_phoneMiddle, join_phoneLast, join_addressFirst);
        if ((/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/).test(join_email)) {} else {
            alert('email 형식이 잘못되었습니다');
            return;
        }
        if ((/^[0-9]{3}$/).test(join_phoneFirst) && (/^[0-9]{3,4}$/).test(join_phoneMiddle) && (/^[0-9]{4}$/).test(join_phoneLast)) {} else {
            alert('휴대폰 번호 형식이 잘못되었습니다');
            return;
        }

        if ((/^[가-힣]{1,3}시$/).test(join_addressFirst) && (/^[가-힣]{1,3}[구군]$/).test(join_addressLast)) {} else {
            alert('00시 00구(군) 형식으로 주소입력 해주세요');
            return;
        }
        FB.api('/me', function(response) {
            var join_phoneNum = join_phoneFirst + join_phoneMiddle + join_phoneLast;
            var join_address = join_addressFirst + '-' + join_addressLast;
            $.post('/login/post_social_join', {
                fb_ID: response.id,
                name: response.name,
                phoneNum: join_phoneNum,
                email: join_email,
                address: join_address,
            }, function(result) {
                console.log('result', result);
                if (result.code === 1) {
                    console.log('회원가입 성공');
                    window.location.replace('/main');
                } else {
                    console.log('회원가입 실패');
                }
            });
        });
    });
});
