$(function() {
    $('#commWriteBtn').on('click', function(event) {
        event.preventDefault();
        var totalSize = 0;
        var formDatas = new FormData();
        $.each($('#commWriteFile')[0].files, function(index) {
            console.log(this);
            if (!filecheck(this.name)) {
                alert('.jpg, gif, jpeg, bmp, png 파일만 업로드 가능합니다');
                return;
            }
            formDatas.append('image' + index, this);

            totalSize += this.size;
            console.log(totalSize / 1024);
        });
        for (var pair of formDatas.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        if (totalSize / 1024 > 20480) {
            alert('20MB초과입니다');
            return;
        } else {
            console.log(formDatas);
            $.ajax({
                type: "post",
                url: '/admin12345abcde/community/post_writeNotice',
                data: formDatas,
                processData: false,
                contentType: false,
                success: function(data) {
                    if (result.code === 1) {
                        location.replace('admin12345abcde/community');
                    }
                },
                error: function(err) {
                    console.log(err);
                    alert('글쓰기 오류');
                }
            });
            /*$.post('/admin12345abcde/community/post_writeNotice', formDatas, function(result) {
                if (result.code === 1) {
                    location.replace('admin12345abcde/community');
                }
            });*/
        }
    });
    $(document).on('click', '#files_send', function() {
        var formData = new FormData();

        for (var i = 0; i < $('#photo_upload')[0].files.length; i++) {
            formData.append('uploadFile', $('#photo_upload')[0].files[i]);
        }

        $.ajax({
            url: '/admin12345abcde/community/post_writeNotice',
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data) {
                console.log(data);
            }
        });
    });

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
