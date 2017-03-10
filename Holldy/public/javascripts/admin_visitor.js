$(function() {
    $.get('/admin12345abcde/visitor/get_join', function(data) {
        connectJoin(data);
    });
    connectVisitor();
});
getVisitorData = function(addressName, nowYear, nowMonth){
    $.get('/admin12345abcde/visitor/get_visitors?addressName=' + addressName +'&yearMonth=2016-12', function(data){
        var visitorsData = data.data;
        setVisitorInfo(nowYear, nowMonth, visitorsData);
    });
}
var connectVisitor = function(){
    var today = new Date();
    var nowYear = today.getFullYear();
    var nowMonth = (today.getMonth()+1);
    getVisitorData('/main', nowYear, nowMonth);
    $('a[name="visitor_a"]').each(function(){
        $(this).on('click', function(event){
            event.preventDefault();
            getVisitorData($(this).text(), nowYear, nowMonth);
        });
    });
}
var connectJoin = function(data){
    var clientsData = data.clientsData;
    var today = new Date();
    var nowYear = today.getFullYear();
    var nowMonth = (today.getMonth()+1);
    setJoinInfo(nowYear, nowMonth, clientsData);

    $('#join_selectMonth_preMonth').on('click', function(event) {
        event.preventDefault();
        var changed = changeYearMonth({year:nowYear, month:nowMonth, val:-1});
        console.log(changed.month);
        nowYear = changed.year;
        nowMonth = changed.month;
        console.log(nowYear, nowMonth);
        setVisitorsInfo(nowYear, nowMonth, clientsData);
    });

    $('#join_selectMonth_postMonth').on('click', function(event) {
        event.preventDefault();
        var changed = changeYearMonth({year:nowYear, month:nowMonth, val:1});
        nowYear = changed.year;
        nowMonth = changed.month;
        setJoinInfo(nowYear, nowMonth, clientsData);
    });
}
var getDate = function(date){
    var returnDate = date.getFullYear() + '-';
    if(date.getMonth() < 9){
        returnDate += '0' + (date.getMonth() + 1);
    }else{
        returnDate += (date.getMonth() + 1);
    }
    return returnDate;
}
var changeYearMonth = function(info){
    info.month += info.val;
    console.log(info.month, info.val);
    if(info.month <= 0){
        info.month = 12;
        info.year -= 1;
    }else if(info.month >= 13){
        info.month = 1;
        info.year += 1;
    }
    return info;
}
var setJoinInfo = function(year, month, clientsData){
    event.preventDefault();
    var today = year + '-' + month;
    $('#join_selectMonth_nowMonth').text(today);
    $('#joinInfo_tbody').html('');
    var counter = 0;
    var thText = '';
    clientsData.forEach(function (item, index){
        if(today === item.joinDate.substring(0,7)){
            counter ++;
            thText += "<tr>";
            thText += "<th></th>";
            thText += "<th>" + item._id + "</th>";
            thText += "<th>" + item.joinDate.substring(0,10) + "</th>";
            thText += "</tr>";
        }
    });
    $('#joinInfo_tbody').html(thText);
    $('#joinInfo_num').text(counter);
}

var setVisitorInfo = function(year, month, visitorsData){
    event.preventDefault();
    var today = year + '-' + month;
    $('#visitor_selectMonth_nowMonth').text(today);
    $('#visitorsInfo_tbody').html('');
    var totalCount = 0;
    var thText = '';
    visitorsData.forEach(function (item, index){
        if(today === item.yearMonth){
            totalCount += item.count;
            thText += "<tr>";
            thText += "<th></th>";
            thText += "<th>" + item.date + "</th>";
            thText += "<th>" + item.hour + "</th>";
            thText += "<th>" + item.count + "</th>";
            thText += "</tr>";
        }
    });
    $('#visitorInfo_tbody').html(thText);
    $('#visitorInfo_num').text(totalCount);
}