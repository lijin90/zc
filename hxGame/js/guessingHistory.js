var vm = new Vue({
    el: "#history",
    data: {
        user_key:"",
        platform_id:1,
        historyList:[],
        hotList:[],
        url: "https://www.liangqiujiang.com",
        // url: "http://192.168.1.117:8080",
    },
    created:function(){
        this.platform_id = location.href.split("&")[0].split("=")[1];
        this.user_key = location.href.split("=")[2];
        this.getHistoryData(0);
        $(".guessinghistory").on("click","li",function(){
            window.location.href="./guessingDetails.html"
        });
    },
    mounted: function () {
        // console.log(this.$refs);
        // $(this.$refs.dataShow).show();
        setTimeout(function(){
            $('.data-show').show()
        },500)
    },
    methods: {
        getHistoryData:function (lea_type) {
            axios.get(this.url + "/api/game/getGuesForHistory?user_key="+this.user_key+"&platform_id="+this.platform_id).then(function (res) {
                if (res.data.status != undefined && res.data.status.code == '0') {
                    vm.historyList=res.data.datalist;
                    vm.historyList.forEach(function (temp,index) {
                        temp.returnAmount = (temp.bets_amount*temp.current_odds).toFixed(2);
                    })
                }
            })
        },
        turnTODetail:function (gues_id) {
            window.location.href="./guessingDetails.html?user_key="+this.user_key+"&gues_id="+gues_id;
        }
    }
})