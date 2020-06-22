<template>
  <div class="learningallStatistics"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0)">
    <div class="top">
      <div class="toptext">考试情况统计</div>
      <div class="topitem">
        <div>
          <p>{{total.totalCount}}</p>
          <p>考试总人次</p>
        </div>
        <div>
          <p>{{total.passCount}}</p>
          <p>通过总人次</p>
        </div>
        <div>
          <p>{{total.notPassCount}}</p>
          <p>未通过总人次</p>
        </div>
        <div>
          <p>{{total.absentCount}}</p>
          <p>缺考总人次</p>
        </div>
      </div>
      <div class="stylecharts">
        <div id="starnum"></div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottomallnum">考试次数共{{allnum}}次</div>
      <div id="examnum" style="width:100%;height:100%"></div>
    </div>
  </div>
</template>

<script>
import {getData} from '@/api/http'
export default {
  data() {
    return {
      loading:false,
   total:{},
     allnum:"",
      starnumdata: {
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        legend: {
          icon: "circle"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        dataset: {
          source: [
            ["一月", 43.3, 85.8, 93.7],
            ["二月", 83.1, 73.4, 55.1],
            ["三月", 86.4, 65.2, 82.5],
            ["四月", 72.4, 53.9, 39.1],
            ["五月", 72.4, 53.9, 39.1],
            ["六月", 72.4, 53.9, 39.1],
            ["七月", 72.4, 53.9, 39.1],
            ["八月", 72.4, 53.9, 39.1],
            ["九月", 72.4, 53.9, 39.1],
            ["十月", 72.4, 53.9, 39.1],
            ["十一月", 72.4, 53.9, 39.1],
            ["十二月", 72.4, 53.9, 39.1]
          ]
        },
        xAxis: {
          type: "category",
          axisLine: {
            lineStyle: {
              color: "#CC9A9A"
            }
          },
          axisLabel: {
            color: "#CC9A9A",
            interval: 0
          }
        },
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#CC9A9A"
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ["#FEEEEE"],
                width: 1,
                type: "solid"
              }
            }
          }
        ],
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          {
            name: "考试总人次",
            barWidth: "12%",
            type: "bar",
            itemStyle: {
              normal: {
                color: "#E92525" //柱子的颜色
              }
            }
          },
          {
            name: "通过总人次",
            barWidth: "12%",
            type: "bar",
            itemStyle: {
              normal: {
                color: "#F58733" //柱子的颜色
              }
            }
          },
          {
            name: "未通过总人次",
            barWidth: "12%",
            type: "bar",
            itemStyle: {
              normal: {
                color: "#E925B8" //柱子的颜色
              }
            }
          },
          {
            name: "缺考总人次",
            barWidth: "12%",
            type: "bar",
            itemStyle: {
              normal: {
                color: "#FFC9C9" //柱子的颜色
              }
            }
          }
        ]
      },
      examnumdata: {
        title: {
          text: "考试场次统计",
          padding: [0, 0, 0, 50],
          textStyle: {
            //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
            color: "#6f6f6f",
            fontStyle: "normal",
            fontWeight: "normal"
          }
        },
        legend: {
          //   icon: "circle",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          axisLine: {
            lineStyle: {
              color: "#CC9A9A"
            }
          },
          axisLabel: {
            color: "#CC9A9A",
            interval: 0
          },
          type: "category",
          data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月","八月","九月","十月","十一月","十二月"]
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#CC9A9A"
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#FEEEEE"],
              width: 1,
              type: "solid"
            }
          }
        },
        series: [
          {
            name: "考试场次",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
           
            type: "line",
            itemStyle: {
              normal: {
                color: "#E92525" //柱子的颜色
              }
            }
          }
        ]
      }
    };
  },

  methods: {
   async drawLine(year) {
     this.loading=true
     let res=await getData(year)
    this.total=res.details.data.total
    this.allnum=res.details.data.totalTimes
    let bardata=res.details.data.list
    bardata=JSON.parse(JSON.stringify(bardata).replace(/January/g,"一月"))
    bardata=JSON.parse(JSON.stringify(bardata).replace(/February/g,"二月"))
    bardata=JSON.parse(JSON.stringify(bardata).replace(/March/g,"三月"))
    bardata=JSON.parse(JSON.stringify(bardata).replace(/April/g,"四月"))
    bardata=JSON.parse(JSON.stringify(bardata).replace(/May/g,"五月"))
    bardata=JSON.parse(JSON.stringify(bardata).replace(/June/g,"六月"))
    bardata=JSON.parse(JSON.stringify(bardata).replace(/July/g,"七月"))
    bardata=JSON.parse(JSON.stringify(bardata).replace(/August/g,"八月"))
    bardata=JSON.parse(JSON.stringify(bardata).replace(/September/g,"九月"))
    bardata=JSON.parse(JSON.stringify(bardata).replace(/October/g,"十月"))
    bardata=JSON.parse(JSON.stringify(bardata).replace(/November/g,"十一月"))
    bardata=JSON.parse(JSON.stringify(bardata).replace(/December/g,"十二月"))
    console.log(bardata);
    
     let linedata = res.details.data.monthMap
      // 基于准备好的dom，初始化echarts实例
      let starnum = this.$echarts.init(document.getElementById("starnum"));
     this.starnumdata.dataset.source=bardata
      // 绘制图表
      starnum.setOption(this.starnumdata);
      // 基于准备好的dom，初始化echarts实例
      let examnum = this.$echarts.init(document.getElementById("examnum"));
      // 绘制图表
      this.examnumdata.series[0].data=Object.values(linedata)
     
      
      examnum.setOption(this.examnumdata);

      this.loading=false
    }
  },
  mounted() {
    this.drawLine();
  },
  watch: {
    "$store.state.year1": {
      handler() {
    
        // console.log('监听');
        this.drawLine(this.$store.state.year1)
      },
      deep: true
    }
  },
};
</script>

<style lang="less" scoped>
#starnum {
  width: 100%;
  height: 100%;
}
#lengnum {
  width: 100%;
  height: 100%;
}
.learningallStatistics {
  width: 100%;
  height: 140%;
  //   background-color: red;
}
.top {
  width: 100%;
  height: 30.95rem;
  background-color: #fff;
  margin-bottom: 1.5rem;
}
.toptext {
  width: 100%;
  height: 2.5rem;
  line-height: 2.5rem;
  color: #6f6f6f;
  font-size: 0.9rem;
  text-indent: 2rem;
  // border-bottom: 1px solid #FEEEEE;
}
.topitem {
  display: flex;
  div {
    width: 25%;
    height: 5.5rem;
    border: 1px solid #feeeee;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    padding: 1rem;
    box-sizing: border-box;

    p {
      width: 100%;
      text-align: center;
      // height: 30%;
    }
    p:nth-child(1) {
      font-size: 24px;
      color: #6f6f6f;
    }
    p:nth-child(2) {
      font-size: 14px;
      color: #6f6f6f;
    }
  }
}
.stylecharts {
  box-sizing: border-box;
  padding-top: 1rem;
  width: 100%;
  height: 21.45rem;
  background-color: #fff;
}
.bottom {
  width: 100%;
  height: 19.65rem;
  background-color: #fff;
  margin-bottom: 1rem;
  box-sizing: border-box;
  padding-top: 1.5rem;
  position: relative;
  .bottomallnum {
    font-size: 0.65rem;
    color: #6f6f6f;
    position: absolute;
    right: 1.7rem;
    top: 1.5rem;
  }
}
</style>