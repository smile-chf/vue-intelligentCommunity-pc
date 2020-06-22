<template>
    <div class="mychart4">
        <div id="myChart4"></div>
    </div>
</template>

<script>
    export default {
        name: "mychart4",
        data() {
            return {}
        },
        props:['data4'],
        mounted() {
            this.initmap();
        },
        methods: {
            initmap() {
                let arr=[]
                for (let i = 0; i < this.data4.length; i++) {
                    arr.push(this.data4[i].count.toString())
                }
                var myChart4 = this.$echarts.init(document.getElementById('myChart4'));
                var optionParam = {
                    xAxisData: ['30以下', '30~40', '40~50', '50~60','60~70', '70以上'],
                    seriesData: arr,
                    yAxisName: 'y轴名称',
                    barWidth: 10
                };
                var option = {
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: { // 控制图的大小，调整下面这些值就可以，
                        top:26,
                        bottom:30
                        // x: 30,
                        // x2: 100,
                        // y2: 150,// y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: optionParam.xAxisData,//['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
                        // name: optionParam.yAxisName || '',
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
                            name: '',
                            type: 'bar',
                            itemStyle: {
                                color:'#4391C5',
                                fontColor:'red'
                            },
                            barWidth: optionParam.barWidth || 30,
                            data: optionParam.seriesData// [10, 52, 200, 334, 390, 330, 220]
                        }
                    ]
                };
                myChart4.setOption(option);
            }
        }
    }
</script>

<style scoped>
    .mychart4 {
        height: 83.7%;
    }

    #myChart4 {
        height: 100%;
    }
</style>
