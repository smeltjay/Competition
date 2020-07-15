const db = wx.cloud.database()
var name = null
var time = null
var place = null
var content = null
var number = null
Page({
  data:{
    
  },
  inputNumber:function(e){
    number = e.detail.detail.value
  },
  inputName:function(e){
    name = e.detail.detail.value
  },
  inputTime:function(e){
    time = e.detail.detail.value
  },
  inputPlace:function(e){
    place = e.detail.detail.value
  },
  inputComment:function(e){
    content = e.detail.value
  },
  commit:function(){
    db.collection('arrangements').add({
      data:{
        number:number,
        name:name,
        place:place,
        time:time,
        content:content
      },success:function(res){
        console.log('success')
        wx.showToast({
          title: '发布成功',
        })
        wx.navigateBack()
      }
    })
  }
})