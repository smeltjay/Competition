const db = wx.cloud.database();
// 1、引入依赖脚本
import * as echarts from '../../ec-canvas/echarts';
let chart = null;
let chart2 = null;
var name = [];
var grades =[];
var l = [30, 27, 34, 34, 30, 32, 31];

// 2、进行初始化数据
function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  // chart.setOption(option);
  return chart;
}

Page({

  data: {
    ec: {
      onInit: initChart // 3、将数据放入到里面
    },
    ec2: {
      onInit: function (canvas, width, height) {
        chart2 = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(chart2);
        return chart2;
      }
    },
  },
  getData(){
    db.collection('workInformation').get({
      success: res => {
        let list = res.data
        // console.log(list)
        let i = 0
        let arr = list.forEach(element => {
          name[i] = element.workName
          grades[i] = element.sum
          i++
          // console.log(name)
          // console.log(grades)
        });
        var options = {
          color: ['#37a2da', '#32c5e9', '#67e0e3'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['成绩']
          },
          grid: {
            left: 20,
            right: 20,
            bottom: 15,
            top: 40,
            containLabel: true
          },
          yAxis: [
            {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: '#999'
                }
              },
              axisLabel: {
                color: '#666'
              }
            }
          ],
          xAxis: [
            {
              type: 'category',
              axisTick: { show: false },
              data: name,
              axisLine: {
                lineStyle: {
                  color: '#999'
                }
              },
              axisLabel: {
                color: '#666'
              }
            }
          ],
          series: [
            {
              name: '成绩',
              type: 'bar',
              label: {
                normal: {
                  show: true,
                  position: 'inside'
                }
              },
              data: grades,
              itemStyle: {
              }
            }
          ]
        };
        chart.setOption(options);
      }
    })

    db.collection('workInformation').get({
      success: res => {

        
        let list = res.data
        // console.log(list)
        let i = 0
        let arr = list.forEach(element => {
          name[i] = element.workName
          grades[i] = element.sum
          i++
          // console.log(name)
          // console.log(grades)
        });
        var options2 = {
          color: ['#37a2da', '#32c5e9', '#67e0e3'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['成绩']
          },
          grid: {
            left: 20,
            right: 20,
            bottom: 15,
            top: 40,
            containLabel: true
          },
          yAxis: [
            {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: '#999'
                }
              },
              axisLabel: {
                color: '#666'
              }
            }
          ],
          xAxis: [
            {
              type: 'category',
              axisTick: { show: false },
              data: name,
              axisLine: {
                lineStyle: {
                  color: '#999'
                }
              },
              axisLabel: {
                color: '#666'
              }
            }
          ],
          series: [
            {
              name: '成绩',
              type: 'bar',
              label: {
                normal: {
                  show: true,
                  position: 'inside'
                }
              },
              data: grades,
              itemStyle: {
              }
            }
          ]
        };
        chart2.setOption(options2);
      }
    })
  },

    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getData();
  },
  onReady() {

  }

  
  
});