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
    isloading: false,
    noWordTip: "",
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
    words:[],
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
        url: 'https://tfleof.top/words/updateWordInfoById',
        method: 'PUT',
        data: {
          id: id,
          status: 1
        },
        header: {
          'content-type': 'application/json'
        },
        success(res){
          console.log(res);
          if(res.statusCode == 200){
            that.moveWordEffect(id);
          }
        },
        fail(err){
          console.log(err)
        }
      })
    },
    moveToRemembered(id) {
      console.log("moveToRememberd!!");
      let that = this;
      wx.request({
        url: 'https://tfleof.top/words/updateWordInfoById',
        method: 'PUT',
        data: {
          id: id,
          status: 2
        },
        header: {
          'content-type': 'application/json'
        },
        success(res){
          console.log(res);
          if(res.statusCode == 200){
            that.moveWordEffect(id);
          }
        },
        fail(err){
          console.log(err)
        }
      })
    },
    moveToRemembering(id) {
      console.log("moveToRemembering!!");
      let that = this;
      wx.request({
        url: 'https://tfleof.top/words/updateWordInfoById',
        method: 'PUT',
        data: {
          id: id,
          status: 0
        },
        header: {
          'content-type': 'application/json'
        },
        success(res){
          console.log(res);
          if(res.statusCode == 200){
            that.moveWordEffect(id);
          }
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
      this.setData({
        words: words
      })
      if(words.length == 0){
        this.hasNoWord();
      }
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
      if(that.data.isloading == false){
        that.setData({
          isloading: true
        })
      }
      wx.request({
        url: 'https://tfleof.top/words/getAllWordsByStatus/' + type,
        method: 'GET',
        success(res) {
          console.log(res);
          let words = res.data.data;
          words.forEach(item => {
            item.display = false;
          })
          if(words.length == 0){
            that.hasNoWord();
          }
          that.setData({
            words: words,
            isloading: false
          })
        },
        fail(err) {
          console.log(err);
          that.setData({
            isloading: false
          })
        }
      })
      /*
      * 0: remembering
      * 1: easy to forget
      * 2: remembered
      */
      if(type == 0){
        wx.setNavigationBarTitle({
          title: '正在记'
        })
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
        wx.setNavigationBarTitle({
          title: '易忘记'
        })
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
        wx.setNavigationBarTitle({
          title: '已牢记'
        })
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
    hasNoWord() {
      let type = this.data.pageType;
      if(type == 0){
        this.setData({
          noWordTip: "真棒！所有单词都记完啦，快去添加新单词吧~"
        })
      }
      else if(type == 1){
        this.setData({
          noWordTip: "已经没有单词能难得倒我了呢"
        })
      }
      else if(type == 2){
        this.setData({
          noWordTip: "要多多努力记单词哟"
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
