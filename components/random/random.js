// components/random/random.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
      isloading: true,
      showContentMenu: false,
      showRangeMenu: false,
      contentGroups: [
        { text: '原文', value: 0 },
        { text: '译文', value: 1 },
      ],
      rangeGroups: [
        { text: '随机', value: 0 },
        { text: '正在记', value: 1 },
        { text: '易忘记', value: 2 },
        { text: '已牢记', value: 3 }
      ],
      contentSelected:0,
      rangeSelected: 0
  },
  lifetimes: {
    ready() {
      console.log("When it comes to a creative logo designer, nothing is as valuable".length)
      this.setData({
        isloading: false
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    selectContentMenu(e) {
      console.log(e);
      this.setData({
        contentSelected: e.detail.value,
        showContentMenu: false
      })
    },
    selectRangeMenu(e) {
      this.setData({
        rangeSelected: e.detail.value,
        showRangeMenu: false
      })
    },
    expandContentMenu(e) {
      this.setData({
        showContentMenu: true
      })
    },
    expandRangeMenu(e) {
      this.setData({
        showRangeMenu: true
      })
    }
  }
})
