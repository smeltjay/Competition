// 使用了 async await 语法
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  try {
    return await db.collection('workInformation').where({
      isGrade: false,
      number:event.number
    })
    .update({
      data: {
        isGrade:true,
        grade:[event.creativity,event.technology,event.appearance,event.style],
        sum:event.sum
      },
    })
  } catch(e) {
    console.error(e)
  }
}