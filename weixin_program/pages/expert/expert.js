// pages/expert/expert.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datalist: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: app.globalData.baseUrl + '/api/entry/getSpecialists',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function(res) {
        if (res.data.status.code == 0) {
          console.log(res.data.datalist)
          wx.hideLoading();
          for (var i = 0; i < res.data.datalist.length; i++) {
            res.data.datalist[i].out_description = res.data.datalist[i].out_description.replace(/通过其核心算法筛选出五星荐单，准确率达80%-90%以上，|、彩迷|，多次命中足彩大奖|主要投资足彩、竞彩，|资深足彩玩家，|从事足彩、|足彩/g, '');
          }
          that.setData({
            datalist: res.data.datalist.slice(0,6),
          })
        }
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