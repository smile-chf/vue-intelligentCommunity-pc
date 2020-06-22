<template>
  <div
    class="allStatistics"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0)"
  >
    <div class="top">
      <div class="topleft">
        <div id="allStatistics" style="width:100%;height:100%"></div>
      </div>
      <div class="topright">
        <div id="mettingnum" style="width:100%;height:100%"></div>
      </div>
    </div>
    <div class="bottom">
      <div class="toptext">汇总数据列表</div>
      <div class="pad">
            <el-table :data="tableData" border style="width: 100%" show-summary >
        <el-table-column prop="type" label="分类/月份" width="180"></el-table-column>
        <el-table-column prop="January" label="一月"></el-table-column>
        <el-table-column prop="February" label="二月"></el-table-column>
        <el-table-column prop="March" label="三月"></el-table-column>
        <el-table-column prop="April" label="四月"></el-table-column>
        <el-table-column prop="May" label="五月"></el-table-column>
        <el-table-column prop="June" label="六月"></el-table-column>
        <el-table-column prop="July" label="七月"></el-table-column>
        <el-table-column prop="August" label="八月"></el-table-column>
        <el-table-column prop="September" label="九月"></el-table-column>
        <el-table-column prop="October" label="十月"></el-table-column>
        <el-table-column prop="November" label="十一月"></el-table-column>
        <el-table-column prop="December" label="十二月"></el-table-column>
        <el-table-column prop="collect" label="汇总"></el-table-column>
      </el-table>
      </div>
   
    </div>
  </div>
</template>

<script>
import { getCollectData } from "../../../../api/http";
export default {
  data() {
    return {
      tableData: [
        {
          date: "分类一",
          one: "1",
          two: "2"
        },
        {
          date: "分类二",
          one: "1",
          two: "2"
        },
        {
          date: "分类三",
          one: "1",
          two: "2"
        }
      ],
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
          left: "left"
        },
        legend: {
          orient: "horizontal",
          x: "center",
          y: "bottom",
          padding:[ 0, 0, 30, 0],
          itemWidth: 12,
          itemHeight: 12,
          itemGap: 30,
          icon: "circle",

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
      loading: false
    };
  },
  methods: {
    
    async drawLine(departId, year) {
      this.loading=true
      let res = await getCollectData(departId, year);
      if (res.code == 200) {
        this.loading = false;
      }
      this.tableData = res.details.data.collectList;
      let allStatistics = this.$echarts.init(
        document.getElementById("allStatistics")
      );
      let a = [];
      res.details.data.conferencesCount.forEach(item => {
        a.push(item.value);
      });
    
      this.echaartsdata.series[0].data = a;
      this.echaartsdata.series[1].data = a;

      // 绘制图表
      allStatistics.setOption(this.echaartsdata);
      let mettingnum = this.$echarts.init(
        document.getElementById("mettingnum")
      );
      // 绘制图表
      this.mettingnumdata.series[0].data = res.details.data.conferencesTypeList;

      mettingnum.setOption(this.mettingnumdata);
    }
  },
  mounted() {
    this.drawLine();
  },

  watch: {
    "$store.state": {
      handler() {
        this.drawLine(
          this.$store.state.departId,
          this.$store.state.Date,
         
        );
      },
      deep: true
    }
  }
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
    padding: 1rem;
    box-sizing: border-box;
    background-color: #fff;
    width: 57.8rem;
    height: 100%;
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
  background-color: #fff;
  // height: 14.85rem;
  margin-bottom: 1rem;
  width: 100%;
  box-sizing: border-box;
  padding: 1rem 1rem 1rem 1rem;
  .toptext {
    margin-bottom: 1rem;
    font-size: 18px;
    font-weight: 800;
    margin-left: .35rem;
  }
}
.pad{
  box-sizing: border-box;
padding:0 1.7rem;
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

