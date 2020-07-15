// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:['河南省','商丘市','虞城县'],
    now:""

  },
  changeRegion:function(e){
    this.setData({
      region:e.detail.value
    })
    this.getWeather();//更新天气
  },
  getWeather:function(){
    var that = this;
    wx.request({
      url: 'https://free-api.heweather.net/s6/weather/now?',
      data:{
        location:that.data.region[1],
        key:'81512208587f47e091e275e0ed03f353'
      },
      success:function(res){
       console.log(res.data)
       that.setData({now:res.data.HeWeather6[0].now})
      }
    })
  },
  onShow: function () {
    this.getWeather();//更新天气
    console.log('开始')
  }
})