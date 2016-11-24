$(function() {
	$('#findID_input').on('focus keyup change', function() {
		if ((/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/).test($('#findID_input').val())) {
			$('#findID_text').text('이메일 형식입니다.').removeClass('incorrect').addClass('correct');
		}else if((/^[0-9]{11}$/).test($('#findID_input').val())){
			$('#findID_text').text('휴대폰번호 형식입니다.').removeClass('incorrect').addClass('correct');
		} else {
			$('#findID_text').text('이메일이나 휴대폰번호 형식이 옳지않습니다.').removeClass('correct').addClass('incorrect');
		}
	});
	$('#findID_btn').on('click', function(){
		if ((/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/).test($('#findID_input').val()) || (/^[0-9]{11}$/).test($('#findID_input').val())) {
			$.get('/login/isThereID?findVar='+findVar, function(result){
				if(result===1){
					window.href = '/login/findedID?findID=' + result.findID;
				}if else(result === 2){
					alert('입력하신 정보는 페이스북으로 가입되어있습니다. 페이스북 로그인을 이용해 주세요');
				}else{
					alert('입력한 이메일이나 휴대폰 번호에 해당되는 아이디가 없습니다.');
				}
			});   
		}else {
			$('#findID_text').focus();
		}
	});
});