//index.js
//获取应用实例
const app = getApp();
Page({
  data: {
    imgurl: '',
    shareImgSrc: '',
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    hidden: true,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  /**
* 用户点击右上角分享
*/
  onShareAppMessage: function () {

  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  myOrder: function() {
    wx.navigateTo({
      url: '../order/order'
    })
  },
  about: function() {
    wx.navigateTo({
      url: '../about/about'
    })
  },
  expert: function() {
    wx.navigateTo({
      url: '../expert/expert'
    })
  },
  register: function() {
    wx.navigateTo({
      url: '../register/register'
    })
  },
  shareFriend: function () {
    wx.navigateTo({
      url: '../friend/friend'
    })
  },
  // onShareAppMessage: function() {
  //   return {
  //     title: '量球匠',
  //     desc: '量球匠',
  //     path: '../jnlist/jnlist'
  //   }

  // },
  close: function() {
    var that = this;
    that.setData({
      hidden: true
    })
  },
  onLoad: function() {
    var that = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        // console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          console.log(res);
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  share_quan: function() {
    var that = this;
    that.setData({
      hidden: false,
    })
    //1. 请求后端API生成小程序码
    // that.getQr();

    //2. canvas绘制文字和图片
    const ctx = wx.createCanvasContext('myCanvas');
    ctx.setFillStyle('white')
    ctx.fillRect(0, 0, 300, 420);
    var imgPath = '../../images/1.png';
    var bgImgPath = '../../images/ewm.jpg';
    ctx.drawImage(imgPath, 0, 0, 400, 100);
    ctx.drawImage(bgImgPath, 160, 170, 120, 120);

  
    ctx.setFontSize(14)
    ctx.setFillStyle('#332332')
    ctx.fillText('量球匠科技有限公司', 100, 120)
    ctx.fillText('是国内一家专注于大数据足球比赛模型，', 30, 150)
    ctx.fillText('致力于为广大球迷提供深度的赛事分析...，', 30, 170)
    ctx.fillText('长按扫码查看详情', 100, 300);
    ctx.draw()
    // 3. canvas画布转成图片
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  save: function() {
    var that = this;
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 300,
      height: 300,
      destWidth: 300,
      destHeight: 300,
      canvasId: 'myCanvas',
      success: function(res) {
        console.log(res.tempFilePath);
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showModal({
              title: '存图成功',
              content: '图片成功保存到相册了，去发圈噻~',
              showCancel: false,
              confirmText: '好哒',
              confirmColor: '#72B9C3',
              success: function(res) {
                if (res.confirm) {
                  console.log('用户点击确定');
                  that.setData({
                    hidden: true,
                  })
                }
                // that.hideShareImg()
              }
            })
          }
        })
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },
})