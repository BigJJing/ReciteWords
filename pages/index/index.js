//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    side: {//滑动操作
      newopen: false,//判断侧边栏是否打开-显示
    },
    open: false,
    toRelative: true,
    nowPage: 0
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
  }
})