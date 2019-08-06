jQuery(function ($) {
    // baseUrl='http://192.168.1.130:8080';
    baseUrl = 'http://www.liangqiujiang.com';
    // 竞彩足球点击导航下拉
    $('.title .more').click(function () {//右上角下拉
        var flag = $(this).attr('data-flag');
        $('.more_list').slideToggle();
        if (flag == 1) {
            $('.mask').show();
            $('.title .more').attr('data-flag', 0)
        } else {
            $('.mask').hide();
            $('.title .more').attr('data-flag', 1)
        }
    })
    $('.mask').click(function () {
        $(this).hide();
        $('.more_list').slideToggle();
        $('.title .more').attr('data-flag', 1)
    })
})