$(function(){
	var findID = $.getUrlVar('findID');
	$('#findedID').text(findID);
    $('#localLogin_btn').on('click',function(event){
        event.preventDefault();
        $('a[data-modal-id]').trigger('click');//header_nav에 있는 버튼 누르기 trigger
    });
});

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
