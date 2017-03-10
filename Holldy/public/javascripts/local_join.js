$(function() {
    $('#join_id').on('focus keyup change', function() {
        if (!(/^[0-9a-zA-Z]{8,15}$/).test($('#join_id').val())) {
            $('#join_id_text').text('영대소문자, 숫자로 8~15자 이어야 합니다').removeClass('correct').addClass('incorrect');
        } else if ((/^[0-9]{8,15}$/).test($('#join_id').val())) {
            $('#join_id_text').text('영문자를 포함해야 합니다').removeClass('correct').addClass('incorrect');
        } else {
            $.post('/login/post_duplicateID', {
                join_id: $('#join_id').val()
            }, function(result) {
                if (result.code === 1) {
                    $('#join_id_text').text('사용가능합니다').removeClass('incorrect').addClass('correct');
                } else {
                    $('#join_id_text').text('이미 존재합니다').removeClass('correct').addClass('incorrect');
                }
            });
        }
    });
    $('#join_password').on('focus keyup change', function() {
        if (!(/^[0-9a-zA-Z!@#$%^&*()_-]{8,15}$/).test($('#join_password').val())) {
            $('#join_password_text').text('영대소문자, 숫자를 포함해야하고 특수기호"!@#$%^&*()_-"를 사용 할 수 있으며 8~15자 이어야 합니다.').removeClass('correct').addClass('incorrect');
        } else if ((/^[a-zA-Z]{8,15}$/).test(join_password) || !(/[0-9]/).test($('#join_password').val())) {
            $('#join_password_text').text('숫자와 영문자를 반드시 포함해야 합니다').removeClass('correct').addClass('incorrect');
        } else {
            $('#join_password_text').text('사용가능합니다').removeClass('incorrect').addClass('correct');
        }
    });
    $('#join_passwordConfirm').on('focus keyup change', function() {
        if ($('#join_password').val() != $('#join_passwordConfirm').val()) {
            $('#join_passwordConfirm_text').text('위 비밀번호와 다릅니다').removeClass('correct').addClass('incorrect');
        } else {
            $('#join_passwordConfirm_text').text('사용가능합니다').removeClass('incorrect').addClass('correct');
        }
    });
    $('#join_name').on('focus keyup change', function() {
        if (!(/^[가-힣]{2,4}$/).test($('#join_name').val())) {
            $('#join_name_text').text('이름은 한글 2~4로 작성해 주세요').removeClass('correct').addClass('incorrect');
        } else {
            $('#join_name_text').text('사용가능합니다').removeClass('incorrect').addClass('correct');
        }
    });
    $('#join_email').on('focus keyup change', function() {
        if (!(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/).test($('#join_email').val())) {
            $('#join_email_text').text('이메일 형식이 옳지않습니다').removeClass('correct').addClass('incorrect');
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
        if ((/^[0-9]{3}$/).test($('#join_phoneFirst').val()) && (/^[0-9]{4}$/).test($('#join_phoneMiddle').val()) && (/^[0-9]{4}$/).test($('#join_phoneLast').val())) {
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
        if ((/^[0-9]{3}$/).test($('#join_phoneFirst').val()) && (/^[0-9]{4}$/).test($('#join_phoneMiddle').val()) && (/^[0-9]{4}$/).test($('#join_phoneLast').val())) {
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
        if ((/^[0-9]{3}$/).test($('#join_phoneFirst').val()) && (/^[0-9]{4}$/).test($('#join_phoneMiddle').val()) && (/^[0-9]{4}$/).test($('#join_phoneLast').val())) {
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
        event.preventDefault();

        var join_id = $('#join_id').val();
        var join_password = $('#join_password').val();
        var join_passwordConfirm = $('#join_passwordConfirm').val();
        var join_name = $('#join_name').val();
        var join_email = $('#join_email').val();
        var join_phoneFirst = $('#join_phoneFirst').val();
        var join_phoneMiddle = $('#join_phoneMiddle').val();
        var join_phoneLast = $('#join_phoneLast').val();
        var join_addressFirst = $('#join_addressFirst').val();
        var join_addressLast = $('#join_addressLast').val();

        if (!(/^[0-9a-zA-Z]{8,15}$/).test(join_id)) {
            $('#join_id').focus();
            return;
        } else if ((/^[0-9]{8,15}$/).test(join_id)) {
            $('#join_id').focus();
            return;
        } else {
            $.post('/login/post_duplicateID', {
                join_id: join_id
            }, function(result) {
                if (result.code === 0) {
                    $('#join_id').focus();
                    return;
                }
            });
        }
        if (!(/^[0-9a-zA-Z!@#$%^&*()_-]{8,15}$/).test(join_password)) {
            $('#join_password').focus();
            return;
        } else if ((/^[a-zA-Z]{8,15}$/).test(join_password) || !(/[0-9]/).test(join_password)) {
            $('#join_password').focus();
            return;
        }
        if (join_passwordConfirm == join_password) {} else {
            $('#join_passwordConfirm').focus();
            return;
        }

        if ((/^[가-힣]{2,4}$/).test(join_name)) {} else {
            $('#join_name').focus();
            return;
        }

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
        if ((/^[0-9]{3}$/).test(join_phoneFirst) && (/^[0-9]{4}$/).test(join_phoneMiddle) && (/^[0-9]{4}$/).test(join_phoneLast)) {
            $.ajax({
                type: "POST",
                url: '/login/post_duplicatePhone',
                data: {
                    join_phone: join_phoneFirst + join_phoneMiddle + join_phoneLast
                },
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
        var join_phoneNum = join_phoneFirst + join_phoneMiddle + join_phoneLast;
        var join_address = join_addressFirst + '-' + join_addressLast;
        validateform(function(result, captcha_response) {
            if (result) {
                $.get('/login/get_notAbot', {
                    'response': captcha_response
                }, function(result) {
                    if (result) {
                        $.ajax({
                            type: "POST",
                            url: '/login/post_local_join',
                            data: {
                                local_ID: join_id,
                                local_password: join_password,
                                name: join_name,
                                phoneNum: join_phoneNum,
                                email: join_email,
                                address: join_address,
                            },
                            success: function(result) {
                                if (result.code === 1) { //회원가입 성공
                                    window.location.replace('/main');
                                } else { //회원가입 실패
                                }
                            }
                        });
                    } else {
                        alert('봇이 아님을 증명해주세요~~');
                    }
                });
            } else {
                alert('봇이 아님을 증명해주세요!');
            }
        });
    });

    function validateform(next) {
        var captcha_response = grecaptcha.getResponse();
        if (captcha_response.length == 0 || grecaptcha == undefined) {
            // Captcha is not Passed
            next(false);
        } else {
            next(true, captcha_response);
        }
    }
});
