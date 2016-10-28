$(function(){
	makeCartTable();
});
var makeCartTable = function(){
	makePensionTable();
	makeBusTable();
	makeFoodTable();
	calLastPrice();
}
var makePensionTable = function(){
	$cart_pension = $('#cart_pension');
	$pension_check = $('#pension_check');
	var tableHTML = '';
	tableHTML += '<tr>';
	tableHTML += 	'<td colspan="3">';
	tableHTML += 	'<p> 장바구니 목록이 없습니다. <p>';
	tableHTML += 	'</td>';
	tableHTML += '</tr>';
	$cart_pension.html(tableHTML);
	$pension_check.attr('disabled', true);
}
var makeBusTable = function(){
	$bus_check = $('#bus_check');
	$cart_bus = $('#cart_bus');
	var tableHTML = '';
	tableHTML += '<tr>';
	tableHTML += 	'<td colspan="3">';
	tableHTML += 	'<p> 장바구니 목록이 없습니다. <p>';
	tableHTML += 	'</td>';
	tableHTML += '</tr>';
	$cart_bus.html(tableHTML);
	$bus_check.attr('disabled', true);
}
var makeFoodTable = function(){
	$.get('/myCart/get_foodProducts', function(result){//ajax에서 장바구니 가져오기
		console.log(result);
		$food_check = $('#food_check');
		$cart_food = $('#cart_food');
		if(result.code === 1){
			var cart_food_Arr = JSON.parse(result.cart_food_Arr);//식품정보
			var cart_food_Num = JSON.parse(result.cart_food_Num);//장바구니 개수
			if(cart_food_Arr.length > 0){
				$food_check.on('click', function(){//식품 옆에 있는 큰버튼 눌렀을 때
					makeFoodTableBody($food_check, cart_food_Arr, cart_food_Num);//테이블 tbody만듬
					connectFoodCartCheckBox();
				});
				$food_check.trigger('click');//큰버튼 한번 눌러준다.
			}else{
				var tableHTML = makeNoCartString();
				$cart_food.html(tableHTML);
				$food_check.attr('disabled', true);
			}
		}else{
			var tableHTML = makeNoCartString();
			$cart_food.html(tableHTML);
			$food_check.attr('disabled', true);
		}
	});
}
var makeFoodTableBody = function($food_check, cart_food_Arr, cart_food_Num){
	var tableHTML = '';
	if(($food_check).is(':checked')){
		cart_food_Arr.forEach(function(carts, index1){
			var aCartName = '';
			var aCartPrice = 0;
			carts.forEach(function(item, index2){
				aCartName += item.name + 'x' + cart_food_Num[index1][index2] + ',  ';
				aCartPrice += item.price * cart_food_Num[index1][index2];
			});
			tableHTML += '<tr>';
			tableHTML += 	'<td class="cart_table_check">';
			tableHTML += 	'<input type="checkbox" name="food_cart" id="' + 'food_cart_checkbox_' + (index1 + 1) + '" index="' + (index1 + 1) + '"/>';
			tableHTML +=	'<a name="food_cart" href="#" index="' + (index1 + 1) + '"></a>';
			tableHTML += 	'</td>';
			tableHTML += 	'<td class="cart_table_name">';
			tableHTML += 		'<a href="/food/selected?cart=true&index=' + (index1 + 1) + '">' + aCartName + '</a>';
			tableHTML += 	'</td>';
			tableHTML += 	'<td class="cart_table_price">';
			tableHTML += 		'<p id="food_cart_price_' + (index1 + 1) + '">' + String(aCartPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</p>' + '<p>원</p>';
			tableHTML += 	'</td>';
			tableHTML += '</tr>';
		});
		$cart_food.html(tableHTML);
		console.log('1');
	}else{
		tableHTML += '<tr>';
		tableHTML += 	'<td colspan="3">';
		tableHTML += 	'<p> 식품은 필요없으신가요? <p>';
		tableHTML += 	'</td>';
		tableHTML += '</tr>';
		$cart_food.html(tableHTML);
	}
}

var connectFoodCartCheckBox = function(){
	$nowChecked = $('#food_cart_checkbox_1')
	$nowChecked.attr('checked', true);
	$('input:checkbox[name="food_cart"]').each(function(index){
		$(this).on('click', function(){
			console.log(this, $nowChecked);
			$nowChecked.prop('checked', false);
			$(this).prop('checked', true);
			$nowChecked = $(this);
			$('#totalPrice').trigger('total');
		});
	});
	$('#totalPrice').trigger('total');
	$('a[name="food_cart"]').each(function(index){
		$(this).on('click', function(event){
			event.preventDefault();
			$.get('/myCart/get_changeFoodCart?index=' + $(this).attr('index'), function(result){
				console.log(result.code);
				if(result.code === 1){
					window.location.reload(true);
				}
			});
		});
	});
}

var calLastPrice = function(){
	$('#totalPrice').on('total',function(){
		console.log('2');
		var food_index = $('input:checkbox[name="food_cart"]:checked').attr('index');
		var totalPrice = $('#food_cart_price_' + food_index).text()// +펜션 프라이스, + 버스 프라이스
		$(this).text('총 : ' + totalPrice + ' 원');
	});
}

var makeNoCartString = function(){
	var tableHTML = '';
	tableHTML += '<tr>';
	tableHTML += 	'<td colspan="3">';
	tableHTML += 	'<p> 장바구니 목록이 없습니다. <p>';
	tableHTML += 	'</td>';
	tableHTML += '</tr>';
	return tableHTML;
}