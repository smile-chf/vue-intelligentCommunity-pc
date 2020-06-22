<template>
    <div class="mychart7_box">
        <div class="box7_1 scrollstyle">
            <div class="special_title">
                <p class="p1" @click="goeducation">教育学习(学习人次)</p>
                <p class="p2">学习总人次:{{count1}}</p>
            </div>
            <div id="charts7_1"></div>
        </div>
        <div class="box7_2 scrollstyle">
            <div class="special_title">
                <p class="p1" @click="goeducation">教育学习(学习时长)</p>
                <p class="p2">学习总时长:{{count2.toFixed(2)}}</p>
            </div>
            <div id="charts7_2"></div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "mychart7",
        data() {
            return {
                arr1: [],
                arr2: [],
                count1: 0,
                count2: 0
            }
        },
        props: ['data7'],
        watch: {
            data7() {
                this.initmap1();
                this.initmap2();
            }
        },
        created() {


        },
        mounted() {
            this.initmap1();
            this.initmap2();
        },
        methods: {
            goeducation() {
                this.$router.push('/index/learningInstruction/learningallStatistics')
            },
            initmap1() {
                this.arr1 = this.data7.personTimes; //人次
                for (let i = 0; i < this.arr1.length; i++) {
                    this.count1 += this.arr1[i]
                }
                let XData = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
                let YData = this.arr1;
                let charts7_1 = this.$echarts.init(document.getElementById('charts7_1'));
                let option1 = {
                    // backgroundColor: '#011c3a',
                    /* 线条颜色，可设置多个颜色 */
                    color: ['#4391C5'],
                    /* 图像四周边距设置 */
                    grid: {
                        left: 30,
                        top: 30,
                        right: 20,
                        bottom: 25
                    },
                    /* 图例说明 */
                    legend: {
                        // 图例排项 vertical-"竖向"; horizontal-"横向"
                        orient: 'horizontal',
                        // 图例组件离容器左侧的距离
                        right: 60,
                        top: 0,
                        //图例文字的样式
                        textStyle: {
                            color: '#6ab2ec',
                        },
                        // 与series中每个name一一对应
                        // data: ['车流量']
                    },
                    /* 鼠标悬浮时显示数据 */
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: XData,
                        //设置轴线的属性
                        axisLine: {
                            lineStyle: {
                                color: '#3d5269',
                            },
                        },
                        //调整x轴的lable
                        axisLabel: {
                            textStyle: {
                                fontSize: 10,// 让字体变小
                                color: "#7389B1",
                            },
                            interval: 0,
                        }
                    },
                    yAxis: {
                        name: "单位:次",
                        type: 'value',
                        // 控制网格线是否显示
                        splitLine: {
                            show: true,
                            //  改变轴线颜色
                            lineStyle: {
                                // 使用深浅的间隔色
                                color: ['rgba(67,145,197,.15)']
                            }
                        },
                        //设置轴线的属性
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#3d5269',
                            }
                        },
                        //调整x轴的lable
                        axisLabel: {
                            textStyle: {
                                fontSize: 10,// 让字体变小
                                color: "#7389B1",
                            },
                        }
                    },


                    /* 数据配置，若有多条折线则在数组中追加{name: , data: } */
                    series: [{
                        // name: '车流量',
                        data: YData,
                        type: 'line',
                        symbol: 'none',
                        smooth: false,
                        areaStyle: {
                            normal: {
                                color: {
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 2,
                                    colorStops: [{
                                        offset: 0,
                                        color: "rgba(67, 145, 197, .8)" // 0% 处的颜色
                                    }, {
                                        offset: 0.7,
                                        color: "rgba(67, 145, 197, 0)" // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    width: 1, //折线宽度
                                }
                            }
                        },
                    },]
                };
                charts7_1.setOption(option1);
            },
            initmap2() {

                this.arr2 = this.data7.duration; //时间

                for (let i = 0; i < this.arr2.length; i++) {
                    this.count2 += this.arr2[i]
                }
                let XData = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
                let YData = this.arr2;
                let charts7_2 = this.$echarts.init(document.getElementById('charts7_2'));
                let option2 = {
                    // backgroundColor: '#011c3a',
                    /* 线条颜色，可设置多个颜色 */
                    color: ['#D2832B'],
                    /* 图像四周边距设置 */
                    grid: {
                        left: 30,
                        top: 30,
                        right: 20,
                        bottom: 25
                    },
                    /* 图例说明 */
                    legend: {
                        // 图例排项 vertical-"竖向"; horizontal-"横向"
                        orient: 'horizontal',
                        // 图例组件离容器左侧的距离
                        right: 60,
                        top: 0,
                        //图例文字的样式
                        textStyle: {
                            color: '#6ab2ec',
                        },
                        // 与series中每个name一一对应
                        // data: ['车流量']
                    },
                    /* 鼠标悬浮时显示数据 */
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: XData,
                        //设置轴线的属性
                        axisLine: {
                            lineStyle: {
                                color: '#3d5269',
                            }
                        },
                        //调整x轴的lable
                        axisLabel: {
                            textStyle: {
                                fontSize: 10,// 让字体变小
                                color: "#7389B1",
                            },
                            interval: 0,
                        }
                    },
                    yAxis: {
                        name: "单位/h",
                        type: 'value',
                        // 控制网格线是否显示
                        splitLine: {
                            show: true,
                            //  改变轴线颜色
                            lineStyle: {
                                // 使用深浅的间隔色
                                color: ['rgba(67,145,197,.15)']
                            }
                        },
                        //设置轴线的属性
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#3d5269',
                            }
                        },
                        //调整x轴的lable
                        axisLabel: {
                            textStyle: {
                                fontSize: 10,// 让字体变小
                                color: "#7389B1",
                            }
                        }
                    },
                    /* 数据配置，若有多条折线则在数组中追加{name: , data: } */
                    series: [{
                        // name: '车流量',
                        data: YData,
                        type: 'line',
                        symbol: 'none',
                        smooth: false,
                        areaStyle: {
                            normal: {
                                color: {
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 2,
                                    colorStops: [{
                                        offset: 0,
                                        color: "rgba(210, 131, 43, .6)" // 0% 处的颜色
                                    }, {
                                        offset: 0.7,
                                        color: "rgba(210, 131, 43, 0)" // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    width: 1, //折线宽度
                                }
                            }
                        },
                    },]
                };
                charts7_2.setOption(option2);
            }
        }
    }
</script>

<style scoped>
    .mychart7_box {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 100%;
    }

    .box7_1 {
        width: 49.5%;
        height: 100%;
        overflow-x: auto;
        overflow-y: hidden;
    }

    #charts7_1 {
        width: 100%;
        height: 80%;
    }

    .box7_2 {
        width: 49.5%;
        height: 100%;
        overflow-x: auto;
        overflow-y: hidden;
    }

    #charts7_2 {
        width: 100%;
        height: 80%;
    }

    .scrollstyle::-webkit-scrollbar {
        width: 10px;
        height: .2rem;
    }

    .scrollstyle::-webkit-scrollbar-track {
        background: rgba(53, 89, 134, .5);
        border-radius: 2px;
    }

    .scrollstyle::-webkit-scrollbar-thumb {
        background: #355986;
        border-radius: 10px;
    }

    /*.scrollstyle::-webkit-scrollbar-thumb:hover{*/
    /*    background: #333;*/
    /*}*/
    .scrollstyle::-webkit-scrollbar-corner {
        background: #179a16;
    }
</style>
