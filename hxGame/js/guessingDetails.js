var vm = new Vue({
    el: "#detail",
    data: {
        user_key: "",
        platform_id: 1,
        gues_id: '',
        item: {},
        detail: [],
        url: "https://www.liangqiujiang.com",
        //   url: "http://192.168.1.117:8080",
        // url: "http://www.liangqiujiang.com:8081",
    },
    created: function () {
        this.user_key = location.href.split("&")[0].split("=")[1];
        this.gues_id = location.href.split("=")[2];
        this.getHistoryDetailData();
    },
    mounted: function () {
        this.turnToHistory();
    },
    methods: {
        getHistoryDetailData: function () {
            axios.get(this.url + "/api/game/getGuesForHistoryDetail?platform_id=" + this.platform_id + "&user_key=" + this.user_key + "&gues_id=" + this.gues_id).then(function (res) {
                if (res.data.status != undefined && res.data.status.code == '0') {
                    vm.detail = res.data.datalist[0];
                }
            })
        },
        turnToHistory: function () {
            $("#guessingHistory").click(function () {
                window.location.href = "./guessingHistory.html?platform_id=" + vm.platform_id + "&user_key=" + vm.user_key;
            })
        },
    }
})