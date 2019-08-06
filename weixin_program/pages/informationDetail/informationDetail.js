// pages/information_con/index.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [1, 2, 3],
    datalist: {},
    onShareAppMessage: function() {
      return {
        title: '资讯',
        desc: '分享页面的内容',
        path: '/page/information_con/index' // 路径，传递参数到指定页面。
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var movieid = getApp().requestDetailid;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: app.globalData.baseUrl + '/api/news/getNewsInfo',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      data: {
        new_id: movieid,
      },
      success: function(res) {
        if (res.data.status.code == 0) {
          wx.hideLoading();
            res.data.data.news_detail = res.data.data.news_detail.replace(/<\s*\/?\s*[a-zA-z_]([^>]*?["][^"]*["])*[^>"]*>/g, ''),
            that.setData({
              datalist: res.data.data,
            })
          // console.log(that.data.datalist.news_detail)
        }
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