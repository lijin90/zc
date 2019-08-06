jQuery(function ($) {
    $.ajax({//获取用户余额信息
        url: baseUrl + '/api/user/getUserBalance?sessionkey=49fbead61457efd2f34bd8c42b36c70b',
        dataType: 'json',
        type: "GET",
        success: function (res) {
            var html;
            if (res.status.code == 0) {
                for (var i = 0; i < res.datalist.length; i++) {
                    html = '<div class="fl clearfix head">'
                    if (res.datalist[i].head_img_url == undefined) {
                        html += '<img src="../images/defult.png" alt="" class="fl">'
                    }
                    else {
                        html += '<img src="' + res.datalist[i].head_img_url + '" alt="" class="fl">'
                    }
                    html += '<div class="fl">'
                    html += '<span>' + res.datalist[i].name + '</span>'
                    if (res.datalist[i].status_id == undefined) {
                        html += ' <p>未认证</p>'
                    } else if (res.datalist[i].status_id == 1) {
                        html += ' <p>审核中</p>'
                    } else if (res.datalist[i].status_id == 2) {
                        html += ' <p>绑定成功</p>'
                    } else if (res.datalist[i].status_id == 3) {
                        html += ' <p>拒绝</p>'
                    }
                    html += '</div>'
                    html += '</div>'
                    html += '<div class="fr">'
                    html += '<span style="font-size: 0.4rem">' + res.datalist[i].balance + '</span>'
                    html += '<p>可用匠币</p>'
                    html += '</div>'
                }
            }
            $('.bgtp').append(html);
        },
        error: function (error) {
            console.log(error);
        },
    });

    // 点击立即兑换
    $('img.immediately').click(function(){
        $.ajax({
            url: baseUrl + '/api/user/convertBalance',
            type:"POST",
            data:{
                sessionkey:'49fbead61457efd2f34bd8c42b36c70b',
                convert_secret:'ISCD2018081404293597'
            },
            success: function (res) {
                console.log(res);
                if (res.status.code == 0) {

                }
            },
            error: function (error) {
                console.log(error);
            },
        });
    })
})