// pages/information/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist: [],
    list:[],
    animationData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  changeName: function(event) {
    var testId = event.currentTarget.dataset.news_id;
    var app = getApp();
    app.requestDetailid = testId;
    wx.navigateTo({
      url: '../informationDetail/informationDetail?new_id=' + testId
    })
  },
  onLoad: function(options) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: app.globalData.baseUrl + '/api/news/getNews?pageNumber=1&pageSize=2',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        if(res.data.status.code==0){
          var animation = wx.createAnimation({
            transformOrigin: "30% 100%",
            duration: 500,
            timingFunction: "ease",
          })
          that.animation = animation;
          animation.opacity(1).step();
          that.setData({
            animationData: animation.export(),
            datalist: res.data.datalist.splice(0, 10),
          })
        }
        wx.hideLoading();
      }
    })
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
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
    })
    wx.stopPullDownRefresh();
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