<template>
    <div class="commonDetail">
        <div class="commonHead">
            <div class="goback" @click="goback">
                <img src="@/assets/img/toleft.png" alt="">
                <p>返回</p>
            </div>
            <div class="title">
                活动信息
            </div>
        </div>
        <div class="formMain">
            <el-form :inline="true" :model="form" class="form" @submit.native.prevent>
                <div class="line">
                    <el-form-item label="发起人">
                        <el-input v-model="form.sponsor" readonly></el-input>
                    </el-form-item>

                    <el-form-item label="主题">
                        <el-input v-model="form.subject" readonly></el-input>
                    </el-form-item>
                </div>

                <div class="line">
                    <el-form-item label="参会率">
                        <el-input v-model="form.attendRate" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="会议要求">
                        <el-input v-model="form.require" type="textarea" readonly></el-input>
                    </el-form-item>
                </div>

                <div class="line">
                    <el-form-item label="签到类型">
                        <el-input v-model="form.punchType" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="主持人">
                        <el-input v-model="hostList" readonly type="textarea"></el-input>
                    </el-form-item>
                </div>

                <div class="line">
                    <el-form-item label="活动日期">
                        <el-input v-model="form.conferenceDate" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="参会人">
                        <el-input v-model="attendList" readonly type="textarea"></el-input>
                    </el-form-item>

                    <el-form-item label="组织名字">
                        <el-input v-model="form.partyDepart" readonly></el-input>
                    </el-form-item>
                </div>
                <div class="line">
                    <el-form-item label="议题">
                        <el-input v-model="form.topic" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="活动地址">
                        <el-input v-model="form.location" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="开始时间">
                        <el-input v-model="form.beginTime" readonly></el-input>
                    </el-form-item>
                </div>
                <div class="line">
                    <el-form-item label="结束时间">
                        <el-input v-model="form.endTime" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="状态">
                        <el-input v-model="form.status==1?'发起未结束':form.status==2?'发起已结束':'已取消'" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="议题图片">
                        <img :src=item alt v-for="item of imgarr"/>
                    </el-form-item>
                </div>
            </el-form>


        </div>

    </div>
</template>

<script>
    export default {
        name: "partyMemberDayDetail",
        data(){
            return{
                form:{
                },
                imgarr:'',
                sponsor:'',
                hostList:'',
                attendList:''
            }
        },
        props:['id'],
        created(){
          this.getData()
        },
        methods:{
            getData(){
                this.axios
                    .get("/intelligentCommunity/manage/partyEventDay/conference/getById/" + this.id)
                    .then(data => {
                        if (data.data.code === 200) {
                            this.form = data.data.details.data.entity;
                            this.hostList = this.form.hostList.join();
                            this.attendList = this.form.attendList.join();
                            if (this.form.topicPic) {
                                this.imgarr = JSON.parse(this.form.topicPic)
                            }
                        }
                    });
            },
            goback(){
                this.$emit('goback')
            }
        }
    }
</script>

<style scoped>

</style>
