$(function(){
	$food_selected_table = $('#food_selected_table');
	$food_selected_total = $('#food_selected_total');

	$.get('/food/get_food_selected', function(result){
		var selected_products = JSON.parse(result.food_selected);	//골랐던 물품 목록 // 테이블 헤더만들기
		makeSelectedTable(selected_products, $food_selected_table);
	});
});

var makeSelectedTable = function(selected_products, $food_selected_table){

	var selected_table_str = '<table class = "selected_table">'//
	+'<thead>'
	+ 	'<tr>'
	+ 		'<th><input type = "checkbox"/></th>'
	+ 		'<th></th>'
	+ 		'<th><p>상품이름</p></th>'
	+ 		'<th><p>정보</p></th>'
	+ 		'<th><p>개수</p></th>'
	+ 		'<th><p>계</p></th>'
	+ 	'</tr>'
	+'</thead>';
	selected_table_str += '<tbody>';

	for(var i = 0 ; i < selected_products.length ; i++){	//테이블 몸통만들기
		selected_table_str += '<tr>'
		+	'<td class = "selected_table_check">'
		+		'<input type = "checkbox"/>'
		+	'</td>'
		+	'<td class = "selected_table_img">'
		+		'<a href="#" id="selected_product_img_' + ( i + 1 ) + '"></a>'
		+	'</td>'
		+	'<td class = "selected_table_name">'
		+		'<p>' + selected_products[i].name + '</p>'
		+	'</td>'
		+	'<td class = "selected_table_info">'
		+		'<p>' + selected_products[i].price + '원</p>'
		+		'<p>' + selected_products[i].content + selected_products[i].unit + '</p>'
		+	'</td>'
		+	'<td class = "selected_table_num">'
		+		'<a href="#" id="selected_product_up_' + ( i + 1 ) + '" index="' + ( i + 1 ) + '">▲</a>'
		+		'<input type="number" id="selected_product_input_' + ( i + 1 ) + '" index="' + ( i + 1 ) + '" value="' + selected_products[i].num + '">'
		+		'<a href="#" id="selected_product_down_' + ( i + 1 ) + '" index="' + ( i + 1 ) + '">▼</a>'
		+	'</td>'
		+	'<td class = "selected_table_total">'
		+		'<p id="selected_product_price_' + (i + 1) + '"></p>'
		+		'<p id="selected_product_content_' + (i + 1) + '"></p>'
		+	'</td>'
		+'</tr>';
	}
	selected_table_str += '</tbody></table>';
	$food_selected_table.append(selected_table_str);

	makeTableConnect(selected_products);

}

var makeTableConnect = function(selected_products){

	for(var i = 0 ; i < selected_products.length ; i++){	//input과 total 연결시키기
		$('#selected_product_up_' + (i + 1)).on('click', function(event){
			event.preventDefault();
			var index = this.getAttribute('index');
			$selected_product_input = $('#selected_product_input_' + index);
			$selected_product_input.val(Number($selected_product_input.val()) + 1);
			$selected_product_input.trigger('change');
		});
		$('#selected_product_down_' + (i + 1)).on('click', function(event){
			event.preventDefault();
			var index = this.getAttribute('index');
			$selected_product_input = $('#selected_product_input_' + index);
			$selected_product_input.val(Number($selected_product_input.val()) - 1);
			$selected_product_input.trigger('change');
		});
		$('#selected_product_input_' + (i + 1)).on('change',function(){
			if($(this).val() <= 0){
				$(this).val(0);
			}
			var num = $(this).val();
			var index = this.getAttribute('index');

			selected_products[index - 1].num = num;
			$selected_product_price = $('#selected_product_price_' + index);
			$selected_product_content = $('#selected_product_content_' + index);
			$selected_product_price.text(num * selected_products[index - 1].price + '원');
			$selected_product_content.text(num * selected_products[index - 1].content + selected_products[index - 1].unit);
				$('#selected_product_img_' + index).css('background-image', 'url("http://placehold.it/100x100")');//'url("../' + product.url + '")'
			});
		$('#selected_product_input_' + (i + 1)).trigger('change');
	}
}