$(function(){
	if($.getUrlVar('isNeedLogin') === 'true'){
		// Usage!
		sleep(500).then(() => {
			if($('a[data-modal-id').text() === '로그인'){
				$('a[data-modal-id]').trigger('click');
				console.log('isNeedLogin~');
			}
		});
	}
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

function sleep (time) {
	return new Promise((resolve) => setTimeout(resolve, time));
}