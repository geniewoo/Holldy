$(function(){
	$custom_form = $('#main_custom_form');
	$custom_form.load("html/custom_form.html", function(){
		setCibulCalendar( 'datePicker1', {
			lang : 'kr',
			filter: function(date, classes) {
				if (date.getDay() == 6 || date.getDay() == 0) classes.push('weekend');
				var today = new Date();
				if (isFirstDayBigger(today, date)) classes.push('unclickable');
				return classes;
			}
		});
		$('#datePicker1').on('change',function(){
			var nyears = $('#datePicker1').val().substring(0,4);
			var nmonth = $('#datePicker1').val().substring(5,7);
			var ndate = $('#datePicker1').val().substring(8,10);
			var nextDay = new Date(nyears, Number(nmonth) - 1, Number(ndate) + 1);
			var nextStr = nextDay.getFullYear();
			if(nextDay.getMonth() + 1 < 10){
				nextStr += '-0' + (nextDay.getMonth() + 1);
			}else{
				nextStr += '-' + (nextDay.getMonth() + 1);
			}
			if(nextDay.getDate() < 10){
				nextStr += '-0' + nextDay.getDate();
			}else{
				nextStr += '-' + nextDay.getDate();
			}
			$('#datePicker2').val(nextStr);
		});
	});
});

var isFirstDayBigger = function(day1, day2){
	if(day1.getFullYear() > day2.getFullYear()){
		return true;
	}else if(day1.getFullYear() === day2.getFullYear()){
		if(day1.getMonth() > day2.getMonth()){
			return true;
		}else if(day1.getMonth() === day2.getMonth()){
			if(day1.getDate() > day2.getDate()){
				return true;
			}
		}
	}
	return false;
}