<template>
  <div class="allStatistics"
   v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0)">
    <div class="top">
      <div class="topleft">
        <div class="bottomallnum">共发布图文{{articleAllCount}}篇</div>
        <div id="allStatistics" style="width:100%;height:100%"></div>
      </div>
      <div class="topright">
        <div id="mettingnum" style="width:100%;height:100%"></div>
      </div>
    </div>
    <div class="bottom">
      <div class="bottomallnum">考试次数共{{articleReadAllCount}}次</div>
      <div id="readnum" style="width:100%;height:100%"></div>
    </div>
    <div class="bottom1">
       <div class="bottomallnum" @click="derive">导出数据</div>
        <el-table :data="tableData" border style="width: 100%"  >
           <!-- <el-table-column type="selection" width="80"></el-table-column> -->
        <el-table-column prop="type" label="类别名称" width="180"></el-table-column>
        <el-table-column prop="articleCount" label="图文数"></el-table-column>
        <el-table-column prop="readCount" label="阅读人次"></el-table-column>
        <el-table-column prop="commentCount" label="评论条数"></el-table-column>
        <el-table-column prop="likeCount" label="点赞数"></el-table-column>
        <el-table-column prop="collectCount" label="收藏数"></el-table-column>
        
      </el-table>
    </div>
  </div>
</template>

<script>
import { pubgetCollectData } from "../../../../api/http";
import {derive} from '../../../../utils/derive'
export default {
  data() {
    return {
      loading:false,
      idlist:[],
      tableData:[],
      articleReadAllCount:'',
      articleAllCount: "",
      echaartsdata: {
        title: {
          text: "按月统计会议次数",
          left: "left"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
            formatter: "{a} <br/>{b}: {c} "
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            name: "月",
            data: [
              "一月",
              "二月",
              "三月",
              "四月",
              "五月",
              "六月",
              "七月",
              "八月",
              "九月",
              "十月",
              "十一月",
              "十二月"
            ],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: ""
          }
        ],
        series: [
          {
            name: "会议次数",
            type: "bar",
            barWidth: "20%",
            itemStyle: {
              normal: {
                color: "#F58733" //柱子的颜色
              }
            },
            data: [480, 550, 590, 700, 810, 850, 840, 600, 800, 900, 950, 562]
          },
          {
            name: "会议次数",
            type: "line",
            // symbol:'star',/*拐点样式*/
            symbolSize: 8, //拐点大小
            itemStyle: {
              normal: {
                color: "#D2691E" //拐点颜色
              }
            },
            lineStyle: {
              normal: {
                color: "#F58733" //折线颜色
              }
            },
            data: [480, 550, 590, 700, 810, 850, 840, 600, 800, 900, 950, 562]
          }
        ]
      },
      mettingnumdata: {
        title: {
          text: "按分类统计会议次数",
          // left: "left"
        },
        legend: {
          orient: "horizontal",
          x: "center",
          y: "bottom",
          padding:[0 , 0 , 30, 0],
          itemWidth: 12,
          itemHeight: 12,
          itemGap: 30,
          icon: "circle",
          // data: [
          //   "30岁以下",
          //   "30~40岁",
          //   "40~50岁",
          //   "50~60岁",
          //   "60~70岁",
          //   "70岁以上"
          // ],
          textStyle: {
            //图例文字的样式
            color: [
              "#E92525",
              "#A31A1A",
              "#F58733",
              "#E925B8",
              "#A31A81",
              "#FFC9C9"
            ]
          }
        },
        color: [
          "#E92525",
          "#A31A1A",
          "#F58733",
          "#E925B8",
          "#A31A81",
          "#FFC9C9"
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
          {
            name: "智慧社区",
            type: "pie",
            radius: ["35%", "50%"],
            center: ["50%", "40%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "14",
                  fontWeight: "bold"
                }
              }
            },

            data: [
              { value: 120, name: "30岁以下" },
              { value: 136, name: "30~40岁" },
              { value: 77, name: "40~50岁" },
              { value: 75, name: "50~60岁" },
              { value: 75, name: "60~70岁" },
              { value: 117, name: "70岁以上" }
            ]
          }
        ]
      },
      readnumdata: {
        title: {
          text: "阅读人次统计",
          padding:[0 ,0, 0, 30,]
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
          data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月","八月","九月",'十月',"十一月","十二月"]
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
            name: "阅读人次",
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
     handleChange(val) {
     
      this.idlist = [];
      val.forEach(item => {
        this.idlist.push(item.id);
      });
      console.log(this.idlist);
    },
  async derive() {
      // if (this.idlist.length == 0) {
      //   this.$message({
      //     showClose: true,
      //     message: "请选择导出人员",
      //     type: "error"
      //   });
      // } else {
      //   let a = this.idlist.toString();
      //   console.log(a);

      //   derive({
      //     url:
      //       "/intelligentCommunity/manage/statistics/onlineExam/exportPersonalData",
      //     ids: a,
      //     filename: "党务公开统计表"
      //   });
      // }
        derive({
          url:
            "/intelligentCommunity/manage/statistics/publicPartyWork/exportCollectData",
          ids: "",
          filename: "党务公开汇总统计表"
        });
    },


    async drawLine(year) {
      this.loading=true
      let res = await pubgetCollectData(year);
      this.articleAllCount = res.details.data.data1.articleAllCount;
      let a = [];
      res.details.data.data1.articleCountList.forEach(item => {
        a.push(item.value);
      });
      this.echaartsdata.series[0].data = a;
      this.echaartsdata.series[1].data = a;
      let allStatistics = this.$echarts.init(
        document.getElementById("allStatistics")
      );
      // 绘制图表
      allStatistics.setOption(this.echaartsdata);
      this.mettingnumdata.series[0].data = res.details.data.data2;
       
      let mettingnum = this.$echarts.init(
        document.getElementById("mettingnum")
      );
      // 绘制图表
      mettingnum.setOption(this.mettingnumdata);


      this.articleReadAllCount= res.details.data.data3.articleReadAllCount
      let n =[]
      res.details.data.data3.articleReadCountList.forEach(element => {
          n.push(element.value)
      });
      this.readnumdata.series[0].data=n
    

      let readnum = this.$echarts.init(document.getElementById("readnum"));
      // 绘制图表
      readnum.setOption(this.readnumdata);

     this.tableData=res.details.data.data4
       this.loading=false

    }
  },
  mounted() {
    this.drawLine();
  },
    watch: {
    "$store.state.year6": {
      handler() {
        this.drawLine(this.$store.state.year6)
      },
      deep: true
    }
  },
};
</script>

<style lang="less" scoped>
.allStatistics {
  width: 100%;
  height: 100%;
  // background-color: red;
}

.top {
  width: 100%;
  height: 19.75rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  .topleft {
    box-sizing: border-box;
    padding:  1rem;
    position: relative;
    background-color: #fff;
    width: 57.8rem;
    height: 100%;
    .bottomallnum {
      font-size: 0.65rem;
      color: #6f6f6f;
      position: absolute;
      right: 1.7rem;
      top: 1.5rem;
    }
  }
  .topright {
    width: 21.7rem;
    height: 100%;
    background-color: #fff;
    box-sizing: border-box;
    padding: 1rem;
  }
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
.bottom1 {
  width: 100%;
  height: 17.65rem;
  background-color: #fff;

  box-sizing: border-box;
  // padding-top: 1.5rem;
  position: relative;
  padding:  3rem 2rem;
   .bottomallnum {
    font-size: 0.65rem;
    color: #6f6f6f;
    position: absolute;
    right: 1.7rem;
    top: 1.5rem;
    cursor: pointer;
  }
}
</style>
<style lang="less">
.allStatistics {
  .el-table th,
  .el-table tr {
    background-color: #fff !important;
  }
}
</style>