const app = getApp();
var util = require('../../utils/util.js');
Page({
  data: {
    show:false,
    hasUserInfo: false,
    imgUrls: ['../../images/5.png', '../../images/7.png'],
    slide: true,
    datalist: [],
    autoplay: true,
    select: -1,
    flag: 1,
    duration: 1000,
    interval: 5000,
    indicatorDots: true,
    indicatorColor: "#ccc", //滑动圆点颜色  
    indicatorActiveColor: "#E03618", //当前圆点颜色  
    onShareAppMessage: function() {
      return {
        title: '锦囊列表',
        desc: '分享页面的内容',
        path: '/page/jnlist/jnlist' // 路径，传递参数到指定页面。
      }
    }
  },
  onPullDownRefresh: function() {
    wx.showToast({
      title: '请稍后...',
      icon: 'loading',
    })
    wx.stopPullDownRefresh();
  },
  tapName: function(event) { //点击锦囊跳转页面
    var testId = event.currentTarget.dataset.esoterica_id;
    var app = getApp();
    app.requestDetailid = testId;
    wx.navigateTo({
      url: '../pay/pay?id=' + testId
    })
  },
  getListData: function(openid) {
    var that = this;
    wx.request({
      url: app.globalData.baseUrl + "/api/esoterica/getEsotericaWithParamForPlatformFirst?token=" + openid + "&k=19dfb72533e828ab1d8d050c23b78913",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function(res) {
        wx.hideLoading();
        if (res.data.status.code = '0') {
          for (var i = 0; i < res.data.datalist.length; i++) {
            for (var j = 0; j < res.data.datalist[i].item.length; j++) {
              res.data.datalist[i].nickname = res.data.datalist[i].nickname.substring(0, 3);
              res.data.datalist[i].item[j].a = res.data.datalist[i].item[j].a.substring(0, 5);
              res.data.datalist[i].item[j].b = res.data.datalist[i].item[j].b.substring(0, 5);
            }
          }
          if (res.data.datalist.length!=0){
            that.setData({
              datalist: res.data.datalist,
              loadingHidden: false,
              show:false
            })
          }else{
            that.setData({
              show: true
            })
          }
         
        }
      },
      fail: function(res) {
        console.log(res);
      }
    })
  },
  onLoad: function(options) {
    var that = this;
    wx.login({
      success: function(res) {
        var code = res.code; //返回code
        // var appId = 'wxb185d275542fcc37';
        // var secret = 'fd9f7b94abbe999c1b1469ace72ae927';
        if (res.code) {
          //发起网络请求
          wx.request({
            url: app.globalData.baseUrl + "/api/payOrder/getWxMinOpenId",
            data: {
              code: code
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
              // console.log(res);
              var openid = res.data.data.openid //返回openid
              app.globalData.openid = openid;
              that.getListData(openid);
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
    wx.showLoading({
      title: '请稍后...',
    });
    // wx.request({
    //   url: app.globalData.baseUrl + "/api/banner/home",
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded',
    //   },
    //   success: function(res) {
    //     if (res.data.status.code = '0') {
    //       that.setData({
    //         imgUrls: res.data.datalist,
    //       })
    //     }
    //   }
    // });
    wx.showShareMenu({
      withShareTicket: true
    });
  },
})