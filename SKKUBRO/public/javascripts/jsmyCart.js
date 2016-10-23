$(function(){
	console.log('cart_food');
	$.get('/myCart/get_foodProducts', function(result){
		console.log('cart_food');
		if(result.code === 1){
			console.log('cart_food');
			var cart_food = JSON.parse(result.cart_food);
			console.log(cart_food);
		}else{
			console.log('error', result.err_msg);
		}
	});
});