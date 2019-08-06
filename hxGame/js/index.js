var vm = new Vue({
    el: "#index",
    data: {
        user_key: "",
        platform_id: 1,
        indexList: [],
        hotList: [],
        hotGues: [],
        type: '',
        url: "https://www.liangqiujiang.com",
        // url: "http://192.168.1.117:8080",
    },
    filters: {
        substr: function (value) {
            return value.substring(0, 2)
        },
    },
    created: function () {
        this.platform_id_hexun = location.href.split("&")[0].split("=")[1];
        this.user_key = location.href.split("=")[2];
        this.getIndexData(0);
        $(function () {
            $('.type-main i').click(function () {
                $('.type-main i').removeClass('all1 world-cup1 league1');
                var index = $('.type-main i').index(this);
                $(".item-list").hide().eq(index).show();
                if (index == 0) {
                    $(this).addClass("all1");
                } else if (index == 1) {
                    $(this).addClass("world-cup1");
                } else {
                    $(this).addClass("league1")
                }
            })
            var mySwiper = new Swiper('.swiper-container', {
                autoplay: 5000,
                observer: true,
                loop: true,
                observeParents: true,
            });
        })

    },
    mounted: function () {
        // this.press();
        this.turnToHistory();
        this.turnToPlayState();
        this.turnToRankList();
        // $(this.$refs.dataShow).show();
    },
    updated: function () {
        $(function () {
            setTimeout(function () {
                $('.no_data').show()
            },500)
            $('.popularity').each(function () {
                var partOne = parseInt($(this).find('.part-one').attr("dataValue"));
                var partTwo = parseInt($(this).find('.part-two').attr("dataValue"));
                var partThree = parseInt($(this).find('.part-three').attr("dataValue"));
                var sum = partOne + partTwo + partThree;
                if (partOne == partTwo && partOne == partThree && partTwo == partThree) {
                    $(this).find('div').width(33.33 + '%');
                }
                else if (partOne == 0) {
                    $(this).find('.part-one').width(10 + '%');
                    $(this).find('.part-two').width(($(this).find('.part-two').attr("dataValue") / sum) * 100 - 5 + '%')
                    $(this).find('.part-three').width(($(this).find('.part-three').attr("dataValue") / sum) * 100 - 5 + '%')
                } else if (partTwo == 0) {
                    $(this).find('.part-two').width(10 + '%');
                    $(this).find('.part-one').width(($(this).find('.part-one').attr("dataValue") / sum) * 100 - 5 + '%')
                    $(this).find('.part-three').width(($(this).find('.part-three').attr("dataValue") / sum) * 100 - 5 + '%')
                } else if (partThree == 0) {
                    $(this).find('.part-three').width(10 + '%');
                    $(this).find('.part-one').width(($(this).find('.part-one').attr("dataValue") / sum) * 100 - 5 + '%')
                    $(this).find('.part-two').width(($(this).find('.part-two').attr("dataValue") / sum) * 100 - 5 + '%')
                }
                else {
                    $(this).find('.part-one').width(($(this).find('.part-one').attr("dataValue") / sum) * 100 + '%')
                    $(this).find('.part-two').width(($(this).find('.part-two').attr("dataValue") / sum) * 100 + '%')
                    $(this).find('.part-three').width(($(this).find('.part-three').attr("dataValue") / sum) * 100 + '%')
                }
                if (partOne == 0 && partTwo == 0) {
                    $(this).find('.part-one').width(10 + '%');
                    $(this).find('.part-two').width(10 + '%');
                    $(this).find('.part-three').width(($(this).find('.part-three').attr("dataValue") / sum) * 100 - 20 + '%')
                } else if (partOne == 0 && partThree == 0) {
                    $(this).find('.part-one').width(10 + '%');
                    $(this).find('.part-three').width(10 + '%');
                    $(this).find('.part-two').width(($(this).find('.part-two').attr("dataValue") / sum) * 100 - 20 + '%')
                }
                else if (partThree == 0 && partTwo == 0) {
                    $(this).find('.part-three').width(10 + '%');
                    $(this).find('.part-two').width(10 + '%');
                    $(this).find('.part-one').width(($(this).find('.part-one').attr("dataValue") / sum) * 100 - 20 + '%')
                }
                if (partOne == 0 && partTwo == 0 && partThree == 0) {
                    $(this).find('.part-one,.part-two,.part-three').width(33.33 + '%');
                }
            })
        })
    },
    methods: {
        getIndexData: function (lea_type) {
            axios.get(this.url + "/api/game/getGuesDiscForIndex?lea_type_id=" + lea_type + "&platform_id=" + this.platform_id).then(function (res) {
                if (res.data.status != undefined && res.data.status.code == '0') {
                    vm.indexList = res.data.data.indexList;
                    vm.hotList = res.data.data.hotList;
                    if (vm.hotList.length > 0) {
                        vm.hotGues = vm.hotList[0];
                    }
                }
            });
        },

        turnToDetail: function (disc_id) {
            window.location.href = "./guessing.html?disc_id=" + disc_id + "&user_key=" + this.user_key
        },
        turnToHistory: function () {
            $("#guessingHistory").click(function () {
                window.location.href = "./guessingHistory.html?platform_id=" + vm.platform_id + "&user_key=" + vm.user_key;
            })
        },
        turnToPlayState: function () {
            $("#explain").click(function () {
                window.location.href = "./explain.html?platform_id=" + vm.platform_id + "&user_key=" + vm.user_key;
            })
        },
        turnToRankList: function () {
            $("#guessingRankdetail").click(function () {
                window.location.href = "./guessingRankings.html?platform_id=" + vm.platform_id + "&user_key=" + vm.user_key;
            })
        },
        hideMore: function (event) {
            var el = event.currentTarget;
            if (!$(el).hasClass("upper")) {
                $(el).parent().siblings().hide();
                $(el).addClass('upper').removeClass('lower');
            } else {
                $(el).parent().siblings().show();
                $(el).addClass('lower').removeClass('upper');
            }
        },
    }
})