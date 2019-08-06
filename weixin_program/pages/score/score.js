const app = getApp()
Page({
  data: {
    winHeight: "", //窗口高度
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    headList: [],
    resorse: [],
    currentTab: 0,
    navScrollLeft: 0,
    pageDown: 1,
    pageUp: 0,
    leagueid: 0,
    scrollTop: 100,
    animationData: {},
    opacity:0,
    datalist: [],
    show: true
  },
  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function () {

  },
  analyze: function (event) { //点击锦囊跳转页面
    var testId = event.currentTarget.dataset.season_id;
    var team_a = event.currentTarget.dataset.teama;
    app.requestDetailid = testId;
    // app.requestDetailid = team_a;
    // console.log(team_a);
    wx.navigateTo({
      url: '../scoreDetail/scoreDetail?team=' + team_a
    });
  },
  getListData: function(leagueid) {
    var that = this;
    that.setData({
      opacity:0
    })
    wx.showLoading({
      title: '加载中',
    });
    wx.request({ //获取重要数据
      url: app.globalData.baseUrl + "/api/season/home?page_number=1&page_size=50&league_id=" + leagueid,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function(res) {
        if (res.data.status.code = '0') {
          for (var i = 0; i < res.data.datalist.length; i++) {
            that.data.resorse.push(res.data.datalist[i]);
          }
          var list = that.data.resorse;
          var listb = [];
          for (var i = 0; i < list.length; i++) {
            var playTime = list[i].play_year + '年' + list[i].play_month;
            if (listb.indexOf(playTime) == -1) {
              listb.push(playTime);
            }
          }
          var sortListb = listb.sort();
          var dataArr = [];
          for (var i = 0; i < listb.length; i++) {
            var obj = {};
            obj.item = [];
            obj['name'] = listb[i];
            dataArr.push(obj);
            for (var j = 0; j < list.length; j++) {
              var playTime = list[j].play_year + '年' + list[j].play_month;
              if (listb[i] == playTime) {
                obj.item.push(list[j]);
              }
            }
          }
          for (var i = 0; i < dataArr.length; i++) { //队名截取四个字
            for (var j = 0; j < dataArr[i].item.length; j++) {
              dataArr[i].item[j].team_a = dataArr[i].item[j].team_a.substr(0, 5);
              dataArr[i].item[j].team_b = dataArr[i].item[j].team_b.substr(0, 5);
            }
          }
          wx.hideLoading();
          var animation = wx.createAnimation({
            transformOrigin: "30% 100%",
            duration: 300,
            timingFunction: "ease",
          })
          animation.opacity(1).step();
          if (dataArr.length == 0) {
            that.setData({
              datalist: dataArr,
              show: false,
            })
          } else {
            that.setData({
              animationData: animation.export(),
              show: true,
              datalist: dataArr,
            })
          }
        }
      }
    })
  },
  //事件处理函数
  onLoad: function() {
    var that = this;
    that.getListData(0);
    wx.request({ //头部导航数据获取
      url: app.globalData.baseUrl + '/api/league/home?typeId=1',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function(res) {
        wx.hideLoading();
        if (res.data.status.code = '0') {
          // console.log(res.data.datalist.slice(1));
          res.data.datalist = res.data.datalist.slice(1);
          that.setData({
            headList: res.data.datalist,
          })
        }
      }
    });
    if (app.globalData.userInfo) {
      that.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        that.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.getSystemInfo({
      success: (res) => {
        // var calc = clientHeight * rpxR - 100;
        that.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth,
          // winHeight: calc
        })
      },
    })
  },
  lower() {
    var that = this;
    that.data.pageDown++;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({ //获取重要数据
      url: app.globalData.baseUrl + "/api/season/home?page_number=" + that.data.pageDown + "&page_size=50&league_id=" + that.data.leagueid,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function(res) {
        if (res.data.status.code = '0') {
          for (var i = 0; i < res.data.datalist.length; i++) {
            that.data.resorse.push(res.data.datalist[i]);
          }
          var list = that.data.resorse;
          var listb = [];
          for (var i = 0; i < list.length; i++) {
            var playTime = list[i].play_year + '年' + list[i].play_month;
            if (listb.indexOf(playTime) == -1) {
              listb.push(playTime);
            }
          }
          var sortListb = listb.sort();
          var dataArr = [];
          for (var i = 0; i < listb.length; i++) {
            var obj = {};
            obj.item = [];
            obj['name'] = listb[i];
            dataArr.push(obj);
            // console.log(dataArr);
            for (var j = 0; j < list.length; j++) {
              var playTime = list[j].play_year + '年' + list[j].play_month;
              if (listb[i] == playTime) {
                obj.item.push(list[j]);
              }
            }
          }
          for (var i = 0; i < dataArr.length; i++) { //队名截取四个字
            // dataArr[i].item.reverse(function(a, b) {
            //   return a.play_time - b.play_time; //时间正序
            // });
            for (var j = 0; j < dataArr[i].item.length; j++) {
              dataArr[i].item[j].team_a = dataArr[i].item[j].team_a.substr(0, 5);
              dataArr[i].item[j].team_b = dataArr[i].item[j].team_b.substr(0, 5);
            }
          }
          wx.hideLoading();
          if (dataArr.length == 0) {
            that.setData({
              datalist: dataArr,
              show: false,
            })
          } else {
            that.setData({
              show: true,
              datalist: dataArr,
            })
          }
        }
      }
    })
  },
  up() {
    var that = this;
    that.data.pageUp++;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({ //获取重要数据
      url: app.globalData.baseUrl + "/api/season/prev?page_number=" + that.data.pageUp + "&page_size=50&league_id=" + that.data.leagueid,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function(res) {
        if (res.data.status.code = '0') {
          // res.data.datalist = res.data.datalist.reverse();
          for (var i = 0; i < res.data.datalist.length; i++) {
            that.data.resorse.unshift(res.data.datalist[i]);
          }
          var list = that.data.resorse;
          var listb = [];
          for (var i = 0; i < list.length; i++) {
            var playTime = list[i].play_year + '年' + list[i].play_month;
            if (listb.indexOf(playTime) == -1) {
              listb.push(playTime);
            }
          }
          var sortListb = listb.sort();
          var dataArr = [];
          for (var i = 0; i < listb.length; i++) {
            var obj = {};
            obj.item = [];
            obj['name'] = listb[i];
            dataArr.push(obj);
            for (var j = 0; j < list.length; j++) {
              var playTime = list[j].play_year + '年' + list[j].play_month;
              if (listb[i] == playTime) {
                obj.item.push(list[j]);
              }
            }
          }
          for (var i = 0; i < dataArr.length; i++) { //队名截取四个字
            for (var j = 0; j < dataArr[i].item.length; j++) {
              dataArr[i].item[j].team_a = dataArr[i].item[j].team_a.substr(0, 5);
              dataArr[i].item[j].team_b = dataArr[i].item[j].team_b.substr(0, 5);
            }
          }
          wx.hideLoading();
          console.log(dataArr);
          if (dataArr.length == 0) {
            that.setData({
              datalist: dataArr,
              show: false,
            })
          } else {
            that.setData({
              show: true,
              datalist: dataArr,
            })
          }
        }
      }
    })

  },
  switchNav(event) { //点击导航切换
    var cur = event.currentTarget.dataset.current;
    var leagueid = event.target.dataset.leagueid;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中    
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur,
        leagueid: leagueid,
        resorse: [],
        pageDown: 1,
        pageUp: 0,
        // scrollTop: this.data.scrollTop+10,
      })
    }
    this.getListData(leagueid);
  },
  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  }
})