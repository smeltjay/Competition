// miniprogram/pages/uploadworks/uploadworks.js
const app = getApp()
const db = wx.cloud.database();
const works = db.collection('formerInformation');

var workName = null;
var studentName = null;
var schoolName = null;
var workStyle = null;
var workType = null;
var number = 0;
var number1 = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {


  },
  //输入作品信息
  inputWorkName:function(event){
    workName = event.detail.detail.value
  },
  inputStudentName:function(event){
    studentName = event.detail.detail.value
  },
  inputSchoolName:function(event){
    schoolName = event.detail.detail.value
  },
  inputWorkStyle:function(event){
    workStyle = event.detail.detail.value
  },
  inputWorkType:function(event){
    workType = event.detail.detail.value
  },
  commitInformation(){
    db.collection('formerInformation').get({
      //如果查询成功的话    
      success: res => {
        let list = res.data
        number = list.length
        console.log(number)
        // console.log(list)
      }
    })
    db.collection('formerInformation').add({
      data:{
        workName: workName,
        studentName: studentName,
        schoolName: schoolName,
        workStyle: workStyle,
        workType:workType,
        number:number,
        isGrade:false

      },
      success:function(res){
        console.log(res)
        wx.switchTab({   //跳转首页
          url: '/pages/user/user',
        })
      }
      
    })
    wx.showToast({
      title: '上传成功！！',
      icon: 'success',
      duration: 2500
    })
  },
  // 上传图片
  uploadImage: function () {
    // 选择图片
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        })
        const filePath = res.tempFilePaths[0]
        var timestamp = Date.parse(new Date());
        // 上传图片
        const cloudPath = 'former/' + timestamp + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)
            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            //保存文件路径
            db.collection('formerInformation').get({
              //如果查询成功的话    
              success: res => {
                let list = res.data
                number = list.length
                console.log(number)
                db.collection('formerIds').add({
                  data: {
                    ids: app.globalData.imagePath,
                    number:number,
                    
                  },
                  success: res => {
                    // 在返回结果中会包含新创建的记录的 _id
                    console.log(ima[0])
                    wx.showToast({
                      title: '新增记录成功',
                    })
                    console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
                  },
                  fail: err => {
                    wx.showToast({
                      icon: 'none',
                      title: '新增记录失败'
                    })
                    console.error('[数据库] [新增记录] 失败：', err)
                  }
                  })
              }
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  },
  //上传文档
  uploadfile: function(){
    var that = this
    wx.chooseMessageFile({
      count: 1,//能选择文件的数量
      type: 'file',//能选择文件的类型,我这里只允许上传文件.还有视频,图片,或者都可以
      success(res) {
        //文件临时路径
        const tempFilePaths = res.tempFiles[0].path
		//后缀名的获取
        const houzhui = tempFilePaths.match(/\.[^.]+?$/)[0];
		//存储在云存储的地址
        const cloudpath = 'former_word/' + new Date().getTime() + houzhui;
        //获取fileID
        wx.cloud.uploadFile({
          cloudPath: cloudpath,
          filePath: tempFilePaths,
          success: res => {
            wx.showToast({
              title: '成功',
            })
            var wordPath = tempFilePaths
            console.log('临时路径',wordPath)
            //存储fileID，之后用的到
            var wordID = res.fileID
            that.setData({
              fileid:res.fileID
            })
            //将fileID保存数据库
            db.collection('formerWordID').get({
              //如果查询成功的话    
              success: res => {
                let list1 = res.data
                number1 = list1.length
                console.log(number1)
                //添加
                db.collection('formerWordID').add({
                  data:{
                    ID:wordID,
                    Path:wordPath,
                    number:number1
                  }
                })
              }
            })
            console.log(res)
            console.log(res.fileID)
          },
          fail: err => {
            console.log(err)
          },
        })
      }
    })
  },

})