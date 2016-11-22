$(function() {
    console.log('social_join');
    $('#fb_logout').on('click', function(event) {
        event.preventDefault();
        FB.logout(function() {
            window.location.href = '/main';
        });
    });

    $('#join_email').on('focus keyup change', function() {
        if (!(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/).test($('#join_email').val())) {
            $('#join_email_text').text('이메일 형식이 옳지않습니다.').removeClass('correct').addClass('incorrect');
        } else {
            $.post('/login/post_duplicateEmail', {
                join_email: $('#join_email').val()
            }, function(result) {
                if (result.code === 1) {
                    $('#join_email_text').text('사용가능합니다').removeClass('incorrect').addClass('correct');
                } else {
                    $('#join_email_text').text('이미 존재합니다').removeClass('correct').addClass('incorrect');
                }
            });
        }
    });

    $('#join_phoneFirst').on('focus change', function() {
        if ((/^[0-9]{3}$/).test($('#join_phoneFirst').val()) && (/^[0-9]{3,4}$/).test($('#join_phoneMiddle').val()) && (/^[0-9]{4}$/).test($('#join_phoneLast').val())) {
            $.ajax({
                type: "POST",
                url: '/login/post_duplicatePhone',
                data: {
                    join_phone: $('#join_phoneFirst').val() + $('#join_phoneMiddle').val() + $('#join_phoneLast').val()
                },
                async: false,
                success: function(result) {
                    if (result.code === 1) {
                        $('#join_phone_text').text('사용가능합니다').removeClass('incorrect').addClass('correct');
                    } else {
                        $('#join_phone_text').text('이미 존재합니다').removeClass('correct').addClass('incorrect');
                    }
                }
            });
        } else {
            $('#join_phone_text').text('휴대폰 번호 형식이 잘못되었습니다').removeClass('correct').addClass('incorrect');
        }
    });
    $('#join_phoneMiddle').on('focus keyup change', function() {
        if ((/^[0-9]{3}$/).test($('#join_phoneFirst').val()) && (/^[0-9]{3,4}$/).test($('#join_phoneMiddle').val()) && (/^[0-9]{4}$/).test($('#join_phoneLast').val())) {
            $.ajax({
                type: "POST",
                url: '/login/post_duplicatePhone',
                data: {
                    join_phone: $('#join_phoneFirst').val() + $('#join_phoneMiddle').val() + $('#join_phoneLast').val()
                },
                async: false,
                success: function(result) {
                    if (result.code === 1) {
                        $('#join_phone_text').text('사용가능합니다').removeClass('incorrect').addClass('correct');
                    } else {
                        $('#join_phone_text').text('이미 존재합니다').removeClass('correct').addClass('incorrect');
                    }
                }
            });
        } else {
            $('#join_phone_text').text('휴대폰 번호 형식이 잘못되었습니다').removeClass('correct').addClass('incorrect');
        }
    });
    $('#join_phoneLast').on('focus keyup change', function() {
        if ((/^[0-9]{3}$/).test($('#join_phoneFirst').val()) && (/^[0-9]{3,4}$/).test($('#join_phoneMiddle').val()) && (/^[0-9]{4}$/).test($('#join_phoneLast').val())) {
            $.ajax({
                type: "POST",
                url: '/login/post_duplicatePhone',
                data: {
                    join_phone: $('#join_phoneFirst').val() + $('#join_phoneMiddle').val() + $('#join_phoneLast').val()
                },
                async: false,
                success: function(result) {
                    if (result.code === 1) {
                        $('#join_phone_text').text('사용가능합니다').removeClass('incorrect').addClass('correct');
                    } else {
                        $('#join_phone_text').text('이미 존재합니다').removeClass('correct').addClass('incorrect');
                    }
                }
            });
        } else {
            $('#join_phone_text').text('휴대폰 번호 형식이 잘못되었습니다').removeClass('correct').addClass('incorrect');
        }
    });
    $('#join_addressFirst').on('focus keyup change', function() {
        if ((/^[가-힣]{1,3}시$/).test($('#join_addressFirst').val()) && (/^[가-힣]{1,3}[구군]$/).test($('#join_addressLast').val())) {
            $('#join_address_text').text('사용가능합니다').removeClass('incorrect').addClass('correct');
        } else {
            $('#join_address_text').text('00시 00구(군) 형식으로 주소입력 해주세요').removeClass('correct').addClass('incorrect');
        }
    });
    $('#join_addressLast').on('focus keyup change', function() {
        if ((/^[가-힣]{1,3}시$/).test($('#join_addressFirst').val()) && (/^[가-힣]{1,3}[구군]$/).test($('#join_addressLast').val())) {
            $('#join_address_text').text('사용가능합니다').removeClass('incorrect').addClass('correct');
        } else {
            $('#join_address_text').text('00시 00구(군) 형식으로 주소입력 해주세요').removeClass('correct').addClass('incorrect');
        }
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
        if ((/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/).test(join_email)) {
            $.post('/login/post_duplicateEmail', {
                join_email: join_email
            }, function(result) {
                if (result.code === 0) {
                    $('#join_email').focus();
                    return;
                }
            });
        } else {
            $('#join_email').focus();
            return;
        }
        if ((/^[0-9]{3}$/).test(join_phoneFirst) && (/^[0-9]{3,4}$/).test(join_phoneMiddle) && (/^[0-9]{4}$/).test(join_phoneLast)) {
            $.ajax({
                type: "POST",
                url: '/login/post_duplicatePhone',
                data: {
                    join_phone: join_phoneFirst + join_phoneMiddle + join_phoneLast
                },
                async: false,
                success: function(result) {
                    if (result.code === 0) {
                        $('#join_phoneMiddle').focus();
                        return;
                    }
                }
            });
        } else {
            $('#join_phoneMiddle').focus();
            return;
        }



        if ((/^[가-힣]{1,3}시$/).test(join_addressFirst) && (/^[가-힣]{1,3}[구군]$/).test(join_addressLast)) {} else {
            $('#join_addressFirst').focus();
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
                if (result.code === 1) {
                    window.location.replace('/main');
                } else {//회원가입 실패
                }
            });
        });
    });
});
