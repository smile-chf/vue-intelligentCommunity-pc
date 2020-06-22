<template>
    <div class="wrap answer">
        <div class="list" v-if="!isshow">
            <div class="tools">
                <div class="searchForm">
                    <div class="search_unit">
                        <p class="search_title">题目名:</p>
                        <el-input v-model="search.Stitle" placeholder="请输入姓名"></el-input>
                    </div>
                    <div class="search_unit">
                        <p class="search_title">类型:</p>
                        <el-select v-model="search.Stype">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="多选" value="1"></el-option>
                            <el-option label="单选" value="2"></el-option>
                            <el-option label="问答" value="3"></el-option>
                        </el-select>
                    </div>
                    <div class="search_unit handle">
                        <p class="close" @click="getlist">搜索</p>
                    </div>
                </div>
                <div class="handle">
                    <p @click="add">添加</p>
                    <p @click="opendelete()">删除</p>
                </div>
            </div>
            <el-table :data="tableData" style="width: 100%" @selection-change="handleChange">
                <el-table-column type="selection" width="120"></el-table-column>
                <el-table-column prop="content" label="题目"></el-table-column>
                <el-table-column prop="createDate" :formatter="gettime" label="创建时间"></el-table-column>
                <el-table-column prop="type" :formatter="gettype" label="类型"></el-table-column>
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
        <question_add v-if="isshow" @goback="goback"/>
    </div>
</template>
<script>
    import question_add from "./detail/question_add";
    export default {
        data() {
            return {
                isshow: false,
                loading: false,
                currentPage: 1, //当前页码
                total: 0, //数据总条数
                pageSize: "10", //每条页数
                pageNum: "1", ////当前页码
                tableData: [],
                idArr: [],

                search: {
                    Stitle:'',
                    Stype:'',
                }
            }
        },
        created() {
            this.getlist()
        },
        components:{
            question_add
        },
        methods: {
            goback(){
              this.isshow=false
            },
            add() {
                //    添加题目
                this.isshow = true;

            },

            close() {
                //    关闭弹窗
                this.isshow = false
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
                    this.axios({
                        method: 'post',
                        url: '/intelligentCommunity/manage/opinion/deleteOpinionQuestion',
                        data: this.idArr
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
            handleChange(val) {
                let arr = [];
                for (let i = 0; i < val.length; i++) {
                    arr.push(val[i].id)
                }
                this.idArr = arr
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
                    .get("/intelligentCommunity/manage/opinion/getOpinionQuestionList", {
                        params: {
                            pageSize: this.pageSize,
                            pageNum: this.pageNum,
                            content: this.search.Stitle,
                            type: this.search.Stype
                        }
                    })
                    .then(data => {
                        this.loading = false;
                        if (data.data.code === 200) {
                            this.tableData = data.data.details.data;
                            this.total = data.data.details.totalCount;
                        }
                    });
            },
            gettime(a, b, c) {
                var d = new Date(c);
                var y = d.getFullYear();
                var m = d.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = d.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
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
            }
        }
    }
</script>
<style scoped>

</style>
