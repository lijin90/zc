// function getArrayItems(arr, num) {
//     //新建一个数组,将传入的数组复制过来,用于运算,而不要直接操作传入的数组;
//     var temp_array = new Array();
//     for (var index in arr) {
//         temp_array.push(arr[index]);
//     }
//     //取出的数值项,保存在此数组
//     var return_array = new Array();
//     for (var i = 0; i < num; i++) {
//         //判断如果数组还有可以取出的元素,以防下标越界
//         if (temp_array.length > 0) {
//             //在数组中产生一个随机索引
//             var arrIndex = Math.floor(Math.random() * temp_array.length);
//             //将此随机索引的对应的数组元素值复制出来
//             return_array[i] = temp_array[arrIndex];
//             //然后删掉此索引的数组元素,这时候temp_array变为新的数组
//             temp_array.splice(arrIndex, 1);
//         } else {
//             //数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
//             break;
//         }
//     }
//     return return_array;
// }

// var ArrList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33];
// alert(getArrayItems(ArrList,6));
jQuery(function ($) {
    var redlist = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35"];
    var bluelist = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    var html;
    var cun = JSON.parse(localStorage.getItem('list'));
    var h;
    var sum = 0;
    for (var i in cun) {
        var red5 = cun[i].slice(0, cun[i].indexOf('&')).join(',').replace(/[^0-9]/ig, " ");
        var blue2 = cun[i].slice(cun[i].indexOf('&'), cun[i].indexOf('|')).join(',').replace(/[^0-9]/ig, " ");
        var num = cun[i].slice(-2, -1).join(',').replace(/[^0-9]/ig, " ");
        var price = cun[i].slice(-1).join(',').replace(/[^0-9]/ig, " ");
        sum += parseFloat(price);
        h = '<li class="orderNum"><span class="orderDel"></span><div class="orderLi"><span class="red mr20">' + red5 + '</span><span class="blue">' + blue2 + '</span></div><div class="orderDesc">单式：' + num + '注<i>需<em>' + price + '.00</em>钢镚</i></div></li>'
        $('.orderList ul').append(h);
        $('.orderCoinType em').text(sum + '.00');
    }

    $('.random_select').click(function () {
        var red = getArrayItems(redlist, 5);
        var blue = getArrayItems(bluelist, 2);
        var n = ["|", "1"];
        var pc = ["3"];
        var addnum = 0;
        cun.unshift(red.concat("&", blue, n, pc));
        var blue = JSON.stringify(blue).replace(/[^0-9]/ig, " ");
        var red = JSON.stringify(red).replace(/[^0-9]/ig, " ");
        localStorage.setItem('list', JSON.stringify(cun));
        html = '<li class="orderNum"><span class="orderDel"></span><div class="orderLi"><span class="red mr20">' + red + '</span><span class="blue">' + blue + '</span></div><div class="orderDesc">单式：1注<i>需<em>3.00</em>钢镚</i></div></li>'
        $('.orderList ul').prepend(html);
        if ($('.orderNum').length != 0) {
            $('.noneText').hide();
            $('.btnSubmit ').removeClass('grayBg').removeAttr('disabled');
        }
        ;
        for (var i in cun) {
            addnum += parseFloat(cun[i].slice(-1).join(',').replace(/[^0-9]/ig, " "));
            $('.orderCoinType em').text(addnum + '.00');
        }
        // 根据li的长度计算钢镚
        // $('.orderList ul .orderDesc em').each(function () {
        //     sum += parseFloat($(this).text());
        // })
        // $('.orderCoinType em').text(sum + '.00');
    });

    $('.orderList').on('click', '.orderDel', function () {//点击删除按钮删除对应的列表
        var self = this;
        var minus = 0;
        layer.open({
            content: '确认删除？'
            , btn: ['取消', '删除']
            , yes: function (index, layero) {
                //按钮【按钮一】的回调
                layer.close(index);
            }
            , no: function (index, layero) {
                cun.splice($(self).parent('li').index(), 1);
                $(self).parent('.orderNum').remove();
                localStorage.setItem('list', JSON.stringify(cun));
                if ($('.orderNum').length == 0) {
                    $('.noneText').show();
                    $('.orderCoinType em').text('--');
                }
                for (var i in cun) {
                    minus += parseFloat(cun[i].slice(-1).join(',').replace(/[^0-9]/ig, " "));
                    $('.orderCoinType em').text(minus + '.00');
                }
                if ($('.orderNum').length == 0) {//暂无兑换 立即兑换
                    $('.noneText').show();
                    $('.btnSubmit ').addClass('grayBg').attr('disabled', 'disabled');
                }
            }
        });

    });
    if ($('.orderNum').length == 0) {//暂无兑换 立即兑换
        $('.noneText').show();
        $('.btnSubmit ').addClass('grayBg').attr('disabled', 'disabled');
    } else {
        $('.noneText').hide();
        $('.btnSubmit ').removeClass('grayBg').removeAttr('disabled');
    }
    ;

    // 立即兑换
    $('.btnSubmit').click(function () {
        cun.splice(0, cun.length);
        alert(1)
        // $('.orderList .orderNum').remove();
        // localStorage.setItem('list', JSON.stringify(cun));
        // $('.noneText').show();
        // $('.btnSubmit ').addClass('grayBg').attr('disabled', 'disabled');
        // $('.orderCoinType em').text('--');
    })

})