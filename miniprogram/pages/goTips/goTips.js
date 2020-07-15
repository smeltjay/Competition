// miniprogram/pages/goTips/goTips.js
var app = getApp()
const db = wx.cloud.database()
const _ = db.command;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:'',
    count:''

  },
  getCount: function(){
    //已输入的字数
      var that = this
      db.collection('tips').count({
        success: res => {
          that.setData({
            count: Number(res.total) + 1
          })
        }
      })
  
    },
    textInput: function(e){
      this.setData({
        text: e.detail.value
      })
    },
    pulish: function(){

      var data = {
        content: this.data.text, //用户输入的文字
        comment: [],
        id: Number(this.data.count) +1, //是现在数据库的条数+1,微信小程序的不知道怎么设置自增的数字字段
        shareNum: 0,
        commentNum: 0,
        validStatus: 0,
        validTime: 0
      }
      //validStatus: 审核状态, 通过时候 +1, 反对时候-1
      //validTime: 审核次数, 最多5次,如果反对的人大于等于3,则不通过
  
      console.log(data)
  
      if (data.content){
        db.collection('tips').add({
            data: data,
            success:res => {
              wx.showToast({
                title: '发布成功',
              })
              setTimeout(()=>{
                
                wx.switchTab({
                  url: '../../pages/user/user',
                })
              }, 1000)
            },
            fail: e=>{
              wx.showToast({
                title: '发布错误',
              })
              console.log(e)
            }
          })
      }else{
        wx.showToast({
          title: '请填写文字',
          icon: 'none'
        })
      }
    },

})