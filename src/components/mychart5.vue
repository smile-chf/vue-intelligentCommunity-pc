<template>
    <div class="mychart5">
        <div id="mychart5"></div>
    </div>
</template>

<script>
    export default {
        name: "mychart5",
        data() {
            return {}
        },
        props: ['data5'],
        mounted() {
            this.initmap();
        },
        watch:{
            data5(){
                this.initmap()
            }
        },
        methods: {
            initmap() {
                var mychart5 = this.$echarts.init(document.getElementById('mychart5'));
                var m2R2Data = this.data5;
                let Count = 0;
                for (let i = 0; i < this.data5.length; i++) {
                    Count += this.data5[i].value
                }
                var option = {
                    title: [{
                        text: '',
                        textStyle: {
                            fontSize: 16,
                            color: "black"
                        },
                        left: "2%"
                    },
                        {
                            text: Count,
                            subtext: '总篇数',
                            textStyle: {
                                fontSize: 20,
                                color: "#fff"
                            },
                            subtextStyle: {
                                fontSize: 12,
                                color: '#DC8B2F'
                            },
                            textAlign: "center",
                            x: '33%',
                            y: '40%',
                        }
                    ],
                    tooltip: {
                        trigger: 'item',
                        formatter: function (parms) {
                            var str = parms.seriesName + "</br>" +
                                parms.marker + "" + parms.data.name + "：" + parms.data.value + '篇';
                            return str;
                        }
                    },
                    legend: {
                        type: "scroll",
                        orient: 'vertical',
                        left: '65%',
                        align: 'left',
                        top: 'middle',
                        textStyle: {
                            color: '#8C8C8C'
                        },

                    },
                    series: [{
                        name: '类别',
                        type: 'pie',
                        center: ['35%', '50%'],
                        radius: ['50%', '65%'],
                        clockwise: false, //饼图的扇区是否是顺时针排布
                        avoidLabelOverlap: false,
                        itemStyle: { //图形样式

                        },
                        label: {
                            normal: {
                                show: false,
                            }
                        },
                        labelLine: {
                            normal: {
                                length: 15,
                                length2: 13,
                                smooth: true,
                            }
                        },
                        data: m2R2Data
                    }]
                };
                mychart5.setOption(option);
            }
        }
    }
</script>

<style scoped>
    .mychart5 {
        height: 88.7%;
    }

    #mychart5 {
        height: 100%;
    }
</style>
