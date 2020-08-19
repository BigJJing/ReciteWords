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
        { text: '正在记', value: 0 },
        { text: '易忘记', value: 1 },
        { text: '已牢记', value: 2 },
        { text: '随机', value: 3 }
      ],
      contentSelected:0,
      rangeSelected: 3,
      words: [],  
      allWords: [], //保存全部单词
      index: 0,     //正在显示的单词列表words中的words[index]
      showAnswer: false,
      isEnd: false,
      isStart: false
  },
  lifetimes: {
    created() {
      let that = this;
      wx.request({
        url: 'https://tfleof.top/words/getAllWords',
        method: 'GET',
        success(res) {
          console.log(res);
          //打乱顺序
          let words = res.data.data;
          words.sort(() => {
            return Math.random() - 0.5
          })
          that.setData({
            words: words,
            allWords: words,
            isloading: false
          })
        },
        fail(err) {
          this.setData({
            isloading: false
          })
          console.log(err)
        }
      })
    },
    attached() {
      
    },

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
      console.log(e);
      let status = e.detail.value;
      console.log(status);
      this.setData({
        rangeSelected: status,
        showRangeMenu: false
      })
      let allWords = this.data.allWords;
      let arr = [];
      if(status != 3){
        allWords.forEach(item => {
          if(item.status == status){
            arr.push(item)
          }
        })
      }
      else{
        arr = allWords;
      }
      console.log(arr);
      arr.sort(() => {
        return Math.random() - 0.5
      })
      this.setData({
        words: arr,
        index: 0
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
    },
    closeContentMenu(e) {
      this.setData({
        showContentMenu: false
      })
    },
    closeRangeMenu(e) {
      this.setData({
        showRangeMenu: false
      })
    },
    goNext(e) {
      this.setData({
        isStart: false,
        isEnd: false,
      })
      let index = this.data.index;
      console.log(index)
      if(index + 1 >= this.data.words.length){
        this.setData({
          isEnd: true,
          index: this.data.words.length
        })
      }
      else{
        this.setData({
          isEnd: false,
          index: index + 1
        })
      }
      /*
      this.setData({
        index: index + 1 >= this.data.words.length ? 0 : index + 1
      })
      */
      this.closeAnswer();
    },
    goBack(e) {
      this.setData({
        isStart: false,
        isEnd: false,
      })
      let index = this.data.index;
      console.log(index)
      if(index - 1 < 0){
        this.setData({
          isStart: true,
          index: -1
        })
      }
      else{
        this.setData({
          isStart: false,
          index: index - 1
        })
      } 
      /*
      this.setData({
        isStart: true,
        //index: index - 1 < 0 ? this.data.words.length - 1 :  index - 1
      })
      */
      this.closeAnswer();
    },
    touchNext(e) {
      
    },
    lookAnswer(e) {
      this.setData({
        showAnswer: true
      })
    },
    closeAnswer(e) {
      this.setData({
        showAnswer: false
      })
    }
  }
})
