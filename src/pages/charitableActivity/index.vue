<template>
    <div class="wrap">
        <!-- <tools></tools> -->
        <div class="tools">
            <p @click="add()">增加</p>
            <p @click="opendelete()">删除</p>
        </div>
        <div class="list">
            <el-table :data="tableData" style="width: 100%" @selection-change="handleChange">
                <el-table-column type="selection" width="120"></el-table-column>
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column prop="tel" label="电话"></el-table-column>
                <el-table-column prop="joinEndDate" label="报名截止时间"></el-table-column>
                <el-table-column prop="location" label="地址"></el-table-column>
                <el-table-column prop="startDate" label="开始时间"></el-table-column>
                <el-table-column prop="endDate" label="结束时间"></el-table-column>
                <el-table-column fixed="right" label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button @click="opendetail(scope.row.id)" type="text" size="small">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="sizeChange"
                @current-change="currentChange"
                :current-page="currentPage"
                :page-sizes="[10, 24, 36, 48]"
                :page-size="100"
                layout="sizes, prev, pager, next"
                :total="total"
            ></el-pagination>
        </div>
        <div class="detail" v-if="isShow">
            <div class="detail_wrap">
                <div class="handle">
                    <p class="close" @click="close">关闭</p>
                </div>
                <el-form :inline="true" :model="form" class="form" @submit.native.prevent>
                    <div class="line">
                        <el-form-item label="活动名称">
                            <el-input v-model="form.title" placeholder="请输入活动名称"></el-input>
                        </el-form-item>
                        <el-form-item label="联系方式">
                            <el-input v-model="form.tel" placeholder="请输入电话"></el-input>
                        </el-form-item>

                        <el-form-item label="活动地址">
                            <el-input v-model="form.location" placeholder="请输入性别"></el-input>
                        </el-form-item>
                    </div>
                    <div class="line">
                        <el-form-item label="单位">
                            <el-input v-model="form.company" placeholder="举办单位"></el-input>
                        </el-form-item>

                        <el-form-item label="积分">
                            <el-input v-model="form.points" placeholder="请输入积分"></el-input>
                        </el-form-item>

                        <el-form-item label="招募人数">
                            <el-input v-model="form.peopleCount" placeholder="请输入人数"></el-input>
                        </el-form-item>

                    </div>
                    <div class="line">

                        <el-form-item label="报名截止时间">
                            <el-date-picker
                                v-model="form.joinEndDate"
                                type="datetime"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="活动开始时间">
                            <el-date-picker
                                v-model="form.startDate"
                                type="datetime"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item label="活动结束时间">
                            <el-date-picker
                                v-model="form.endDate"
                                type="datetime"
                                placeholder="选择日期时间">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="line">
                        <el-form-item label="签到类型">
                            <el-input v-model="form.signInType" placeholder="请输入签到类型"></el-input>
                        </el-form-item>
                        <el-form-item label="要求">
                            <el-input v-model="form.require" placeholder="请输入要求"></el-input>
                        </el-form-item>

                        <el-form-item label="内容">
                            <el-input v-model="form.content" type="textarea" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </div>
                    <div class="imgbox">
                        <img :src=form.picPath alt="">
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                isShow: false,
                loading: false,
                currentPage: 1, //当前页码
                total: 0, //数据总条数
                pageSize: "10", //每条页数
                pageNum: "1", ////当前页码
                tableData: [],
                form: {},
                idArr:[]
            }
        },
        created() {
            this.getlist()
        },
        watch:{
            'form.signInType' : function(data){
                if(data==0){
                    return this.form.signInType='不签到'
                }else if(data==1){
                    return this.form.signInType='扫码签到'
                }else if(data==2){
                    return this.form.signInType='定位签到'
                }else if(data==3){
                    return this.form.signInType='电子签名'
                }else if(data==4){
                    return this.form.signInType='扫码签到、电子签名'
                }else if(data==5){
                    return this.form.signInType='定位签到、电子签名'
                }
            }
        },
        methods: {
            opendetail(id) {
                //    打开详情
                this.isShow = true;
                this.loading = true;
                this.axios
                    .get("/intelligentCommunity/manage/charitableActivity/getCharitableActivityDetail/" + id)
                    .then(res => {
                        this.loading = false;
                        if (res.data.code === 200) {
                            this.form = res.data.details.data
                        }
                    });
            },
            handleChange(val){
                let arr=[];
                for (let i = 0; i < val.length; i++) {
                    arr.push(val[i].id)
                }
                this.idArr = arr
            },
            opendelete() {
                // 批量删除
                if(this.idArr.toString()==''){
                    this.$message({
                        type: 'info',
                        message: '请选择删除项!'
                    });
                    return false
                }
                this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios
                        .get("/intelligentCommunity/manage/charitableActivity/delCharitableActivity", {
                            params: {
                                ids: this.idArr.toString()
                            }
                        })
                        .then(data => {
                            if (data.data.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                this.getlist()
                            }
                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },

            close() {
                //详情关闭
                this.isShow = false
            },

            add() {
//                添加内容
                this.$router.push('/index/charitableActivity/addChartableActivity')
            },


            //切换每页条数
            sizeChange(val) {
                this.pageSize = val;
                this.getlist();
            },
            //切换页码
            currentChange(val) {
                this.pageNum = val;
                this.currentPage = val;
                this.getlist();
            },
            getlist() {
                this.loading = true;
                this.axios
                    .get("/intelligentCommunity/manage/charitableActivity/getCharitableActivityList", {
                        params: {
                            pageSize: this.pageSize,
                            pageNum: this.pageNum
                        }
                    })
                    .then(data => {
                        this.loading = false;
                        if (data.data.code === 200) {
                            console.log(data);
                            this.tableData = data.data.details.data;
                            this.total = data.data.details.totalCount;
                            // this.currentChange = data.data.details.list.pageNum;
                        }
                    });
            },
        }
    }
</script>

<style scoped>

</style>
