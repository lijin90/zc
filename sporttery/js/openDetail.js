function common(date,week,html){
    $('.send').append($('<div class="biaoti clearfix"></div>')
        .append($('<span class="tl">'+date+ week[0].sporttery_date.substr(0, 10) + '</span>'))
        .append($('<span class="tc">共' + week.length + '场</span>')).append($('<span class="tr"></span>')))
    $('.send').append($('<div class="datalist">' + html + '</div>'));
}
jQuery(function ($) {
    var myDate = new Date(); //获取今天日期
    var year=myDate.getFullYear();
    myDate.setDate(myDate.getDate() - 7);
    var dateArray = [];
    var endArry=[];
    var dateTemp;
    var flag = 1;
    var lilist='';
    for (var i = 0; i < 8; i++) {
        if(myDate.getDate()<10){
            dateTemp =year+"-"+ (myDate.getMonth()+1)+"-"+"0"+myDate.getDate();
        }else{
            dateTemp =year+"-"+ (myDate.getMonth()+1)+"-"+myDate.getDate();
        }
        endArry.push(dateTemp);
        myDate.setDate(myDate.getDate() + flag);
    }
    dateArray=endArry.slice(0,7);
    console.log(dateArray);
    console.log(endArry);
    for(var i=0;i<dateArray.length;i++){
        lilist+='<li data-date="'+dateArray[i]+'">'+dateArray[i].slice(-2)+'日</li>'
    };

    $('.time').html(lilist);
    $('.time').on('click','li',function(){
        var i=$(this).index();
        console.log(i);
        $('.loading').show();
        var currentDate=$(this).attr('data-date');
        $('.time li').removeClass('active');
        $(this).addClass('active');
        $('.biaoti.clearfix,.datalist').remove();
        $.ajax({
            url: baseUrl + '/api/integral/getAllOpenResult',
            data: {
                start_time: endArry[i],
                // start_time: '2018-07-24',
                end_time: endArry[i+1],
            },
            dataType: 'json',
            type: "GET",
            success: function (res) {
                if (res.status.code == 0) {
                    $('.loading').hide();
                    $('#openDetail').show();
                    var data = res.datalist;
                    var html1 = '';
                    var html2 = '';
                    var html3 = '';
                    var html4 = '';
                    var html5 = '';
                    var html6 = '';
                    var html7 = '';
                    var week1 = [];
                    var week2 = [];
                    var week3 = [];
                    var week4 = [];
                    var week5 = [];
                    var week6 = [];
                    var week7 = [];
                    var change = '';
                    if(data.length!=0){
                        $('.send .nothing').hide();
                        for (var i = 0; i < data.length; i++) {
                            change += '<div class="clearfix team">';
                            change += '<div class="clearfix mb10">';
                            change += '<div class="league fl">';
                            change += '<span style="background:#'+data[i].back_ground+'">' + data[i].l_cn_abbr.substr(0,3) + '</span>';
                            change += '<i>' + data[i].num + '</i>';
                            change += '</div>';
                            change += '<div class="teamName fl">';
                            change += '<span>' + data[i].a_cn.substr(0, 4) + '</span>';
                            if(data[i][3] == undefined){
                                change += '<span>暂无数据</span>';
                            }else{
                                change += '<span>' + data[i][3].prs_name + '</span>';
                            }

                            change += '<span>' + data[i].h_cn.substr(0, 4) + '</span>';
                            change += '</div></div><table>';
                            change += '<tr><th>胜平负</th><th>让球</th><th>比分</th><th>总进球</th><th>半全场</th></tr>';
                            if (data[i][1] == undefined) {
                                change += '<tr><td><p>暂无数据</p><span>暂无数据</span></td>';
                            } else {
                                change += '<tr><td><p>' + data[i][1].prs_name + '</p><span>' + data[i][1].odds + '</span></td>';
                            }
                            if (data[i][2] == undefined) {
                                change += '<td><p>暂无数据</p><span>暂无数据</span></td>';
                            } else {
                                change += '<td><p>' + data[i][2].prs_name + '</p><span>' + data[i][2].odds + '</span></td>';
                            }
                            if (data[i][3] == undefined) {
                                change += '<td><p>暂无数据</p><span>暂无数据</span></td>';
                            } else {
                                change += '<td><p>' + data[i][3].prs_name + '</p><span>' + data[i][3].odds + '</span></td>';
                            }
                            if (data[i][4] == undefined) {
                                change += '<td><p>暂无数据</p><span>暂无数据</span></td>';
                            } else {
                                change += '<td><p>' + data[i][4].prs_name + '</p><span>' + data[i][4].odds + '</span></td>';
                            }
                            if (data[i][5] == undefined) {
                                change += '<td><p>暂无数据</p><span>暂无数据</span></td></tr></table></div>';
                            } else {
                                change += '<td><p>' + data[i][5].prs_name + '</p><span>' + data[i][5].odds + '</span></td></tr></table></div>';
                            }
                            // change += '<td><p>' + data[i][2].prs_name + '</p><span>' + data[i][2].odds + '</span></td><td><p>' + data[i][3].prs_name + '</p><span>' + data[i][3].odds + '</span></td>';

                            // change += '<td><p>' + data[i][4].prs_name + '</p><span>' + data[i][4].odds + '</span></td><td><p>' + data[i][5].prs_name + '</p><span>' + data[i][5].odds + '</span></td></tr></table></div>';
                            // if (data[i].week == '周一') {
                            //     week1.push(data[i]);
                            //     html1 += change;
                            // }
                            // if (data[i].week == '周二') {
                            //     week2.push(data[i]);
                            //     html2 += change;
                            // }
                            // if (data[i].week == '周三') {
                            //     week3.push(data[i]);
                            //     html3 += change;
                            //
                            // }
                            // if (data[i].week == '周四') {
                            //     week4.push(data[i]);
                            //     html4 += change;
                            //
                            // }
                            // if (data[i].week == '周五') {
                            //     week5.push(data[i]);
                            //     html5 += change;
                            //
                            // }
                            // if (data[i].week == '周六') {
                            //     week6.push(data[i]);
                            //     html6 += change;
                            //
                            // }
                            // if (data[i].week == '周日') {
                            //     week7.push(data[i]);
                            //     html7 += change;
                            // }
                        }
                        // if (week1.length != 0) {
                        //     common('周一',week1,html1)
                        // }
                        // if (week2.length != 0) {
                        //     common('周二',week2,html2)
                        // }
                        // if (week3.length != 0) {
                        //     common('周三',week3,html3)
                        // }
                        // if (week4.length != 0) {
                        //     common('周四',week4,html4)
                        // }
                        // if (week5.length != 0) {
                        //     common('周五',week5,html5)
                        // }
                        // if (week6.length != 0) {
                        //     common('周六',week6,html6)
                        // }
                        // if (week7.length != 0) {
                        //     common('周日',week7,html7)
                        // }
                        $('.send').append($('<div class="datalist">' + change + '</div>'));
                    }else{
                        $('.send .nothing').show();
                    }

                }
            },
            error: function (error) {
                console.log(error);
            },
        })
    });
    $('.time li:eq(6)').addClass('active').click();
});
