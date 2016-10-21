$(function(){
	var nowAct = 1;	//지금 보고있는 카테고리 cat을 act로 잘못쓴듯
	var catNum = 8;	//총 카테고리 수
	var proNum = 12;	//한 페이지 안에 있는 제품수
	var nowTab = 1;	//제품 페이지 수
	var totalPriceArr = [];	//제품 추가 되면 여기 배열에 추가된다.
	var totalPrice = 0;	//총 가격
	$food_products = $('#food_products');
	$food_categories = $('#food_categories');
	$food_tabs = $('#food_tabs');
	$total_price = $('#total_price');

	$('#food_zoomed').on('click', function(){//zoomed 토글
		$(this).slideToggle();
	});
	var products = [JSON.parse(product_infos.pro1),	//파일에서 가져옴
	JSON.parse(product_infos.pro2),
	JSON.parse(product_infos.pro3),
	JSON.parse(product_infos.pro4),
	JSON.parse(product_infos.pro5),
	JSON.parse(product_infos.pro6),
	JSON.parse(product_infos.pro7),
	JSON.parse(product_infos.pro8),
	];

	$.get('travelCookies', function(data){//쿠키 있으면 가져옴
		for(var i = 0 ; i < catNum ; i++){
			var product = products[i];
			for(var j = 0; j < product.length; j++){
				if(product[j].default && data.travelForm && data.travelForm.travelNum != 0){//쿠키랑 default값이 모두 있으면 먼저 num;
					product[j].num = (Number(data.travelForm.travelNum) + product[i].default - 1) / product[i].default;
					totalPriceArr.push(product[j]);
				}else{//없으면 num = 0;
					product[j].num = 0;
				}
			}
		}
		setTotalPrice(totalPriceArr, $total_price);
		
		insertCartegory($food_categories, catNum);
		for(var i = 0; i < catNum ; i ++){
			var id = "#food_cat" + (i + 1);
			$(id).on('click',function(event){
				event.preventDefault();

				nowTab = 1;
				var thisNum = this.getAttribute('catNum');
				$('#food_cat' + nowAct).removeClass('clicked');
				$('#food_cat' + thisNum).addClass('clicked');
				nowAct = thisNum;
				
				$food_tabs.html('');
				var product = products[Number(thisNum)-1];
				var tabNum = makeSubPage($food_tabs, product.length, proNum);
				for(var j = 0 ; j < tabNum ; j++){
					$('#subpage_' + (j + 1)).on('click',function(){	//밑에 1/2/3/4/5 같은거 누르면 실행
						$food_products.html('');
						thisTab = this.getAttribute('tabNum');
						changeSubPage($food_products, thisTab, product, proNum, $total_price, totalPriceArr);//pro목록 배치
						$('#subpage_' + nowTab).removeClass('clicked');
						$('#subpage_' + thisTab).addClass('clicked');
						nowTab = thisTab;
					});
				}
				$('#subpage_' + nowTab).trigger('click');
			});
		}
		$('#food_cat' + nowAct).trigger('click');
	});

	$('#shopping_end').on('click', function(event){
		event.preventDefault();
		if(totalPriceArr.length===0){
			alert('최소 하나의 물품을 선택해야 합니다');
			return;
		}
		$(window).unbind('beforeunload');
		$.post('/food/post_selected', {products : JSON.stringify(totalPriceArr)}, function(result){
			if(result.code === 1){
				window.location.href = "/food/selected";
			}
		});
	});

	$(window).bind('beforeunload', function(){
		return '페이지에서 나가면 변경사항이 저장되지 않습니다.';
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

var makeConnection = function($product_up, $product_down, $product_input, $product_content, $product_price, product, $total_price, totalPriceArr){//각종 ui들을 연결한다.
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

	$product_input.on('change', function(){	//input값이 바뀌면
		if($product_input.val() < 0){	//0이하일때
			$product_input.val(0);
			$product_content.text('0' + product.unit);
			$product_price.text('0원');
			product.num = 0;
			find_removeTotalIndex(product._id, totalPriceArr);//total에서 인덱스를 찾아낸다 찾으면 배열에서 제외하고 반환한다.
		}else{	//아닐때
			$product_content.text(product.content * $product_input.val() + product.unit);
			$product_price.text(product.price * $product_input.val() + '원');
			product.num = $product_input.val();
			var totalPrice = insert_updateTotalIndex(product._id, totalPriceArr, product);	//totalArr에서 인덱스를 찾아 업데이트 하던지 새로 넣는다.
			setTotalPriceHtml($total_price, totalPrice);
		}
	});
}

var showProducts = function($food_products, product, $total_price, totalPriceArr){	//각종 ui를 만들고 연결시키는 함수를 부른다.
	$food_products.append(insertProduct(product));	//ui만들기
	$('#product_img_' + product._id).css('background-image', 'url("http://placehold.it/500x250")');//'url("../' + product.url + '")'
	$('#product_img_' + product._id).on('click', function(event){
		event.preventDefault();
		$('#food_zoomed').slideToggle();
		$('#food_zoomed_img').attr('src', 'http://placehold.it/500x250')//'../' + product.url +
		$('#food_zoomed_info').text('나중에 넣을 것입니다.');//후에 만들것 product.info
	});
	$product_up = $('#product_up_' + product._id);
	$product_down = $('#product_down_' + product._id);
	$product_input = $('#product_input_' + product._id);
	$product_content = $('#product_content_' + product._id);
	$product_price = $('#product_price_' + product._id);
	makeConnection($product_up, $product_down, $product_input, $product_content, $product_price, product, $total_price, totalPriceArr);//각종 ui 연결한다.
}

var makeSubPage = function($food_products, length, proNum){
	var subPageStr = '<div>';
	subPageStr += '<div class="subPage_container">';
	subPageStr += '<p> </p>';
	var i = 0;
	for( ; i < length / proNum ; i++){
		subPageStr += '<a href="#" id="subpage_' + (i + 1) + '" tabNum="' + (i + 1) + '">' + (i + 1) + '</a><p> </p>';
	}
	subPageStr += '</div>';
	subPageStr += '</div>';
	$food_products.append(subPageStr);
	return i;
}

var changeSubPage = function($food_products, tabNum, product, proNum, $total_price, totalPriceArr){//밑에 1/2/3/4/5 이런 페이지를 누르면 위에 pro목록이 뜬다.
	for(var i = (tabNum - 1) * proNum ; i < tabNum * proNum && i < product.length ; i++){
		showProducts($food_products, product[i], $total_price, totalPriceArr);
	}
}

var setTotalPrice = function(totalPriceArr, $total_price){
	var totalPrice = 0;
	totalPriceArr.forEach(function(totalProduct){
		totalPrice += totalProduct.num * totalProduct.price;
	});
	setTotalPriceHtml($total_price, totalPrice);
}

var setTotalPriceHtml = function($total_price, totalPrice){
	var totalPriceStr = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	$total_price.html('<p>총 ' + totalPriceStr + '원' + '</p>');
}

var find_removeTotalIndex = function(_id, totalPriceArr){	//total에서 인덱스를 찾아낸다 총합을 리턴한다.
	var i = 0;
	var totalPrice = 0;
	for(; i < totalPriceArr.length ; i++){
		if(totalPriceArr[i]._id === _id){
			break;
		}
		totalPrice += totalPriceArr[i].num * totalPriceArr[i].price;
	}
	if(i === totalPriceArr.length){
		return totalPrice;
	}else{
		for(var j = i; j < totalPriceArr.length - 1; j++){
			totalPriceArr[j] = totalPriceArr[j+1];
			totalPrice += totalPriceArr[j].num * totalPriceArr[j].price;
		}
		totalPriceArr.pop();
		return totalPrice;
	}
}

var insert_updateTotalIndex = function(_id, totalPriceArr, product){	//넣거나 업데이트시킨다. 총합을 리턴한다.
	var i = 0;
	var isFind = 0; // 0 : 못찾고 끝에 추가해야 할 때, 1 찾았을때, -1 못찾고 중간에 추가해야 할 때
	var totalPrice = 0;
	for(; i < totalPriceArr.length ; i++){
		var compare_res = compare_id(_id, totalPriceArr[i]._id);
		if(compare_res === 1){
			totalPrice += totalPriceArr[i].num * totalPriceArr[i].price;
			continue;
		}else if(compare_res === 0){
			isFind = 1;
			break;
		}else{
			isFind = -1;
			break;
		}
	}
	if(isFind === 0){
		totalPriceArr.push(product);
		totalPrice += product.num * product.price;
		return totalPrice;
	}else if(isFind === -1){
		totalPriceArr.push('trash');
		for(var j = totalPriceArr.length - 1; i < j; j--){
			totalPriceArr[j] = totalPriceArr[j-1];
			totalPrice = totalPriceArr[j].num * totalPriceArr[j].price;
		}
		totalPriceArr[i] = product;
		totalPrice += product.num * product.price;
		return totalPrice;
	}else{
		for(; i<totalPriceArr.length ; i++){
			totalPrice += totalPriceArr[i].num * totalPriceArr[i].price;
		}
		return totalPrice;
	}
}

var compare_id = function(id1, id2){	//비교해서 앞숫자가 크면 1, 작으면 -1, 같으면 0 반환
	var id1Sub = id1.substring(3).split('-');
	var id1_cat = Number(id1Sub[0]);
	var id2Sub = id2.substring(3).split('-');
	var id2_cat = Number(id2Sub[0]);
	
	if(id1_cat > id2_cat){
		return 1;
	}else if(id1_cat < id2_cat){
		return -1;
	}else{
		var id1_pro = Number(id1Sub[1]);
		var id2_pro = Number(id2Sub[1]);
		if(id1_pro > id2_pro){
			return 1;
		}else if(id1_pro < id2_pro){
			return -1;
		}else{
			return 0;
		}
	}
}

	//ajax요청으로 미리 모든 카테고리에 대한 데이터를 가져옴
	//만약 물품을 선택하면 미리 받아놓은 제이슨으로
	//0~물품개수 만큼 index속성을 만들고 만약 물품의 index속성이 3이면
	//on 'change' 해서 json[3] 의 num 를 변경시킴
	//후에 num>=1인 속성만 모아서 금액 계산해줌.