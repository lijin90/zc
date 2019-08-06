var vm = new Vue({
    el: "#gues",
    data: {
        user_key: "",
        platform_id: 1,
        disc_id: '',
        gues: [],
        odds: {},
        bets: {},
        returnAmount: '',
        betsAmount: '500',
        betsType: '',
        guesTypeId: '',
        // url: "https://www.liangqiujiang.com",
        url: "http://192.168.1.117:8080",
    },
    created: function () {
        this.disc_id = location.href.split("&")[0].split("=")[1];
        this.user_key = location.href.split("=")[2];
        this.getDetailData();
    },
    mounted: function () {
        // this.betsRead();
        // this.betsing();
        this.turnToHistory();
    },
    methods: {
        getDetailData: function () {
            axios.get(this.url + "/api/game/getGuesDiscForDetail?disc_id=" + this.disc_id).then(function (res) {
                if (res.data.status != undefined && res.data.status.code == '0') {
                    vm.gues = res.data.data;
                    vm.odds = res.data.data.odds;
                }
            })
        },
        hide: function (e) {
            var el = e.currentTarget;
            $(el).hide();
            $(".dialog-wrapper").hide();
            $(".item").removeClass('active');
        },
        betsWDL: function (type, typeId,e) {
            var el=e.currentTarget;
            vm.betsType = type;
            vm.guesTypeId = typeId;
            $(".item").removeClass('active');
            $(el).addClass('active');
            $(".mask").show();
            $(".dialog-wrapper").show();
            vm.returnAmount = vm.betsType == 'HDW' ? vm.odds.had_win * vm.betsAmount : vm.betsType == 'HDD' ? vm.odds.had_deuce * vm.betsAmount : vm.betsType == 'HDL' ? vm.odds.had_lose * vm.betsAmount :
                vm.betsType == 'HHDW' ? vm.odds.hhad_win * vm.betsAmount : vm.betsType == 'HHDD' ? vm.odds.hhad_deuce * vm.betsAmount : vm.betsType == 'HHDL' ? vm.odds.hhad_lose * vm.betsAmount : 0;
            vm.returnAmount = vm.returnAmount.toFixed(2);
            axios.get(vm.url + "/api/game/readyForBets?user_key=" + vm.user_key + "&disc_id=" + vm.disc_id + "&bets_type=" + vm.betsType + "&gues_type=" + vm.guesTypeId + "").then(function (res) {
                if (res.data.status != undefined && res.data.status.code == '0') {
                    vm.bets = res.data.data;
                }
            })

        },
        tab: function (e) {
                var el=e.target;
                $(el).siblings().removeClass('active2');
                $(el).toggleClass('active2');
                vm.betsAmount = $(el)[0].value;
                vm.returnAmount = vm.betsType == 'HDW' ? vm.odds.had_win * vm.betsAmount : vm.betsType == 'HDD' ? vm.odds.had_deuce * vm.betsAmount : vm.betsType == 'HDL' ? vm.odds.had_lose * vm.betsAmount :
                    vm.betsType == 'HHDW' ? vm.odds.hhad_win * vm.betsAmount : vm.betsType == 'HHDD' ? vm.odds.hhad_deuce * vm.betsAmount : vm.betsType == 'HHDL' ? vm.odds.hhad_lose * vm.betsAmount : 0;
                vm.returnAmount = vm.returnAmount.toFixed(2);
        },
        touzhu: function () {
            $(".dialog-wrapper").hide();
            $(".mask").hide();
            $(".item").removeClass('active');
            if(vm.bets.balance*1 > vm.betsAmount*1){
                axios.get(vm.url + "/api/gues/checkIsClose?disc_id="+vm.disc_id+"&gues_type="+vm.guesTypeId).then(function (res) {
                    if (res.data.status != undefined && res.data.status.code == '0') {
                        if(res.data.data.is_close == 1){
                            layer.open({
                                content: '已封盘!',
                                skin:'msg',
                                time: 2
                            });
                        }else{
                            axios.get(vm.url + "/api/game/addGuessing?user_key=" + vm.user_key + "&disc_id=" + vm.disc_id + "&bets_amount=" + vm.betsAmount + "&bets_type=" + vm.betsType + "&gues_type=" + vm.guesTypeId).then(function (res) {
                                if (res.data.status != undefined && res.data.status.code == '0') {
                                    //下注成功！
                                    if (res.data.data.status == 'SUCCESS') {
                                        layer.open({
                                            content: '下注成功!',
                                            skin:'msg',
                                            time: 2
                                        });
                                    } else {
                                        if(res.data.data.bizCode == 'OVER_LIMIT')
                                            layer.open({
                                                content: '投注次数超过限制!',
                                                skin:'msg',
                                                time: 2
                                            });
                                    }
                                }
                            })
                        }
                    }
                })
            }else{
                layer.open({
                    content: '余额不足!',
                    skin:'msg',
                    time: 2
                });
            }

            this.$options.methods.getDetailData.bind(this)();
        },
        turnToHistory: function () {
            $("#guessingHistory").click(function () {
                window.location.href = "./guessingHistory.html?platform_id=" + vm.platform_id + "&user_key=" + vm.user_key;
            })
        }
    }
})