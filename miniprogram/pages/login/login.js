// miniprogram/pages/tips/tips.js
const app = getApp()
const db = wx.cloud.database();
const contestant = db.collection('contestants');
const administrator = db.collection('administrators');

let name = null;
let password = null; 
let isAdministrator = null;
let isJudge = null;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    code:"",
  },

 

  //输入用户名
  inputName:function(event){
  name = event.detail.detail.value
},
  //输入密码
  inputPassword(event){
    password = event.detail.detail.value
  },
  contestantsLogin(){
    let that = this;
    //登陆获取选手用户信息
    contestant.get({
      success:(res)=>{
        let user = res.data;
        isAdministrator = user[0].isAdministrator
        console.log(res.data);
        for (let i = 0; i < user.length; i++) {  //遍历数据库对象集合
          if (name === user[i].name) { //用户名存在
            if (password !== user[i].password) {  //判断密码是否正确
              wx.showToast({
                title: '用户名或密码错误！！',
                icon: 'success',
                duration: 2500
              })
            } else {
              isJudge = user[i].isJudges
              console.log('登陆成功！')
              console.log(isJudge)
              wx.showToast({
                title: '登陆成功！！',
                icon: 'success',
                duration: 2500
              })
              wx.setStorageSync('name', name)
              wx.setStorageSync('isAdministrator', isAdministrator)
              wx.setStorageSync('isJudge', isJudge)
              var value = wx.getStorageSync('isAdministrator')
              // console.log(value)

              wx.switchTab({   //跳转首页
                url: '/pages/user/user',  //这里的URL是你登录完成后跳转的界面
              })
            }
            break;
          }else{   //不存在
            wx.showToast({
              title: '无此用户名！！',
              icon: 'success',
              duration: 2500
            })
          }
        }
      }
    })
  },

  register(){
    wx.navigateTo({
      url: '/pages/register/register'
    })
  },

})

