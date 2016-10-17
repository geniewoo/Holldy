$(function(){
	var nowAct = 1;
	var catNum = 8;
	$food_products = $('#food_products');
	$food_categories = $('#food_categories');

	var products = JSON.parse(product_infos_1);

	$.get('travelCookies', function(data){
		if(data.code === 1){
			for(var i = 0; i < products.length; i++){
				if(products[i].default){
					products[i].num = (Number(data.travelForm.travelNum) + products[i].default - 1) / products[i].default;
				}else{
					products[i].num = 0;
				}
			}
			insertCartegory($food_categories, catNum);
			for(var i = 0; i < catNum ; i ++){
				var id = "#food_cat" + (i + 1);
				$(id).on('click',function(event){
					var thisNum = this.getAttribute('catNum');
					event.preventDefault();
					$('#food_cat' + nowAct).removeClass('clicked');
					$('#food_cat' + thisNum).addClass('clicked');
					nowAct = thisNum;
					$food_products.html('');
					for(var i = 0; i < products.length; i++){
						if(products[i].category == thisNum){
							showProducts($food_products, products[i]);
						}
					}
				});
			}
			$('#food_cat' + nowAct).trigger('click');
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
		var content_res, price_res, init_num;

		init_num = product.num;
		content_res = init_num * product.content;
		price_res = init_num * product.price;

		productStr = '<li>'
		+'<div class="food_products_img">'
		+	'<a href="#" id=product_img_' + product._id + '></a>'
		+'</div>'
		+'<div class="food_products_info">'
		+	'<p class="food_products_name">' + product.name + ' ' + product.content + product.unit + '</p>'
		+	'<div class="food_products_res">'
		+		'<div>'
		+			'<p class="food_products_price">' + product.price + '</p>'
		+			'<p class="food_products_won">  원</p>'
		+		'</div>'
		+		'<div>'
		+			'<p class="food_products_content" id="product_content_' + product._id +'">' + content_res + product.unit + '</p>'
		+			'<p class="food_products_totalprice" id="product_price_' + product._id + '"">' + price_res + '원' + '</p>'
		+		'</div>'
		+	'</div>'
		+	'<div class="food_products_con">'
		+		'<a href="#" id="product_up_' + product._id + '">∧</a>'
		+		'<input type="number" id="product_input_' + product._id +'" min="0" value="' + init_num + '"/>'
		+		'<a href="#" id="product_down_' + product._id + '">∨</a>'
		+	'</div>'
		+'</div>'
		+'</li>';
		return productStr;
	}

	var makeConnection = function($product_up, $product_down, $product_input, $product_content, $product_price, product){
		$product_up.on('click', function(event){
			event.preventDefault();
			$product_input.val(Number($product_input.val()) + 1);
			$product_input.trigger('change');
		});

		$product_down.on('click', function(event){
			event.preventDefault();
			if($product_input.val() > 0){
				$product_input.val(Number($product_input.val()) - 1);
				$product_input.trigger('change');
			}
		});

		$product_input.on('change', function(){
			if($product_input.val() < 0){
				$product_input.val(0);
				$product_content.text('0' + product.unit);
				$product_price.text('0원');
				product.num = 0;
			}else{
				$product_content.text(product.content * $product_input.val() + product.unit);
				$product_price.text(product.price * $product_input.val() + '원');
				product.num = $product_input.val();
			}
		});
	}

	var showProducts = function($food_products, product){
		$food_products.append(insertProduct(product));
	$('#product_img_' + product._id).css('background-image', 'url("http://placehold.it/500x250")');//'url("../' + product.url + '")'
	$product_up = $('#product_up_' + product._id);
	$product_down = $('#product_down_' + product._id);
	$product_input = $('#product_input_' + product._id);
	$product_content = $('#product_content_' + product._id);
	$product_price = $('#product_price_' + product._id);
	makeConnection($product_up, $product_down, $product_input, $product_content, $product_price, product);
}
	//ajax요청으로 미리 모든 카테고리에 대한 데이터를 가져옴
	//만약 물품을 선택하면 미리 받아놓은 제이슨으로
	//0~물품개수 만큼 index속성을 만들고 만약 물품의 index속성이 3이면
	//on 'change' 해서 json[3] 의 num 를 변경시킴
	//후에 num>=1인 속성만 모아서 금액 계산해줌.