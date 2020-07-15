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
var num = new Array()

Page({

  /**
   * 页面的初始数据
   */

  data: {
    fileID: '',
    cloudPath: '',
    newList:[],
    oldList:[],
    newList1:[],
    testList:[],
    number:[]

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
//  分类展示
  navTap(e){
    let id = e.currentTarget.dataset.id;
    console.log(id);
    this.setData({
      curNav: id,
      curIndex:id
    })
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
              if(list3[i].workType === 'A'){
                list3[i].type = 1;
              }
              if(list3[i].workType === 'B'){
                list3[i].type = 2;
              }
              if(list3[i].workType === 'C'){
                list3[i].type = 3;
              }
              if(list3[i].workType === 'D'){
                list3[i].type = 4;
              }
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
    db.collection('arrangements').get({
      success:res=>{
        this.setData({
          testList:res.data,
        })
        console.log(res.data)
        
        for(let i = 1 ;i <= testList.length; i++){
          num[i] = i
          this.setData({
            number:num
          })
        }
      }
    })
    
  },


})