<template>
    <div class="wrap suggest_list">
        <div class="list">
            <div class="tools">
                <div class="searchForm">
                    <div class="search_unit">
                        <p class="search_title">姓名:</p>
                        <el-input v-model="search.Sname" placeholder="请输入姓名"></el-input>
                    </div>
                    <div class="search_unit">
                        <p class="search_title">组织名:</p>
                        <el-input v-model="search.Sparty" placeholder="请输入组织名"></el-input>
                    </div>
                    <div class="search_unit handle">
                        <p class="close" @click="getlist">搜索</p>
                    </div>
                </div>
                <div class="handle">
                    <p @click="opendelete()">删除</p>
                </div>
            </div>
            <el-table :data="tableData" style="width: 100%" @selection-change="handleChange">
                <el-table-column type="selection" width="120"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="departName" label="组织"></el-table-column>
                <el-table-column prop="content" label="内容"></el-table-column>
                <el-table-column prop="createDate" label="提交时间"></el-table-column>
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
        <el-dialog :visible.sync="isshow" width="30%">
            <div class="small_detail_wrap">
                <el-form :inline="true" :model="form" class="form" @submit.native.prevent>
                    <el-form-item label="姓名">
                        <el-input v-model="form.name" readonly type="textarea" placeholder="姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="组织">
                        <el-input v-model="form.departName" readonly placeholder="组织"></el-input>
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <el-date-picker
                            v-model="form.createDate"
                            type="date"
                            readonly
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="组织">
                        <el-input v-model="form.content" readonly type="textarea" placeholder="组织"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "suggest_list",
        data() {
            return {
                loading: false,
                currentPage: 1, //当前页码
                total: 0, //数据总条数
                pageSize: "10", //每条页数
                pageNum: "1", ////当前页码
                tableData: [],
                isshow: false,
                form: {},
                idArr: [],
                search:{
                    Sname:'',
                    Sparty:'',
                }
            }
        },
        created() {
            this.getlist()
        },
        methods: {
            opendetail(id) {
                //    打开详情
                this.loading = true;
                this.isshow = true;
                this.axios
                    .get("/intelligentCommunity/manage/opinion/getAdviceDetail/" + id)
                    .then(res => {
                        this.loading = false;
                        if (res.data.code === 200) {
                            this.form = res.data.details.data;
                        }
                    });
            },
            opendelete() {
                // 批量删除
                if (this.idArr.toString() == '') {
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
                        .get("/intelligentCommunity/manage/opinion/delAdvice", {
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
                    .get("/intelligentCommunity/manage/opinion/getAdviceListByPage", {
                        params: {
                            pageSize: this.pageSize,
                            pageNum: this.pageNum,
                            name: this.search.Sname,
                            departName:this.search.Sparty,
                        }
                    })
                    .then(data => {
                        console.log(data)
                        this.loading = false;
                        if (data.data.code === 200) {
                            this.tableData = data.data.details.data;
                            this.total = data.data.details.total;
                        }
                    });
            },
            close() {
                //    关闭
                this.isshow = false
            },
            handleChange(val) {
                let arr = [];
                for (let i = 0; i < val.length; i++) {
                    arr.push(val[i].id)
                }
                this.idArr = arr
            },
        }
    }
</script>

<style scoped>
    .el-form-item {
        display: block !important;
        padding: 1rem 0;
        margin-bottom: 0;
    }

    .el-form-item:last-child {
        padding-bottom: 2rem;
    }
</style>
