// pages/wordsAdd/wordsAdd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isNext:false,
    origin: "",
    translation: ""
  },
  goNext(e) {
    this.setData({
      isNext: true
    })
    let that = this;
    setTimeout(function(){
      that.setData({
        origin: "",
        translation: ""
      })
    },500)
    setTimeout(function(){
      that.setData({
        isNext: false
      })
    },1000)
  },
  goBack(e) {
    wx.navigateBack();
  }
})