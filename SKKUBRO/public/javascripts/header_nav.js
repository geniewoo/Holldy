$(function(){

	$header_nav_container = $('#header_nav_container');
	$header_nav_container.load("html/header_nav.html", function(){
		var isClicked = false;
		var $nav_lu = $('.header_nav_right_lu');
		if(!checkIsOverSize768()){
			console.log("어째서");
			$nav_lu.addClass('mobile');
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
	});
});

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