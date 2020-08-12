// pages/wordsAdd/wordsAdd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isNext:false,
    origin: "",
    translation: "",
    error:""
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
    if(e.detail.value.origin == ""){
      this.setData({
        error: "原文记得要有内容 ~"
      })
      return false;
    }
    else if(e.detail.value.translation == ""){
      this.setData({
        error: "译文记得要有内容 ~"
      })
      return false;
    }
    let isNext = e.detail.target.dataset.next;
    let that = this;
    wx.request({
      url:'https://tfleof.top/words/createWord',
      method: "POST",
      data:{
        en: e.detail.value.origin,
        zh: e.detail.value.translation
      },
      header: {
        'content-type': 'application/json'
      },
      success(res){
        console.log(res);
        if(isNext === "true"){
          that.setData({
            origin: "",
            translation: ""
          })
        }
        else{
          wx.navigateBack();
        }
      },
      fail(err){
        console.log(err)
      }
    })
  },
  addWord(){

  },
  tapDialogButton(e) {
    this.setData({
      showOneButtonDialog: false
    })
  }
})
