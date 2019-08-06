function need() {
    max = [];
    money = $(".common_list ul").map(function () {//每个ul
        return $(this).find(".active").length;
    }).get().join(',');
    $(".common_list ul").each(function () {
        var dd = [];
        // activeText=[];
        if ($(this).find('.active').length != 0) {
            $(this).find('.active').each(function () {
                // dd.push($(this).find('em').text());
                dd.push($(this).text());
            });
            max.push(Math.max.apply(null, dd));

        }
    })
    var yili = 1;
    for (var i in max) {
        yili = (yili * max[i])
    }
    $('.profit').text((yili * 2).toFixed(2));
    arr = money.replace(/[0,][,0]/g, '').split(',');
    jj = 1;
    for (var i = 0; i < arr.length; i++) {
        jj *= arr[i]
    }
    $('.need').text(jj * 2);
};

function formatData() {
    var allChildren = [];
    var sarr2 = [[]];
    $(".common_list ul").each(function () {
        var children = [];
        if ($(this).find('.active').length != 0) {
            $(this).find('.active').each(function () {
                var child = {};
                child.target_id = $(this).parent().find('.active').parents('.list').attr('data-target_id');
                child.result_id = $(this).attr('data-result');
                child.type_id = $(this).parent().find('.active').parent().attr('data-type_id');
                child.score = "";
                children.push(child);
                console.log(children);
            });
            allChildren.push(children)
        }
    })
    for (var i = 0; i < allChildren.length; i++) {
        var tarr2 = [];
        for (var j = 0; j < sarr2.length; j++) {
            for (var k = 0; k < allChildren[i].length; k++) {
                tarr2.push(sarr2[j].concat(allChildren[i][k]));
            }
        }
        sarr2 = tarr2;
    }
    return sarr2
}

jQuery(function ($) {
    $('.loading').show(); 
    if(sessionStorage.getItem('GetData')){
        $('.loading').hide();
    }else{
        $('.loading').show();
    }
    // 数据请求
    $.ajax({
        //url: 'package.json',
        url: baseUrl + '/api/integral/getBetsIndex',
        type: 'GET',
        dataType: 'json',
        success: function (res) {
            var week1 = [];
            var week2 = [];
            var week3 = [];
            var week4 = [];
            var week5 = [];
            var week6 = [];
            var week7 = [];
            var html = '';
            var w1 = '';
            var w2 = '';
            var w3 = '';
            var w4 = '';
            var w5 = '';
            var w6 = '';
            var w7 = '';
            //console.log(res);
            if (res.status.code == 0) {
                $('.loading').hide();
                $('#bet').show();
                console.log(res);
                var data = res.datalist;
                sessionStorage.setItem('GetData',data);
                for (var i = 0; i < data.length; i++) {
                    // console.log(data[i][1].single)
                    // console.log(data[i][2].single)
                    html = '<div class="list clearfix" data-target_id="' + data[i].target_id + '">'
                    html += '<div class="vs fr">'
                    html += '<div class="fl team">'
                    html += '<p>' + data[i].team_a + '</p>'
                    html += '</div>'
                    html += '<div class="fl clash">vs</div>'
                    html += '<div class="fl team">'
                    html += '<p>' + data[i].team_b + '</p>'
                    html += '</div>'
                    html += '</div>'
                    html += '<div class="datalist fl">'
                    html += '<div class="number fl tc">'
                    html += '<p>' + data[i].leg + '</p>'
                    html += '<p>' + data[i].week + '' + data[i].num + '</p>'
                    html += '<p>' + data[i].sporttery_time + '截止</p>'
                    html += '</div>'
                    html += '<div class="data fr">'
                    if (data[i][1] === undefined) {
                        html += '<ul class="clearfix upul noSingle">'
                    } else {
                        if (data[i][1].single == 0) {
                            html += '<ul class="clearfix upul noSingle" data-type_id="' + data[i][1].type_id + '">'
                        } else {
                            html += '<ul class="clearfix upul singleSelect" data-type_id="' + data[i][1].type_id + '">'
                        }
                    }
                    if (data[i][1] === undefined) {
                        html += '<li class="noselect">0</li><li class="noselect">0</li><li class="noselect">0</li><li class="noselect">0</li>'
                    } else {
                        if (data[i][1].fixedodds == '') {
                            html += '<li class="noselect">0</li><li data-result="4">' + data[i][1].a + '</li><li data-result="5">' + data[i][1].d + '</li><li data-result="6">' + data[i][1].h + '</li>'
                        } else {
                            html += '<li class="noselect">' + data[i][1].fixedodds + '</li><li data-result="4">' + data[i][1].a + '</li><li data-result="5">' + data[i][1].d + '</li><li data-result="6">' + data[i][1].h + '</li>'
                        }

                    }
                    html += '</ul>'
                    if (data[i][2] === undefined) {
                        html += '<ul class="clearfix downul noSingle">'
                    } else {
                        if (data[i][2].single == 0) {
                            html += '<ul class="clearfix downul noSingle" data-type_id="' + data[i][2].type_id + '">'
                        } else {
                            html += '<ul class="clearfix downul singleSelect" data-type_id="' + data[i][2].type_id + '">'
                        }
                    }
                    if (data[i][2] === undefined) {
                        html += '<li class="noselect">0</li><li class="noselect">0</li><li class="noselect">0</li><li class="noselect">0</li>'
                    } else {
                        // if (data[i][2].fixedodds != '') {
                            html += '<li class="noselect">' + data[i][2].fixedodds + '</li><li data-result="1">' + data[i][2].a + '</li><li data-result="2">' + data[i][2].d + '</li><li data-result="3">' + data[i][2].h + '</li>'
                        // }
                    }
                    html += '</ul>'
                    html += '</div>'
                    html += '</div>'
                    html += '</div>'
                    html += '</div>'
                    if (data[i].week == '周一') {
                        week1.push(data[i]);
                        w1 += html
                    }
                    if (data[i].week == '周二') {
                        week2.push(data[i]);
                        w2 += html
                    }
                    if (data[i].week == '周三') {
                        week3.push(data[i]);
                        w3 += html
                    }
                    if (data[i].week == '周四') {
                        week4.push(data[i]);
                        w4 += html
                    }
                    if (data[i].week == '周五') {
                        week5.push(data[i]);
                        w5 += html
                    }
                    if (data[i].week == '周六') {
                        week6.push(data[i]);
                        w6 += html
                    }
                    if (data[i].week == '周日') {
                        week7.push(data[i]);
                        w7 += html
                    }

                }
                if (week1.length != 0) {
                    $('.showlist').append($('<div class="oneday"></div>')
                        .append($('<div class="bet_con" data-flag="1"></div>').append($('<div class="time clearfix"></div>')
                            .append($('<span class="fl">' + week1[0].week + ' ' + week1[0].sporttery_date.substring(0, 10) + ' 共' + week1.length + '场</span>'))
                            .append($('<div class="fr"><img src="../images/down.png"  style="width: 60%" alt=""></div>'))
                        ))
                        .append($('<div class="common_list"></div>').append(w1))
                    )
                }
                if (week2.length != 0) {

                    $('.showlist').append($('<div class="oneday"></div>')
                        .append($('<div class="bet_con" data-flag="1"></div>').append($('<div class="time clearfix"></div>')
                            .append($('<span class="fl">' + week2[0].week + ' ' + week2[0].sporttery_date.substring(0, 10) + ' 共' + week2.length + '场</span>'))
                            .append($('<div class="fr"><img src="../images/down.png"  style="width: 60%" alt=""></div>'))
                        ))
                        .append($('<div class="common_list"></div>').append(w2))
                    )
                }
                if (week3.length != 0) {
                    $('.showlist').append($('<div class="oneday"></div>')
                        .append($('<div class="bet_con" data-flag="1"></div>').append($('<div class="time clearfix"></div>')
                            .append($('<span class="fl">' + week3[0].week + ' ' + week3[0].sporttery_date.substring(0, 10) + ' 共' + week3.length + '场</span>'))
                            .append($('<div class="fr"><img src="../images/down.png"  style="width: 60%" alt=""></div>'))
                        ))
                        .append($('<div class="common_list"></div>').append(w3))
                    )
                }
                if (week4.length != 0) {
                    $('.showlist').append($('<div class="oneday"></div>')
                        .append($('<div class="bet_con" data-flag="1"></div>').append($('<div class="time clearfix"></div>')
                            .append($('<span class="fl">' + week4[0].week + ' ' + week4[0].sporttery_date.substring(0, 10) + ' 共' + week4.length + '场</span>'))
                            .append($('<div class="fr"><img src="../images/down.png"  style="width: 60%" alt=""></div>'))
                        ))
                        .append($('<div class="common_list"></div>').append(w4))
                    )
                }
                if (week5.length != 0) {
                    $('.showlist').append($('<div class="oneday"></div>')
                        .append($('<div class="bet_con" data-flag="1"></div>').append($('<div class="time clearfix"></div>')
                            .append($('<span class="fl">' + week5[0].week + ' ' + week5[0].sporttery_date.substring(0, 10) + ' 共' + week5.length + '场</span>'))
                            .append($('<div class="fr"><img src="../images/down.png"  style="width: 60%" alt=""></div>'))
                        ))
                        .append($('<div class="common_list"></div>').append(w5))
                    )
                }
                if (week6.length != 0) {
                    $('.showlist').append($('<div class="oneday"></div>')
                        .append($('<div class="bet_con" data-flag="1"></div>').append($('<div class="time clearfix"></div>')
                            .append($('<span class="fl">' + week6[0].week + ' ' + week6[0].sporttery_date.substring(0, 10) + ' 共' + week6.length + '场</span>'))
                            .append($('<div class="fr"><img src="../images/down.png"  style="width: 60%" alt=""></div>'))
                        ))
                        .append($('<div class="common_list"></div>').append(w6))
                    )
                }
                if (week7.length != 0) {
                    $('.showlist').append($('<div class="oneday"></div>')
                        .append($('<div class="bet_con" data-flag="1"></div>')
                            .append($('<div class="time clearfix"></div>')
                                .append($('<span class="fl">' + week7[0].week + ' ' + week7[0].sporttery_date.substring(0, 10) + ' 共' + week7.length + '场</span>'))
                                .append($('<div class="fr"><img src="../images/down.png"  style="width: 60%" alt=""></div>'))
                            ))
                        .append($('<div class="common_list"></div>').append(w7))
                    )
                }
                $('.showlist .oneday:gt(0) .bet_con').attr('data-flag', 0);
            }
        },
        error: function (error) {
            console.log(error);
        },
    })
    var num = 0;//判关数
    var inputVal = 0;
    var allActive = [];
    var allResult = [];
    // 点击箭头收起放开
    $('.showlist').on('click', '.bet_con', function () {
        var flag = $(this).attr('data-flag');
        if (flag == 1) {
            $(this).find('img').css({transform: 'rotate(-180deg)'});
            $(this).next().slideUp();
            $(this).attr('data-flag', 0);
        } else {
            $(this).find('img').css({transform: 'rotate(0deg)'});
            $(this).next().slideDown();
            $(this).attr('data-flag', 1);
        }
    });

    // 判断让球数改变值
    $('.common_list .data ul li:nth-of-type(5)').each(function (index, i) {
        if ($(this).text() < 0) {
            $(this).css({'color': '#FF5961'});
        } else {
            $(this).css({'color': '#45B976'});
        }
    });
    // 点击li选择购买的胜平负一场比赛只能选择一种玩法进行串关计算
    $(".showlist").on('click', '.data ul.upul li:not(".noselect")', function () {
        var activeLength = $(this).parent().siblings().find('.active').length;
        $('.foot .submit input').val(1);
        if (activeLength == 0) {
            $(this).toggleClass('active');
        } else {
            alert('一场比赛只能选择一种玩法进行串关计算');
        }
        ;
        // need();
        // 判断当选择的不是单关时需选择俩场比赛提交按钮样式
        // if ($('.active').parent('.singleSelect').length >=2 || $('.active').parent('.noSingle').length >= 2||$('.active').parent('.noSingle').find('.Single').siblings('.active').length != 0|| $('.active').parent('.singleSelect').find('.Single').siblings('.active').length != 0) {
        if ($('.active').parent('.singleSelect').length != 0 || $('.active').parent('.noSingle').length >= 2) {
            $('#bet .foot').show();
            need();
        } else {
            $('#bet .foot').hide();
            $('.need').text(0);
            $('.profit').text(0);
        }
        inputVal = $('.need').text();
        profit = $('.profit').text();
        num = $('.showlist ul .active').parent().length;
        if (num != 1 && num != 0) {
            $('.submit .guan').text(num + '串1')
        } else {
            $('.submit .guan').text('单关')
        }
    });
    $(".showlist").on('click', '.data ul.downul li:not(".noselect")', function () {
        var activeLength = $(this).parent().siblings().find('.active').length;
        // console.log($(this).parent().find('.Single').length);
        $('.foot .submit input').val(1);
        if (activeLength == 0) {
            $(this).toggleClass('active');
        } else {
            alert('一场比赛只能选择一种玩法进行串关计算');
        }
        // if ($('.active').parent('.noSingle').find('.Single').siblings('.active').length != 0 || $('.active').parent('.noSingle').length >= 2||$('.active').parent('.noSingle').find('.Single').siblings('.active').length != 0  ) {
        if ($('.active').parent('.singleSelect').length != 0 || $('.active').parent('.noSingle').length >= 2) {
            $('#bet .foot').show();
            need();
        } else {
            $('#bet .foot').hide();
            $('.need').text(0);
            $('.profit').text(0);
        }
        // need();
        inputVal = $('.need').text();
        profit = $('.profit').text();
        num = $('.showlist ul .active').parent().length;
        // console.log(num);
        if (num != 1 && num != 0) {
            $('.submit .guan').text(num + '串1')
        } else {
            $('.submit .guan').text('单关')
        }
    });
    $('.foot .submit input').bind('input propertychange', function () {
        var value = $(this).val();
        // console.log(value);
        var reg = /^[1-9]\d*$|^0$/;
        if (reg.test(value) == true) {
            $('.need').text(inputVal * value);
            $('.profit').text((profit * value).toFixed(2));
        }
        if (value.length == 1) {
            $(this).val($(this).val().replace(/[^1-9]/g, ''));

        } else if (value > 9999) {
            alert('最大投注倍数9999！');
            $('.common_list ul li').removeClass('active');
            $('.foot').hide();
            // $(this).val(0);
            // $('.need').text(0);
            // $('.profit').text(0);
        }
        else {
            $(this).val($(this).val().replace(/\D/g, ''));
        }
        if (value == "") {
            $('.need').text(0);
            $('.profit').text(0);
        }
    });
    $('.submit .normal').click(function () {
        var need_total=$('.foot .need').text();
        var send = {
            "total": need_total,
            "platform_id": "1",
            "user_key": "liuze001"
        };
        var sarr2 = formatData();
        var items = [];
        for (var i = 0; i < sarr2.length; i++) {
            var item = {};
            item.notes = 1;
            item.per = 10;
            item.children = [];
            item.children = sarr2[i];
            items.push(item);
        }
        send.item = JSON.stringify(items);
        console.log(send);
        $.ajax({
            url: baseUrl + '/api/sporttery/addSporttery',
            data: send,
            dataType: 'json',
            type: 'post',
            success: function (res) {
                // alert('兑换成功！')
                console.log(res);
                if(res.status.code==0){
                    alert('兑换成功！')
                }
            },
            error: function (error) {
                console.log(error);
            },
        })
    })
})