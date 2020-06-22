<template>
    <div class="chart1_box">
        <div id="mychart1">
        </div>
    </div>
</template>

<script>
    export default {
        name: "mychart1",
        data() {
            return {

            }
        },
        props: ['data1'],
        created() {

        },
        mounted() {
            this.initmap();
        },
        watch:{
            data1(){

                this.initmap()
            }
        },
        methods: {
            initmap() {
                this.people = this.data1.list;
                this.total = this.data1.totalCount;
                var mychart1 = this.$echarts.init(document.getElementById('mychart1'));
                var m2R2Data = this.people;
                let Count = this.total;
                var option1 = {
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
                            subtext: '总会数',
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
                                parms.marker + "" + parms.data.name + "：" + parms.data.value + '场';
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
                        name: '会议类别',
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
                mychart1.setOption(option1);
            }
        }
    }
</script>

<style scoped>
    .chart1_box {
        width: 100%;
        height: 90%;
        position: relative;
    }
    #mychart1{
        height: 100%;
    }
</style>
