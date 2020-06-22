<template>
    <div class="commonDetail" ref="detail">
        <div class="commonHead is_fixed">
            <div class="goback" @click="goback">
                <img src="@/assets/img/toleft.png" alt="">
                <p>返回</p>
            </div>
            <div class="title">
                账号管理
            </div>
             <div class="pos" >
                <div style="cursor: pointer;"  @click="daochu">导出党员集中摸排情况登记表</div>
            </div>
        </div>
        <div class="formMain">
            <el-form :inline="true" :model="form" class="form">
                <el-form-item label="姓名：">
                    <el-input v-model="form.name" readonly placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="身份证号：">
                    <el-input v-model="form.idCardNum" readonly placeholder="请输入身份证号"></el-input>
                </el-form-item>

                <el-form-item label="性别：">
                    <el-input v-model="form.gender==1?'男':'女'" readonly placeholder="请输入性别"></el-input>
                </el-form-item>

                <el-form-item label="出生日期：">
                    <el-date-picker v-model="form.birthDate" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="民族：">
                    <el-input v-model="form.nationality" placeholder="请输入民族"></el-input>
                </el-form-item>

                <el-form-item label="籍贯：">
                    <el-input v-model="form.hometown" placeholder="请输入籍贯"></el-input>
                </el-form-item>

                <el-form-item label="年龄：">
                    <el-input v-model="form.age" type="number" placeholder="请输入年龄"></el-input>
                </el-form-item>
                <el-form-item label="学历：">
                    <el-input v-model="form.education" placeholder="请输入学历"></el-input>
                </el-form-item>
                <el-form-item label="入党日期：">
                    <el-date-picker v-model="form.joinPartyDate" type="date"
                                    placeholder="选择入党日期"></el-date-picker>
                </el-form-item>

                <el-form-item label="转正日期：">
                    <el-date-picker v-model="form.probationCompleteDate" type="date"
                                    placeholder="选择转正日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="工作岗位：">
                    <el-input v-model="form.job" placeholder="请输入工作岗位"></el-input>
                </el-form-item>

                <el-form-item label="人员类别：">
                    <el-input v-model="form.memberType" placeholder="请输入工作岗位"></el-input>
                </el-form-item>

                <el-form-item label="手机号码：">
                    <el-input v-model="form.cellNum" type="number" placeholder="请输入手机号码"></el-input>
                </el-form-item>

                <el-form-item label="联系电话：">
                    <el-input v-model="form.tel" placeholder="请输入联系电话"></el-input>
                </el-form-item>
                <el-form-item label="所在组织：">
                    <el-input v-model="form.depart" placeholder="所在组织"></el-input>
                </el-form-item>

                <el-form-item label="地区：">
                    <el-input v-model="form.parentArea" placeholder="所在组织"></el-input>
                </el-form-item>
                <el-form-item label="社区：">
                    <el-input v-model="form.area" placeholder="所在组织"></el-input>
                </el-form-item>
                <el-form-item label="居委会：">
                    <el-input v-model="form.committee" placeholder="所在组织"></el-input>
                </el-form-item>

                <el-form-item label="现居住地：">
                    <el-input v-model="form.liveLocation" placeholder="请输入现居住地"></el-input>
                </el-form-item>

                <el-form-item label="是否为管理员：">
                    <el-input v-model="form.isAdministrator==1?'是':'否'" placeholder="请选择是否为管理员"></el-input>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "message_manage_detail",
        data() {
            return {
                form: {},
                isFixed: false,
                offsetTop: 0
            }
        },
        props: ['id'],
        created() {
            this.axios
                .get("/intelligentCommunity/manage/party/member/" + this.id)
                .then(data => {
                    if (data.data.code === 200) {
                        this.form = data.data.details.data
                    }
                });
        },
        mounted() {
            
        },
        methods: {
          daochu(){
                location.href='/intelligentCommunity/manage/party/exportMemberRegister?id='+this.id
          },

            goback() {
                this.$emit('goback')
            },

        },
        destroyed() {
            window.removeEventListener('scroll', this.handleScroll)
        }
    }
</script>

<style lang="less" scope>
   .commonHead{
    position: relative;
    .pos /deep/{
    position: absolute;
    right: 2%;

    }
}
</style>
