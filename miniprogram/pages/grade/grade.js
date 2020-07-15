const app = getApp()
const db = wx.cloud.database();
var creativity = 0;
var technology = 0;
var appearance = 0;
var style = 0;
var number0 = 1;
var sum = 0;
var id = null
var id1 = null
Page({

  /**
   * 页面的初始数据
   */

  data: {
    number:{},
  },
  // 接受作品分数
  inputCreativity:function(event){
    creativity = event.detail.detail.value
  },
  inputTechnology:function(event){
    technology = event.detail.detail.value
  },
  inputAppearance:function(event){
    appearance = event.detail.detail.value
  },
  inputStyle:function(event){
    style = event.detail.detail.value
  },
  commitInformation(){
    
    wx.cloud.callFunction({
      name:'update',
      data:{
        creativity:creativity,
        technology:technology,
        appearance:appearance,
        style:style,
        sum:sum,
        number:number0
      },
      success:function(res){
        db.collection('workInformation').where({
          number:number0
        }).get({
          success:res=>{
            const list = res.data
            id = res.data[0]._id
            let a = parseInt(list[0].grade[0])
            let b = parseInt(list[0].grade[1])
            let c = parseInt(list[0].grade[2])
            let d = parseInt(list[0].grade[3])
            sum = (a + b + c + d)/4 
            console.log(sum)
            wx.cloud.callFunction({
              name:'update',
              data:{
                creativity:creativity,
                technology:technology,
                appearance:appearance,
                style:style,
                sum:sum,
                number:number0
              },
            })
            db.collection('workInformation').doc(id).update({
              data:{
                flag:false
              },
              success:function(res){
                console.log('修改标志成功')
              }
            })  
            db.collection('appealWork').where({
              workID:number0
            }).get({
              success:function(res){
                id1 = res.data[0]._id
                console.log(res.data)
                console.log(id1)
                db.collection('appealWork').doc(id1).update({
                  data:{
                    isAppeal:false
                  },
                  success:function(res){
                    console.log('修改标志成功1')
                  }
                })
              }
            })   
          }
        })
        wx.showToast({
          title: '打分成功',
        })
        wx.switchTab({   
          url: '../../pages/works/works',
        })
      },
      fail: console.error
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {number} = options
    this.setData({
      number:number
    })   
    number0 = parseInt(number)
    console.log(number0)
    db.collection('workInformation').where({
       number:number0
    }).get({
      success:res=>{
        const list = res.data 
        console.log(list)
        console.log('成功1')
      }
    })
  },

})