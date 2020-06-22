<template>
    <div class="mychart8_box">
        <div class="box8_1 scrollstyle">
            <div class="special_title">
                <p class="p1" @click="goexam">在线考试（考试人次）</p>
                <p class="p2">考试总人次:{{totalCount1}}</p>
            </div>
            <div id="charts8_2"></div>
        </div>
        <div class="box8_2 scrollstyle">
            <div class="special_title">
                <p class="p1" @click="goexam">在线考试（考试次数）</p>
                <p class="p2">考试总次数:{{totalCount2}}</p>
            </div>
            <div id="charts8_1"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "mychart8",
        data() {
            return {
                arr1: [],
                arr2: [],
                totalCount1: 0,
                totalCount2: 0,
            }
        },
        props: ['data8'],
        created() {
        },
        watch: {
            data8() {
                this.initmap1();
                this.initmap2();
            }
        },
        mounted() {
            this.initmap1();
            this.initmap2();
        },
        methods: {

            goexam() {
                this.$router.push('/index/onlineStudyStatistics/allOnline')
            },
            initmap1() {
                this.arr2 = this.data8.examTimes; //次数

                for (let i = 0; i < this.arr2.length; i++) {
                    this.totalCount2 += this.arr2[i]
                }


                let myChart8_1 = this.$echarts.init(document.getElementById('charts8_1'));
                let optionParam = {
                    xAxisData: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    seriesData: this.arr2,
                    yAxisName: 'y轴名称',
                    barWidth: 10,
                    count1: this.totalCount2
                };
                let option1 = {
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: { // 控制图的大小，调整下面这些值就可以，
                        left: 30,
                        top: 30,
                        right: 20,
                        bottom: 25
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: optionParam.xAxisData,
                            axisLine: {
                                lineStyle: {
                                    color: '#203759',
                                }
                            },
                            axisLabel: {
                                margin: 10,
                                color: '#7389B1',
                                textStyle: {
                                    fontSize: 10
                                },
                                interval: 0,
                                rotate: 0,
                            },
                        }
                    ],
                    yAxis: [{
                        name: '单位/次',
                        type: 'value',
                        minInterval: 1,
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#2d3d53',
                            }
                        },
                        axisLabel: {
                            color: '#7389B1',
                        },
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(67,145,197,.15)'
                            }
                        }
                    }
                    ],
                    series: [
                        {
                            name: '考试次数',
                            type: 'bar',
                            itemStyle: {
                                color: '#D2842C',   //qqqqqqqqq
                                fontColor: 'red'
                            },
                            barWidth: optionParam.barWidth || 30,
                            data: optionParam.seriesData// [10, 52, 200, 334, 390, 330, 220]
                        }
                    ]
                };
                myChart8_1.setOption(option1);
            },
            initmap2() {
                this.arr1 = this.data8.examPersonTimes; //人次
                for (let i = 0; i < this.arr1.length; i++) {
                    this.totalCount1 += this.arr1[i]
                }

                let myChart8_2 = this.$echarts.init(document.getElementById('charts8_2'));
                let optionParam = {
                    xAxisData: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    seriesData: this.arr1,
                    yAxisName: 'y轴名称',
                    barWidth: 10,
                    count2: this.totalCount1
                };
                let option2 = {
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: { // 控制图的大小，调整下面这些值就可以，
                        left: 30,
                        top: 30,
                        right: 20,
                        bottom: 25
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: optionParam.xAxisData,
                            axisLine: {
                                lineStyle: {
                                    color: '#203759',
                                }
                            },
                            axisLabel: {
                                margin: 10,
                                color: '#7389B1',
                                textStyle: {
                                    fontSize: 10
                                },
                                interval: 0,
                                rotate: 0,
                            },
                        }
                    ],
                    yAxis: [{
                        name: '单位/h',
                        type: 'value',
                        minInterval: 1,
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#203759',
                            }
                        },
                        axisLabel: {
                            color: '#7389B1',
                        },
                        splitLine: {
                            lineStyle: {
                                color: 'rgba(67,145,197,.15)'
                            }
                        }
                    }
                    ],
                    series: [
                        {
                            name: '考试人次',
                            type: 'bar',
                            itemStyle: {
                                color: '#4391C5',
                                fontColor: 'red'
                            },
                            barWidth: optionParam.barWidth || 30,
                            data: optionParam.seriesData// [10, 52, 200, 334, 390, 330, 220]
                        }
                    ]
                };
                myChart8_2.setOption(option2);
            }
        }
    }
</script>

<style scoped>
    .mychart8_box {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 100%;
    }

    .box8_1 {
        width: 49.5%;
        height: 100%;
        overflow-x: auto;
        overflow-y: hidden;
    }

    #charts8_1 {
        width: 100%;
        height: 80%;
    }

    .box8_2 {
        width: 49.5%;
        height: 100%;
        overflow-x: auto;
        overflow-y: hidden;
    }

    #charts8_2 {
        width: 100%;
        height: 80%;
    }


    .scrollstyle::-webkit-scrollbar {
        width: 10px;
        height: .2rem;
        /**/
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
