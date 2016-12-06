$(function(){
	var type;
	$.get('/myPage/changeClientInfo/get_ClientInfo', function(result){
		console.log(result);
		if(result.code === 1){//페북
			type = 1;
			hideForms();
		}else if(result.code ===2){//로컬
			type = 2;
		}
		showForms(result.data);
		connectTextForm(result.data, type);
	});
});
function hideForms(){
	$('#join_password').css('display','none');
	$('#join_password_text').css('display','none');
	$('#join_passwordConfirm').css('display','none');
	$('#join_passwordConfirm_text').css('display','none');
}

function showForms(data){
	$('#join_email').val(data.email);
	$('#join_phoneMiddle').val(data.phoneNum.substring(3,7));
	$('#join_phoneLast').val(data.phoneNum.substring(7,11));
	$('#join_addressFirst').val(data.address.split('-')[0]);
	$('#join_addressLast').val(data.address.split('-')[1]);
}
function connectTextForm(oriData, type){
	if(type === 2){
		$('#join_password').on('focus keyup change', function() {
			if($('#join_password').val()===''){
				$('#join_password_text').text('아무것도 입력하지 않으면 변경되지 않습니다.').removeClass('incorrect').addClass('correct');
			} else if (!(/^[0-9a-zA-Z!@#$%^&*()_-]{8,15}$/).test($('#join_password').val())) {
				$('#join_password_text').text('영대소문자, 숫자를 포함해야하고 특수기호"!@#$%^&*()_-"를 사용 할 수 있으며 8~15자 이어야 합니다.').removeClass('correct').addClass('incorrect');
			} else if ((/^[a-zA-Z]{8,15}$/).test(join_password) || !(/[0-9]/).test($('#join_password').val())) {
				$('#join_password_text').text('숫자와 영문자를 반드시 포함해야 합니다').removeClass('correct').addClass('incorrect');
			} else {
				$('#join_password_text').text('사용가능합니다').removeClass('incorrect').addClass('correct');
			}
		});
		$('#join_password').trigger('change');
		$('#join_passwordConfirm').on('focus keyup change', function() {
			if ($('#join_password').val() != $('#join_passwordConfirm').val()) {
				$('#join_passwordConfirm_text').text('위 비밀번호와 다릅니다').removeClass('correct').addClass('incorrect');
			} else {
				$('#join_passwordConfirm_text').text('사용가능합니다').removeClass('incorrect').addClass('correct');
			}
		});
	}
	$('#join_email').on('focus keyup change', function() {
		if (!(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/).test($('#join_email').val())) {
			$('#join_email_text').text('이메일 형식이 옳지않습니다').removeClass('correct').addClass('incorrect');
		} else {
			if($('#join_email').val() === oriData.email){
				$('#join_email_text').text('이메일이 변경되지 않습니다').removeClass('incorrect').addClass('correct');
			}else{
				$.post('/login/post_duplicateEmail', {
					join_email: $('#join_email').val()
				}, function(result) {
					if (result.code === 1) {
						$('#join_email_text').text('사용가능합니다').removeClass('incorrect').addClass('correct');
					} else {
						$('#join_email_text').text('이미 존재합니다').removeClass('correct').addClass('incorrect');
					}
				});
			}
		}
	});
	$('#join_email').trigger('change');

	$('#join_phoneFirst').on('focus change', function() {
		if($('#join_phoneFirst').val() + $('#join_phoneMiddle').val() + $('#join_phoneLast').val() === oriData.phoneNum){
			$('#join_phone_text').text('휴대폰 번호가 변경되지 않습니다').removeClass('incorrect').addClass('correct');
		} else if ((/^[0-9]{3}$/).test($('#join_phoneFirst').val()) && (/^[0-9]{4}$/).test($('#join_phoneMiddle').val()) && (/^[0-9]{4}$/).test($('#join_phoneLast').val())) {
			$.ajax({
				type: "POST",
				url: '/login/post_duplicatePhone',
				data: {
					join_phone: $('#join_phoneFirst').val() + $('#join_phoneMiddle').val() + $('#join_phoneLast').val()
				},
				async: false,
				success: function(result) {
					if (result.code === 1) {
						$('#join_phone_text').text('사용가능합니다').removeClass('incorrect').addClass('correct');
					} else {
						$('#join_phone_text').text('이미 존재합니다').removeClass('correct').addClass('incorrect');
					}
				}
			});
		} else {
			$('#join_phone_text').text('휴대폰 번호 형식이 잘못되었습니다').removeClass('correct').addClass('incorrect');
		}
	});
	$('#join_phoneFirst').trigger('change');
	$('#join_phoneMiddle').on('focus keyup change', function() {
		if($('#join_phoneFirst').val() + $('#join_phoneMiddle').val() + $('#join_phoneLast').val() === oriData.phoneNum){
			$('#join_phone_text').text('휴대폰 번호가 변경되지 않습니다').removeClass('incorrect').addClass('correct');
		} else if ((/^[0-9]{3}$/).test($('#join_phoneFirst').val()) && (/^[0-9]{4}$/).test($('#join_phoneMiddle').val()) && (/^[0-9]{4}$/).test($('#join_phoneLast').val())) {
			$.ajax({
				type: "POST",
				url: '/login/post_duplicatePhone',
				data: {
					join_phone: $('#join_phoneFirst').val() + $('#join_phoneMiddle').val() + $('#join_phoneLast').val()
				},
				async: false,
				success: function(result) {
					if (result.code === 1) {
						$('#join_phone_text').text('사용가능합니다').removeClass('incorrect').addClass('correct');
					} else {
						$('#join_phone_text').text('이미 존재합니다').removeClass('correct').addClass('incorrect');
					}
				}
			});
		} else {
			$('#join_phone_text').text('휴대폰 번호 형식이 잘못되었습니다').removeClass('correct').addClass('incorrect');
		}
	});
	$('#join_phoneLast').on('focus keyup change', function() {
		if($('#join_phoneFirst').val() + $('#join_phoneMiddle').val() + $('#join_phoneLast').val() === oriData.phoneNum){
			$('#join_phone_text').text('휴대폰 번호가 변경되지 않습니다').removeClass('incorrect').addClass('correct');
		} else if ((/^[0-9]{3}$/).test($('#join_phoneFirst').val()) && (/^[0-9]{4}$/).test($('#join_phoneMiddle').val()) && (/^[0-9]{4}$/).test($('#join_phoneLast').val())) {
			$.ajax({
				type: "POST",
				url: '/login/post_duplicatePhone',
				data: {
					join_phone: $('#join_phoneFirst').val() + $('#join_phoneMiddle').val() + $('#join_phoneLast').val()
				},
				async: false,
				success: function(result) {
					if (result.code === 1) {
						$('#join_phone_text').text('사용가능합니다').removeClass('incorrect').addClass('correct');
					} else {
						$('#join_phone_text').text('이미 존재합니다').removeClass('correct').addClass('incorrect');
					}
				}
			});
		} else {
			$('#join_phone_text').text('휴대폰 번호 형식이 잘못되었습니다').removeClass('correct').addClass('incorrect');
		}
	});
	$('#join_addressFirst').on('focus keyup change', function() {
		if($('#join_addressFirst').val() + '-' + $('#join_addressLast').val() === oriData.address){
			$('#join_address_text').text('주소가 변경되지 않습니다').removeClass('incorrect').addClass('correct');
		}else if ((/^[가-힣]{1,3}시$/).test($('#join_addressFirst').val()) && (/^[가-힣]{1,3}[구군]$/).test($('#join_addressLast').val())) {
			$('#join_address_text').text('사용가능합니다').removeClass('incorrect').addClass('correct');
		} else {
			$('#join_address_text').text('00시 00구(군) 형식으로 주소입력 해주세요').removeClass('correct').addClass('incorrect');
		}
	});
	$('#join_addressLast').on('focus keyup change', function() {
		if($('#join_addressFirst').val() + '-' + $('#join_addressLast').val() === oriData.address){
			$('#join_address_text').text('주소가 변경되지 않습니다').removeClass('incorrect').addClass('correct');
		}else if ((/^[가-힣]{1,3}시$/).test($('#join_addressFirst').val()) && (/^[가-힣]{1,3}[구군]$/).test($('#join_addressLast').val())) {
			$('#join_address_text').text('사용가능합니다').removeClass('incorrect').addClass('correct');
		} else {
			$('#join_address_text').text('00시 00구(군) 형식으로 주소입력 해주세요').removeClass('correct').addClass('incorrect');
		}
	});
	$('#join_addressFirst').trigger('change');
	$('#join_btn').on('click', function(event) {
		event.preventDefault();
		console.log('하이용');
		if(type === 2){
			var join_password = $('#join_password').val();
			var join_passwordConfirm = $('#join_passwordConfirm').val();
			var isPasswordChange = true;
		}
		console.log('하이용2');
		var join_email = $('#join_email').val();
		var join_phoneFirst = $('#join_phoneFirst').val();
		var join_phoneMiddle = $('#join_phoneMiddle').val();
		var join_phoneLast = $('#join_phoneLast').val();
		var join_addressFirst = $('#join_addressFirst').val();
		var join_addressLast = $('#join_addressLast').val();

		console.log('하이용3');
		var isEmailChange = true;
		var isPhoneNumChange =true;
		var isAddressChange = true;
		if(type === 2 ){
			console.log('하이용4');
			if(join_password === ''){
				isPasswordChange = false;
			}else if (!(/^[0-9a-zA-Z!@#$%^&*()_-]{8,15}$/).test(join_password)) {
				$('#join_password').focus();
				return;
			} else if ((/^[a-zA-Z]{8,15}$/).test(join_password) || !(/[0-9]/).test(join_password)) {
				$('#join_password').focus();
				return;
			}
			if (join_passwordConfirm == join_password) {} else {
				$('#join_passwordConfirm').focus();
				return;
			}
		}
		console.log('하이용5', join_email, oriData.email);
		if(join_email === oriData.email){
			console.log('하이용6');
			isEmailChange = false;
		} else if ((/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/).test(join_email)) {
			$.post('/login/post_duplicateEmail', {
				join_email: join_email
			}, function(result) {
				if (result.code === 0) {
					$('#join_email').focus();
					return;
				}
			});
		} else {
			$('#join_email').focus();
			return;
		}
		console.log('하이용7');
		if (join_phoneFirst + join_phoneMiddle + join_phoneLast === oriData.phoneNum){
			isPhoneNumChange = false;
		} else if ((/^[0-9]{3}$/).test(join_phoneFirst) && (/^[0-9]{4}$/).test(join_phoneMiddle) && (/^[0-9]{4}$/).test(join_phoneLast)) {
			$.ajax({
				type: "POST",
				url: '/login/post_duplicatePhone',
				data: {
					join_phone: join_phoneFirst + join_phoneMiddle + join_phoneLast
				},
				success: function(result) {
					if (result.code === 0) {
						$('#join_phoneMiddle').focus();
						return;
					}
				}
			});
		} else {
			$('#join_phoneMiddle').focus();
			return;
		}

		if(join_addressFirst + '-' + join_addressLast === oriData.address){
			isAddressChange = false;
		} else if ((/^[가-힣]{1,3}시$/).test(join_addressFirst) && (/^[가-힣]{1,3}[구군]$/).test(join_addressLast)) {} else {
			$('#join_addressFirst').focus();
			return;
		}

		var join_phoneNum = join_phoneFirst + join_phoneMiddle + join_phoneLast;
		var join_address = join_addressFirst + '-' + join_addressLast;
		var changeInfo = {};
		if(type === 2){
			if(isPasswordChange === true){
				changeInfo.password = join_password;
			}
		}
		if(isPhoneNumChange === true){
			changeInfo.phoneNum = join_phoneNum;
		}
		if(isEmailChange === true){
			changeInfo.email = join_email;
		}
		if(isAddressChange === true){
			changeInfo.address = join_address;
		}
		console.log('하이용10');
		$.ajax({
			type: "POST",
			url: '/myPage/changeClientInfo/post_changeClientInfo',
			data: {changeInfo : changeInfo},
			success: function(result) {
           		if (result.code === 1) { //정보변경 성공
           			window.location.replace('/myPage');
           			console.log('하이용11');
           		} else {
           			console.log('정보변경 실패');
           		}
           	}
           });
	});
}