// pages/register/register.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time: '获取验证码',
    currentTime: 60,
    disabled: false,
    suddisabled: false,
    phone: '',
    iscode: ''
  },
  getPhoneValue: function(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  //验证码倒计时函数
  getCode: function(options) {
    var that = this;
    var a = that.data.phone;
    var currentTime = that.data.currentTime;
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (that.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(that.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      wx.request({
        'url': app.globalData.baseUrl + "/api/sms/getRegisterVerifyCode",
        header: {
          //请求头和ajax写法一样
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        data: {
          phone_number: that.data.phone,
        },
        success(res) {
          console.log(res);
          if (res.data.status.code == 0) {
            wx.showToast({
              title: '验证码已发送', //这里打印出登录成功
              icon: 'success',
              duration: 2000
            });
            var num = 61;
            var timer = setInterval(function() {
              num--;
              if (num <= 0) {
                clearInterval(timer);
                that.setData({
                  time: '重新发送',
                  disabled: false,
                  suddisabled: false
                })
              } else {
                that.setData({
                  time: num + "s",
                  disabled: true,
                  // suddisabled: true
                })
              }
            }, 1000)
          } else {
            wx.showToast({
              title: res.data.status.message, //这里打印出登录成功
              icon: 'none',
              duration: 1000
            })
          }
        }
      })
    }
  },
  formSubmit: function(e) {
    var that = this;
    console.log(e.detail.value.mobile, e.detail.value.code);
    that.setData({
      suddisabled: true
    });
    wx.request({
      'url': app.globalData.baseUrl + "/api/sms/verifySms",
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      method: "POST",
      data: {
        phone_number: e.detail.value.mobile,
        verify_code: e.detail.value.code
      },
      success: function(res) {
        console.log(res);
        if (res.data.status.code == 0) {
          wx.request({
            url: app.globalData.baseUrl + "/api/user/register",
            method: 'POST',
            data: {
              phone_number: e.detail.value.mobile,
              password: e.detail.value.mobile,
              confirm: e.detail.value.mobile,
              user_type: 'WEIMIN'
            },
            header: {
              //设置参数内容类型为x-www-form-urlencoded
              'content-type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
            },
            success: function(res) {
              console.log(res.data)
              if (res.data.status.code == 0) {
                wx.showToast({
                  title: '注册成功!', //这里打印出登录成功
                  icon: 'success',
                  duration: 3000,
                  mask: true,
                  success: function() {
                    that.setData({
                      suddisabled: false
                    })
                  }, //接口调用成功的回调函数
                })
              }
            },
            fail: function(res) {
              wx.showToast({
                title: res.errMsg, //这里打印出登录成功
                icon: 'none',
                duration: 2000,
                success: function() {
                  that.setData({
                    suddisabled: false
                  })
                }, //接口调用成功的回调函数
              })
            }
          })
        } else {
          wx.showToast({
            title: res.data.status.message, //这里打印出失败
            icon: 'none',
            mask: true,
            duration: 1000,
            success: function() {
              that.setData({
                suddisabled: false
              })
            }, //接口调用成功的回调函数
          })
        }
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