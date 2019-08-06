(function ($) {
    // $.fn.tableUI = function (options) {
    //     var defaults = {
    //         evenColor: '#dddddd', //偶数行颜色
    //         oddColor: '#ffffff',  //奇数行颜色
    //         activeColor: '#09f', //激活行颜色
    //         changeFlag: true,     //是否开启隔行变色
    //         oldColor: ''
    //     }
    //     var options = $.extend(defaults, options);
    //     return this.each(function () {
    //         var thisTable = $(this);
    //         if (options.changeFlag) {                //奇偶行颜色
    //             $(thisTable).find('tr:even').css('background', options.evenColor);
    //             $(thisTable).find('tr:odd').css('background', options.oddColor);                //激活行颜色
    //             $(thisTable).find('tr').bind('mouseover', function () {                    //保存原来的颜色，以便于移出时恢复
    //                 options.oldColor = $(this).css('background');
    //                 $(this).css('background', options.activeColor);
    //             });
    //             $(thisTable).find('tr').bind('mouseout', function () {
    //                 $(this).css('background', options.oldColor);
    //             })
    //         }
    //     })
    // }
    var methods = {
        init: function (options) {
            var defaults = {
                evenColor: '#dddddd', //偶数行颜色
                oddColor: '#ffffff',  //奇数行颜色
                activeColor: '#09f', //激活行颜色
                changeFlag: true,     //是否开启隔行变色
                oldColor: ''
            }
            var options = $.extend(defaults, options);
            return this.each(function () {
                var thisTable = $(this);
                if (options.changeFlag) {                //奇偶行颜色
                    $(thisTable).find('tr:even').css('background', options.evenColor);
                    $(thisTable).find('tr:odd').css('background', options.oddColor);                //激活行颜色
                    $(thisTable).find('tr').bind('mouseover', function () {                    //保存原来的颜色，以便于移出时恢复
                        options.oldColor = $(this).css('background');
                        $(this).css('background', options.activeColor);
                    });
                    $(thisTable).find('tr').bind('mouseout', function () {
                        $(this).css('background', options.oldColor);
                    })
                }
            })
        },
        add:function(options){
            var defaults = {
                count:1
            }
            var options = $.extend(defaults, options);
            $(this).click(function(){
                $(this).html('好不错')
            })
        }
    }
    $.fn.tooltip = function (method) {
        // 方法调用
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method' + method + 'does not exist on jQuery.tooltip');
        }
    };
})(jQuery);