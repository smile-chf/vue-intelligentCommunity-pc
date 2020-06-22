<template>
  <div class="visual"
  v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0)"
  >
    <!-- <div id="Chart1"></div> -->
    <div class="mainbody">
      <div class="mainleft">
        <div class="charsbar">
          <div id="Chart1" style="width:100%;height:100%"></div>
        </div>
        <div class="charsline">
          <div id="Chart2" style="width:100%;height:100%"></div>
        </div>
      </div>
      <div class="maincenter">
        <div class="charschain"></div>
        <div class="charstwobar">
          <div class="onebar">
            <div id="Chart3" style="width:100%;height:100%"></div>
          </div>
          <div class="twobar">
            <div id="Chart4" style="width:100%;height:100%"></div>
          </div>
        </div>
      </div>
      <div class="mainright">
        <div class="partynumber">
          <div class="numleft">
            <div class="numitem">
              <div class="text100">{{num.partyNum}}</div>
              <div class="texren">人</div>
            </div>
            <div class="partysomenum">共产党员人数</div>
          </div>
          <div class="numright">
            <img src="../../assets/img/party.png" style=" width:2.9rem;height:2.9rem;" alt />
          </div>
        </div>
        <div class="partynumber">
          <div class="numleft">
            <div class="numitem">
              <div class="text100">{{num.orgNum}}</div>
              <div class="texren">人</div>
            </div>
            <div class="partysomenum">党组织数</div>
          </div>
          <div class="numright">
            <img src="../../assets/img/list.png" style=" width:2.9rem;height:2.9rem;" alt />
          </div>
        </div>
        <div class="edulist">
          <div class="xl">学历分布</div>
          <div class="stuname" v-for="(item, index) in education" :key="index">
            <div class="stunametop">
              <div class="stustyle">{{item.name}}</div>
              <div class="stunum">{{item.key}}</div>
            </div>
            <div class="stunamebottom">
              <el-progress
                :text-inside="true"
                :stroke-width="15"
                :percentage="item.pf"
              ></el-progress>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryAgeCount } from "../../api/http";
export default {
  name: "hello",
  data() {
    return {
      loading:false,
      average:0,
      num:{},
      echaartsdata: {
        title: {
          text: "年龄分布",
          left: "left"
        },
        legend: {
          orient: "horizontal",
          x: "center",
          y: "bottom",
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
      echaartsdataline: {
        title: {
          text: "党龄分布",
          left: "40"
        },
        color: ["#CC9A9A"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
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
            data: ["5年以下", "5~10年", "10~20年", "20~30年", "30年以上"],
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              lineStyle: {
                color: "#CC9A9A"
              }
            },
            axisLabel: {
              color: "#CC9A9A",
              interval: 0
            }
          }
        ],
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
                color: ["#CC9A9A"],
                width: 1,
                type: "solid"
              }
            }
          }
        ],
        series: [
          {
            name: "人口数",
            type: "bar",
            barWidth: "60%",
            data: [2500, 1800, 2000, 2300, 2100],
            barWidth: 15,
            itemStyle: {
              normal: {
                //每根柱子颜色设置
                color: function(params) {
                  let colorList = [
                    "#F58733",
                    "#F58733",
                    "#F58733",
                    "#F58733",
                    "#F58733",
                  ];
                  return colorList[params.dataIndex];
                }
              }
            }
          }
        ]
      },
      echaartsonebar: {
        title: {
          text: "民族分布",
          left: "left"
        },
        legend: {
          orient: "horizontal",
          x: "center",
          y: "bottom",
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
              { value: 120, name: "汉族" },
              { value: 136, name: "回族" },
              { value: 77, name: "满族" },
              { value: 75, name: "苗族" },
              { value: 75, name: "土家族   " },
              { value: 117, name: "其他民族" }
            ]
          }
        ]
      },
      echaartstwobar: {
        title: {
          text: "性别比例",
          left: "left"
        },
        legend: {
          orient: "horizontal",
          x: "center",
          y: "bottom",
          itemWidth: 12,
          itemHeight: 12,
          itemGap: 30,
          icon: "circle",
          textStyle: {
            //图例文字的样式
            color: ["#E92525", "#F58733"]
          }
        },
        color: ["#E92525", "#F58733"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
          {
            name: "智慧社区",
            type: "pie",
            radius: ["35%", "50%"],
            center: ["50%", "50%"],
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
              { value: 120, name: "男性" },
              { value: 136, name: "女性" }
            ]
          }
        ]
      },
      education: [],
      alleducation: 0
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    async drawLine() {
      this.loading=true
      let res = await queryAgeCount();
      let a = res.details.list[0];
      this.echaartsdata.series[0].data.forEach((i, n) => {
        i.value = Object.values(a)[n];
        i.name = Object.keys(a)[n];
      });

      let b = res.details.list[1];
      this.echaartsonebar.series[0].data.forEach((i, n) => {
        i.value = Object.values(b)[n];
        i.name = Object.keys(b)[n];
      });

      let c = res.details.list[2];
      this.echaartstwobar.series[0].data.forEach((i, n) => {
        i.value = Object.values(c)[n];
        i.name = Object.keys(c)[n];
      });

      let d = res.details.list[3];
      this.education = [];
      Object.keys(d).forEach((i, n) => {
        let m = {};
        m.name = i;
        m.key = Object.values(d)[n];
        m.pf= Math.round((Object.values(d)[n])/(Object.values(d)[Object.values(d).length-1])*100)
        this.education.push(m);
      });

      this.alleducation = this.education.pop();
      console.log(this.education);
      console.log(this.alleducation);

      let e = res.details.list[5];
       console.log(Object.values(e));
       console.log(Object.keys(e));


      this.echaartsdataline.xAxis[0].data=Object.keys(e)
      this.echaartsdataline.series[0].data=Object.values(e)


     this.num=res.details.list[4];


      // 基于准备好的dom，初始化echarts实例
      let Chart1 = this.$echarts.init(document.getElementById("Chart1"));
      // 绘制图表
      Chart1.setOption(this.echaartsdata);
      let Chart2 = this.$echarts.init(document.getElementById("Chart2"));
      // 绘制图表
      Chart2.setOption(this.echaartsdataline);
      let Chart3 = this.$echarts.init(document.getElementById("Chart3"));
      // 绘制图表
      Chart3.setOption(this.echaartsonebar);
      let Chart4 = this.$echarts.init(document.getElementById("Chart4"));
      // 绘制图表
      Chart4.setOption(this.echaartstwobar);
       this.loading=false
    }
  },
  computed: {
      sum:function(){
            return  10
        },
  },
};
</script>


<style lang="less" scoped>
.visual {
  width: 100%;
  height: 100%;
  background-color: #fef9ed;
  padding: 1.5rem;
  box-sizing: border-box;
  #Chart1 {
    width: 10rem;
    height: 10rem;
  }
}

.mainbody {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  .mainleft {
    width: 19.7rem;
    height: 100%;
    // background-color: red;

    .charsbar {
      width: 100%;
      height: 48%;
      background-color: #ffffff;
      margin-bottom: 1.5rem;
      box-sizing: border-box;
      padding: 1.55rem 2.7rem;
    }

    .charsline {
      width: 100%;
      height: 48%;
      background-color: #ffffff;
      box-sizing: border-box;
      padding: 1.55rem 0 0 0;
    }
  }
  .maincenter {
    width: 35.6rem;
    height: 100%;
    .charschain {
      width: 100%;
      height: 48%;
      background-color: #ffffff;
      margin-bottom: 1.5rem;
    }
    .charstwobar {
      width: 100%;
      height: 48%;
      background-color: #fef9ed;
      display: flex;
      justify-content: space-between;
      .onebar {
        width: 16.7rem;
        height: 100%;
        padding: 2rem 2.7rem;
        box-sizing: border-box;
        background-color: #fff;
      }
      .twobar {
        width: 16.7rem;
        height: 100%;
        padding: 1.55rem 2.7rem 4rem 2.7rem;
        box-sizing: border-box;
        background-color: #fff;
      }
    }
  }
  .mainright {
    width: 19.7rem;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: space-around;
    .partynumber {
      width: 100%;
      height: 15%;
      background-color: #fff;
      display: flex;
      box-sizing: border-box;
      padding: 1.6rem 0 0 3.4rem;
      .numleft {
        width: 60%;
        .numitem {
          display: flex;
        }
      }
      .numright {
        width: 40%;
      }
    }
    .orgnumber {
      width: 100%;
      height: 15%;
      background-color: #fff;
    }
    .edulist {
      width: 100%;
      height: 65%;
      background-color: #fff;
      padding: 1rem 1.5rem 0 1.5rem;
      .xl {
        margin-bottom: 1rem;
        font-size: 0.9rem;
        color: #6f6f6f;
        font-weight: 600;
      }
    }
  }
}

.text100 {
  font-size: 1.5rem;
  color: #6f6f6f;
  margin-right: 0.5rem;
  margin-bottom: 0.8rem;
}
.texren {
  font-size: 13px;
  color: #6f6f6f;
  line-height: 1.7rem;
}
.partysomenum {
  font-style: 13px;
  color: #6f6f6f;
}
.stunametop {
  display: flex;
  width: 100%;
  margin-bottom: 0.5rem;
  .stustyle {
    width: 50%;
    color: #101c36;
  }
  .stunum {
    width: 50%;
    text-align: right;
    color: #e92525;
  }
}
.stuname {
  margin-bottom: 0.8rem;
}
</style>
<style lang="less">
.visual {
  .el-progress-bar__inner {
    background-color: #e92525;
  }
  .el-progress-bar__outer {
    background-color: #fcdede;
  }
}
</style>
