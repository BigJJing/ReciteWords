// components/remembering.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pageType: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    slideButtons: [{
      text: '易忘记',
    },
    {
      text: '已牢记',
    },
    {
      type: 'warn',
      text: '删除',
    }],

    words:[
      {en:"hello",zh:"你好",display:false},
      {en:"world",zh:"世界",display:false},
      {en:"hello",zh:"你好",display:false},
      {en:"world",zh:"世界",display:false},
      {en:"hello",zh:"你好",display:false},
      {en:"world",zh:"世界",display:false},
      {en:"hello",zh:"你好",display:false},
      {en:"world",zh:"世界",display:false},
      {en:"hello",zh:"你好",display:false},
      {en:"world",zh:"世界",display:false},
      {en:"In the previous step of the React.js interview questions, we talked about iteration methods where we have put some lights on the for-loop and forEach methods.",zh:"在React.js采访问题的上一步中，我们讨论了迭代方法，在此我们对for循环和forEach方法进行了一些介绍。",display:false},
      {en:"In the previous step of the React.js interview questions, we talked about iteration methods where we have put some lights on the for-loop and forEach methods.",zh:"在React.js采访问题的上一步中，我们讨论了迭代方法，在此我们对for循环和forEach方法进行了一些介绍。",display:false},
      {en:"world",zh:"世界",display:false},
      {en:"hello",zh:"你好",display:false},
      {en:"world",zh:"世界",display:false},
      {en:"hello",zh:"你好",display:false},
      {en:"world",zh:"世界",display:false},
    ],
    isEnDisplay: true,
    isZhDisplay: true, 
  },
  lifetimes: {
    attached() {
      console.log(this.data.pageType);
      this._updatePageType();
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    slideButtonTap(e) {
      console.log('slide button tap', e.detail)
    },
    //改变英文列表显示隐藏状态
    changeEnStatus() {
      this.setData({
        isEnDisplay: !this.data.isEnDisplay
      })
      this._updateWordsDisplayStatus(this.data.isEnDisplay)
    },
    changeZhStatus() {
      this.setData({
        isZhDisplay: !this.data.isZhDisplay
      })
      this._updateWordsDisplayStatus(this.data.isZhDisplay)
      
    },
    _updateWordsDisplayStatus(isDisplay) {  //isDisplay: true,false
      let words = this.data.words;
      words.forEach(item => {
        item.display = isDisplay
      })
      console.log(words)
      this.setData({
        words: words
      })
    },
    displayWord(e) {
      if(this.data.isEnDisplay && this.data.isZhDisplay){
        return;
      }
      console.log(e);
      let words = this.data.words;
      let index = e.currentTarget.dataset.index;
      words[index].display = !words[index].display;
      console.log(words);
      this.setData({
        words: words
      })
    },
    _updatePageType() {
      let type = this.data.pageType;
      /*
      * 0: remembering
      * 1: easy to forget
      * 2: remembered
      */
      if(type == 0){
        this.setData({
          slideButtons: [{
            text: '易忘记',
          },
          {
            text: '已牢记',
          },
          {
            type: 'warn',
            text: '删除',
          }],
        })
      }
      if(type == 1){
        this.setData({
          slideButtons: [{
            text: '已牢记',
          },
          {
            type: 'warn',
            text: '删除',
          }],
        })
      }
      if(type == 2){
        this.setData({
          slideButtons: [{
            text: '正在记',
          },
          {
            type: 'warn',
            text: '删除',
          }],
        })
      }
    }
  }
})
