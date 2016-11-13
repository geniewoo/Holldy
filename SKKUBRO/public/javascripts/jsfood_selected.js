$(function() {
    var url;
    var type;//1이면 비로그인 상태, session에서 가져오기, 2이면 로그인상태, db에서 가져오기 3이면 food-에서 넘어온 상태
    if ($.getUrlVar('cart') === 'true' && $.getUrlVar('login') === 'true') {
        url = '/food/get_food_selected?cart=true&login=true&cart_food_ID=' + $.getUrlVar('cart_food_ID');
        type = 2;
        console.log('??');
    } else if ($.getUrlVar('cart') === 'true' && $.getUrlVar('login' === 'false')) {
        url = '/food/get_food_selected?cart=true&login=false&index=' + $.getUrlVar('index');
        type = 1;
    } else {
        url = '/food/get_food_selected';
        type = 3;
        console.log('???');
    }
    console.log('type ', type);
    $.get(url, function(result) {
        $food_selected_table = $('#food_selected_table');
        $food_selected_total = $('#food_selected_total');
        if (result.code === 0) {
            window.location.replace('/food');
        }
        var selected_products = JSON.parse(result.food_selected_Arr); //골랐던 물품 목록 // 테이블 헤더만들기
        var selected_products_Num = JSON.parse(result.food_selected_Num);
        selected_products.forEach(function(item, index) {
            item.num = selected_products_Num[index];
        });
        var selected_products_copy = selected_products.slice(0); //체크박스에서 목록 지울때만 사용
        makeSelectedTable(selected_products, $food_selected_table, type);
        makeTableConnect(selected_products);
        changeSelectedProducts(selected_products_copy, type);
        $('#shopping_bascket').on('click', function(event) {
            event.preventDefault();
            if (type === 1) {
                $.post('/myCart/post_foodProducts', {
                    cart_product: JSON.stringify(arrTo_idnumArr(selected_products)),
                    index: $.getUrlVar('index')
                }, function(result) {
                    if (result.code === 1) {
                        window.location.href = '/myCart';
                    }
                });
            } else if (type === 2) {
                $.post('/myCart/post_foodProducts', {
                    cart_product: JSON.stringify(arrTo_idnumArr(selected_products)),
					cart_food_ID: $.getUrlVar('cart_food_ID')
                }, function(result) {
                    if (result.code === 1) {
                        window.location.href = '/myCart';
                    }
                });
            } else {
                $.post('/myCart/post_foodProducts', {
                    cart_product: JSON.stringify(arrTo_idnumArr(selected_products))
                }, function(result) {
                    if (result.code === 1) {
                        window.location.href = '/myCart';
                    }
                });
            }
        });
    });
});

var makeSelectedTable = function(selected_products, $food_selected_table, type) {

    var selected_table_str = '<table class = "selected_table skb_table">' //
        +
        '<thead>' +
        '<tr>' +
        '<th><input type = "checkbox" id="product_all_checkbox"/><label for="product_all_checkbox"></label></th>' +
        '<th></th>' +
        '<th><p>상품이름</p></th>' +
        '<th><p>정보</p></th>' +
        '<th><p>개수</p></th>' +
        '<th><p>계</p></th>' +
        '</tr>' +
        '</thead>';
    selected_table_str += '<tbody>';

    for (var i = 0; i < selected_products.length; i++) { //테이블 몸통만들기
        selected_table_str += '<tr>' +
            '<td class = "selected_table_check">' +
            '<input type = "checkbox" name="product_checkbox" id="product_' + (i + 1) + '" index = "' + (i + 1) + '"/>' +
            '<label for="product_' + (i + 1) + '"></label>' +
            '</td>' +
            '<td class = "selected_table_img">' +
            '<a href="#" id="selected_product_img_' + (i + 1) + '"></a>' +
            '</td>' +
            '<td class = "selected_table_name">' +
            '<p>' + selected_products[i].name + '</p>' +
            '</td>' +
            '<td class = "selected_table_info">' +
            '<p>' + selected_products[i].price + '원</p>' +
            '<p>' + selected_products[i].content + selected_products[i].unit + '</p>' +
            '</td>' +
            '<td class = "selected_table_num">' +
            '<a href="#" id="selected_product_up_' + (i + 1) + '" index="' + (i + 1) + '">▲</a>' +
            '<input type="number" id="selected_product_input_' + (i + 1) + '" index="' + (i + 1) + '" value="' + selected_products[i].num + '">' +
            '<a href="#" id="selected_product_down_' + (i + 1) + '" index="' + (i + 1) + '">▼</a>' +
            '</td>' +
            '<td class = "selected_table_total">' +
            '<p id="selected_product_price_' + (i + 1) + '"></p>' +
            '<p id="selected_product_content_' + (i + 1) + '"></p>' +
            '</td>' +
            '</tr>';
    }
    var cartStr;
    if (type === 1 || type === 2) {
        cartStr = '장바구니변경';
    } else {
        cartStr = '장바구니담기';
    }
    selected_table_str += '</tbody>' +
        '<tfoot>' +
        '<tr>' +
        '<td colspan = 6>' +
        '<a href="#" id="shopping_bascket">' + cartStr + '</a>' +
        '<p id="selected_table_total"></p>' +
        '</td>' +
        '</tr>' +
        '</tfoot>' +
        '</table>';
    $food_selected_table.append(selected_table_str);
}

var makeTableConnect = function(selected_products) {



    $pro_all_check = $('#product_all_checkbox'); //테이블 가장 위 왼쪽에 있는 체크박스
    $pro_all_check.on('click', function() {
        if (($pro_all_check).is(':checked')) {
            $("input[name=product_checkbox]:checkbox").each(function() {
                $(this).prop("checked", true);
            });
        } else {
            $("input[name=product_checkbox]:checkbox").each(function() {
                $(this).prop("checked", false);
            });
        }
    });

    for (var i = 0; i < selected_products.length; i++) { //input과 위아래 버튼, total 연결시키기
        $('#selected_product_up_' + (i + 1)).on('click', function(event) {
            event.preventDefault();
            var index = this.getAttribute('index');
            $selected_product_input = $('#selected_product_input_' + index);
            $selected_product_input.val(Number($selected_product_input.val()) + 1);
            $selected_product_input.trigger('change');
        });
        $('#selected_product_down_' + (i + 1)).on('click', function(event) {
            event.preventDefault();
            var index = this.getAttribute('index');
            $selected_product_input = $('#selected_product_input_' + index);
            $selected_product_input.val(Number($selected_product_input.val()) - 1);
            $selected_product_input.trigger('change');
        });
        $('#selected_product_input_' + (i + 1)).on('change', function() {
            if ($(this).val() <= 1) {
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
            for (var i = 0; i < selected_products.length; i++) { // 총 합 값 변경
                totalPrice += selected_products[i].num * selected_products[i].price;
            }
            $('#selected_table_total').text('총 계 : ' + totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원');

        });
        $('#selected_product_img_' + (i + 1)).css('background-image', 'url("../images/nav_busBtn_hover.png")'); //'url("../' + product.url + '")'
        $('#selected_product_input_' + (i + 1)).trigger('change');
    }
}

var changeSelectedProducts = function(selected_products_copy, type) { //selected_table_del 을 눌렀을 때 목록에서 삭제하는 코드, copy는 원래 products의 복사본이고 tmp는 이 click됐을 때에만 만들어서 쓰는 함수이다.

    $('#selected_table_del').on('click', function(event) {
        var count = 0;
        var selected_products_tmp = selected_products_copy.slice(0);
        event.preventDefault();
        $("input[name=product_checkbox]:checkbox").each(function() {
            if ($(this).is(":checked")) {
                var index = this.getAttribute('index') - count;
                count++;
                console.log("index", index);
                for (var i = index; i < selected_products_tmp.length; i++) {
                    selected_products_tmp[i - 1] = selected_products_tmp[i];
                }
                selected_products_tmp.pop();
            }
        });
        if (selected_products_tmp.length === 0) {
            alert('적어도 하나의 상품은 남겨야 합니다');
            return;
        } else {
            if (type === 1) {
                $.post('/myCart/post_foodProducts', {
                    cart_product: JSON.stringify(arrTo_idnumArr(selected_products_tmp)),
                    index: $.getUrlVar('index')
                }, function(result) {
                    if (result.code === 1) {
                        window.location.reload(true);
                    }
                });
            } else if (type === 2) {
                $.post('/myCart/post_foodProducts', {
                    cart_product: JSON.stringify(arrTo_idnumArr(selected_products_tmp)),
					cart_food_ID: $.getUrlVar('cart_food_ID')
                }, function(result) {
                    if (result.code === 1) {
                        window.location.reload(true);
                    }
                });
            } else {
                $.post('/food/post_selected', {
                    products: JSON.stringify(arrTo_idnumArr(selected_products_tmp))
                }, function(result) {
                    if (result.code === 1) {
                        window.location.reload(true);
                    }
                });
            }
        }
    });
}

var arrTo_idnumArr = function(arr) {
    var totalArr = [];
    arr.forEach(function(item, index) {
        totalArr.push({
            'num': item.num,
            '_id': item._id
        });
    });
    return totalArr;
}
$.extend({
    getUrlVars: function() {
        var vars = [],
            hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    getUrlVar: function(name) {
        return $.getUrlVars()[name];
    }
});
