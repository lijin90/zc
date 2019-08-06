var vm = new Vue({
    el: "#rank",
    data: {
        user_key:"",
        platform_id:'',
        rankList:[],
        url: "https://www.liangqiujiang.com",
        // url: "http://192.168.1.117:8080",
    },
    created:function(){
        this.getRankData(0);
    },
    mounted: function () {
        this.turnToHistory();
        this.platform_id = location.href.split("&")[0].split("=")[1];
        this.user_key = location.href.split("=")[2];
        setTimeout(function () {
            $('.data-show').show();
        },500)
    },
    methods: {
        getRankData:function (lea_type) {
            axios.get(this.url + "/api/game/getUserRankList?platform_id="+this.platform_id).then(function (res) {
                if (res.data.status != undefined && res.data.status.code == '0') {
                    vm.rankList=res.data.datalist;

                }
            })
        },
        turnToDetail:function (disc_id,user_key) {
            if(user_key != '' && user_key != undefined){
                window.location.href="./guessingRankingsDetail.html?disc_id="+disc_id+"&user_key="+this.user_key+"&platform_id="+this.platform_id;
            }else{
                layer.open({
                    content: '无用户参与该场次比赛竞猜',
                    skin:'msg',
                    time: 2
                });
                // alert("无用户参与该场次比赛竞猜")
            }

        },
        turnToHistory:function () {
            $("#guessingHistory").click(function(){
                window.location.href="./guessingHistory.html?platform_id="+vm.platform_id+"&user_key="+vm.user_key;
            })
        }
    }
})