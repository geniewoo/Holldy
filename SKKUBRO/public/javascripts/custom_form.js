$(function(){
	$custom_form = $('#custom_form');
	$custom_form.load("html/custom_form.html", function(){
		setCibulCalendar( 'datePicker1', {
			lang : 'kr',
			range : false,
			filter: function(date, classes) {
				if (date.getDay() == 6 || date.getDay() == 0) classes.push('weekend');
				var today = new Date();
				if (isFirstDayBigger(today, date)) classes.push('unclickable');
					return classes;
			}
		});
	});
});

var isFirstDayBigger = function(day1, day2){
	if(day1.getFullYear() > day2.getFullYear()){
		return true;
	}else if(day1.getMonth() > day2.getMonth()){
		return true;
	}else if(day1.getDay() > day2.getDay()){
		return true;
	}else{
		return false;
	}
}