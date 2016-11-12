$(function() {
    $table_stock = $('#table_stock');
    showStockTable($table_stock, []);
    connectInsertForm();
});
var showStockTable = function($table_stock, option) {
    var text = '';
    $.post('/admin12345abcde/post_stockProducts', {
        option: JSON.stringify(option)
    }, function(data) {
        if (data.code === 1) {
            var stockProducts = JSON.parse(data.stockProducts);
            console.log('1', stockProducts);
            stockProducts.forEach(function(item, index) {
                text += '<tr>';
                text += '   <th>';
                text += '       <input type="checkbox" index="' + (index + 1) + '"/>';
                text += '   </th>';
                text += '   <th>';
                text += '       <p>' + item._id + '</p>';
                text += '   </th>';
                text += '   <th>';
                text += '       <p>' + item.name + '</p>';
                text += '   </th>';
                text += '   <th>';
                text += '       <p>' + item.price + '</p>';
                text += '   </th>';
                text += '   <th>';
                text += '       <p>' + item.content + '</p>';
                text += '   </th>';
                text += '   <th>';
                text += '       <p>' + item.unit + '</p>';
                text += '   </th>';
                text += '   <th>';
                text += '       <p>' + item.url + '</p>';
                text += '   </th>';
                text += '   <th>';
                text += '       <p>' + item.category + '</p>';
                text += '   </th>';
                text += '   <th>';
                text += '       <p>' + item.default+'</p>';
                text += '   </th>';
                text += '   <th>';
                text += '       <p>' + item.info + '</p>';
                text += '   </th>';
                text += '   <th>';
                text += '       <a href="#" name="delete" id="' + item._id + '">삭제</a>';
                text += '   </th>';
                text += '</tr>';
            });
            $table_stock.html(text);
            $('a[name="delete"]').each(function() {
                $(this).on('click', function(event) {
                    event.preventDefault();
                    $.get('/admin12345abcde/stock/delete?_id=' + $(this).attr('id'), function(result) {
                        console.log(result.code);
                        if (result.code === 1) {
                            showStockTable($table_stock, option);
                        }
                    });
                });
            });
        }
    });
}
var connectInsertForm = function() {
    var $submit = $('#newProduct_Btn');
    $submit.on('click', function() {
        var _id = $('#newProduct_id').val();
        if (_id === '') {
            alert('_id값 필수');
            return;
        }
        var name = $('#newProduct_name').val();
        var price = $('#newProduct_price').val();
        var content = $('#newProduct_content').val();
        var unit = $('#newProduct_unit').val();
        var url = $('#newProduct_url').val();
        var category = $('#newProduct_category').val();
        var def = $('#newProduct_default').val();
        var info = $('#newProduct_info').val();

        var newProduct = {
            '_id': _id,
            'name': name,
            'price': price,
            'content': content,
            'unit': unit,
            'url': url,
            'category': category,
            'default': def,
            'info': info
        };
        console.log(newProduct);
        $.post('/admin12345abcde/stock/insert', {
            'newProduct': JSON.stringify(newProduct)
        }, function(result) {
            if (result.code === 1) {
                console.log('success');
                alert('입력 성공');
                showStockTable($table_stock, []);
            }
        });
    });
}
