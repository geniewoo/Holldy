$(function(){
	$.get('/myCart/get_foodProducts', function(result){
		$cart_food = $('#cart_food');
		console.log('cart_food_Arr');
		if(result.code === 1){
			var cart_food_Arr = JSON.parse(result.cart_food_Arr);
			var cart_food_Num = JSON.parse(result.cart_food_Num);
			console.log(cart_food_Arr, cart_food_Num);

			var tableHTML = '';
			if(cart_food_Arr.length > 0){
				cart_food_Arr.forEach(function(carts, index1){
					var aCartName = '';
					var aCartPrice = 0;
					carts.forEach(function(item, index2){
						aCartName += item.name + ' x ' + cart_food_Num[index1][index2] + '   ';
						aCartPrice += item.price * cart_food_Num[index1][index2];
					});
					tableHTML += '<tr>';
					tableHTML += 	'<td>';
					tableHTML += 	'<input type="checkbox"/>';
					tableHTML += 	'</td>';
					tableHTML += 	'<td>';
					tableHTML += 		'<a>' + aCartName + '</a>';
					tableHTML += 	'</td>';
					tableHTML += 	'<td>';
					tableHTML += 		'<p>' + String(aCartPrice).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원</p>';
					tableHTML += 	'</td>';
					tableHTML += '</tr>';
				});
			}else{
				tableHTML += '<tr>';
				tableHTML += 	'<td colspan="3">';
				tableHTML += 	'<p> 장바구니 목록이 없습니다. <p>';
				tableHTML += 	'</td>';
				tableHTML += '</tr>';
			}
			$cart_food.html(tableHTML);
		}else{
			console.log('error', result.err_msg);
		}
	});
});