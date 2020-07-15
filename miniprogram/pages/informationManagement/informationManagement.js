const db = wx.cloud.database();
var name1 = null;
var password1 = null;
var address1 = null;
var email1 = null;
var id = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:null,
    password:null,
    address:null,
    email:null,
    cTest:'未参加任何赛事'
  },
  nameInput:function(e){
    name1 = e.detail.value
  },
  passwordInput:function(e){
    password1 = e.detail.value
  },
  emailInput:function(e){
    email1 = e.detail.value
  },
  addressInput:function(e){
    address1 = e.detail.value
  },
  doUpdate(){
    console.log(name1)
    console.log(password1)
    console.log(address1)
    console.log(email1)

    db.collection('contestants').doc(id).update({
      // data 传入需要局部更新的数据
      data: {
        // 表示将 done 字段置为 true
        name:name1,
        password:password1,
        address:address1,
        email:email1
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
 onPullDownRefresh: function () {
  console.log('onPullDownRefresh')
  this.queryData(id)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const parameter = options.name
    console.log(options)
    console.log(parameter)
    db.collection('contestants').where({
      name:parameter
    }).get({
      success:res=>{
        const newList = res.data
        id = newList[0]._id
        this.setData({
          name:newList[0].name,
          password:newList[0].password,
          address:newList[0].address,
          email:newList[0].email,
          cTest:newList[0].testName
        })
        name1 = newList[0].name
        password1 = newList[0].password,
        address1 = newList[0].address,
        email1 = newList[0].email
      }
    })
  },

})