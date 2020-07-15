const db = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newList:[],
    isAppeal:true,
    flag:false
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    db.collection('appealWork').get({
      success:res =>{
        console.log(res.data)
        this.setData({
          newList:res.data

        })
      }
    })
  },
})