// miniprogram/pages/join/join.js
const db = wx.cloud.database()
var parameter = null
var isAdmin1 = false
var isLogin1 = false
var isJud = false
var studentName = null
var name = null
var number = null
var place = null
var content = null
var time = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:null,
    name:null,
    time:null,
    place:null,
    content:null,
    isLogin:false,
    isAdmin:false
  },
  join:function(){
    console.log("管理",isAdmin1)
    console.log("登录",isLogin1)
    console.log("评委",isJud)
    if(isLogin1){
      if(isAdmin1){
        wx.showToast({
          title: '只有选手可以报名',
        })
      }else{
        if(isJud){
          wx.showToast({
            title: '只有选手可以报名',
          })
        }else{
          db.collection('join').add({
            data:{
              studentName:studentName,
              number:number,
              name:name,
              time:time,
              place:place,
              content:content
            },
            success:res=>{
              wx.showToast({
                title: '报名成功',
              })
              db.collection('contestants').where({
                name:studentName
              }).get({
                success:res=>{
                  console.log(res.data)
                  const id = res.data[0]._id
                  db.collection('contestants').doc(id).update({
                    data:{
                      isJoin:true,
                      testNumber:number,
                      testName:name
                    }
                  })
                }
              })
            }
          })
        }
      }
    }else{
      wx.showToast({
        title: '您还未登录',
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    parameter = options.number
    console.log(parameter)
    db.collection('arrangements').where({
      number:parameter
    }).get({
      success:res=>{
        const list = res.data
        console.log(list)
        this.setData({
          number:list[0].number,
          name:list[0].name,
          time:list[0].time,
          place:list[0].place,
          content:list[0].content
        })
        number = list[0].number
        name = list[0].name
        time = list[0].time
        place = list[0].place
        content = list[0].content
      }
    })
    var value = wx.getStorageSync("name")
    studentName = value
     //判断是否已登陆
     var value = wx.getStorageSync("name")
     if(value){
       this.setData({
         isLogin:true,
       })  
       isLogin1 = true 
     }
     //判断用户身份
     var value1 = wx.getStorageSync("isAdministrator")
     console.log('管理',value1)
     if(value1){
       this.setData({
         isAdmin:true
       })
       isAdmin1 = true
     }else{
       this.setData({
         isAdmin:false
       })
       isAdmin1 = false
     }
     var value2 = wx.getStorageSync("isJud")
     if(value2){
      isJud = true
    }else{
      isJud = false
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
})