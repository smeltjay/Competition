// miniprogram/pages/tips/tips.js
const app = getApp()
const db = wx.cloud.database();
var list = new Array()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    t:'',
    newList:[]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    db.collection('contestants').get({
      //如果查询成功的话    
      success: res => {
        console.log(res.data)
        list = res.data
        this.setData({
          newList:list
        })
      }
    })
  },
})