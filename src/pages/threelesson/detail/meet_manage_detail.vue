<template>
    <div class="commonDetail meetManageDetail">
        <div class="commonHead">
            <div class="goback" @click="goback">
                <img src="@/assets/img/toleft.png" alt="">
                <p>返回</p>
            </div>
            <div class="mainTitle">
                <div class="p1">
                    会议详情
                </div>
            </div>
            <div class="pos">
                <div style="cursor: pointer;" @click="statistics">会议统计</div>
            </div>
        </div>
        <div class="formMain">
            <div class="title1">
                <p>基本档案</p>
            </div>
            <!--   头部基本档案 -->
            <el-form :inline="true" :model="form" class="form" @submit.native.prevent>
                <div class="line">
                    <el-form-item label="发起人：">
                        <el-input v-model="form.sponsor" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="记录人：">
                        <el-input v-model="notepeople" readonly type="textarea"></el-input>
                    </el-form-item>

                    <el-form-item label="会议主题：">
                        <el-input v-model="form.subject" readonly></el-input>
                    </el-form-item>
                </div>

                <div class="line">
                    <el-form-item label="参会率：">
                        <el-input v-model="form.attendRate" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="会议要求：">
                        <el-input v-model="form.require" type="textarea" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="是否提交心得体会：">
                        <el-input v-model="form.isSubmitNote?'是':'否'" type="textarea" readonly></el-input>
                    </el-form-item>
                </div>

                <div class="line">
                    <el-form-item label="会议分类：">
                        <el-input v-model="form.type" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="签到类型：">
                        <el-input v-model="form.punchType" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="主持人：">
                        <el-input v-model="hostList" readonly type="textarea"></el-input>
                    </el-form-item>
                </div>

                <div class="line">
                    <el-form-item label="会议日期：">
                        <el-input v-model="form.conferenceDate" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="参会人：">
                        <el-input v-model="attendList" readonly type="textarea"></el-input>
                    </el-form-item>

                    <el-form-item label="组织名字：">
                        <el-input v-model="form.partyDepart" readonly></el-input>
                    </el-form-item>
                </div>
                <div class="line">
                    <el-form-item label="会议详情：">
                        <el-input v-model="form.topic" type="textarea" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="会议地址：">
                        <el-input v-model="form.location" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="开始时间：">
                        <el-input v-model="form.beginTime" readonly></el-input>
                    </el-form-item>
                </div>
                <div class="line haveimg">
                    <el-form-item label="结束时间：">
                        <el-input v-model="form.endTime" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="状态：">
                        <el-input v-model="form.status==1?'发起未结束':form.status==2?'发起已结束':'已取消'" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="签到二维码：">
<!--                        <img :src=form.topicPic alt/>-->
                        <div id="qrcode" ref="qrcode"></div>
                    </el-form-item>

                </div>
            </el-form>

        </div>
    </div>
</template>

<script>
    import QRCode from 'qrcodejs2'
    export default {
        name: "meetManageDetail",
        data() {
            return {
                form: {},
                notepeople: '',
                hostList: '',
                attendList: '',
                content: '',
                title: '',
                unitid: '',
                qrcode:'www.baidu.com'
            }
        },
        props: ['id'],
        created() {
        },
        watch: {
            'form.punchType': function (data) {
                if (data == 0) {
                    return this.form.punchType = '不签到'
                } else if (data == 1) {
                    return this.form.punchType = '扫码签到'
                } else if (data == 2) {
                    return this.form.punchType = '定位签到'
                } else if (data == 3) {
                    return this.form.punchType = '电子签名'
                } else if (data == 4) {
                    return this.form.punchType = '扫码签到、电子签名'
                } else if (data == 5) {
                    return this.form.punchType = '定位签到、电子签名'
                }
            },

        },
        mounted() {
            this.axios
                .get("/intelligentCommunity/manage/party/conference/getById/" + this.id)
                .then(data => {
                    this.loading = false;
                    if (data.data.code === 200) {
                        this.form = data.data.details.data.entity;
                        this.notepeople = this.form.noteTakerList.join();
                        this.hostList = this.form.hostList.join();
                        this.attendList = this.form.attendList.join();
                        this.unitid = this.form.id
                    }
                });
            this.creatQrCode();
        },
        methods: {
            //会议统计
            statistics() {

            },

            creatQrCode() {
                new QRCode('qrcode', {
                    width: 150,
                    height: 150, // 高度
                    text: this.qrcode // 二维码内容
                    // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
                    // background: '#f0f'
                    // foreground: '#ff0'
                })
            },
            goback() {
                // this.parent()=false
                this.$emit('goBack')
            },
        }
    }
</script>

<style scoped>

    .mainTitle {
        pointer-events: none;
    }

    .commonDetail .title1 {
        font-size: .9rem;
        color: #212121;
        font-weight: 600;
        box-sizing: border-box;
        padding-left: 4%;
        padding-bottom: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .commonDetail .title1 .educe {
        display: flex;
        width: 10%;
        justify-content: space-between;
        margin-right: 5%;
    }


    .commonDetail .title1 .p2 {
        font-size: .6rem;
        color: #fff;
        width: 3.5rem;
        height: 1.7rem;
        background: #F58733;
        line-height: 1.7rem;
        text-align: center;
        border-radius: .3rem;
        font-weight: 400;
        cursor: pointer;
    }

    .commonDetail .haveimg img {
        width: 6rem;
        height: 6rem;
        padding: 0 2rem;
    }

    .commonDetail .el-table tr {
        background: #FEF9ED;
    }

    .details_table {
        margin-bottom: 2rem;
    }

</style>
<style lang="less" scope>
    .commonHead {
        position: relative;

        .pos /deep/ {
            position: absolute;
            right: 2%;

        }
    }
</style>
