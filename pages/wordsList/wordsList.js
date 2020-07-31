Page({
    onLoad: function(){
        this.setData({
            slideButtons: [{
              type: 'warn',
              text: '删除',
              extClass: 'test',
            }],
            words:[
              {en:"In the previous step of the React.js interview questions, we talked about iteration methods where we have put some lights on the for-loop and forEach methods.",zh:"在React.js采访问题的上一步中，我们讨论了迭代方法，在此我们对for循环和forEach方法进行了一些介绍。",display:false},
              {en:"In the previous step of the React.js interview questions, we talked about iteration methods where we have put some lights on the for-loop and forEach methods.",zh:"在React.js采访问题的上一步中，我们讨论了迭代方法，在此我们对for循环和forEach方法进行了一些介绍。",display:false},
              {en:"world",zh:"世界",display:false},
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
              {en:"hello",zh:"你好",display:false},
              {en:"world",zh:"世界",display:false},
              {en:"hello",zh:"你好",display:false},
              {en:"world",zh:"世界",display:false},
            ],
            isEnDisplay: true,
            isZhDisplay: true, 
        });
    },
    slideButtonTap(e) {
        console.log('slide button tap', e.detail)
    },
    //改变英文列表显示隐藏状态
    changeEnStatus() {
      this.setData({
        isEnDisplay: !this.data.isEnDisplay
      })
    },
    changeZhStatus() {
      this.setData({
        isZhDisplay: !this.data.isZhDisplay
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
    }
});