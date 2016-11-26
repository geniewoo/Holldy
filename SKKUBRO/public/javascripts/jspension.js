$(function() {
    $('#counsel_btn').on('click', function(event) {
        event.preventDefault();
        var pensionOptions = {};
        var pensionLocationArr =[];
        var nowdate = new Date();
        pensionOptions.nowdate = nowdate.getFullYear() + '-'+ (nowdate.getMonth() + 1) + '-' + nowdate.getDate();
        pensionOptions.nowtime = nowdate.getHours() + ':' + nowdate.getMinutes();
        pensionOptions.departdate = $('#datePicker1').val()
        pensionOptions.num = $('#travelNum').val()
        $('input[name="location"]').each(function(index) {
            var tempJSON = {};
            tempJSON.name = $(this).attr('pension');
            if ($(this).is(':checked')) {
                tempJSON.value = true;
            } else {
                tempJSON.value = false;
            }
            pensionLocationArr.push(tempJSON);
        });
        pensionOptions.location = pensionLocationArr;

        var pensionFacilitiesArr =[];
        $('input[name="facilities"]').each(function(index) {
            var tempJSON = {};
            tempJSON.name = $(this).attr('pension');
            if ($(this).is(':checked')) {
                tempJSON.value = true;
            } else {
                tempJSON.value = false;
            }
            pensionFacilitiesArr.push(tempJSON);
        });
        pensionOptions.facilities = pensionFacilitiesArr;

        var pensionServicesArr =[];
        $('input[name="services"]').each(function(index) {
            var tempJSON = {};
            tempJSON.name = $(this).attr('pension');
            if ($(this).is(':checked')) {
                tempJSON.value = true;
            } else {
                tempJSON.value = false;
            }
            pensionServicesArr.push(tempJSON);
        });
        pensionOptions.services = pensionServicesArr;
/*        $.post('/myCart/post_pensionOptions', {'pensionOptions' : JSON.stringify(pensionOptions)}, function(result){
            if(result.code === 1 ){
                window.location.href = '/myCart';
            }else{
                console.log('오류오류');
            }
        });
*/        console.log(pensionOptions);
    });
});
