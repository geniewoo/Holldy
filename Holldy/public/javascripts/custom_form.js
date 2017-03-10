$(function(){
	$.get('/travelCookies', function(data){
		$custom_form = $('#main_custom_form');
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
			if(data.code === 1){
				$('#datePicker1').val(data.travelForm.travelDate1);
				$('#datePicker2').val(data.travelForm.travelDate2);
				$('#travelNum').val(data.travelForm.travelNum);
				/*$('#travelNum_p1').text(data.travelForm.travelNum.substring(0,1));
				$('#travelNum_p2').text(data.travelForm.travelNum.substring(1,2));
				$('#travelNum_p3').text(data.travelForm.travelNum.substring(2,3));*/
			}else{
				var today = new Date();
				$('#datePicker1').val(date2String(new Date()));
				setDatePicker2($('#datePicker1'),$('#datePicker2'));
				setTravelCookie();

			}

			$('#datePicker1').on('change',function(){
				setTravelCookie();
				setDatePicker2($('#datePicker1'), $('#datePicker2'));
			});

			$('#travelNum').on('change', function(){
				if($(this).val() <= 0){
					$(this).val(1);
				}
				setTravelCookie();
			});
			/*
			$('#travelNum_btn1').on('click', function(){
				changeTravelNum($('#travelNum_btn1'));
			});
			$('#travelNum_btn2').on('click', function(){
				changeTravelNum($('#travelNum_btn2'));
			});
			$('#travelNum_btn3').on('click', function(){
				changeTravelNum($('#travelNum_btn3'));
			});
			$('#travelNum_btn4').on('click', function(){
				changeTravelNum($('#travelNum_btn4'));
			});
			$('#travelNum_btn5').on('click', function(){
				changeTravelNum($('#travelNum_btn5'));
			});
			$('#travelNum_btn6').on('click', function(){
				changeTravelNum($('#travelNum_btn6'));
			});
			*/
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
var setTravelCookie = function(){
	var travelDate1 = getTravelDate1();
	var travelDate2 = getTravelDate2();
	var travelNum = getTravelNum();
	var travelInfo = {'travelDate1' : travelDate1, 'travelDate2' : travelDate2, 'travelNum' : travelNum};
	$.post('/form/post_travelInfo', {travelForm : JSON.stringify(travelInfo)}, function(result){
		console.log(result);
	});
}

/*var changeTravelNum = function($travelNum_btn){
	switch($travelNum_btn.attr("btnNum")){
		case "1" :
		$('#travelNum_p1').text(addNum(Number( $('#travelNum_p1').text() ) +1 ));
		break;
		case "2" :
		$('#travelNum_p1').text(subNum(Number( $('#travelNum_p1').text() ) -1 ));
		break;
		case "3" :
		$('#travelNum_p2').text(addNum(Number( $('#travelNum_p2').text() ) +1 ));
		break;
		case "4" :
		$('#travelNum_p2').text(subNum(Number( $('#travelNum_p2').text() ) -1 ));
		break;
		case "5" :
		$('#travelNum_p3').text(addNum(Number( $('#travelNum_p3').text() ) +1 ));
		break;
		case "6" :
		$('#travelNum_p3').text(subNum(Number( $('#travelNum_p3').text() ) -1 ));
		break;
	}
	setTravelCookie();
}*/
/*
var addNum = function(num){
	if(num >= 10){
		return 0;
	}else{
		return num;
	}
}

var subNum = function(num){
	if(num <= -1){
		return 9;
	}else{
		return num;
	}
}
*/
var setDatePicker2 = function($datePicker1, $datePicker2){
	var nyears = $datePicker1.val().substring(0,4);
	var nmonth = $datePicker1.val().substring(5,7);
	var ndate = $datePicker1.val().substring(8,10);
	var nextDay = new Date(nyears, Number(nmonth) - 1, Number(ndate) + 1);
	$($datePicker2).val(date2String(nextDay));
}

var date2String = function(date){
	var dateStr = date.getFullYear();
	if(date.getMonth() + 1 < 10){
		dateStr += '-0' + (date.getMonth() + 1);
	}else{
		dateStr += '-' + (date.getMonth() + 1);
	}
	if(date.getDate() < 10){
		dateStr += '-0' + date.getDate();
	}else{
		dateStr += '-' + date.getDate();
	}
	return dateStr;
}

/*var getTravelNum = function(){
	return $('#travelNum_p1').text() + $('#travelNum_p2').text() + $('#travelNum_p3').text();
}*/
var getTravelNum = function(){
	return $('#travelNum').val();
}

var getTravelDate1 = function(){
	return $('#datePicker1').val();
}

var getTravelDate2 = function(){
	return $('#datePicker2').val();
}
