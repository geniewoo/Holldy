$(function() {
    $('#join_btn').on('click', function(event) {
        console.log('join_btn');
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
        
        if(!(/^[0-9a-zA-Z]{8,15}$/).test(join_id)){
            alert('아이디는 영대소문자, 숫자를 포함해 8~15자 이어야 합니다.');
            return;
        } else if((/^[0-9]{8,15}$/).test(join_id)){
            alert('아이디는 영문자를 포함해야 합니다.');
            return;
        }

        if(!(/^[0-9a-zA-Z!@#$%^&*()_-]{8,15}$/).test(join_password)){
            alert('비밀번호는 영대소문자, 숫자를 포함해야하고 특수기호"!@#$%^&*()_-"를 사용 할 수 있으며 8~15자 이어야 합니다.');
            return;
        }else if((/^[a-zA-Z]{8,15}$/).test(join_password) || !(/[0-9]/).test(join_password)){
            alert('비밀번호는 숫자와 영문자를 반드시 포함해야 합니다.');
            return;
        }

        if(join_passwordConfirm == join_password){
        }else{
            alert('비밀번호와 비밀번호 확인이 일치하지 않습니다');
            return;
        }

        if((/^[가-힣]{2,4}$/).test(join_name)){

        }else{
            alert('이름은 한글 2~4로 작성해 주세요');
            return;
        }

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
        var join_phoneNum = join_phoneFirst + join_phoneMiddle + join_phoneLast;
        var join_address = join_addressFirst + '-' + join_addressLast;
        $.post('/login/post_local_join', {
            local_ID: join_id,
            local_password: join_password,
            name: join_name,
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
