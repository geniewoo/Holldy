$(function() {
    $('#commWriteEmail').val($.getUrlVar('email'));
    $(document).on('click', '#files_send', function() {
        var formData = new FormData();
        var totalSize = 0;
        if ($('#commWriteTitle').val() == '') {
            alert('제목을 최소 한글자 이상 입력해 주세요');
            return;
        }
        if ($('#photo_upload')[0].files.length > 0) {
            for (var i = 0; i < $('#photo_upload')[0].files.length; i++) {
                if (!filecheck($('#photo_upload')[0].files[i].name)) {
                    alert('.jpg, gif, jpeg, bmp, png 파일만 업로드 가능합니다');
                    return;
                }
                formData.append('uploadFile', $('#photo_upload')[0].files[i]);
                totalSize += $('#photo_upload')[0].files[i].size;
            }
            if (totalSize / 1024 > 10240) {
                alert('20MB초과입니다');
                return;
            }
            $.ajax({
                url: '/community/post_uploadImage?catName=QnA',
                data: formData,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function(data) {
                    console.log(data);
                    if (data.code === 1) {
                        var imagePaths = data.imagePaths;
                        var commWriteTitle = $('#commWriteTitle').val();
                        var commWriteCont = $('#commWriteCont').val();
                        var postData = {
                            commWriteTitle: commWriteTitle,
                            commWriteCont: commWriteCont,
                            imagePaths: imagePaths
                        };
                        if($('#commWriteLocked').is(':checked')){
                            postData.locked = true;
                        }else{
                            postData.locked = false;
                        }
                        console.log(postData);
                        $.post('/community/post_writeQnAText', {
                            commWrite: JSON.stringify(postData)
                        }, function(result) {
                            if (result.code === 1) {
                                window.location.href = '/community';
                            }
                        });
                    }else{
                        alert('이미지 업로드 실패');
                    }
                }
            });
        } else {
            var commWriteTitle = $('#commWriteTitle').val();
            var commWriteCont = $('#commWriteCont').val();
            var commWriteName = $('#commWriteName').val();
            var postData = {
                commWriteTitle: commWriteTitle,
                commWriteCont: commWriteCont
            };
            if($('#commWriteLocked').is(':checked')){
                postData.locked = true;
            }else{
                postData.locked = false;
            }
            console.log(postData);
            $.post('/community/post_writeQnAText', {
                commWrite: JSON.stringify(postData)
            }, function(result) {
                if (result.code === 1) {
                    window.location.href = '/community';
                }
            });
        }
    });
    //handleFilesSelect 실행되는지 알방법없음
    function handleFileSelect(evt) {
        var files = evt.target.files; // FileList object

        // Loop through the FileList and render image files as thumbnails.
        for (var i = 0, f; f = files[i]; i++) {
            // Only process image files.
            if (!f.type.match('image.*')) {
                continue;
            }
            var reader = new FileReader();
            // Closure to capture the file information.
            reader.onload = (function(theFile) {
                return function(e) {
                    // Render thumbnail.
                    var span = document.createElement('span');
                    span.innerHTML = ['<img class="thumb" src="', e.target.result,
                    '" title="', escape(theFile.name), '"/>'
                    ].join('');
                    document.getElementById('list').insertBefore(span, null);
                };
            })(f);

            // Read in the image file as a data URL.
            reader.readAsDataURL(f);
        }
    }
});

function filecheck(name) {
    console.log(name);
    var pathpoint = name.lastIndexOf('.');
    console.log(pathpoint);
    var filepoint = name.substring(pathpoint + 1, name.length);
    var filetype = filepoint.toLowerCase();
    console.log(filetype);
    if (filetype == 'jpg' || filetype == 'gif' || filetype == 'jpeg' || filetype == 'bmp' || filetype == 'png') {
        return true;
    } else {
        return false;
    }
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