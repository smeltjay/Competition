const db = wx.cloud.database();
var number0 = 0
var number1 = 0
var flag1 = false
var id = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    number:{},
    imageIds:null,
    workName:null,
    studentName:null,
    schoolName:null,
    workStyle:null,
    workType:null,
    grades:0,
    isGrade:false,
    fileid:null,
    imgSrc:null,
    httpfile:null,
    filePath:null,
    isLogin:false,
    isAdministrator:'',
    flag:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const number = options.number
    const flag = options.flag
    console.log(options)
    console.log('flag:',flag)
    if(flag === 'true'){
      flag1 = true
      console.log('执行if')
    }else{
      flag1 = false
      console.log('执行else')
    }
    console.log('flag1:',flag1)
    this.setData({
      number:number,
      flag:flag1
    })   
    console.log(number)
    number0 = parseInt(number)
    console.log(number0)
    db.collection('workInformation').where({
      number:number0
    }).get({
      success:res=>{
        const list = res.data
        // console.log(list)
        // console.log('成功1')
        id = res.data[0]._id
        this.setData({
          workName:list[0].workName,
          studentName:list[0].studentName,
          schoolName:list[0].schoolName,
          workStyle:list[0].workStyle,
          workType:list[0].workType,
          isGrade:list[0].isGrade

        }) 
        let a = parseInt(list[0].grade[0])
        let b = parseInt(list[0].grade[1])
        let c = parseInt(list[0].grade[2])
        let d = parseInt(list[0].grade[3])
        let sum = (a + b + c + d)/4 
        this.setData({
          grades:sum
        }) 
      }
    })
    db.collection('fileIds').where({
      number:number0
    }).get({
      success:res=>{
        const list = res.data
        this.setData({
          imageIds:list[0].path
        })
      }
    })

  },

  openFile:function(){
    var fileid = this.data.fileid;
    var that = this;
    fileid = 'cloud://test-demo-a1exe.7465-test-demo-a1exe-1301753527/word/1589599893169.docx'
    db.collection('wordID').where({
      number:number0
    }).get({
      success:res=>{
        const list = res.data
        console.log('这是list',list)
        fileid = list[0].ID
        console.log('这是文档ID',fileid)

        wx.cloud.getTempFileURL({
          fileList: [fileid],
          success: res => {
            console.log(res)
            that.setData({
            //res.fileList[0].tempFileURL是https格式的路径，可以根据这个路径在浏览器上下载
              imgSrc: res.fileList[0].tempFileURL
            });
            //根据https路径可以获得http格式的路径(指定文件下载后存储的路径 (本地路径)),根据这个路径可以预览
            wx.downloadFile({
              url: that.data.imgSrc,
              success: (res) => {
                that.setData({
                  httpfile: res.tempFilePath
                })
                //预览文件
                wx.openDocument({
                  filePath: that.data.httpfile,
                  success: res => {
                  },
                  fail: err => {
                    console.log(err);
                  }
                })
              },
              fail: (err) => {
                console.log('读取失败', err)
              }
            })
          },
          fail: err => {
            console.log(err);
          }
        })
      }
    })
  },
  onShow: function () {
    //判断是否已登陆
    var value = wx.getStorageSync("name")
    if(value){
      this.setData({
        isLogin:true,
      })   
    }
    //判断用户身份
    var value1 = wx.getStorageSync("isAdministrator")
    console.log(value1)
    if(value1){
      this.setData({
        isAdmin:true
      })
    }else{
      this.setData({
        isAdmin:false
      })
    }
  },
})