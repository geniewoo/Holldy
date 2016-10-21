$(function(){
	$food_selected_table = $('#food_selected_table');
	$food_selected_total = $('#food_selected_total');

	$.get('/food/get_food_selected', function(result){
		var selected_products = JSON.parse(result.food_selected);	//골랐던 물품 목록 // 테이블 헤더만들기
		var selected_products_copy = selected_products.slice(0);	//체크박스에서 목록 지울때만 사용
		makeSelectedTable(selected_products, $food_selected_table);
		makeTableConnect(selected_products);
		changeSelectedProducts(selected_products_copy);

		$('shopping_bascket').on('click', function(event){
			event.preventDefault();
			$.post('/myCart/post_foodProducts', {cart_product : JSON.stringify(selected_products)}, function(data){
				if(data.code === 1){
					window.location.href = '/myCart';
				}
			});
		});

		$('buy_products').on('click', function(event){
			event.preventDefault();
			$.post('/order/post_foodProducts');
		});
	});
});

var makeSelectedTable = function(selected_products, $food_selected_table){

	var selected_table_str = '<table class = "selected_table">'//
	+'<thead>'
	+ 	'<tr>'
	+ 		'<th><input type = "checkbox" id="product_all_checkbox"/></th>'
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
		+		'<input type = "checkbox" name="product_checkbox" index = "'+ (i + 1) +'"/>'
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
	selected_table_str += '</tbody>'
	+	'<tfoot>'
	+		'<tr>'
	+			'<td colspan = 6>'
	+				'<a href="#" id="shopping_bascket">장바구니</a>'
	+				'<a href="#" id="buy_products">구매하기</a>'
	+				'<p id="selected_table_total"></p>'
	+			'</td>'
	+		'</tr>'
	+	'</tfoot>'
	+	'</table>';
	$food_selected_table.append(selected_table_str);
}

var makeTableConnect = function(selected_products){



	$pro_all_check = $('#product_all_checkbox');	//테이블 가장 위 왼쪽에 있는 체크박스
	$pro_all_check.on('click', function(){
		console.log('clicked');
		if(($pro_all_check).is(':checked')){
			console.log('checked');
			$("input[name=product_checkbox]:checkbox").each(function() {
				$(this).prop("checked", true);
			});
		}else{
			console.log('unchecked');
			$("input[name=product_checkbox]:checkbox").each(function() {
				$(this).prop("checked", false);
			});
		}
	});

	for(var i = 0 ; i < selected_products.length ; i++){	//input과 위아래 버튼, total 연결시키기
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
			if($(this).val() <= 1){
				$(this).val(1);
			}
			var num = $(this).val();
			var index = this.getAttribute('index');

			selected_products[index - 1].num = num;
			$selected_product_price = $('#selected_product_price_' + index);
			$selected_product_content = $('#selected_product_content_' + index);
			$selected_product_price.text(num * selected_products[index - 1].price + '원');
			$selected_product_content.text(num * selected_products[index - 1].content + selected_products[index - 1].unit);
			
			var totalPrice = 0;
			for(var i = 0; i < selected_products.length; i++){ // 총 합 값 변경
				totalPrice += selected_products[i].num * selected_products[i].price;
			}
			$('#selected_table_total').text('총 계 : ' + totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원');

		});
		$('#selected_product_img_' + (i + 1)).css('background-image', 'url("../images/nav_busBtn_hover.png")');//'url("../' + product.url + '")'
		$('#selected_product_input_' + (i + 1)).trigger('change');
	}
}

var changeSelectedProducts = function(selected_products_copy){	//selected_table_del 을 눌렀을 때 목록에서 삭제하는 코드, copy는 원래 products의 복사본이고 tmp는 이 click됐을 때에만 만들어서 쓰는 함수이다.
	
	$('#selected_table_del').on('click', function(event){
		var count = 0;
		var selected_products_tmp = selected_products_copy.slice(0);
		event.preventDefault();
		$("input[name=product_checkbox]:checkbox").each(function() {
			if($(this).is(":checked")){
				var index = this.getAttribute('index') - count;
				count ++;
				console.log("index", index);
				for(var i = index; i < selected_products_tmp.length; i++){
					selected_products_tmp[i-1] = selected_products_tmp[i];
				}
				selected_products_tmp.pop();
			}
		});
		if(selected_products_tmp.length === 0){
			alert('적어도 하나의 상품은 남겨야 합니다');
			return;
		}else{
			$.post('/food/post_selected', {products : JSON.stringify(selected_products_tmp)}, function(result){
				if(result.code === 1){
					window.location.replace("/food/selected");
				}
			});
		}
	});
}
/*
		$("#checkAll").click(function() {
			$("input[name=box]:checkbox").each(function() {
				$(this).attr("checked", true);
			});
		});

		// 체크 박스 모두 해제
		$("#uncheckAll").click(function() {
			$("input[name=box]:checkbox").each(function() {
				$(this).attr("checked", false);
			});
		});

		// 체크 되어 있는 값 추출
		$("#getCheckedAll").click(function() {
			$("input[name=box]:checked").each(function() {
				var test = $(this).val();
				console.log(test);
			});
		});

		// 서버에서 받아온 데이터 체크하기 (콤마로 받아온 경우)
		$("#updateChecked").click(function() {
			var splitCode = $("#splitCode").val().split(",");
			for (var idx in splitCode) {
				$("input[name=box][value=" + splitCode[idx] + "]").attr("checked", true);
			}
		});

*/