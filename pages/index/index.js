//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    side: {//滑动操作
      newopen: false,//判断侧边栏是否打开-显示
    },
    open: true
  },
  // 点击左下角小图标事件
  openSlider: function (e) {
    if (this.data.open) {
      this.setData({
        open: false
      });
    } else {
      this.setData({
        open: true
      });
    }
  },
  tap_start: function (e) {
    // touchstart事件
    // 把手指触摸屏幕的那一个点的 x 轴坐标赋值给 mark 和 newmark
    console.log(this.data.open)
    this.data.mark = this.data.newmark = e.touches[0].pageX;
  },
  tap_drag: function (e) {
    // touchmove事件
    this.data.newmark = e.touches[0].pageX;
    // 手指从左向右移动
    if (this.data.mark < this.data.newmark) {
      this.istoright = true;
    }
    // 手指从右向左移动
    if (this.data.mark > this.data.newmark) {
      this.istoright = false;
    }
    this.data.mark = this.data.newmark;
  },
  tap_end: function (e) {
    if(this.data.open){
      this.setData({
        open: false
      });
      return;
    }
    // touchend事件
    this.data.mark = 0;
    this.data.newmark = 0;
    // 通过改变 opne 的值，让主页加上滑动的样式
    if (this.istoright) {
      this.setData({
        open: true
      });
    } else {
      this.setData({
        open: false
      });
    }
  }
})