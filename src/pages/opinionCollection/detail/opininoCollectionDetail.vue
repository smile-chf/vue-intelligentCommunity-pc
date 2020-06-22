<template>
    <div class="commonDetail">
        <div class="commonHead">
            <div class="goback" @click="goback">
                <img src="@/assets/img/toleft.png" alt="">
                <p>返回</p>
            </div>
            <div class="title">
                意见征集详情
            </div>
        </div>
        <div class="formMain">

            <el-form :inline="true" :model="form" class="form" @submit.native.prevent>
                <el-form-item label="组织名">
                    <el-input v-model="form.name" readonly></el-input>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input v-model="form.title" readonly type="textarea" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item label="截止时间">
                    <el-date-picker
                        v-model="form.endDate"
                        type="datetime"
                        readonly
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <el-table :data="topicList" style="width: 92%;margin-left: 4%"
                      :header-cell-style="{background:'#FEF9ED'}">
                <el-table-column type="selection" width="120"></el-table-column>
                <el-table-column prop="content" label="题目"></el-table-column>
                <el-table-column prop="type" :formatter="gettype" label="类型"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "opininoCollectionDetail",
        data(){
            return{
                form: {},
                topicList: [],
                loading:false
            }
        },
        props:['id'],
        created() {
            this.getdata()
        },
        methods:{
            goback(){
              this.$emit('goback')
            },
            getdata(){
                this.loading = true;
                this.axios
                    .get("/intelligentCommunity/manage/opinion/getOpinionDetail/" + this.id)
                    .then(res => {
                        this.loading = false;
                        if (res.data.code === 200) {
                            this.form = res.data.details.data.opinion;
                            this.topicList = res.data.details.data.list;
                        }
                    });
            },
            gettype(a, b, c) {
                if (c == 1) {
                    return '多选'
                }
                if (c == 2) {
                    return '单选'
                }
                if (c == 3) {
                    return '问答'
                }
            },
        }
    }
</script>

<style>
    .commonDetail .el-table tr {
        background: #FEF9ED;
    }
</style>
