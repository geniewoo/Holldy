$(function() {
    $id = $('#id');
    $pw = $('#pw');
    $btn = $('#btn');
    $btn.on('click', function() {
        $.post('/admin12345abcde/loginAdmin', {
            ID: $id.val(),
            PW: $pw.val()
        }, function(result) {
            if (result.code === 1) {
                window.location.href = "/admin12345abcde/cat";
            } else {
                alert('로그인 실패');
            }
        });
    });
});
