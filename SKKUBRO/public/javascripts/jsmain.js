$(function(){
	var isOverSize;
	isOverSize = checkIsOverSize1200();

	$main_img = $('.main_img');
	resize_main_img($main_img, isOverSize);
	$(window).on('resize', function(){
		resize_main_img($main_img, isOverSize);
	});
});

var resize_main_img = function($main_img, isOverSize){
	if(!checkIsOverSize1200()){
		var main_img_margin = -((1200 - $(window).width()) / 2);
		$main_img.css("margin-left", main_img_margin);
		isOverSize = false;
	}else if(!isOverSize){
		$main_img.css("margin-left", "auto");
		isOverSize = true;
	}
}