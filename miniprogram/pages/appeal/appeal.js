const db = wx.cloud.database()
var workName = null
var studentName = null
var reason = null
var workID = null
var value = null
var id = null
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  inputWorkID:function(e){
    workID = e.detail.detail.value
    workID = parseInt(workID)
    console.log(workID)
  },
  inputWorkName:function(e){
    workName = e.detail.detail.value
    console.log(workName)
  },
  inputStudentName:function(e){
    studentName = e.detail.detail.value
    console.log(studentName)
  },
  inputReason:function(e){
    reason = e.detail.value
    console.log(reason)
  },
  commitInformation:function(){
    db.collection('appealWork').add({
      data:{
        workID:workID,
        workName:workName,
        studentName:studentName,
        reason:reason,
        name:value,
        isAppeal:true
      },
      success:res=>{
        db.collection('workInformation').where({
          number:workID
        }).get({
          success:function(res){
            console.log('获取成功',res.data)
            id = res.data[0]._id
            console.log(id)
            db.collection('workInformation').doc(id).update({
              data:{
                flag:true
              },
              success:function(res){
                console.log('修改标志成功')
              }
            })
          }
        })
        console.log(res.data)
        wx.showToast({
          title: '提交成功',
        })
        wx.navigateBack()
      }
    })
  },
  onShow: function () {
    value = wx.getStorageSync("name")
  },

})