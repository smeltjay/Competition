//app.js
App({
  data:{
    userid:'',
    userInfo:null,
    //授权状态
    auth: {
      'scope.userInfo': false
     },
     logged:false

  },
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'test-demo-a1exe',
        traceUser: true,
      })
    }

    this.globalData = {

    }
  }
  //全局数据
})
