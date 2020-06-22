<template>
    <div class="commonDetail">
        <div class="commonHead">
            <div class="goback" @click="goback">
                <img src="@/assets/img/toleft.png" alt="">
                <p>返回</p>
            </div>
            <div class="title">
               <p>评议详情</p>
               <p class="educe" @click="educe()">导出</p>
            </div>
        </div>
        <div class="formMain specialForm">
            <el-form :inline="true" :model="formtable" class="formtable" style="display: flex">
                <el-form-item label="应参与人数：">
                    <el-input v-model="formtable.should" readonly></el-input>
                </el-form-item>
                <el-form-item label="已评议人数：">
                    <el-input v-model="formtable.have" readonly></el-input>
                </el-form-item>
                <el-form-item label="未评议人数：">
                    <el-input v-model="formtable.nohave" readonly></el-input>
                </el-form-item>
            </el-form>

            <el-table :data="formtableData" style="width: 100%"
                      v-loading="loading"
                      element-loading-text="拼命加载中"
                      element-loading-spinner="el-icon-loading"
                      element-loading-background="rgba(0, 0, 0, .16)">
                <el-table-column type="index" width="120"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="count_1" label="优秀"></el-table-column>
                <el-table-column prop="count_2" label="良好"></el-table-column>
                <el-table-column prop="count_3" label="一般"></el-table-column>
                <el-table-column prop="count_4" label="差"></el-table-column>
            </el-table>

        </div>
    </div>
</template>

<script>
    export default {
        name: "comment_table",
        props:['Id'],
        data(){
            return{
                loading:false,
                formtableData:[],
                formtable:{
                    should:'',
                    have:'',
                    nohave:'',
                }
            }
        },
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
                    .post("/intelligentCommunity/manage/evaluate/queryCountById", {
                        id: this.Id
                    })
                    .then(res => {
                        if (res.data.code === 200) {
                            this.formtableData = res.data.details.list;
                            this.formtable.should = res.data.details.data.joinCount;
                            this.formtable.have = res.data.details.data.counts;
                            this.formtable.nohave = res.data.details.data.count;
                            this.loading = false
                        }
                    }).catch(e => {
                    this.$message("网络错误！");
                    this.loading = false
                });
            },
            educe(){
                location.href =
                    "/intelligentCommunity/manage/evaluate/exportEvaluateData?id=" +
                    this.Id;
            }
        }
    }
</script>

<style scoped>

</style>
