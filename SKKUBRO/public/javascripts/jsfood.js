$(function(){
	var catName = ['육류 / 쌀 / 김치', '쌈 / 야채', '라면', '과자', '음료', '어묵 / 냉동', '일회용기', '기타'];
	var catStr = '';
	var catNum = 8;
	$.get('food/get_product', function(data){
		console.log(data);
	});
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
	//ajax요청으로 미리 모든 카테고리에 대한 데이터를 가져옴
	//만약 물품을 선택하면 미리 받아놓은 제이슨으로
	//0~물품개수 만큼 index속성을 만들고 만약 물품의 index속성이 3이면
	//on 'change' 해서 json[3] 의 num 를 변경시킴
	//후에 num>=1인 속성만 모아서 금액 계산해줌.
	$('#food_container').html(catStr);
	for(var i = 0; i < catNum ; i ++){
		var id = "#food_cat" + (i + 1);
		$('id').on('click',function(){
			//여기엔 javascript로 해당 페이지를 만들어서 보여줌.
		});
	}
});
