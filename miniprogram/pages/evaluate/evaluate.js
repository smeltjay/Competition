const db = wx.cloud.database();
var number = 0;
var comment = null
var list = []
var name = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:false,
    newList:[]
  },
  inputComment:function(e){
    comment = e.detail.value
    console.log(comment)
  },
  commit:function(){
    db.collection('comment').add({
      data:{
        workID:number,
        comment:comment,
        name:name,
        // time:time
      },success:function(res){
        wx.showToast({
          title: '评价成功',
        })
      }
    })
  },
  onLoad: function (options){
    number = options.number
    number = parseInt(number)
    console.log(number)
    // var time = util.formatTime(new Date());
    // console.log('时间',time)
    db.collection('comment').where({
      workID:number
    }).get({
      success:res=>{
        console.log(res.data)
        this.setData({
          newList:res.data
        })
      }
    })

  },
  onShow: function () {
    //判断是否已登陆
    var value = wx.getStorageSync("name")
    if(value){
      name = value
    }else{
      name = '游客'
    }
  }
})