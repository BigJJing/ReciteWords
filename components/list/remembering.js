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
    ],
    isEnDisplay: true,
    isZhDisplay: true, 
    pronounciation: "",
  },
  lifetimes: {
    attached() {
      console.log(this.data.pageType);
      this._updatePageType();
    }
  },
  pageLifetimes:{
    show(){
      console.log(this.data.pageType);
      this._updatePageType()
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
      console.log(id)
      //this.moveWordEffect(id);
       /*
      * 0: remembering
      * 1: easy to forget
      * 2: remembered
      */
     let pageType = this.data.pageType;
     let buttonType = e.detail.index;
     console.log(pageType,buttonType)
      if(pageType == 0){
        if(buttonType == 0) this.moveToEasyForget(id);
        else if(buttonType == 1) this.moveToRemembered(id);
        else if(buttonType == 2) this.removeWord(id);
      }
      else if(pageType == 1){
        if(buttonType == 0) this.moveToRemembered(id);
        else if(buttonType == 1) this.removeWord(id);
      }
      else if(pageType == 2){
        if(buttonType == 0) this.moveToRemembering(id);
        else if(buttonType == 1) this.removeWord(id);
      }
    },
    removeWord(id) {
      console.log("remove!");
      let that = this;
      wx.request({
        url: 'https://tfleof.top/words/deleteWord/' + id,
        method: 'DELETE',
        data: {
          id: id,
        },
        success(res){
          console.log(res);
          that.moveWordEffect(id);
        },
        fail(err){
          console.log(err)
        }
      })
    },
    moveToEasyForget(id) {
      console.log("moveToEasyForget!!")
      let that = this;
  
      wx.request({
        url: 'https://tfleof.top/words/updateWordStatusById',
        method: 'PUT',
        data: {
          'id': id,
          'status': 1
        },
        header: {
          'content-type': 'application/json'
        },
        success(res){
          console.log(res);
          that.moveWordEffect(id);
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
      words.forEach((item,index) => {
        if(item.id === id){
          words.splice(index,1);
          return;
        }
      })
      let that = this;
      that.setData({
        words: words
      })
      /*
      setTimeout(function(){
        that.setData({
          words: words
        })
      },200)  
      */
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
      wx.request({
        url: 'https://tfleof.top/words/getAllWordsByStatus/' + type,
        method: 'GET',
        success(res) {
          console.log(res);
          let words = res.data.data;
          words.forEach(item => {
            item.display = false;
          })
          that.setData({
            words: words
          })
          console.log(that.data.words)
        },
        fail(err) {
          console.log(err)
        }
      })
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
