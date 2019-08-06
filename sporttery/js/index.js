function scale(rednum, bluenum) {//投注注数
    if (rednum == 5) {
        rednum = 1;
    } else if (rednum == 6) {
        rednum = 6;
    } else if (rednum == 7) {
        rednum = 21;
    } else if (rednum == 8) {
        rednum = 56;
    } else if (rednum == 9) {
        rednum = 126;
    } else if (rednum == 10) {
        rednum = 252;
    } else if (rednum == 11) {
        rednum = 462;
    } else if (rednum == 12) {
        rednum = 792;
    } else if (rednum == 13) {
        rednum = 1287;
    } else if (rednum == 14) {
        rednum = 2002;
    } else if (rednum == 15) {
        rednum = 3003;
    } else if (rednum == 16) {
        rednum = 4368;
    } else if (rednum == 17) {
        rednum = 6188;
    } else if (rednum == 18) {
        rednum = 8568;
    } else {
        rednum = 0;
    }
    if (bluenum == 2) {
        bluenum = 1;
    } else if (bluenum == 3) {
        bluenum = 3;
    } else if (bluenum == 4) {
        bluenum = 6;
    } else if (bluenum == 5) {
        bluenum = 10;
    } else if (bluenum == 6) {
        bluenum = 15;
    } else if (bluenum == 7) {
        bluenum = 21;
    } else if (bluenum == 8) {
        bluenum = 28;
    } else if (bluenum == 9) {
        bluenum = 36;
    } else if (bluenum == 10) {
        bluenum = 45;
    } else if (bluenum == 11) {
        bluenum = 55;
    } else if (bluenum == 12) {
        bluenum = 66;
    } else {
        bluenum = 0;
    }
    return rednum * bluenum;
}


jQuery(function ($) {
    var arr_red = 36;//红色的
    var blue_red = 13;//红色的
    var html = '';
    var html_blue = '';
    var red = [];//红球
    var blue = [];//蓝球
    for (var i = 1; i < arr_red; i++) {
        if (i < 10) {//数字<10补0
            html += '<li>' + 0 + i + '</li>'
        } else {

            html += '<li>' + i + '</li>'
        }
    }
    $('.red_select ul').html(html);
    for (var i = 1; i < blue_red; i++) {
        if (i < 10) {
            html_blue += '<li>' + 0 + i + '</li>'
        } else {

            html_blue += '<li>' + i + '</li>'
        }
    }
    $('.blue_select ul').html(html_blue);
    $('.red_select ul li').each(function () {//红球为了在摇一摇时取随机数
        red.push($(this).text());
    })
    $('.blue_select ul li').each(function () {//蓝球为了在摇一摇时取随机数
        blue.push($(this).text());
    })

    $('#dlt .title .more').click(function () {//右上角下拉
        $('.more_list').slideToggle();
    })
    $('#dlt .remove').click(function () {//点击删除按钮清除样式
        $('.red_select ul li,.blue_select ul li').removeClass('red blue');
    });
    $('#dlt .red_select ul').on('click', 'li', function () {//点击增加红球样式
        $(this).toggleClass('red');
        var redlength = $('#dlt .red_select ul li.red').length;
        var bluelength = $('#dlt .blue_select ul li.blue').length;
        if (redlength > 18) {
            layer.open({
                content: '最多选择18个红球！'
                , type: 5
                , skin: 'demo-class'
                , time: 3//3秒后自动关闭
            });
            $('.red_select ul li,.blue_select ul li').removeClass('red blue');
        }
        ;
        if (scale(redlength, bluelength) > 1000) {//最多投注1000注判断
            layer.open({
                content: '投注注数最多1000注！'
                , type: 5
                , skin: 'demo-class'
                , time: 3//2秒后自动关闭
            });
            $('.red_select ul li,.blue_select ul li').removeClass('red blue');
            $('.num i').text(0);
            $('.price i').text(0);
            return;
        }
        $('.num i').text(scale(redlength, bluelength));
        $('.price i').text(scale(redlength, bluelength) * 3);
    });
    $('#dlt .blue_select ul').on('click', 'li', function () {//点击增加蓝球样式
        $(this).toggleClass('blue');
        var redlength = $('#dlt .red_select ul li.red').length;
        var bluelength = $('#dlt .blue_select ul li.blue').length;
        if (scale(redlength, bluelength) > 1000) {
            layer.open({
                content: '投注注数最多1000注！'
                , type: 5
                , skin: 'demo-class'
                , time: 3//2秒后自动关闭
            });
            $('.red_select ul li,.blue_select ul li').removeClass('red blue');
            $('.num i,.price i').text(0);
            return;
        }
        $('.num i').text(scale(redlength, bluelength));
        $('.price i').text(scale(redlength, bluelength) * 3);
    });
    // 点击确定按钮判断存储的localstorage
    // localStorage.clear();
    var list = JSON.parse(localStorage.getItem('list'));
    var lss = [];
    if (list) {
        lss = list;
    }
    $('.btn a').click(function () {
        var arr = [];
        $('.red_select .red').each(function () {
            arr.push($(this).text());
        })
        arr.push('&');
        $('.blue_select .blue').each(function () {
            arr.push($(this).text());
        })
        var num = $('.num i').text();
        var price = $('.price i').text();
        // console.log(arr);
        arr.push('|');
        arr.push(num);
        arr.push(price);
        lss.unshift(arr);
        var redLength = $('.red_select .red').length;
        var blueLength = $('.blue_select .blue').length;
        // console.log(redLength, blueLength);
        if (redLength < 5 || blueLength < 2) {
            layer.open({
                content: '请至少选择5个红球和2个篮球'
                , type: 5
                , skin: 'demo-class'
                , time: 3//2秒后自动关闭
            });
            $('.red_select ul li,.blue_select ul li').removeClass('red blue');
            lss.shift();
        }
        else {
            localStorage.setItem('list', JSON.stringify(lss));
            location.href = 'exchange.html';
        }

    });
    var SHAKE_SPEED = 300;
    var lastTime = 0;//上次变化的时间
    var x = y = z = lastX = lastY = lastZ = 0;//位置变量初始化

    function motionHandler(event) {
        var a;
        var b;
        a = getArrayItems(red, 5);
        b = getArrayItems(blue, 2);
        var acceleration = event.accelerationIncludingGravity;
        var curTime = Date.now();//取得当前时间
        if ((curTime - lastTime) > 120) {
            var diffTime = curTime - lastTime;
            lastTime = curTime;
            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;
            //计算摇动速度
            var speed = Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime * 1000;
            if (speed > SHAKE_SPEED) {
                if (navigator.vibrate) {
                    navigator.vibrate(150);
                } else if (navigator.webkitVibrate) {
                    navigator.webkitVibrate(150);
                }
                // $('.red_select ul li').removeClass('red');
                $('.red_select ul li,.blue_select ul li').removeClass('red blue');
                $('.red_select ul li').each(function () {
                    if ($(this).text() == a[0] || $(this).text() == a[1] || $(this).text() == a[2] || $(this).text() == a[3] || $(this).text() == a[4]) {
                        $(this).addClass('red');
                    }
                });
                // $('.blue_select ul li').removeClass('blue');
                $('.blue_select ul li').each(function () {
                    if ($(this).text() == b[0] || $(this).text() == b[1]) {
                        $(this).addClass('blue');
                    }
                });
                $('.num i').text('1');
                $('.price i').text('3');
            }
            lastX = x;
            lastY = y;
            lastZ = z;
        }
    }

    if (window.DeviceMotionEvent) {//手机摇一摇效果
        window.addEventListener('devicemotion', motionHandler, false);
    } else {
        alert("你的设备不支持位置感应");
    }
//     var contrastdata = JSON.parse(localStorage.getItem('contrastdata')),contrastdata1={},contrastdataArr=[];
// //如果localStorage.getItem('contrastdata')存在值，就先添加进数组里面
//     if(contrastdata){
//         contrastdataArr.push(contrastdata)
//     }
//     $('.btn a').click(function(){
//         //初始化contrastdata1临时变量
//         var contrastdata1={};
//         //设置contrastdata1
//         contrastdata1.Machinedata = $('.red_select .red').eq(0).text();
//         contrastdata1.UserNamedata = $('.red_select .red').eq(1).text();
//         contrastdata1.InstrumentIDdata = $('.red_select .red').eq(2).text();
//         //把contrastdata1添加进contrastdataArr;
//         contrastdataArr.push(contrastdata1)
//     });
//     //页面关闭时把contrastdataArr存储进localStorage(contrastdata)
//     localStorage.setItem('contrastdata',JSON.stringify(contrastdataArr));

});