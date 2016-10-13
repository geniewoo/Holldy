$(function(){
	$('#sub_img_food').on('click',function(event){
		event.preventDefault();
		var date1 = getTravelDate1();
		var date2 = getTravelDate2();
		var number = getTravelNum();
		window.location.href = 'food?' + makeParam(date1, date2, number);
	});
	$('#sub_img_pension').on('click',function(event){
		event.preventDefault();
		var date1 = getTravelDate1();
		var date2 = getTravelDate2();
		var number = getTravelNum();
		window.location.href = 'pension?' + makeParam(date1, date2, number);
	});
	$('#sub_img_bus').on('click',function(event){
		event.preventDefault();
		var date1 = getTravelDate1();
		var date2 = getTravelDate2();
		var number = getTravelNum();
		window.location.href = 'bus?' + makeParam(date1, date2, number);
	});
});
