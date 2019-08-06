// pages/about/about.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onPullDownRefresh: function () {
    wx.showToast({
      title: '请稍后...',
      icon: 'loading',
    })
    wx.stopPullDownRefresh();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // ewm: function() {
  //   wx.previewImage({
  //     current: 'https://qsr-app.oss-cn-shenzhen.aliyuncs.com/news/71/1ff5580c4cca44b6c84fbff7ec650f', // 当前显示图片的http链接
  //     urls: ['https://qsr-app.oss-cn-shenzhen.aliyuncs.com/news/71/1ff5580c4cca44b6c84fbff7ec650f'] // 需要预览的图片http链接列表
  //   })
  // },
  onLoad: function(options) {

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