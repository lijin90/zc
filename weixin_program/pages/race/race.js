const app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    weeks: {},
    activeIndex: 6,
    date: '',
    dafultDate: '',
    datalist: [],
    show: false,
    animationData: {},
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {

  },
  onPullDownRefresh: function() {
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
    })
    wx.stopPullDownRefresh();
  },
  onLoad: function(options) {
    var that = this;
    var timer = util.getDates(8).reverse();
    // console.log(timer);
    that.setData({
      weeks: timer.slice(0, 7),
      time: timer,
    });
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: app.globalData.baseUrl + "/api/integral/getAllOpenResult",
      data: {
        start_time: that.data.time[6].date,
        end_time: that.data.time[7].date,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function(res) {
        if (res.data.status.code == 0) {
          var animation = wx.createAnimation({
            transformOrigin: "30% 100%",
            duration: 500,
            timingFunction: "ease",
          })
          that.animation = animation;
          animation.opacity(1).step();
          wx.hideLoading();
          if (res.data.datalist.length != 0) {
            function compare(property) {
              return function (a, b) {
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
              }
            }
            res.data.datalist.sort(compare('num'));
            // console.log())
            for (var i = 0; i < res.data.datalist.length; i++){
              res.data.datalist[i].a_cn = res.data.datalist[i].a_cn.substring(0, 5);
              res.data.datalist[i].h_cn = res.data.datalist[i].h_cn.substring(0,5);
              res.data.datalist[i].l_cn_abbr = res.data.datalist[i].l_cn_abbr.substring(0, 3);
            }
            that.setData({
              animationData: animation.export(),
              datalist: res.data.datalist,
            })
          } else {
            that.setData({
              show: true
            })
          }
        }
      }
    });
  },
  selected: function(event) {
    var that = this;
    var data=event.currentTarget.dataset.index
    console.log(data);
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: app.globalData.baseUrl + "/api/integral/getAllOpenResult",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      data: {
        start_time: that.data.time[data].date,
        end_time: that.data.time[data + 1].date,
      },
      success: function(res) {
        if (res.data.status.code == 0) {
          wx.hideLoading();
          if (res.data.datalist.length != 0) {
            function compare(property) {
              return function (a, b) {
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
              }
            }
            res.data.datalist.sort(compare('num'));
            for (var i = 0; i < res.data.datalist.length; i++) {
              res.data.datalist[i].a_cn = res.data.datalist[i].a_cn.substring(0, 5);
              res.data.datalist[i].h_cn = res.data.datalist[i].h_cn.substring(0, 5);
              res.data.datalist[i].l_cn_abbr = res.data.datalist[i].l_cn_abbr.substring(0, 3);
            }
            that.setData({
              activeIndex: event.currentTarget.dataset.index,
              datalist: res.data.datalist,
            })
          } else {
            that.setData({
              show: true
            })
          }
        }
      }
    });
  },

})