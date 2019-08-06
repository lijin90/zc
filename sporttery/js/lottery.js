jQuery(function ($) {
    $('.status li').click(function () {
        var self = this;
        $(self).addClass('active').siblings().removeClass('active');
        // $('.datalist .tab').eq($(self).index()).addClass('show').siblings().removeClass('show');
    });
    $('.status li:eq(0)').click(function () {
        $('.con').show();
    })
    $('.status li:eq(1)').click(function () {
        $('.con').hide();
        $('.con.wait_lottery').show();
    })
    $('.status li:eq(2)').click(function () {
        $('.con').hide();
        $('.con.get_lottery').show();
    })
    // 数据渲染

    $.ajax({
        // url: 'http://192.168.1.117:8080/api/sporttery/getUserOrderList?user_key=liuze123',
        url: baseUrl + '/api/sporttery/getUserOrderList?user_key=liuze001',
        dataType: 'json',
        type: "GET",
        success: function (res) {
            if (res.status.code == 0) {
                var html = '';
                var data = res.datalist;
                for (var i = 0; i < data.length; i++) {
                    // console.log(data[i].status);
                    if(data[i].status === 1){
                        html += '<div class="con wait_lottery">'
                    }
                    if(data[i].status === 2){
                        html += '<div class="con losing_lottery">'
                    }
                    if(data[i].status === 3){
                        html += '<div class="con get_lottery">'
                    }
                    html += '<a href="openResult.html?item='+data[i].order_id+'" class="clearfix">'
                    // html += '<a href="openResult.html?item=1" class="clearfix">'

                    html += '<div class="fl team">'
                    html += '<img class="fl" src="../images/defult.png" alt="">'
                    html += '<div class="fl number">'
                    html += '<h2>竞彩足球</h2>'
                    html += '<p>自购' + data[i].total + '</p>'
                    html += '</div></div><div class="fl time">'
                    if (data[i].status === 1) {
                        html += '<h2 class="wait">待开奖</h2>'
                    }
                    if (data[i].status === 2) {
                        html += '<h2 class="losing">未中</h2>'
                    }
                    if (data[i].status === 3) {
                        html +=  '<h2>中奖'+data[i].money+'元</h2>'
                    }
                    html +=  '<p>'+data[i].time+'</p>'
                    html += '</div>'
                    html += '</a>'
                    html += '</div>'
                }
                $('.tab').append(html);
            }
        },
        error: function (error) {
            console.log(error);
        },
    })
})