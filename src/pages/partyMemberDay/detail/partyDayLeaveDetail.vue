<template>
    <div class="commonDetail">
        <div class="commonHead">
            <div class="goback" @click="goback">
                <img src="@/assets/img/toleft.png" alt="">
                <p>返回</p>
            </div>
            <div class="title">
                党员信息
            </div>
        </div>
        <div class="formMain">
            <el-form :inline="true" :model="form" class="form" @submit.native.prevent>
                <el-form-item label="姓名：">
                    <el-input v-model="form.name" readonly placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="主题：">
                    <el-input readonly v-model="form.subject"></el-input>
                </el-form-item>
                <el-form-item label="创建时间：">
                    <el-date-picker
                        readonly
                        v-model="form.createTime"
                        type="date">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="请假原因：">
                    <el-input readonly type="textarea" v-model="form.reason"></el-input>
                </el-form-item>
                <el-form-item label="请假回复：">
                    <el-input readonly type="textarea" v-model="form.reply"></el-input>
                </el-form-item>
                <el-form-item label="状态：">
                    <el-input readonly v-model="form.status==1?'待审批':form.status==2?'同意':'驳回'"></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "partyDayLeaveDetail",
        data(){
            return{
                form:{

                }
            }
        },
        props:['id'],
        created() {
            this.getData()
        },
        methods:{
            getData(){
                this.axios
                    .get("/intelligentCommunity/manage/partyEventDay/conference/getAskLeaveById/" + this.id)
                    .then(res => {
                        if (res.data.code === 200) {
                            this.form = res.data.details.data
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
