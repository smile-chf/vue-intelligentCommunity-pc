<template>
    <div class="wrapBox">
        <div class="head">
            <img src="@/assets/img/bigdatahead.png" alt="">
            <div class="nowtime">{{currentTime}}</div>
            <div class="yeartime">
                <select class="selectTime" @change="changeyear" v-model="chooseyear">
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="2030">2030</option>
                </select>
            </div>
        </div>
        <div class="main">
            <div class="main_top">
                <div class="main_top_left">
                    <div class="chartbox1">
                        <p class="common_title" style="margin-top: 4%" @click="gothreelesson">三会一课</p>
                        <mychart1 :data1="data1" v-if="data.length!==0"></mychart1>
                    </div>
                    <div class="chartbox2">
                        <p class="common_title" @click="gopartymember">党员性别比例</p>
                        <mychart2 :data2="data2" v-if="data.length!==0"></mychart2>
                    </div>
                    <div class="chartbox3">
                        <p class="common_title" @click="gopartymember">党员年龄分布</p>
                        <mychart4 :data4="data4" v-if="data.length!==0"></mychart4>
                    </div>
                </div>
                <div class="main_top_mid">
                    <mychart3 :data3="data3" v-if="data.length!==0"></mychart3>
                </div>
                <div class="main_top_right">
                    <div class="chartbox4">
                        <p class="common_title" style="margin-top: 4%" @click="gopartyOpen">党务公开（类别分类）</p>
                        <mychart5 :data5="data5.typeDistributed" v-if="data.length!==0"></mychart5>
                    </div>
                    <div class="chartbox5">
                        <p class="common_title">党务公开（阅读人次）</p>
                        <mychart6 :data5="data5.articleReadCountList" v-if="data.length!==0"></mychart6>
                    </div>
                </div>
            </div>
            <div class="main_foot">
                <div class="main_foot_left">
                    <mychart7 :data7="data7" v-if="data.length!==0"></mychart7>
                </div>
                <div class="main_foot_right">
                    <mychart8 :data8="data8" v-if="data.length!==0"></mychart8>
                </div>
            </div>
        </div>
        <div class="wait" v-show="loading">
            <div class="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>

    </div>

</template>

<script>
    import mychart1 from '@/components/mychart1.vue'
    import mychart2 from '@/components/mychart2.vue'
    import mychart3 from '@/components/mychart3.vue'
    import mychart4 from '@/components/mychart4.vue'
    import mychart5 from '@/components/mychart5.vue'
    import mychart6 from '@/components/mychart6.vue'
    import mychart7 from '@/components/mychart7.vue'
    import mychart8 from '@/components/mychart8.vue'

    export default {
        name: "bigDataIndex",
        data() {
            return {
                loading: false,
                timer: '',
                currentTime: new Date(),
                year: '',
                chooseyear: '',
                data: [],
                data2: {},
                data3: {},
                data4: [],
                data1: {},
                data5: {},
                data7: {},
                data8: {},
                pickerOptions: {
                    disabledDate(time) {
                        let _now = Date.now();
                        return time.getTime() > _now;
                    }
                }
            }
        },
        components: {
            mychart1,
            mychart2,
            mychart3,
            mychart4,
            mychart5,
            mychart6,
            mychart7,
            mychart8,
        },
        mounted() {
            let date = new Date();
            let that = this;
            setInterval(function () {
                that.getNowDate();
            }, 1000);
            this.year = date.getFullYear();
            this.chooseyear = this.year;
            this.getdata(this.year);
        },
        methods: {
            gothreelesson() {
                this.$router.push('/threeLessonsStatistics/allStatistics')
            },
            gopartyOpen() {
                this.$router.push('/index/partyOpenStatistics/allOpenStatistics')
            },
            gopartymember() {
                this.$router.push('/index/visual')
            },

            changeyear() {
                this.getdata(this.chooseyear)
            },
            getdata(year) {
                this.loading = true;
                this.axios.get('/intelligentCommunity/manage/statistics/bigDataStatistics/getData', {
                    params: {
                        year: year
                    }
                }).then(res => {
                    if (res.data.code == 200) {
                        this.data = res.data.details;
                        this.data1 = this.data.threeSessionsAndOneLesson;
                        this.data2 = this.data.sexDistribution;
                        this.data3 = this.data.mapStatics;
                        this.data4 = this.data.partyMemberAgeStatistics;
                        this.data5 = this.data.openPartyAffairs;
                        this.data7 = this.data.educationAndLearning;
                        this.data8 = this.data.onlineExamStatistics;
                        this.loading = false
                    }
                }).catch(e => {
                    this.loading = false
                    this.$message("网络错误")
                })
            },

            getNowDate() {
                var date = new Date();
                var year = date.getFullYear();//当前年份
                var month = date.getMonth();//当前月份
                var data = date.getDate();//天
                var hours = date.getHours();//小时
                var minute = date.getMinutes();//分
                var second = date.getSeconds();//秒
                var time = year + "/" + this.fnW((month + 1)) + "/" + this.fnW(data) + " " + this.fnW(hours) + ":" + this.fnW(minute);
                this.currentTime = time;
            },
            fnW(str) {
                var num;
                str >= 10 ? num = str : num = "0" + str;
                return num;
            }
        },
        beforeDestroy() {
            if (this.timer) {
                clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
            }
        },

    }
</script>

<style>
    .wrapBox {
        width: 100%;
        height: 100%;
        /*background: url("../../assets/img/bg_img.png") no-repeat;*/
        /*background-size: 100% 100%;*/
        background: #000823;
        overflow: hidden;
    }

    /*头部*/
    .wrapBox .head {
        width: 100%;
        height: 9.26%;
        position: relative;
    }

    .wrapBox .head img {
        width: 100%;
    }

    .wrapBox .head .nowtime {
        position: absolute;
        top: 80%;
        left: 50%;
        color: #FFA540;
        font-size: .8rem;
        transform: translateX(-52%);
    }

    .wrapBox .head .yeartime {
        /*width: 7rem;*/
        position: absolute;
        top: 10%;
        right: 2.6%;
        color: #ADF0FF;
    }
    .wrapBox .head .yeartime .selectTime{
        width: 4.4rem;
        height: 1.5rem;
        border: none;
        background: transparent;
        color: #ADF0FF;
        font-size: .65rem;
    }

    .wrapBox .head .yeartime .selectTime option{
        background: #123080;
        border: none;
    }

    .wrapBox .head .yeartime .el-input--prefix .el-input__inner {
        /*background: linear-gradient(to left, #0D1B3D, #426FA3) !important;*/
        border: none;
        color: #ADF0FF;
        font-size: .65rem;
        background: transparent;
        cursor: pointer;
    }

    .wrapBox .head .yeartime .icon {
        display: none;
    }

    /*主体*/
    .wrapBox .main {
        height: 90.75%;
        width: 100%;
        box-sizing: border-box;
        padding: 1.63% 1.04% 2.04% 1.04%;
    }

    .wrapBox .common_title {
        width: 100%;
        height: 1.3rem;
        /*background: linear-gradient(to left, #070F23, #426FA3);*/
        color: #ADF0FF;
        font-size: .7rem;
        line-height: 1.3rem;
        padding-left: .6rem;
        box-sizing: border-box;
    }

    /*主体头部*/
    .wrapBox .main .main_top {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 75.38%;
    }

    .wrapBox .main .main_top .main_top_left {
        width: 20.21%;
        height: 100%;
        background: url("../../assets/img/bigdata_bg3.png") no-repeat;
        background-size: 100% 100%;
        /*border: 1px solid #4391C5;*/
        box-sizing: border-box;
        padding: 0 .1%;
        cursor: pointer;
    }

    .wrapBox .main .chartbox1 {
        height: 39.3%;
        width: 100%;
        cursor: pointer;
    }

    .wrapBox .main .chartbox2 {
        height: 19.18%;
        width: 100%;
        cursor: pointer;
    }

    .wrapBox .main .chartbox3 {
        height: 37.52%;
        width: 100%;
        cursor: pointer;
    }

    .wrapBox .main .main_top .main_top_mid {
        width: 57.45%;
        height: 100%;
        background: url("../../assets/img/bigdataBg.png") no-repeat;
        background-size: 100% 100%;
        /*border: 1px solid #4391C5;*/
    }

    .wrapBox .main .main_top .main_top_right {
        width: 20.11%;
        height: 100%;
        background: url("../../assets/img/bigdata_bg3.png") no-repeat;
        background-size: 100% 100%;
        /*border: 1px solid #4391C5;*/
        box-sizing: border-box;
        padding: 0 .1%;
        cursor: pointer;
    }

    .wrapBox .main .chartbox4 {
        height: 39.3%;
        width: 100%;
        margin-top: .4%;
    }

    .wrapBox .main .chartbox5 {
        height: 54.17%;
        width: 100%;
    }

    .wrapBox .main .main_foot {
        width: 100%;
        height: 24.62%;
        display: flex;
        justify-content: space-between;
        margin-top: 1.5%;
    }

    .wrapBox .main .main_foot_left {
        width: 49.5%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        background: url("../../assets/img/bigdata_footbg.png") no-repeat;
        background-size: 100% 100%;
        /*border: 1px solid #4391C5;*/
        box-sizing: border-box;
        padding: .03% .1% 0 .1%;
        cursor: pointer;
    }

    .wrapBox .main .main_foot_right {
        width: 49.5%;
        height: 100%;
        background: url("../../assets/img/bigdata_footbg.png") no-repeat;
        background-size: 100% 100%;
        /*border: 1px solid #4391C5;*/
        box-sizing: border-box;
        padding: .03% .1% 0 .1%;
        cursor: pointer;
    }

    /*特殊标题公共样式*/
    .special_title {
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 3%;
        margin: 2% 0;
    }

    .special_title .p1 {
        font-size: .7rem;
        color: #ADF0FF;
    }

    .special_title .p2 {
        font-size: .55rem;
        color: #54A2D5;
    }


</style>
