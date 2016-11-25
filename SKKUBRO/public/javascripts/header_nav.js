$(function() {
    $header_nav_container = $('#header_nav_container');
    $header_nav_container.load("/html/header_nav.html", function() {
        FB_Connect();
        var isClicked = false;
        var $nav_lu = $('.header_nav_right_lu');
        if (!checkIsOverSize768()) {
            $nav_lu.addClass('mobile');
        }
        switch ($header_nav_container.attr("clicked")) {
            case "pension":
                $('.nav_pensionBtn').addClass('pension_background');
                break;
            case "bus":
                $('.nav_busBtn').addClass('bus_background');
                break;
            case "food":
                $('.nav_foodBtn').addClass('food_background');
                break;
        }

        $(window).on('resize', function() {
            if (!checkIsOverSize768()) {
                $nav_lu.addClass('mobile');
            } else {
                $nav_lu.removeClass('mobile');
            }
        });
        $('.nav_btn').on('click', function(event) {
            event.preventDefault();
            if ($nav_lu.hasClass('mobile')) {
                $nav_lu.slideToggle();
            }
        });
        $('#nav_helpBtn').on('click', function(event) {
            event.preventDefault();
            window.open('/help', "상담", "fullscreen=no,toolbar=no,status=no,menubar=no,scrollbars=no,resizeable=no,width=300,height=500");
        });
        /*
        $('.nav_foodBtn').on('click',function(event){
        	event.preventDefault();
        	if($('#travelNum_p1').text()){
        		var date1 = getTravelDate1();
        		var date2 = getTravelDate2();
        		var number = getTravelNum();
        		window.location.href = '/food?' + makeParam(date1, date2, number);
        	}else{
        		window.location.href = '/food';
        	}
        });
        $('.nav_pensionBtn').on('click',function(event){
        	event.preventDefault();
        	if($('#travelNum_p1').text()){
        		var date1 = getTravelDate1();
        		var date2 = getTravelDate2();
        		var number = getTravelNum();
        		window.location.href = '/pension?' + makeParam(date1, date2, number);
        	}else{
        		window.location.href = '/pension';
        	}
        });
        $('.nav_busBtn').on('click',function(event){
        	event.preventDefault();
        	if($('#travelNum_p1').text()){
        		var date1 = getTravelDate1();
        		var date2 = getTravelDate2();
        		var number = getTravelNum();
        		window.location.href = '/bus?' + makeParam(date1, date2, number);
        	}else{
        		window.location.href = '/bus';
        	}
        });
        */
        modal();
    });
});


function FB_Connect() {
    var isLocalLogin;

    window.fbAsyncInit = function() {
        FB.init({
            appId: '1705601633093320',
            cookie: true, // enable cookies to allow the server to access
            xfbml: true, // parse social plugins on this page
            version: 'v2.8' // use graph api version 2.5
        });

        FB.getLoginStatus(function(response) {
            console.log('callback');
            statusChangeCallback(response);
        });
    };

    $login_btn = $('#header_login');
    $.get('/login/get_loginStatus', function(result) {
        if (result.code === 1) { //fb로그인
            console.log('fb');
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
            alreadyLogin($login_btn);
        } else if (result.code === 2) { //자체로그인
            console.log('자체');
            isLocalLogin = true;
            if (window.location.href.includes('/login/social_join') || window.location.href.includes('/login/local_join')) {
                window.location.href = '/main';
            }
            alreadyLogin($login_btn);
        } else {
            isLocalLogin = false;
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
            notLogin($login_btn);
        }
    });

    function statusChangeCallback(response) {
        console.log('status');
        if (!isLocalLogin) {
            if (response.status === 'connected') {
                console.log('connected');
                findIsThereLocal(false);
            } else if (response.status === 'not_authorized') {
                console.log('not_authorized');
                findIsThereLocal(false);
            } else {

                console.log('notlogin?');
                //notLogin($login_btn);
            }
        }
    }

    function checkLoginState() {
        FB.getLoginStatus(function(response) {
            //statusChangeCallback(response);
        });
    }
    var notLogin = function($login_btn) {
        $login_btn.text('로그인');
        $('#myPage').on('click', function(event){//로그인 먼저 해야하기때문에 로그인버트 트리거를 사용
            event.preventDefault();
            $('a[data-modal-id]').trigger('click');
        });
    }

}

var checkIsOverSize1200 = function() {
    if (window.innerWidth < 1200) {
        return false;
    } else {
        return true;
    }
}

var checkIsOverSize768 = function() {
    if (window.innerWidth < 768) {
        return false;
    } else {
        return true;
    }
}

function alreadyLogin() {
    $login_btn.text('로그아웃');
    $login_btn.on('click', function(event) {
        event.preventDefault();
        $.get('/login/get_localLogout', function(result) {
            if (result.code === 1) { //fblogin 인 경우 code === 1
                FB.logout(function() {
                    location.reload(true);
                });
            } else if (result.code === 2) { //자체로그인인 경우 code === 2
                location.reload(true);
            }
        });
    });
    $('#myPage').on('click', function(){
        window.location.href = '/myPage';
    });
}
function findIsThereLocal(isLoginBtn) {
    console.log('find');
    FB.api('/me', function(response) {
        $.post('/login/post_checkLocal', {
            fb_ID: response.id,
            name: response.name
        }, function(result) {
            console.log('result.code', result.code);
            if (result.code === 1) {
                //회원가입 안해두 됨.
                if (window.location.href.includes('/login/social_join') || window.location.href.includes('/login/local_join')) {
                    window.location.href = '/main';
                } else {
                    alreadyLogin();
                    if (isLoginBtn) {
                        location.reload(true);
                    }
                }
            } else if (result.code === 2) { //로그인 해야함
                isLocalLogin = true;
                console.log('????');
                if (!window.location.href.includes('/login/social_join')) {
                    window.location.replace('/login/social_join');
                }
            }
        });
    });
}

function modal() {
    console.log('modal');
    var appendthis = ("<div class='modal-overlay js-modal-close'></div>");

    $('a[data-modal-id]').click(function(e) {
        if ($(this).text() === "로그아웃") {
            return;
        }
        console.log('modal click');
        e.preventDefault();
        $("body").append(appendthis);

        $(".js-modal-close, .modal-overlay").click(function() {
            $(".modal-box, .modal-overlay").fadeOut(500, function() {
                $(".modal-overlay").remove();
            });
        });
        $(".modal-overlay").fadeTo(500, 0.7);
        //$(".js-modalbox").fadeIn(500);
        var modalBox = $(this).attr('data-modal-id');
        $('#' + modalBox).fadeIn($(this).data());
    });

    $(window).resize(function() {
        $(".modal-box").css({
            top: ($(window).height() - $(".modal-box").outerHeight()) / 2,
            left: ($(window).width() - $(".modal-box").outerWidth()) / 2
        });
    });

    $(window).resize();

    $('#localLogin_password').on('keydown', function(event){
        if(event.keyCode == 13){
            $('#localLogin_btn').trigger('click');
        }
    });
    $('#localLogin_btn').on('click', function(event) {
        event.preventDefault();
        var id = $('#localLogin_id').val();
        var password = $('#localLogin_password').val();
        $.post('/login/post_localLogin', {
            id: id,
            password: password
        }, function(result) {
            if (result.code === 1) {
                location.reload(true);
            } else {
                alert('아이디 또는 비밀번호가 맞지 않습니다');
            }
        });
    });
    $('#fbLogin_btn').on('click', function(event) {
        event.preventDefault();
        FB.login(function(response) {
            console.log(response.status);
            if (response.status === 'connected') {
                findIsThereLocal(true);
            } else if (response.status === 'not_authorized') {
                findIsThereLocal(true);
                // 페이스북에는 로그인 되어있으나, 앱에는 로그인 되어있지 않다.
            } else {
                // 페이스북에 로그인이 되어있지 않아서, 앱에 로그인 되어있는지 불명확하다.
            }
        }, {
            scope: 'email, public_profile',
            return_scopes: true
        });
    });

}
/*
var makeParam = function(date1, date2, number){
	return 'travelDate1=' + date1 + '&travelDate2=' + date2 + '&travelNum='	+ number;
}
*/
