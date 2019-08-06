// pages/friend/friend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    img: 'https://www.liangqiujiang.com/hxgame/image/min_1.jpg',
    imagewidth: 0, //缩放后的宽
    imageheight: 0, //缩放后的高
  },
  prev: function() {
    console.log(this.data.img);
    wx.previewImage({
      current: 'https://www.liangqiujiang.com/hxgame/image/min_1.jpg', // 当前显示图片的http链接
      urls: [this.data.img] // 需要预览的图片http链接列表
    })
  },
  save: function() {
    wx.getImageInfo({
      src: 'https://www.liangqiujiang.com/hxgame/image/min_1.jpg',
      success: function(ret) {
        var path = ret.path;
        wx.saveImageToPhotosAlbum({
          filePath: path,
          success(result) {
            console.log(result)
            wx.showModal({
              title: '存图成功',
              content: '图片成功保存到相册了，去发圈噻~',
              showCancel: false,
              confirmText: '好哒',
              confirmColor: '#72B9C3',
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
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