
const app = getApp()
const db = wx.cloud.database();
const contestant = db.collection('contestants');
const administrator = db.collection('administrators');

let name = null;
let password = null; 
let isAdministrator = null;

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
  administratorsLogin(){
    let that = this;
    //登陆获取管理员用户信息
    administrator.get({
      success:(res)=>{
        let user = res.data;
        isAdministrator = res.data[0].isAdministrator
       console.log(res.data);
        for (let i = 0; i < user.length; i++) {  //遍历数据库对象集合
          if (name === user[i].name) { //用户名存在
            if (password !== user[i].password) {  //判断密码是否正确
              wx.showToast({
                title: '密码错误！！',
                icon: 'success',
                duration: 2500
              })
            } else {
              console.log('登陆成功！')
              console.log(name)
              console.log(isAdministrator)
              wx.showToast({
                title: '登陆成功！！',
                icon: 'success',
                duration: 2500
              })
              wx.setStorageSync('name', name)
              wx.setStorageSync('isAdministrator', isAdministrator)
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
 
})

