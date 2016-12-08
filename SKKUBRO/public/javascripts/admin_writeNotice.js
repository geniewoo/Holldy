$(function(){
    $('#commWriteBtn').on('click', function(event){
        event.preventDefault();
        var totalSize = 0;
        $.each($('#commWriteFile')[0].files, function(item, index){
            console.log(this);
            if(!filecheck(this.name)){
                alert('.jpg, gif, jpeg, bmp, png 파일만 업로드 가능합니다');
                return;
            }
            totalSize += this.size;
            console.log(totalSize/1024);
        });
        if(totalSize/1024 > 20480){
            alert('20MB초과입니다');
            return;
        }else{
            var formDatas = new FormData($('#commWriteFile')[0]);
            console.log(formDatas);
            $.post('/admin12345abcde/community/post_writeNotice', formDatas, function(result){
                if(result.code === 1){
                    location.replace('admin12345abcde/community');
                }
            });
        }
    });
});
function filecheck(name){
    console.log(name);
    var pathpoint = name.lastIndexOf('.');
    console.log(pathpoint);
    var filepoint = name.substring(pathpoint+1, name.length);
    var filetype = filepoint.toLowerCase();
    console.log(filetype);
    if(filetype == 'jpg' || filetype == 'gif' || filetype == 'jpeg' || filetype == 'bmp' || filetype == 'png'){
        return true;
    }else{
        return false;
    }
}
