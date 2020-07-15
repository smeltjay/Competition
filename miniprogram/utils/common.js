const app = getApp()
const db = wx.cloud.database()
var list1 = new Array()
var list2 = new Array()
var list3 = new Array()
function getInformation(){
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
            list3[i].ids = list2[i].ids
          }
        }
      })
    }
  })
  return list3
}


//获取作品列表
function getList(){
  let that = this
  let list4 = that.getInformation()
  console.log('test')
  console.log(list4)
  let list = [];
  for(var i = 0;i < list3.length ;i++){
    let obj = {};
    obj.ids = list3[i].ids;
    obj.workName = list3[i].workName;
    obj.studentName = list3[i].studentName;
    obj.schoolName = list3[i].schoolName;
    obj.workStyle = list3[i].workStyle;
    list.push(obj);
  }
  console.log(list)
  return list;
}

//获取作品内容
function getDetail(ids){
  this.getInformation()
  let message = {
    code:'404',
    information:{}
  };
  for(var i = 0;i < list3.length;i++){
    if(ids == list3[i].ids){
      message.code = '200';
      message.information = list3[i];
      break;
    }
  }
  return message;
}
module.exports = {
  getList:getList,
  getDetail:getDetail,
  getInformation:getInformation
}

