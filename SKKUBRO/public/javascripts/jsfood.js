$(function(){
	var catNum = 8;
	$food_products = $('#food_products');
	$food_categories = $('#food_categories');

	$.get('food/get_product', function(data){
		if(data.code === 1){
			insertCartegory($food_categories, catNum);
			for(var i = 0; i < catNum ; i ++){
				var id = "#food_cat" + (i + 1);
				$(id).on('click',function(){
					for(var product = data.data, i = 0; i < data.data.length; i++){
						if(product[i].category == this.getAttribute('catNum')){
							$food_products.append(insertProduct(product[i]));
						}
					}
				});
			}
		}
	});
});

var insertCartegory = function($food_categories, catNum){
	var catName = ['육류 / 쌀 / 김치', '쌈 / 야채', '라면', '과자', '음료', '어묵 / 냉동', '일회용기', '기타'];
	var catStr = '';
	for(var i = 0 ; i <= (catNum - 1) / 4 ; i++){
		catStr += '<ul>';
		for(var j = 0 ; j < 4 && j + i * 4 < catNum ; j++ ){
			catStr += '<li><a href = "#" catNum = "'
			+ (1 + j + i * 4)
			+ '" id="food_cat'
			+ (1 + j + i * 4)
			+ '">'
			+ catName[j + i * 4];
			+ '</a></li>'
		}
		catStr += '</ul>';
	}
	$food_categories.html(catStr);
}

var insertProduct = function(product){
	productStr = '<li>'
				+ '<a href="#" class="food_products_a"></a>'
				+ '<div>'
				+	'<div>'
				+	 	'<p class="food_products_name">' + product.name + '</p>'
				+ 		'<p class="food_products_price">' + product.price + '</p>'
				+	'</div>'
				+	'<div>'
				+		'<p class="food_products_content">' + product.content + '</p>'
				+		'<p class="food_products_unit">' + product.unit + '</p>'
				+		'<p class="food_products_totalprice">' + '추후 조정' + '</p>'
				+	'</div>'
				+ '</div>'
				+ '<div>'
				+	'<a class="food_products_numBtn">위</a>'
				+	'<input type="number" class="food_products_input"/>'
				+	'<a class="food_products_numBtn">아래</a>'
				+ '</div>'
				+'</li>';
	return productStr;
}
	//ajax요청으로 미리 모든 카테고리에 대한 데이터를 가져옴
	//만약 물품을 선택하면 미리 받아놓은 제이슨으로
	//0~물품개수 만큼 index속성을 만들고 만약 물품의 index속성이 3이면
	//on 'change' 해서 json[3] 의 num 를 변경시킴
	//후에 num>=1인 속성만 모아서 금액 계산해줌.