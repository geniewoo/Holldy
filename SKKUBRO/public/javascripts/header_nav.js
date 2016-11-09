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
            statusChangeCallback(response);
        });
    };

    $login_btn = $('#header_login');
    $.get('/login/get_loginStatus', function(result) {
        if (result.code === 1) {
            isLocalLogin = true;
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
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
        }
    });

    function statusChangeCallback(response) {
        if (!isLocalLogin) {
            if (response.status === 'connected') {
                findIsThereLocal();
            } else if (response.status === 'not_authorized') {
                findIsThereLocal();
            } else {
                notLogin($login_btn);
            }
        }
    }

    function checkLoginState() {
        FB.getLoginStatus(function(response) {
            //statusChangeCallback(response);
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

var notLogin = function($login_btn) {
    $login_btn.text('login');
    $login_btn.click(function(event) {
        event.preventDefault();
        $.get(this.href, function(html) {
            $(html).appendTo('body').modal();
            $('#fbLogin_btn').on('click', function(event) {
                event.preventDefault();

                FB.login(function(response) {
                    if (response.status === 'connected') {
                        findIsThereLocal();
                    } else if (response.status === 'not_authorized') {
                        findIsThereLocal();
                        // 페이스북에는 로그인 되어있으나, 앱에는 로그인 되어있지 않다.
                    } else {
                        // 페이스북에 로그인이 되어있지 않아서, 앱에 로그인 되어있는지 불명확하다.
                    }
                }, {
                    scope: 'email, public_profile',
                    return_scopes: true
                });
            });
        });
    });
}
var alreadyLogin = function($login_btn) {
    $login_btn.text('logout');
    $login_btn.on('click', function(event) {
        event.preventDefault();
        $.get('/login/get_localLogout', function(result) {
            if (result.code === 1) { //fblogin 인 경우 code === 1
                FB.logout(function() {
                    location.reload(true);
                });
            } else if (result.code === 2) {
                location.reload(true);
            }
        });
    });
}
var findIsThereLocal = function() {
    FB.api('/me', function(response) {
        $.post('/login/post_checkLocal', {
            fb_ID: response.id,
            name: response.name
        }, function(result) {
            if (result.code === 1) {
                location.reload(true);
                //회원가입 안해두 됨.
            } else if (result.code === 2) {
                if (!window.location.href.includes('/login/social_join')) {
                    window.location.replace('/login/social_join');
                }
            }
        });
    });
}

/*
var makeParam = function(date1, date2, number){
	return 'travelDate1=' + date1 + '&travelDate2=' + date2 + '&travelNum='	+ number;
}
*/
