function SmscodeCounter(seconds) {
    if (seconds == 0) {
        $('.obtain').css({'color': '#0EA8E3', 'font-size': '16px'});
        $('.obtain').text('发送验证码');
        $('.obtain').removeAttr('data-clicked');
        return;
    }
    $('.obtain').css({'color': 'gray', 'font-size': '13px'});
    $('.obtain').text(seconds + '秒后重发');
    seconds--;
    window.setTimeout(function () {
        SmscodeCounter(seconds);
    }, 1000);
}

jQuery(function ($) {
    var url="https://www.liangqiujiang.com";
    $('#register input[name=mobile]').blur(function () {
        var mobile = $(this).val();
        if ($.trim(mobile) == '') {
            $('#register input[name=mobile]').val('手机号码不能为空');
            return;
        } else if (!(/^1[3578][0-9]{9}$/).test(mobile)) {
            $('#register input[name=mobile]').val('手机号码格式错误');
            return;
        }
    })
    $('.obtain').click(function () {
        if ($('.obtain').attr('data-clicked')) {
            return;
        }
        $('.obtain').attr('data-clicked', 1);
        var mobile = $('#register input[name=mobile]').val();
        if ($.trim(mobile) == '') {
            $('div.error.mobile').val('手机号码不能为空');
            $('#register input[name=mobile]').focus();
            $('.obtain').removeAttr('data-clicked');
            return;
        } else if (!(/^1[3578][0-9]{9}$/).test(mobile)) {
            $('#register input[name=mobile]').val('手机号码格式错误');
            $('.obtain').removeAttr('data-clicked');
            return;
        }
        $.post(url+'/api/sms/getRegisterVerifyCode', {phone_number: mobile}, function (ret) {
            if (ret.status.code == 0) {
                layer.open({
                    content: '验证码已发送',
                    skin: 'msg',
                    time: 2,
                    end: function () {
                        SmscodeCounter(60);
                    }
                });
            } else {
                layer.open({
                    content: ret.status.message,
                    skin: 'msg',
                    time: 2
                });
                $('.obtain').removeAttr('data-clicked');
            }
        });
    });
    $('.submit a').click(function () {
        if ($('.submit a').attr('submited')) {
            return
        }
        $('.submit a').attr('submited', true)
        var mobile = $('#register input[name=mobile]').val();
        var password = $('#register input[name=smsCode]').val();
        $.post(url+'/api/sms/verifySms', {
            phone_number: mobile,
            verify_code: password
        }, function (res) {
            if (res.status.code == 0) {
                $.post(url+'/api/user/register', {
                    phone_number: mobile,
                    password: mobile,
                    confirm: mobile,
                    user_type: 'HEXUN'
                }, function (res) {
                    if (res.status.code == 0) {
                        $('form').empty();
                        $('.dalibao').show();
                        layer.open({
                            content: '注册成功，登录密码为手机号码',
                            skin: 'msg',
                            time: 2,
                            // end: function () {
                            //     location.href = 'https://tj-yun-ftn.weiyun.com/ftn_handler/af63e93fda7d04b8a59a0092f5792048afb8a4fe3fb52832c59c83939a68d0ff3508cca3d976161cb5aea6a3d65720b06f0ceac4fe6f5540d9230fc3c989442e/liangqiujiang.apk?fname=liangqiujiang.apk&from=30013&version=3.3.3.3&uin=635384571';
                            // }
                        });
                    } else {
                        layer.open({
                            content: '注册失败',
                            skin: 'msg',
                            time: 2
                        });

                    }
                })
            } else {
                layer.open({
                    content: res.status.message,
                    skin: 'msg',
                    time: 2
                });
            }
            $('.submit a').removeAttr('submited');
        })

    })
})