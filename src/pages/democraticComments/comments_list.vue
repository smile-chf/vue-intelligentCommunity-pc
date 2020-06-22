<template>
    <div class="wrap comments_list">
        <!-- <tools></tools> -->
        <div class="list" v-if="!isshow&&!addshow&&!isshowtable">
            <div class="tools">
                <div class="searchForm">
                    <div class="search_unit">
                        <p class="search_title">标题:</p>
                        <el-input v-model="search.Stitle" placeholder="请输入会议名"></el-input>
                    </div>
                    <div class="search_unit">
                        <p class="search_title">开始时间:</p>
                        <el-date-picker
                            v-model="search.Sdate"
                            type="date"
                            value-format="yyyy-MM-dd HH:mm"
                            placeholder="选择日期">
                        </el-date-picker>
                    </div>
                    <div class="search_unit handle">
                        <p class="close" @click="Onsearch">搜索</p>
                    </div>
                </div>
                <div class="handle">
                    <p @click="add">添加</p>
                    <p @click="opendelete()">删除</p>
                </div>
            </div>
            <el-table :data="tableData" style="width: 100%" @selection-change="handleChange">
                <el-table-column type="selection" width="120"></el-table-column>
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column prop="startTime" label="开始时间"></el-table-column>
                <el-table-column prop="endTime" label="结束时间"></el-table-column>
                <el-table-column prop="ratio" label="优秀率"></el-table-column>
                <el-table-column fixed="right" label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button @click="opendetail(scope.row.id)" type="text" size="small">详情</el-button>
                        <el-button @click="modify(scope.row.id)" type="text" size="small">修改</el-button>
                        <el-button @click="deliberateTable(scope.row.id)" type="text" size="small">评议表</el-button>
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
        <comment_list_detail :id="id" v-if="isshow" @goback="goback"/>
        <comment_add  :Id="addid" v-if="addshow" @goback="goback"/>
        <comment_table  :Id="tableid" v-if="isshowtable" @goback="goback"/>
    </div>
</template>
<script>
    import comment_list_detail from "./detail/comment_list_detail";
    import comment_add from "./comment_add";
    import comment_table from "./detail/comment_table";
    export default {
        name: "comments_list",
        data() {
            return {
                isshowtable: false,
                isshow: false,
                addshow: false,
                loading: false,
                currentPage: 1, //当前页码
                total: 0, //数据总条数
                pageSize: "10", //每条页数
                pageNum: "1", ////当前页码
                tableData: [],
                form: {},
                idArr: [],
                search: {
                    Stitle: '',
                    Sdate: ''
                },
                id:'',
                addid:'',
                tableid:''
            }
        },
        components:{
            comment_list_detail,
            comment_add,
            comment_table
        },
        created() {
            this.getlist()
        },
        methods: {
            goback(){
              this.isshow=false;
              this.addshow=false;
              this.isshowtable=false;
            },
            // 评议表
            deliberateTable(id) {
                this.isshowtable = true;
                this.tableid=id
            },
            closeTable() {
                this.isshowtable = false
            },

            //评议导出
            //搜索
            Onsearch() {
                this.axios.post('/intelligentCommunity/manage/evaluate/queryConferenceId?pageSize=' + this.pageSize + '&pageNum=' + this.pageNum, {
                    title: this.search.Stitle,
                    startTime: this.search.Sdate,
                }).then(data => {
                    if (data.data.code === 200) {
                        this.tableData = data.data.details.list.list;
                        this.total = data.data.details.list.total;
                    }
                })
            },
            modify(id) {
                this.addid=id;
                this.addshow=true
                //    去修改页
                // this.$router.push({
                //     path: '/index/democraticComments/comment_add',
                //     query: {
                //         id: id
                //     }
                // })
            },
            add() {
                //    添加评议
                this.addshow=true;
                this.addid='';
                // this.$router.push('/index/democraticComments/comment_add')
            },
            opendetail(id) {
                this.isshow = true;
                this.id=id
            },
            // close() {
            //     this.isshow = false
            // },

            handleChange(val) {
                let arr = [];
                for (let i = 0; i < val.length; i++) {
                    arr.push(val[i].id)
                }
                this.idArr = arr
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
                        url: '/intelligentCommunity/manage/evaluate/deleteRecord',
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
            //切换每页条数
            sizeChange(val) {
                this.pageSize = val;
                this.Onsearch();
            },
            //切换页码
            currentChange(val) {
                this.pageNum = val;
                this.currentPage = val;
                this.Onsearch();
            },
            getlist() {
                this.loading = true;
                this.axios
                    .get("/intelligentCommunity/manage/evaluate/records", {
                        params: {
                            pageSize: this.pageSize,
                            pageNum: this.pageNum
                        }
                    })
                    .then(data => {
                        this.loading = false;
                        if (data.data.code === 200) {
                            this.tableData = data.data.details.list.list;
                            this.total = data.data.details.list.total;
                        }
                    });
            },
        }
    }
</script>

<style>
    /*.comments_list .el-form--inline .el-form-item {*/
    /*    width: 100%;*/
    /*    margin-top: 2%;*/
    /*    margin-right: 0;*/
    /*}*/

    /*.mid_detail_wrap {*/
    /*    position: absolute;*/
    /*    top: 30%;*/
    /*    left: 50%;*/
    /*    background: #fff;*/
    /*    transform: translateX(-50%) translateY(-50%);*/
    /*    width: 100%;*/
    /*    overflow-y: auto;*/
    /*    max-height: 70%;*/
    /*}*/

    /*.comments_list .mid_detail_wrap .el-form--inline .el-form-item {*/
    /*    display: flex;*/
    /*}*/

    /*!*.comments_list .mid_detail_wrap .el-form-item__label {*!*/
    /*!*    width: 40% !important;*!*/
    /*!*}*!*/

    /*!*.comments_list .mid_detail_wrap .el-form-item__content {*!*/
    /*!*    width: 50% !important;*!*/
    /*!*}*!*/
    /*.comments_list .el-form--inline .el-form-item__label{*/
    /*    width: 35%;*/
    /*}*/
</style>
