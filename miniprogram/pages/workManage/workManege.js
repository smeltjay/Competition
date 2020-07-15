// miniprogram/pages/works/works.js
var common = require('../../utils/common.js')
const app = getApp()
const db = wx.cloud.database();
var id = null;
var imagePath = [];
var list1 = new Array()
var list2 = new Array()
var list3 = new Array()

var list4 = new Array()
var list5 = new Array()
var list6 = new Array()


Page({

  /**
   * 页面的初始数据
   */

  data: {
    fileID: '',
    cloudPath: '',
    newList:[],
    oldList:[]

  },
  delete:function(e){
    const name = e.currentTarget.dataset.name
    var that = this
    console.log(name)
    wx.showModal({
      title: '提示',
      content: '确认删除',
      success (res) {
        if (res.confirm) {
           //删除作品信息
          db.collection('workInformation').where({
            workName:name
          }).get({
            success:res =>{
              const id1 = res.data[0]._id
              console.log(res.data)
              console.log(id1)
              db.collection('workInformation').doc(id1).remove({
                success: function(res) {
                  console.log(res.data)
                  //删除图片信息
                  db.collection('fileIds').where({
                    workName:name
                  }).get({
                    success:res =>{
                      const id2 = res.data[0]._id
                      console.log(res.data)
                      console.log(id2)
                      db.collection('fileIds').doc(id2).remove({
                        success: function(res) {
                          //删除文档信息
                          db.collection('woardID').where({
                            workName:name
                          }).get({
                            success:res =>{
                              const id3 = res.data[0]._id
                              console.log(res.data)
                              console.log(id3)
                              db.collection('wordID').doc(id3).remove({
                                success: function(res) {
                                                           
                                }
                              })
                            }
                          })
                        }
                      })
                    }
                  })         
                }
              })
            }
          })
          console.log('用户点击确定')
          wx.showToast({
            title: '删除完成',
          })
          
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    }) 
  },

  //swiper切换时会调用
  pagechange: function (e) {
    if ("touch" === e.detail.source) {
      let currentPageIndex = this.data.currentIndex
      currentPageIndex = (currentPageIndex + 1) % 2
      this.setData({
        currentIndex: currentPageIndex
      })
    }
  },
  //用户点击tab时调用
  titleClick: function (e) {
    let currentPageIndex =
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    db.collection('workInformation').get({
      //如果查询成功的话  
      success: res => {
        list1 = res.data 
        list3 = list1
        console.log(list3)
        db.collection('fileIds').get({
          //如果查询成功的话    
          success: res => {
            list2 = res.data 
            for(var i = 0;i < list2.length;i++){
              list3[i].path = list2[i].path  
               
            }
            // console.log(list3)
            this.setData({
              newList:list3
            })            
          }
        })
      }
    })

    //展现往期作品
    db.collection('formerInformation').get({
      //如果查询成功的话  
      success: res => {
        list4 = res.data 
        list6 = list4

        db.collection('formerIds').get({
          //如果查询成功的话    
          success: res => {
            list5 = res.data
            // console.log('list5',list5)  
            for(var i = 0;i < list5.length;i++){
              list6[i].ids = list5[i].ids   
            }
            // console.log('list6',list6)
            this.setData({
              oldList:list6
            })
          }
        })
      }
    })
    
  },

})