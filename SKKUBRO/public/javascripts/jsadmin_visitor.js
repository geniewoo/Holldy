$(function() {
    $.get('/admin12345abcde/visitor/join', function(data) {
        console.log(data);
        var clientsData = data.clientsData;
        var today = new Date();
        today = getDate(today);
        $('#joinMonthBtn').on('click', function(event) {
            var counter = 0;
            clientsData.forEach(function (item, index){
                if(today === item.joinDate.substring(0,10)){
                    counter ++;
                }
            });
            console.log(counter);
            event.preventDefault();
        });
        $('#joinWeekBtn').on('click', function(event) {
            event.preventDefault();
        });
        $('#joindayBtn').on('click', function(event) {
            event.preventDefault();
        });
    });
});

var getDate = function(date){
    var returnDate = date.getFullYear() + '-';
    if(date.getMonth() < 9){
        returnDate += '0' + (date.getMonth() + 1) + '-';
    }else{
        returnDate += (date.getMonth() + 1) + '-';
    }
    if(date.getDate() < 10){
        returnDate += '0' + date.getDate();
    }else{
        returnDate += date.getDate();
    }
    return returnDate;
}
