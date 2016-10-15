$(function(){
	$header_nav_container = $('#header_nav_container');
	$header_nav_container.load("html/header_nav.html", function(){
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
			$('.nav_foodBtn').addClass('clicked');
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
				window.location.href = 'food?' + makeParam(date1, date2, number);
			}else{
				window.location.href = 'food';
			}
		});
		$('.nav_pensionBtn').on('click',function(event){
			event.preventDefault();
			if($('#travelNum_p1').text()){
				var date1 = getTravelDate1();
				var date2 = getTravelDate2();
				var number = getTravelNum();
				window.location.href = 'pension?' + makeParam(date1, date2, number);
			}else{
				window.location.href = 'pension';
			}
		});
		$('.nav_busBtn').on('click',function(event){
			event.preventDefault();
			if($('#travelNum_p1').text()){
				var date1 = getTravelDate1();
				var date2 = getTravelDate2();
				var number = getTravelNum();
				window.location.href = 'bus?' + makeParam(date1, date2, number);
			}else{
				window.location.href = 'bus';
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