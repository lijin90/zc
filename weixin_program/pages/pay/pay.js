// pages/pay/index.js
const app = getApp()
Page({
  data: {
    info: [],
    nickName: '',
    avatarUrl: '',
    userInfo: '',
    red1: false,
    red2: false,
    red3: false,
    red4: false,
    red5: false,
    red6: false,
    flag: 1,
    slide: false,
    show: true
  },
  onPullDownRefresh: function() {
    wx.showToast({
      title: '请稍后...',
      icon: 'loading',
    })
    wx.stopPullDownRefresh();
  },
  slidedown: function() {
    var that = this;
    if (that.data.flag == 1) {
      that.setData({
        slide: true,
        flag: 0
      })
    } else {
      that.setData({
        slide: false,
        flag: 1
      })
    }
  },

  agreement: function() {
    wx.navigateTo({
      url: '../agreement/agreement'
    })
  },
  datalist: function() {
    var movieid = getApp().requestDetailid;
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + "/api/esoterica/getEsotericaInfoForPlatform?k=19dfb72533e828ab1d8d050c23b78913",
      data: {
        esotericaId: '5fe8efbd3933e441edf6fd99acde1452',
        esotericaId: movieid,
        token: app.globalData.openid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function(res) {
        wx.hideLoading();
        if (res.data.status.code = '0') {
          that.setData({
            info: res.data.data,
            show: false
          });
        }
        for (var i in that.data.info.item) {
          if (that.data.info.item[i].odds_result.indexOf('1') != -1) {
            that.setData({
              red1: true,
            })
          }
          if (that.data.info.item[i].odds_result.indexOf('2') != -1) {
            that.setData({
              red2: true,
            })
          }
          if (that.data.info.item[i].odds_result.indexOf('3') != -1) {
            that.setData({
              red3: true,
            })
          }
          if (that.data.info.item[i].odds_result.indexOf('4') != -1) {
            that.setData({
              red4: true,
            })
          }
          if (that.data.info.item[i].odds_result.indexOf('5') != -1) {
            that.setData({
              red5: true,
            })
          }
          if (that.data.info.item[i].odds_result.indexOf('6') != -1) {
            that.setData({
              red6: true,
            })
          }
        }
      }
    })
  },
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    //技能资讯列表
    that.datalist();
  },
  add: function(e) { //点击支付按钮
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + "/api/payOrder/payOrderRequestWxMin",
      method: 'POST',
      data: {
        sessionkey: app.globalData.openid, //openid
        type_id: that.data.info.esoterica_id,
        provider: 'Wxminpay'
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        // console.log(res);
        if (res.data.status.code == 0) {
          wx.requestPayment({
            'timeStamp': res.data.data.timestamp,
            'nonceStr': res.data.data.nonce_str,
            'package': "prepay_id=" + res.data.data.prepay_id,
            'signType': 'MD5',
            'paySign': res.data.data.sign,
            'success': function(res) {
              if (res.errMsg == 'requestPayment:ok') {
                wx.navigateTo({
                  url: '../success/success'
                })
                that.datalist();
              }
            },
            'fail': function(res) {
              // console.log(res);
              if (res.errMsg == 'requestPayment:fail cancel') {
                wx.showToast({
                  title: '已取消支付',
                  icon: 'none',
                  duration: 2000
                })
              } else {
                wx.showToast({
                  title: '支付失败',
                  icon: 'none',
                  duration: 2000
                })
              }

            }
          })
        }
      }
    })
  },
})