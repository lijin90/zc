var vm = new Vue({
    el: "#rankDetail",
    data: {
        user_key: '',
        platform_id: '',
        disc_id: '',
        rankDetail: {},
        rankMain: {},
        url: "https://www.liangqiujiang.com",
        // url: "http://192.168.1.117:8080",
    },
    created: function () {
        this.platform_id = location.href.split("&")[2].split("=")[1];
        this.user_key = location.href.split("&")[1].split("=")[1];
        this.disc_id = location.href.split("&")[0].split("=")[1];
        this.getRankDetailData();
    },
    mounted: function () {
        this.turnToHistory();
    },
    methods: {
        getRankDetailData: function () {
            axios.get(this.url + "/api/game/getUserRankDetail?platform_id=" + this.platform_id + "&disc_id=" + this.disc_id + "&user_key=" + this.user_key).then(function (res) {
                if (res.data.status != undefined && res.data.status.code == '0') {
                    vm.rankDetail = res.data.data;
                    vm.rankDetail.item.forEach(function (value) {
                        value.amount =value.amount.toFixed(2);
                    })
                    vm.rankMain = res.data.data.main;
                    if(res.data.data.main != undefined && res.data.data.main.amount != null)
                        vm.rankMain.amount =   vm.rankMain.amount.toFixed(2);
                }
            })
        },
        turnToHistory: function () {
            $("#guessingHistory").click(function () {
                window.location.href = "./guessingHistory.html?platform_id=" + vm.platform_id + "&user_key=" + vm.user_key;
            })
        }
    }
})