$(function() {
    $('#counsel_btn').on('click', function(event) {
        event.preventDefault();
        var pensionOptionsStr = '{';
        $('input[type="checkbox"]').each(function(index) {
            console.log($(this).attr('pension'));
            if ($(this).is(':checked')) {
                pensionOptionsStr += '"' + $(this).attr('pension') + '"' + ':true,';
            } else {
                pensionOptionsStr += '"' + $(this).attr('pension') + '"' + ':false,';
            }
        });
        console.log(pensionOptionsStr);
        pensionOptionsStr = pensionOptionsStr.substring(0, pensionOptionsStr.length-1);
        pensionOptionsStr+='}';
        console.log(JSON.parse(pensionOptionsStr));
        console.log(JSON.parse(pensionOptionsStr).픽업);
    });
});
