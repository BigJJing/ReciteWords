//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    side: {//滑动操作
      newopen: false,//判断侧边栏是否打开-显示
    },
    open: false,
    toRelative: true,
    nowPage: 0
  },
  onLoad: function () {
    if (app.globalData.userInfo) { 
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(1)
    app.globalData.userInfo = e.detail.userInfo;
    console.log(e.detail.userInfo)
    if(e.detail.userInfo && e.detail.userInfo !== {}){
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  },
  openMenu() {
    this.setData({
      open: true,
      toRelative: false
    });
  },
  tap_end(e) {
    if(this.data.open){
      this.setData({
        open: false
      });
      let that = this;
      setTimeout(function(){
        that.setData({
          toRelative: true
        });
      },800)
      return;
    }
  },
  toPage(e) {
    console.log(e)
    /*
    * 0: remembering
    * 1: easy to forget
    * 2: remembered
    * 3: settings
    * 4. feedback
    */
   var that = this;
   var type = e.currentTarget.dataset.type
   that.setData({
      nowPage: type
    })
  },
  addNew() {
    wx.navigateTo({
      url: '/pages/wordsAdd/wordsAdd'
    })
  }
})