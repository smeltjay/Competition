
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsList:[]
  },
goToDetail:function(e){
  //获取携带datail-id的数据
  let id = e.currentTarget.dataset.id
  // console.log(e)
  //携带新闻id进行页面跳转
  wx.navigateTo({
    url: '../detail/detail?id=' + id,
  })
},
goToArrangements:function(e){
  wx.navigateTo({
    url: '../../pages/arrangements/arrangements',
  })
},
goToTips:function(e){
  wx.navigateTo({
    url: '../../pages/tips/tips',
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})