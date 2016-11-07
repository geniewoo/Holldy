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
        FB.api('/me', function(response) {
            console.log('fb.api');
            $.post('/login/post_social_join', {
                fb_ID: response.id,
                name: response.name,
                type: 1
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
