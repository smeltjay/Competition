// pages/my/my.js
const app = getApp()
const db = wx.cloud.database();
const admin = db.collection('user');
const ids = db.collection('fileIds');
let name = null;
let parameter = null;
var ima = new Array()
var list = new Array()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:null,
    isLogin:false,
    isAdmin:'',
    isJud:''
  },
  //获取缓冲池用户账号

  //获取个人信息
  getMyInfo:function(e){
    // console.log(e.detail.userInfo)
    let info = e.detail.userInfo
    let flag = false
    admin.get({
      success:(res)=> {
        let admins = res.data;  //获取到的对象数组数据
        for (let i=0; i<admins.length; i++){  //遍历数据库对象集合
          if (name === admins[i].name){ //用户名存在
            flag = true;
            console.log('1');
            console.log(flag);
            break;

          }else{
            flag = false;
          }
        }
      }
    })
    if(flag == false){
      name = info.nickName
      console.log('2');
      console.log(flag);
    }

    this.setData({
      src:info.avatarUrl,
      nickName:info.nickName,
      isLogin:true
    })
    this.saveuserinfo()

  },
  //图片地址
  onFiledClick: function onFiledClick() {
    wx.navigateTo({
      url: "../../pages/filed/filed"
    });
  },
  //注册用户信息
  saveuserinfo() {
  // let that = this;
    admin.add({  //添加数据
      data:{
        name:name,
      }
    })
  },
    // 上传图片
    doUpload: function () {
      wx.navigateTo({
        url: '../../pages/uploadworks/uploadworks',
      })
    },

    //上传往年作品
    doUploadFormer: function () {
      wx.navigateTo({
        url: '../../pages/former/former',
      })
    },
    //作品管理
    doWork:function(){
      wx.navigateTo({
        url: '../../pages/workManage/workManege',
      })
    },
    //发布赛事安排
    doArrangements:function(e){
      wx.navigateTo({
        url: '../../pages/goArrangements/goArrangements',
      })
    },
    //发布温馨提醒
    doTips:function(e){
      wx.navigateTo({
        url: '../../pages/goTips/goTips',
      })
    },
    //跳转登陆页面
    doLogin:function(e){
      wx.navigateTo({
        url: '../../pages/login/login',
      })
    },
    //跳转注册
    doRegister:function(e){
      wx.navigateTo({
        url: '../../pages/register/register',
      })
    },
    
    doUser:function(e){
      wx.navigateTo({
        url: '../../pages/userManage/userManage',
      })
    },
    doChart:function(){
      wx.navigateTo({
        url: '../../pages/dataChart/dataChart',
      })
    },
    doAppeal:function(){
      wx.navigateTo({
        url: '../../pages/appeal/appeal',
      })
    },
    doAuditing:function(){
      wx.navigateTo({
        url: '../../pages/auditing/auditing',
      })
    },
    doData:function(){
      wx.switchTab({
        url: '/pages/works/works'
      })
    },
    doJoin:function(){
      wx.navigateTo({
        url: '../../pages/arrangements/arrangements',
      })
    },
    //注销
    logOut:function(){
      wx.clearStorage()
      wx.switchTab({   //跳转首页
        url: '../../pages/user/user',
      })
      this.setData({
        isLogin:false
      })
      console.log("清空缓存")
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.clearStorageSync()
    // console.log("清空缓存")
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
    //判断是否已登陆
    var value = wx.getStorageSync("name")
    // console.log("缓冲池数据")
    // console.log(value)
    if(value){
      this.setData({
        isLogin:true,
        userName:value
      })
      parameter = value
    }
    //判断用户身份
    var value1 = wx.getStorageSync("isAdministrator")
    if(value1){
      this.setData({
        isAdmin:true
      })
    }else{
      this.setData({
        isAdmin:false
      })
    }
    var value2 = wx.getStorageSync("isJudge")
    if(value2){
      this.setData({
        isJud:true
      })
    }
    else{
      this.setData({
        isJud:false
      })
    }
  },
})