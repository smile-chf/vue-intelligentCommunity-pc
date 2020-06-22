<template>
    <div class="commonDetail">
        <div class="commonHead">
            <div class="goback" @click="goback">
                <img src="@/assets/img/toleft.png" alt="">
                <p>返回</p>
            </div>
            <div class="title">
                评议详情
            </div>
        </div>
        <div class="formMain">
            <el-form :inline="true" :model="form" class="form">
                <el-form-item label="标题：">
                    <el-input v-model="form.title" readonly></el-input>
                </el-form-item>
                <el-form-item label="内容：">
                    <el-input readonly type="textarea" v-model="form.content"></el-input>
                </el-form-item>
                <el-form-item label="组织名：">
                    <el-input readonly v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="创建时间：">
                    <el-date-picker
                        readonly
                        v-model="form.create_date"
                        type="datetime">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="开始时间：">
                    <el-date-picker
                        readonly
                        v-model="form.start_time"
                        type="datetime">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="结束时间：">
                    <el-date-picker
                        readonly
                        v-model="form.end_time"
                        type="datetime">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="优秀比例：">
                    <el-input readonly v-model="form.ratio"></el-input>
                </el-form-item>
                <el-form-item label="状态：">
                    <el-input readonly v-model="form.status==0?'已评议':'未评议'"></el-input>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>

<script>
    export default {
        name: "comment_list_detail",
        data(){
            return{
                form:{

                },
            }
        },
        props:['id'],
        created(){
          this.getData()
        },
        methods:{
            goback(){
                this.$emit('goback')
            },
            getData(){
                this.axios
                    .get("/intelligentCommunity/manage/evaluate/getRecordById/" + this.id)
                    .then(res => {
                        if (res.data.code === 200) {
                            this.form = res.data.details.data
                        }
                    });
            }
        }
    }
</script>

<style>

</style>
