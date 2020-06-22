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
            <el-form :inline="true" :model="form" class="form" >

                    <el-form-item label="姓名">
                        <el-input v-model="form.name" readonly placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="身份证号">
                        <el-input v-model="form.idCardNum" readonly placeholder="请输入身份证号"></el-input>
                    </el-form-item>

                    <el-form-item label="性别">
                        <el-input v-model="form.gender==1?'男':'女'" readonly placeholder="请输入性别"></el-input>
                    </el-form-item>

                    <el-form-item label="出生日期">
                        <el-date-picker v-model="form.birthDate" readonly type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="民族">
                        <el-input v-model="form.nationality" readonly placeholder="请输入民族"></el-input>
                    </el-form-item>

                    <el-form-item label="籍贯">
                        <el-input v-model="form.hometown" readonly placeholder="请输入籍贯"></el-input>
                    </el-form-item>

                    <el-form-item label="年龄">
                        <el-input v-model="form.age" type="number" readonly placeholder="请输入年龄"></el-input>
                    </el-form-item>
                    <el-form-item label="学历">
                        <el-input v-model="form.education" readonly placeholder="请输入学历"></el-input>
                    </el-form-item>
                    <el-form-item label="入党日期">
                        <el-date-picker v-model="form.joinPartyDate" type="date" readonly
                                        placeholder="选择入党日期"></el-date-picker>
                    </el-form-item>

                    <el-form-item label="转正日期">
                        <el-date-picker v-model="form.probationCompleteDate" type="date" readonly
                                        placeholder="选择转正日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="工作岗位">
                        <el-input v-model="form.job" readonly placeholder="请输入工作岗位"></el-input>
                    </el-form-item>

                    <el-form-item label="人员类别">
                        <el-input v-model="form.memberType" readonly placeholder="请输入工作岗位"></el-input>
                    </el-form-item>

                    <el-form-item label="手机号码">
                        <el-input v-model="form.cellNum" readonly type="number" placeholder="请输入手机号码"></el-input>
                    </el-form-item>

                    <el-form-item label="联系电话">
                        <el-input v-model="form.tel" readonly placeholder="请输入联系电话"></el-input>
                    </el-form-item>
                    <el-form-item label="所在组织">
                        <el-input v-model="form.depart" readonly placeholder="所在组织"></el-input>
                    </el-form-item>

                    <el-form-item label="地区">
                        <el-input v-model="form.parentArea" readonly placeholder="所在组织"></el-input>
                    </el-form-item>
                    <el-form-item label="社区">
                        <el-input v-model="form.area" readonly placeholder="所在组织"></el-input>
                    </el-form-item>
                    <el-form-item label="居委会">
                        <el-input v-model="form.committee" readonly placeholder="所在组织"></el-input>
                    </el-form-item>

                    <el-form-item label="现居住地">
                        <el-input v-model="form.liveLocation" readonly placeholder="请输入现居住地"></el-input>
                    </el-form-item>

                    <el-form-item label="是否为管理员">
                        <el-input readonly v-model="form.isAdministrator==1?'是':'否'" placeholder="请选择是否为管理员"></el-input>
                    </el-form-item>

            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "party_member_transfer_detail",
        data() {
            return {
                form: {}
            }
        },
        props:['id'],
        created() {
            this.axios
                .get("/intelligentCommunity/manage/party/member/" + this.id)
                .then(data => {
                    this.loading = false;
                    if (data.data.code === 200) {
                        this.form = data.data.details.data
                    }
                });
        },
        methods: {
            goback() {
                this.$emit('goback')
            }
        }
    }
</script>

<style>

</style>
