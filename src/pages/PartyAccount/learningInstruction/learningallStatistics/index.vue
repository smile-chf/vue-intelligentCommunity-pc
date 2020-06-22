<template>
  <div class="learningallStatistics"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0)"
  >
    <div class="top">
      <div class="toptext">学习人次统计</div>
      <div class="topitem">
        <div v-for="(item, index) in toplist" :key="index">
          <p>{{item.value}}</p>
          <p>{{item.name}}</p>
        </div>
      </div>
      <div class="stylecharts">
        <div id="starnum"></div>
      </div>
    </div>
    <div class="top">
      <div class="toptext">学习时长统计</div>
      <div class="topitem">
        <div v-for="(item, index) in botlist" :key="index">
          <p>{{item.value}}</p>
          <p>{{item.name}}</p>
        </div>
      </div>
      <div class="stylecharts">
        <div id="lengnum"></div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  edugetCollectData,
  getCollectStudyCountData,
  getCollectStudySumData
} from "@/api/http";
import { login } from "../../../../api/http";
export default {
  data() {
    return {
      loading:false,
      toplist: [],
      botlist: [],
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
        series: []
      },
      lengnumdata: {
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
        tooltip: {
          trigger: "axis"
        },
        legend: {},
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
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
        series: []
      }
    };
  },

  methods: {
    async getdata1(year) {
      this.loading=true
      this.starnumdata.series=[]
      let colorlist = [
        "#E92525",
        "#A31A1A",
        "#F58733",
        "#E925B8",
        "#A31A81",
        "#FFC9C9"
      ];
      let res = await getCollectStudyCountData(year);
      this.toplist = res.details.data.data1;
      let bardata = res.details.data.data2.list;
      bardata = JSON.parse(JSON.stringify(bardata).replace(/January/g, "一月"));
      bardata = JSON.parse(
        JSON.stringify(bardata).replace(/February/g, "二月")
      );
      bardata = JSON.parse(JSON.stringify(bardata).replace(/March/g, "三月"));
      bardata = JSON.parse(JSON.stringify(bardata).replace(/April/g, "四月"));
      bardata = JSON.parse(JSON.stringify(bardata).replace(/May/g, "五月"));
      bardata = JSON.parse(JSON.stringify(bardata).replace(/June/g, "六月"));
      bardata = JSON.parse(JSON.stringify(bardata).replace(/July/g, "七月"));
      bardata = JSON.parse(JSON.stringify(bardata).replace(/August/g, "八月"));
      bardata = JSON.parse(
        JSON.stringify(bardata).replace(/September/g, "九月")
      );
      bardata = JSON.parse(JSON.stringify(bardata).replace(/October/g, "十月"));
      bardata = JSON.parse(
        JSON.stringify(bardata).replace(/November/g, "十一月")
      );
      bardata = JSON.parse(
        JSON.stringify(bardata).replace(/December/g, "十二月")
      );
      // console.log(this.starnumdata.series);
      // console.log(res.details.data.data2.typeList)
      
      let a = this.starnumdata.series;
      let b = res.details.data.data2.typeList;

      b.forEach((l, m) => {
        a.push({
          name: l,
          type: "bar",
          itemStyle: {
            normal: {
              color: colorlist[m] //柱子的颜色
            }
          }
        });
      });
      // 基于准备好的dom，初始化echarts实例
      let starnum = this.$echarts.init(document.getElementById("starnum"));
      // 绘制图表
      this.starnumdata.dataset.source = bardata;
      starnum.setOption(this.starnumdata);
      this.loading=false
    },
    async getdata2(year) {
       this.loading=true
      this.lengnumdata.series=[]
      let colorlist = [
        "#E92525",
        "#A31A1A",
        "#F58733",
        "#E925B8",
        "#A31A81",
        "#FFC9C9"
      ];

      let res = await getCollectStudySumData(year);

      this.botlist = res.details.data.data3;
      let linedata = res.details.data.data4;
      linedata = JSON.parse(
        JSON.stringify(linedata).replace(/January/g, "一月")
      );
      linedata = JSON.parse(
        JSON.stringify(linedata).replace(/February/g, "二月")
      );
      linedata = JSON.parse(JSON.stringify(linedata).replace(/March/g, "三月"));
      linedata = JSON.parse(JSON.stringify(linedata).replace(/April/g, "四月"));
      linedata = JSON.parse(JSON.stringify(linedata).replace(/May/g, "五月"));
      linedata = JSON.parse(JSON.stringify(linedata).replace(/June/g, "六月"));
      linedata = JSON.parse(JSON.stringify(linedata).replace(/July/g, "七月"));
      linedata = JSON.parse(
        JSON.stringify(linedata).replace(/August/g, "八月")
      );
      linedata = JSON.parse(
        JSON.stringify(linedata).replace(/September/g, "九月")
      );
      linedata = JSON.parse(
        JSON.stringify(linedata).replace(/October/g, "十月")
      );
      linedata = JSON.parse(
        JSON.stringify(linedata).replace(/November/g, "十一月")
      );
      linedata = JSON.parse(
        JSON.stringify(linedata).replace(/December/g, "十二月")
      );

      let a1 = this.lengnumdata.series;

      this.botlist.forEach((l1, m1) => {
        a1.push({
          name: l1.name,
          type: "line",
          //  smooth: true,
          itemStyle: {
            normal: {
              color: colorlist[m1] //柱子的颜色
            }
          }
        });
      });
      let lengnum = this.$echarts.init(document.getElementById("lengnum"));
      // 绘制图表
      this.lengnumdata.dataset.source = linedata;
      lengnum.setOption(this.lengnumdata);
       this.loading=false
    }
  },
  mounted() {
    this.getdata1();
    this.getdata2();
  },
  watch: {
    "$store.state": {
      handler() {
        this.getdata1(this.$store.state.year);
        this.getdata2(this.$store.state.year);
        // console.log(this.$store.state.year);
        
      },
      deep: true
    }
  }
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
    flex: 1;
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
</style>