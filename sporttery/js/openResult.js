jQuery(function ($) {
    var href = location.href.split("=")[1];
    $.ajax({
        url: baseUrl + '/api/sporttery/getUserOrderList?order_id=' + href,
        dataType: 'json',
        type: "GET",
        success: function (res) {
            var data = res.datalist;
            var html = '';
            var con = '';
            var order = '';
            if (res.status.code == 0) {
                $('.loading').hide();
                $('#openresult').show();
                for (var i = 0; i < data.length; i++) {
                    // console.log(data[i].item.length)
                    html = '<div class="detail_status">'
                    html += '<div class="result_detail clearfix">'
                    html += '<div class="fl clearfix">'
                    html += '<img class="fl" src="../images/defult.png" alt="">'
                    html += '<div class="fl pay_money">'
                    html += ' <h1>竞彩足球</h1>'
                    html += '<p>自购' + data[i].total + '元</p>'
                    html += '</div>'
                    html += '</div>'
                    if (data[i].status == 1) {
                        html += '<img class="fr" src="../images/wait.png" alt="">'
                    }
                    if (data[i].status == 2) {
                        html += '<img class="fr" src="../images/losing.png" alt="">'
                    }
                    if (data[i].status == 3) {
                        html += '<img class="fr" src="../images/success.png" alt="">'
                    }

                    html += '</div>'
                    html += '<ul class="clearfix win_status">'
                    if (data[i].status == 1) {
                        html+='<li><p>订单状态</p><span>待开奖</span></li><li><p>出票状态</p>'
                        if(data[i].ticket == 1){
                            html+='<span>未出票</span></li>'
                        }else if(data[i].ticket == 2){
                            html+='<span>出票成功</span></li>'
                        }else if(data[i].ticket == 3){
                            html+='<span>出票失败</span></li>'
                        }else if(data[i].ticket == 4){
                            html+='<span>部分出票</span></li>'
                        }
                        html+='<li><p>税后到账奖金</p><span>待开奖</span></li>'
                        // html += '<li><p>订单状态</p><span>待开奖</span></li><li><p>出票状态</p><span>已出票</span></li><li><p>税后到账奖金</p><span>待开奖</span></li>'
                    }
                    if (data[i].status == 2) {
                        html+='<li><p>订单状态</p><span>未中奖</span></li><li><p>出票状态</p>'
                        if(data[i].ticket == 1){
                            html+='<span>未出票</span></li>'
                        }else if(data[i].ticket == 2){
                            html+='<span>出票成功</span></li>'
                        }else if(data[i].ticket == 3){
                            html+='<span>出票失败</span></li>'
                        }else if(data[i].ticket == 4){
                            html+='<span>部分出票</span></li>'
                        }
                        html+='<li><p>税后到账奖金</p><span>' + data[i].money + '元</span></li>'
                        // html += '<li><p>订单状态</p><span>未中奖</span></li><li><p>出票状态</p><span>已出票</span></li><li><p>税后到账奖金</p><span>' + data[i].money + '元</span></li>'
                    }
                    if (data[i].status == 3) {
                        html+='<li><p>订单状态</p><span>已中奖</span></li><li><p>出票状态</p>'
                        if(data[i].ticket == 1){
                            html+='<span>未出票</span></li>'
                        }else if(data[i].ticket == 2){
                            html+='<span>出票成功</span></li>'
                        }else if(data[i].ticket == 3){
                            html+='<span>出票失败</span></li>'
                        }else if(data[i].ticket == 4){
                            html+='<span>部分出票</span></li>'
                        }
                        html+='<li><p>税后到账奖金</p><span>' + data[i].money + '元</span></li>'
                        // html += '<li><p>订单状态</p><span>已中奖</span></li><li><p>出票状态</p><span>已出票</span></li><li><p>税后到账奖金</p><span>' + data[i].money + '元</span></li>'
                    }
                    html += '</ul>'
                    html += '</div>'

                    con = '<div class="result_con">'
                    con += '<div class="result_con_title">'
                    con += '<span>投注内容</span>'
                    con += '</div>'
                    con += '<table>'
                    con += '<tr>'
                    con += ' <th>场次</th><th>主队 VS 客队</th> <th>玩法</th><th>投注（赔率）</th><th>彩果</th>'
                    con += '</tr>'
                    for (var j = 0; j < data[i].item.length; j++) {
                        for (var k = 0; k < data[i].item[j].children.length; k++) {
                            con += '<tr>'
                            con += '<td><p>' + data[i].item[j].children[k].week + '</p> <span>' + data[i].item[j].children[k].num + '</span></td>'
                            if (data[i].item[j].children[k].score == '') {
                                con += '<td><p>' + data[i].item[j].children[k].a_cn.substr(0, 3) + '</p><span>0:0</span><p>' + data[i].item[j].children[k].h_cn.substr(0, 3) + '</p></td>'
                            } else {
                                con += '<td><p>' + data[i].item[j].children[k].a_cn.substr(0, 3) + '</p><span>' + data[i].item[j].children[k].score + '</span><p>' + data[i].item[j].children[k].h_cn.substr(0, 3) + '</p></td>'
                            }

                            if (data[i].item[j].children[k].had_type_id == 1) {
                                con += '<td><p>胜平负</p></td>'
                            } else {
                                con += '<td><p>让球胜平负</p></td>'
                            }
                            if (data[i].item[j].children[k].odds == undefined) {
                                con += '<td><p class="red">' + data[i].item[j].children[k].result_description + '</p><span>暂无赔率</span></td>'
                            } else {
                                con += '<td><p class="red">' + data[i].item[j].children[k].result_description + '</p><span>' + data[i].item[j].children[k].odds + '</span></td>'
                            }

                            if (data[i].item[j].children[k].prs_name == undefined) {
                                con += '<td><p class="red">未开奖</p></td>'
                            } else {
                                con += '<td><p class="red">' + data[i].item[j].children[k].prs_name + '</p></td>'
                            }
                            con += '</tr>'
                        }

                    }
                    con += '</table>'
                    con += '</div>'
                    order = '<div class="place_order">'
                    order += '<p class="clearfix">'
                    order += '<i></i><span>下单时间：</span><span>下单时间：</span>'
                    order += '</p>'
                    order += '<p class="clearfix">'
                    order += '<i></i><span>下单时间：</span><span>下单时间：</span>'
                    order += '</p>'
                    order += '<p class="clearfix">'
                    order += '<i></i><span>下单时间：</span><span>下单时间：</span>'
                    order += '</p>'
                    order += '<p class="clearfix">'
                    order += '<i></i><span>下单时间：</span><span>下单时间：</span>'
                    order += '</p>'
                    order += '</div>'
                }
                $('.result .reault_append').append(html, con);
            }
        },
        error: function (error) {
            console.log(error);
        },
    })
})