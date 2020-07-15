const db = wx.cloud.database();
var id = null;
var studentName1 = null;
var schoolName1 = null;
var workName1 = null;
var workType1 = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolName:null,
    studentName:null,
    workName:null,
    workStyle:null,
    workType:null
  },
  workNameInput:function(e){
    workName1 = e.detail.value
  },
  studentNameInput:function(e){
    studentName1 = e.detail.value
  },
  schoolNameInput:function(e){
    schoolName1 = e.detail.value
  },
  workTypeInput:function(e){
    workType1 = e.detail.value
  },
  doUpdate:function(){
    db.collection('workInformation').doc(id).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        workName:workName1,
        studentName:studentName1,
        schoolName:schoolName1,
        workType:workType1
      },
      success: function(res) {
        wx.showToast({
          title: '修改成功',
        })
        wx.navigateBack()
        console.log(res.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const parameter = options.name
    console.log(options)
    console.log(parameter)
    db.collection('workInformation').where({
      workName:parameter
    }).get({
      success:res =>{
        console.log(res.data)
        const list = res.data
        id = list[0]._id
        this.setData({
          schoolName:list[0].schoolName,
          studentName:list[0].studentName,
          workName:list[0].workName,
          workStyle:list[0].workStyle,
          workType:list[0].workType
        })
        schoolName1 = list[0].schoolName,
        studentName1 = list[0].studentName,
        workName1 = list[0].workName,
        workStyle1 = list[0].workStyle,
        workType1 = list[0].workType
      }
    })
  },



})