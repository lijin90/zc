// pages/scoreDetail/scoreDetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pkyp: [],
    pkop: [],
    nearA: [],
    nearB: [],
    panKou_yp: [],
    panKou_op: [],
    nearTeamA: [],
    nearTeamB: [],
    futureThreeA: [],
    futureThreeB: [],
    team: {},
    animationData: {},
    hiddenView: true,
    hiddenName: true,
    hiddenSK: true,
    hiddenFX: false,
    currentTab: 1,
    dheight: '',
    jishu: [],
    shijian: [],
    show: false,
    showNUM: false,
  },
  // tab切换
  tabNva: function(e) {
    setTimeout(function() {
      var obj = wx.createSelectorQuery();
      var arr = [];
      obj.selectAll('.tx').boundingClientRect();
      obj.exec(function(rect) {
        console.log(rect);
        for (var i = 0; i < rect.length; i++) {
          // console.log(rect[i].length);
          for (var j = 0; j < rect[i].length; j++) {
            // console.log(rect[i][j].height)
            arr.push(rect[i][j].height-20);
          }
        }
        console.log(arr);
        var max = Math.max.apply(null, arr);
        console.log(max);
        that.setData({
          dheight: max + 'px',
        })
        // console.log(that.data.dheight)
      });
    }, 50)
    var that = this;
    if (e.target.dataset.current == 0) {
      that.setData({
        currentTab: e.target.dataset.current,
        hiddenSK: false,
        hiddenFX: true,
      })
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
        hiddenFX: false,
        hiddenSK: true,
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */

  requestTeam: function(season_id) { //获取主客队
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + '/api/season/getSeasonInfo?season_id=' + season_id,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function(res) {
        if (res.data.status.code = '0') {
          res.data.data.teamA = res.data.data.teamA.substr(0, 5);
          res.data.data.teamB = res.data.data.teamB.substr(0, 5);
          that.setData({
            team: res.data.data
          });
          //获取盘口
          that.requestPk(season_id);

        }
      }
    });
  },
  requestPk: function(season_id) { //亚盘欧赔
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + '/api/season/getLottery?season_id=' + season_id,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function(res) {
        if (res.data.status.code = '0') {
          var ouPei = [];
          var yP = [];
          for (var i = 0; i < res.data.datalist.length; i++) {
            if (res.data.datalist[i].group_id == 1) {
              if (res.data.datalist[i].type_name == "澳门" || res.data.datalist[i].type_name == "威廉希尔" || res.data.datalist[i].type_name == "立博") {
                ouPei.push(res.data.datalist[i])
              }
            } else if (res.data.datalist[i].group_id == 2) {
              if (res.data.datalist[i].type_name == "澳门" || res.data.datalist[i].type_name == "Bet365") {
                yP.push(res.data.datalist[i])
              }
            }
          }
          if (yP.length == 0 || ouPei.length == 0) {
            that.setData({
              hiddenName: false
            })
          } else {
            that.setData({
              hiddenName: true,
              pkyp: yP,
              pkop: ouPei,
            })
          }
          //获取近期战绩
          that.requestNear(season_id);
        }
      }
    });
  },
  requestNear: function(season_id) { //近期战绩
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + '/api/team/getTeamSeasonListByTeamIdNew?season_id=' + season_id,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function(res) {
        if (res.data.status.code = '0') {
          for (var i = 0; i < res.data.data.a.length; i++) {
            res.data.data.a[i].team_a = res.data.data.a[i].team_a.substr(0, 4);
            res.data.data.a[i].team_b = res.data.data.a[i].team_b.substr(0, 4);
          }
          for (var i = 0; i < res.data.data.b.length; i++) {
            res.data.data.b[i].team_a = res.data.data.b[i].team_a.substr(0, 4);
            res.data.data.b[i].team_b = res.data.data.b[i].team_b.substr(0, 4);
          }
          that.setData({
            nearA: res.data.data.a,
            nearB: res.data.data.b,
          })
          //未来三场
          that.requestFuture(season_id);
        }
      }
    });
  },
  requestFuture: function(season_id) { //未来三场
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + '/api/team/getFutureTeamSeasonListByTeamId?season_id=' + season_id + '&pageSize=3',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },

      success: function(res) {
        if (res.data.status.code = '0') {
          for (var i = 0; i < res.data.data.a.length; i++) {
            res.data.data.a[i].team_a = res.data.data.a[i].team_a.substr(0, 4);
            res.data.data.a[i].team_b = res.data.data.a[i].team_b.substr(0, 4);
          }
          for (var i = 0; i < res.data.data.b.length; i++) {
            res.data.data.b[i].team_a = res.data.data.b[i].team_a.substr(0, 4);
            res.data.data.b[i].team_b = res.data.data.b[i].team_b.substr(0, 4);
          }
          var animation = wx.createAnimation({
            transformOrigin: "30% 100%",
            duration: 300,
            timingFunction: "ease",
          })
          that.animation = animation;
          animation.opacity(1).step();
          that.setData({
            animationData: animation.export(),
            hiddenView: false,
            panKou_yp: that.data.pkyp,
            panKou_op: that.data.pkop,
            nearTeamA: that.data.nearA,
            nearTeamB: that.data.nearB,
            futureThreeA: res.data.data.a,
            futureThreeB: res.data.data.b,
          })
          wx.hideLoading();
        }
      }
    });
  },

  onLoad: function(options) {
    var that = this;
    let tma = options.team;
    console.log(tma);
    wx.showLoading({
      title: '加载中',
    })
    var season_id = getApp().requestDetailid;
    // var TMa = getApp().requestDetailid;
    // console.log(TMa);
    that.requestTeam(season_id);
    that.technology(season_id);
    that.shijian(season_id, tma);
  },
  technology: function(season_id) { ///技术统计
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + '/api/season/getTechnique?season_id=' + season_id,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function(res) {
        if (res.data.status.code = '0') {
          // console.log(res.data.datalist);
          if (res.data.datalist.length > 0) {
            that.setData({
              jishu: res.data.datalist,
              showNUM: true,
            });
          } else {
            showNUM: false
          }
        }
      }
    });
  },
  shijian: function(season_id, tma) { ///事件
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + '/api/season/getEvent?season_id=' + season_id,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function(res) {
        if (res.data.status.code = '0') {
          // console.log(res.data.datalist);
          res.data.datalist = res.data.datalist.reverse();
          var team;
          console.log(tma);
          for (var i = 0; i < res.data.datalist.length; i++) {
            res.data.datalist[i].name_in = res.data.datalist[i].name_in.substr(0, 10);
            res.data.datalist[i].name_out = res.data.datalist[i].name_out.substr(0, 10);
            if (res.data.datalist[i].team_name.substr(0, 5) == tma) {
              res.data.datalist[i]['Atype_name'] = res.data.datalist[i].type_name;
              res.data.datalist[i]['Atype_id'] = res.data.datalist[i].type_id;
              res.data.datalist[i]['Ateam_id'] = res.data.datalist[i].team_id;
              res.data.datalist[i]['Ateam_name'] = res.data.datalist[i].team_name;
              res.data.datalist[i]['Aname_in'] = res.data.datalist[i].name_in.substr(0, 10);
              res.data.datalist[i]['Aname_out'] = res.data.datalist[i].name_out.substr(0, 10);
              delete res.data.datalist[i]["type_name"];
              delete res.data.datalist[i]["type_id"];
              delete res.data.datalist[i]["team_id"];
              delete res.data.datalist[i]["team_name"];
              delete res.data.datalist[i]["name_in"];
              delete res.data.datalist[i]["name_out"];
            }
          }
          console.log(res.data.datalist);
          if (res.data.datalist.length > 0) {
            that.setData({
              shijian: res.data.datalist,
              show: true
            });
          } else {
            show: false
          }
        }
        // console.log(that.data.shijian);
      }
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})