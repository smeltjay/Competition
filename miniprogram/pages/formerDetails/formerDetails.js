const db = wx.cloud.database();
var number0 = 0;
var number1 = 0;
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
    grades:98,
    fileid:null,
    imgSrc:null,
    httpfile:null,
    filePath:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {number} = options
    this.setData({
      number:number
    })   
    console.log(number)
    number0 = parseInt(number)
    console.log(number0)
    db.collection('formerInformation').where({
      number:number0
    }).get({
      success:res=>{
        const list = res.data
        // console.log(list)
        // console.log('成功1')
        this.setData({
          workName:list[0].workName,
          studentName:list[0].studentName,
          schoolName:list[0].schoolName,
          workStyle:list[0].workStyle,
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
    db.collection('formerIds').where({
      number:number0
    }).get({
      success:res=>{
        const list = res.data
        this.setData({
          imageIds:list[0].ids
        })
      }
    })

  },

  openFile:function(){
    var fileid = this.data.fileid;
    var that = this;
    fileid = 'cloud://test-demo-a1exe.7465-test-demo-a1exe-1301753527/word/1589599893169.docx'
    db.collection('formerWordID').where({
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
   
  }
})