<template>
    <div class="mychart6">
        <div class="mychart6_title">
            <p>月份</p>
            <p>人次</p>
        </div>
        <vue-seamless-scroll :data="mouth" :class-option="optionSingleHeight" class="seamless-warp">
            <ul class="item mychart6_main">
                <li v-for="item in mouth" class="unit">
                    <p>{{item.name}}</p>
                    <p class="p2">{{item.value}}</p>
                </li>
            </ul>
        </vue-seamless-scroll>
    </div>
</template>

<script>
    export default {
        name: "mychart6",
        data() {
            return {
                animate: false,
                mouth: [],
                arr: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", '十月', "十一月", "十二月"]
            }
        },
        props: ['data5'],
        created() {
           this.init()
        },
        watch:{
            data5(){
                this.init()
            }
        },
        computed: {
            optionSingleHeight() {
                return {
                    singleHeight: 26,
                    waitTime: 3000,
                }
            }
        },
        methods: {
            init(){
                for (let i = 0; i < this.data5.length; i++) {
                    for (let j = 0; j < this.arr.length; j++) {
                        if (i === j) {
                            this.mouth.push({
                                name: this.arr[j],
                                value: this.data5[i].value
                            })
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .mychart6 {
        height: 92.7%;
        box-sizing: border-box;
        padding: 4.65% 2.64% 4.65% 2.64%;
    }

    .mychart6_title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: .1rem;
    }

    .mychart6_title p {
        width: 49.5%;
        height: 1.3rem;
        line-height: 1.3rem;
        color: #FFFFFF;
        font-size: .65rem;
        text-align: center;
        background: #21395B;
    }

    .mychart6_main {
        overflow: hidden;
        height: 100%;
    }

    .mychart6_main .unit {
        display: flex;
        justify-content: space-between;
        background:  rgba(33,57,91,.4);
    }

    .mychart6_main .unit:nth-child(2n+1) {
        background: transparent;
        color: #ADF0FF;
    }

    .mychart6_main .unit .p2 {
        color: #fff;
    }

    .mychart6_main p {
        width: 49.5%;
        height: 26px;
        line-height: 26px;
        color: #ADF0FF;
        font-size: .65rem;
        text-align: center;

    }

    .seamless-warp {
        height: 100%;
        overflow: hidden;
    }

</style>
