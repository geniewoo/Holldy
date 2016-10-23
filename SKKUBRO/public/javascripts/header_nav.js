$(function(){
	$header_nav_container = $('#header_nav_container');
	$header_nav_container.load("/html/header_nav.html", function(){
		FB_Connect();
		var isClicked = false;
		var $nav_lu = $('.header_nav_right_lu');
		if(!checkIsOverSize768()){
			$nav_lu.addClass('mobile');
		}

		switch($header_nav_container.attr("clicked")){
			case "pension":
			$('.nav_pensionBtn').addClass('clicked');
			break;
			case "bus":
			$('.nav_busBtn').addClass('clicked');
			break;
			case "food":
			$('.nav_foodBtn').addClass('food_clicked');
			break;
		}

		$(window).on('resize',function(){
			if(!checkIsOverSize768()){
				$nav_lu.addClass('mobile');
			}else{
				$nav_lu.removeClass('mobile');
			}
		});
		$('.nav_btn').on('click', function(event){
			event.preventDefault();
			if($nav_lu.hasClass('mobile')){
				$nav_lu.slideToggle();
			}
		});
		
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
	});
});
function FB_Connect(){
	$login_btn = $('#header_login');
	function statusChangeCallback(response) {
    	// The response object is returned with a status field that lets the
    	// app know the current login status of the person.
    	// Full docs on the response object can be found in the documentation
    	// for FB.getLoginStatus().
    	if (response.status === 'connected') {
    		// Logged into your app and Facebook.
    		$login_btn.text('logout');
    		$login_btn.on('click',function(){
    			FB.logout(function(){
    				location.reload(true);
    			});
    		});
    		testAPI();
    	} else if (response.status === 'not_authorized') {
    		// The person is logged into Facebook, but not your app.
    		//document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
    		$login_btn.text('login');
    		$login_btn.on('click',function(){
    			FB.login(function(response){
    				if (response.status === 'connected') {
    					location.reload(true);
					    // 페이스북과 앱에 같이 로그인되어 있다.
					} else if (response.status === 'not_authorized') {
						// 페이스북에는 로그인 되어있으나, 앱에는 로그인 되어있지 않다.
					} else {
						// 페이스북에 로그인이 되어있지 않아서, 앱에 로그인 되어있는지 불명확하다.
					}
				},{scope: 'public_profile,email'});
    		});
    		testAPI();
    	} else {
			// The person is not logged into Facebook, so we're not sure if
			// they are logged into this app or not.
			//document.getElementById('status').innerHTML = 'Please log ' + 'into Facebook.';
			$login_btn.text('login');
			$login_btn.on('click',function(){
				FB.login(function(response){
					location.reload(true);
					if (response.status === 'connected') {
					    // 페이스북과 앱에 같이 로그인되어 있다.
					} else if (response.status === 'not_authorized') {
						// 페이스북에는 로그인 되어있으나, 앱에는 로그인 되어있지 않다.
					} else {
						// 페이스북에 로그인이 되어있지 않아서, 앱에 로그인 되어있는지 불명확하다.
					}
				}, {scope: 'email, public_profile',
				return_scopes: true});
			});
		}
	}

	function checkLoginState() {
		FB.getLoginStatus(function(response) {
			statusChangeCallback(response);
		});
	}

	window.fbAsyncInit = function() {
		FB.init({
			appId      : '1705601633093320',
			cookie     : true,  // enable cookies to allow the server to access 
			xfbml      : true,  // parse social plugins on this page
			version    : 'v2.8' // use graph api version 2.5
		});

		FB.getLoginStatus(function(response) {
			statusChangeCallback(response);
		});
	};
	
	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "//connect.facebook.net/en_US/sdk.js";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	function testAPI() {
		FB.api('/me', function(response) {
			//document.getElementById('status').innerHTML =
			'Thanks for logging in, ' + response.name + '!';
		});
	}
}

var checkIsOverSize1200 = function(){
	if(window.innerWidth < 1200){
		return false;
	}else{
		return true;
	}
}

var checkIsOverSize768 = function(){
	if(window.innerWidth < 768){
		return false;
	}else{
		return true;
	}
}

var getTravelNum = function(){
	return $('#travelNum_p1').text() + $('#travelNum_p2').text() + $('#travelNum_p3').text();
}

var getTravelDate1 = function(){
	return $('#datePicker1').val();
}

var getTravelDate2 = function(){
	return $('#datePicker2').val();
}

var makeParam = function(date1, date2, number){
	return 'travelDate1=' + date1 + '&travelDate2=' + date2 + '&travelNum='	+ number;
}