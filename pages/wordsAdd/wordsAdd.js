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
    this.addWord();
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

    //wx.navigateBack();
  },
  onSubmit(e){
    console.log(e);
    let that = this;
    /*
    wx.request({
      url:'',
      method: "POST",
      data:{
        en: e.detail.value.origin,
        zh: e.detail.value.translation
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res){
        console.log(res);
       //wx.navigateBack();
      },
      fail(err){
        console.log(err)
      }
    })
    */
  },
  addWord(){

  }
})
