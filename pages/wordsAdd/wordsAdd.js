// pages/wordsAdd/wordsAdd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isNext:false,
    origin: "",
    translation: "",
    error:"",
    isDone: true,
    autoTranslation: "",
  },
  onLoad() {
    wx.setNavigationBarTitle({
      title: '添加单词'
    })
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
    this.setData({
      isDone: false
    })
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
        that.setData({
          isDone: true
        })
        if(isNext === "true"){
          that.setData({
            origin: "",
            translation: "",
            autoTranslation: ""
          })
        }
        else{
          wx.navigateBack();
        }
      },
      fail(err){
        that.setData({
          isDone: true,
          error: "单词未保存，请重试！"
        })
        console.log(err)
      }
    })
  },
  tapDialogButton(e) {
    this.setData({
      showOneButtonDialog: false
    })
  },
  doTranslate(e) {
    let val = e.detail.value;
    let that = this;
    if(val !== ""){
      wx.request({
        url: 'https://api.66mz8.com/api/translation.php?info=' + val,
        method: 'GET',
        success(res) {
          console.log(res);
          that.setData({
            autoTranslation: res.data.fanyi
          })
        },
        error(err) {
          console.log(err)
        }
      })
    }
  },
  clearTranslate(e) {
    this.setData({
      autoTranslation: ""
    })
  },
  addAutoTranslation(e) {
    this.setData({
      translation: this.data.autoTranslation
    })
  }
})
