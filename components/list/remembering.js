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
      {id:'1',en:"hello",zh:"你好",display:false},
      {id:'2',en:"world",zh:"世界",display:false},
      {id:'3',en:"hello",zh:"你好",display:false},
      {id:'4',en:"world",zh:"世界",display:false},
      {id:'5',en:"hello",zh:"你好",display:false},
      {id:'6',en:"world",zh:"世界",display:false},
      {id:'7',en:"hello",zh:"你好",display:false},
      {id:'8',en:"world",zh:"世界",display:false},
      {id:'9',en:"hello",zh:"你好",display:false},
      {id:'11',en:"world",zh:"世界",display:false},
      {id:'12',en:"In the previous step of the React.js interview questions, we talked about iteration methods where we have put some lights on the for-loop and forEach methods.",zh:"在React.js采访问题的上一步中，我们讨论了迭代方法，在此我们对for循环和forEach方法进行了一些介绍。",display:false},
      {id:'13',en:"In the previous step of the React.js interview questions, we talked about iteration methods where we have put some lights on the for-loop and forEach methods.",zh:"在React.js采访问题的上一步中，我们讨论了迭代方法，在此我们对for循环和forEach方法进行了一些介绍。",display:false},
      {id:'14',en:"world",zh:"世界",display:false},
      {id:'15',en:"hello",zh:"你好",display:false},
      {id:'16',en:"world",zh:"世界",display:false},
      {id:'17',en:"hello",zh:"你好",display:false},
      {id:'18',en:"world",zh:"世界",display:false},
    ],
    isEnDisplay: true,
    isZhDisplay: true, 
    pronounciation: "",
    WordMoving:""
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
      console.log(e);
      let id = e.currentTarget.dataset.id;
      console.log('slide button tap', e.detail);
      this.moveWordEffect(id);
      //if()
    },
    removeWord(id) {
      console.log("remove!");
      wx.request({
        url: '',
        method: 'DELETE',
        data: {
          id: id,
        },
        success(res){
          console.log(res);
          this.moveWordEffect(id);
        },
        fail(err){
          console.log(err)
        }
      })
    },
    moveToEasyForget(id) {
      console.log("moveToEasyForget!!")
      wx.request({
        url: '',
        method: 'PUT',
        data: {
          id: id,
          type: 1
        },
        success(res){
          console.log(res);
          this.moveWordEffect(id);
        },
        fail(err){
          console.log(err)
        }
      })
    },
    moveToRemembered(id) {
      console.log("moveToRememberd!!")
      wx.request({
        url: '',
        method: 'PUT',
        data: {
          id: id,
          type: 2
        },
        success(res){
          console.log(res);
          this.moveWordEffect(id);
        },
        fail(err){
          console.log(err)
        }
      })
    },
    moveToRemembering(id) {
      console.log("moveToRemembering!!")
      wx.request({
        url: '',
        method: 'PUT',
        data: {
          id: id,
          type: 0
        },
        success(res){
          console.log(res);
          this.moveWordEffect(id);
        },
        fail(err){
          console.log(err)
        }
      })
    },
    //移除单词动效
    moveWordEffect(id) {
      let words = this.data.words;
      this.setData({
        WordMoving: id
      })
      words.forEach((item,index) => {
        if(item.id === id){
          words.splice(index,1);
          return;
        }
      })
      let that = this;
      setTimeout(function(){
        that.setData({
          words: words
        })
      },400)  
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
      let that = this;
      /*
      wx.request({
        url: '',
        method: 'GET',
        data: {
          type: type
        },
        success(res) {
          that.setData({
            words: res.data
          })
        },
        fail(err) {
          console.log(err)
        }
      })
      */
      /*
      * 0: remembering
      * 1: easy to forget
      * 2: remembered
      */
      if(type == 0){
        that.setData({
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
        that.setData({
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
        that.setData({
          slideButtons: [{
            text: '正在记',
          },
          {
            type: 'warn',
            text: '删除',
          }],
        })
      }
    },
    pronounce(e) {
      console.log(e.currentTarget.dataset.word);
      let word = e.currentTarget.dataset.word;
      let that = this;
      wx.request({
        url: 'https://dict.youdao.com/dictvoice?type=0&audio=hello',
        method: 'GET',
        success(res) {
          console.log(res);
          that.setData({
            pronounciation: res.data
          })
        },
        fail(err) {
          console.log(err)
        }
      })
    }
  }
})
