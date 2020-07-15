let app = getApp();
//获取云数据库引用
const db = wx.cloud.database();
const contestant = db.collection('contestants');
const administrator = db.collection('administrators');
 let name = null;
 let password = null;
 let email = null;
 let address = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
   //输入用户名
   inputName:function(event){
    name = event.detail.detail.value
  },
  //输入密码
  inputPassword(event){
    password = event.detail.detail.value
  },
  inputEmail:function(event){
    email = event.detail.detail.value
  },
  inputAddress:function(event){
    address = event.detail.detail.value
  },

   //选手注册
   registerContestants(){ 
    let that = this;
    let flag = false  //是否存在 true为存在
    //查询用户是否已经注册
    contestant.get({
      success:(res)=> {
        let con = res.data;  //获取到的对象数组数据
      //  console.log(con);
        for (let i=0; i<contestant.length; i++){  //遍历数据库对象集合
          if (name === contestant[i].name){ //用户名存在
            flag = true;
         //   break;
          }
        }
        if(flag === true){    //已注册
          wx.showToast({
          title: '账号已注册！',
          icon: 'success',
          duration: 2500
          })
        }else{  //未注册
          that.saveContestantInfo()
        }
      }
    })
  },
   //注册选手信息
   saveContestantInfo() {
    // let that = this;
    contestant.add({  //添加数据
       data:{
         name:name,
         password: password,
         email:email,
         address:address,
         isAdministrator:false,
         isJudges:false
       }
     }).then(res => {
       console.log('注册成功！')
       wx.showToast({
         title: '注册成功！',
         icon: 'success',
         duration: 3000
       })
       wx.redirectTo({
         url: '/pages/login/login',
       })
     })
   },

   //评委注册
   registerJudges(){ 
    let that = this;
    let flag = false  //是否存在 true为存在
    //查询用户是否已经注册
    contestant.get({
      success:(res)=> {
        let con = res.data;  //获取到的对象数组数据
      //  console.log(con);
        for (let i=0; i<contestant.length; i++){  //遍历数据库对象集合
          if (name === contestant[i].name){ //用户名存在
            flag = true;
         //   break;
          }
        }
        if(flag === true){    //已注册
          wx.showToast({
          title: '账号已注册！',
          icon: 'success',
          duration: 2500
          })
        }else{  //未注册
          that.saveJudgesInfo()
        }
      }
    })
  },
   //注册评委信息
   saveJudgesInfo() {
    // let that = this;
    contestant.add({  //添加数据
       data:{
         name:name,
         password: password,
         email:email,
         address:address,
         isAdministrator:false,
         isJudges:true
       }
     }).then(res => {
       console.log('注册成功！')
       wx.showToast({
         title: '注册成功！',
         icon: 'success',
         duration: 3000
       })
       wx.redirectTo({
         url: '/pages/login/login',
       })
     })
   },
})