<template>
    <div class="commonDetail">
        <div class="commonHead">
            <div class="goback" @click="goback">
                <img src="@/assets/img/toleft.png" alt="">
                <p>返回</p>
            </div>
            <div class="title">
                考试详情
            </div>
        </div>
        <div class="formMain">
            <el-form :inline="true" :model="form" class="form">
                <div class="line">
                    <el-form-item label="标题">
                        <el-input v-model="form.title" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="考试时长">
                        <el-input v-model="form.duration" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="总分">
                        <el-input v-model="form.totalPoints" readonly></el-input>
                    </el-form-item>
                </div>
                <div class="line">
                    <el-form-item label="及格分">
                        <el-input v-model="form.passingScore" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="总题数">
                        <el-input v-model="form.questionSize" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="开始时间">
                        <el-input v-model="form.beginTime" readonly></el-input>
                    </el-form-item>
                </div>
                <div class="line">
                    <el-form-item label="截止时间">
                        <el-input v-model="form.deadline" readonly></el-input>
                    </el-form-item>
                </div>
            </el-form>
            <div class="title1">
                <p>考试人员</p>
            </div>
            <!-- 人员列表开始 -->
            <div class="details_table">
                <el-table :data="memberlist" style="width: 92%;margin-left: 4%"
                          :header-cell-style="{background:'#FEF9ED'}">
                    <!--                        <el-table-column></el-table-column>-->
                    <el-table-column prop="memberName" label="姓名"></el-table-column>
                    <el-table-column prop="createTime" :formatter="gettime" label="创建时间"></el-table-column>
                </el-table>
            </div>
            <div class="title1">
                <p>考试题目</p>
            </div>
            <!-- 人员列表开始 -->
            <div class="details_table">
                <el-table :data="questionlist" style="width: 92%;margin-left: 4%"
                          :header-cell-style="{background:'#FEF9ED'}">
                    <!--                        <el-table-column></el-table-column>-->
                    <el-table-column prop="question" label="题目"></el-table-column>
                    <el-table-column prop="createTime" :formatter="gettime" label="创建时间"></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "examdetail",
        data(){
            return{
                form:{},
                topicList:[],
                memberlist:[],
                questionlist:[]
            }
        },
        props:['id'],
        created(){
          this.getdata()
        },
        methods:{
            goback(){
              this.$emit('goback')
            },
            getdata(){
                this.loading = true;
                this.axios
                    .get("/intelligentCommunity/manage/exam/getExamDetail/" + this.id)
                    .then(res => {
                        this.loading = false;
                        if (res.data.code === 200) {
                            this.form = res.data.details.data.exam;
                            this.memberlist = res.data.details.data.memberList;
                            this.questionlist = res.data.details.data.questionList;
                        }
                    })
                    .catch(e => {
                        this.loading = false;
                        this.$message({
                            type: "info",
                            message: "网络错误!"
                        });
                    });
            },
            gettime(a, b, c) {
                var d = new Date(c);
                var y = d.getFullYear();
                var m = d.getMonth() + 1;
                m = m < 10 ? "0" + m : m;
                var d = d.getDate();
                d = d < 10 ? "0" + d : d;
                return y + "-" + m + "-" + d;
            },
        }
    }
</script>

<style scoped>

</style>
