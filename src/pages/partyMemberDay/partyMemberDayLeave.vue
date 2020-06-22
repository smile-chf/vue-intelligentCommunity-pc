<template>
    <div class="wrap replay">
        <div class="list" v-if="!isshow">
            <div class="tools">
                <div class="searchForm">
                    <div class="search_unit">
                        <p class="search_title">姓名:</p>
                        <el-input v-model="search.Sname" placeholder="请输入请假人姓名"></el-input>
                    </div>
                    <div class="search_unit">
                        <p class="search_title">会议主题:</p>
                        <el-input v-model="search.Spartyname" placeholder="请输入会议主题"></el-input>
                    </div>
                    <div class="search_unit">
                        <p class="search_title">日期:</p>
                        <el-date-picker
                            v-model="search.Sdate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </div>
                    <div class="search_unit">
                        <p class="search_title">请假状态:</p>
                        <el-select v-model="search.Sstatus" placeholder="请选择请假状态">
                            <el-option label="全部状态" value=""></el-option>
                            <el-option label="待审批" value="1"></el-option>
                            <el-option label="同意" value="2"></el-option>
                            <el-option label="驳回" value="3"></el-option>
                        </el-select>
                    </div>
                    <div class="search_unit handle">
                        <p class="close" @click="Onsearch">搜索</p>
                    </div>
                </div>
                <div class="handle">
                    <p @click="opendelete()">删除</p>
                </div>
            </div>
            <el-table :data="tableData" style="width: 100%" @selection-change="handleChange">
                <el-table-column type="selection" width="120"></el-table-column>
                <el-table-column prop="memberName" label="姓名"></el-table-column>
                <el-table-column prop="subject" label="会议主题"></el-table-column>
                <el-table-column prop="reason" label="请假原因"></el-table-column>
                <el-table-column prop="status" :formatter="getStatus" label="请假状态"></el-table-column>

                <el-table-column fixed="right" label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button @click="opendetail(scope.row.id)" type="text" size="small">详情</el-button>
                        <el-button @click="openpass(scope.row.id,2)" type="text" size="small"
                                   v-if="scope.row.status==1">同意
                        </el-button>
                        <el-button @click="openpass(scope.row.id,3)" type="text" size="small"
                                   v-if="scope.row.status==1">驳回
                        </el-button>
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
        <partyDayLeaveDetail :id="id" v-if="isshow" @goback="goback"></partyDayLeaveDetail>
        <el-dialog :visible.sync="passshow" width="35%">
            <div class="small_detail_wrap">
                <el-form :inline="true" :model="passform" class="form passform" @submit.native.prevent>
                    <el-form-item label="回复：">
                        <el-input v-model="passform.replay" type="textarea" placeholder="请输入回复"></el-input>
                    </el-form-item>
                </el-form>
                <div class="handleDetail" style="padding: 0">
                    <p class="close" @click="passsure()">确定</p>
                    <p class="close" @click="passclose()">取消</p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import partyDayLeaveDetail from "./detail/partyDayLeaveDetail";

    export default {
        name: "partyMemberDayLeave",
        data() {
            return {
                id: '',
                passshow: false,
                isshow: false,
                loading: false,
                currentPage: 1, //当前页码
                total: 0, //数据总条数
                pageSize: "10", //每条页数
                pageNum: "1", ////当前页码
                tableData: [],
                form: {},
                passform: {
                    replay: ''
                },
                passId: '',
                type: '',
                idArr: [],
                search: {
                    Sname: '',
                    Spartyname: '',
                    Sdate: '',
                    Sstatus: '',
                }
            }
        },
        created() {
            this.getlist()
        },
        components: {
            partyDayLeaveDetail
        },
        methods: {
            goback() {
                this.isshow = false
            },
            //搜索
            Onsearch() {
                this.axios.post('/intelligentCommunity/manage/partyEventDay/queryAll?pageSize=' + this.pageSize + '&pageNum=' + this.pageNum, {
                    memberName: this.search.Sname,
                    createTime: this.search.Sdate,
                    subject: this.search.Spartyname,
                    status: this.search.Sstatus,
                }).then(data => {
                    if (data.data.code === 200) {
                        console.log(data)
                        this.tableData = data.data.details.list.list;
                        this.total = data.data.details.list.total;
                    }
                })
            },
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
                        url: '/intelligentCommunity/manage/partyEventDay/conference/delAskLeave',
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
            openpass(id, type) {
                this.passshow = true;
                this.passId = id
                this.type = type
            },
            passclose() {
                this.passshow = false
            },
            passsure() {
                //    确定是否同意
                if (!this.passform.replay) {
                    this.$message({
                        type: 'info',
                        message: '请输入回复'
                    });
                    return false
                }
                this.axios.post('/intelligentCommunity/manage/partyEventDay/conference/updateAskLeave', {
                    id: this.passId,
                    status: this.type,
                    reply: this.passform.replay
                }).then(res => {
                    if (res.data.code == 200) {
                        this.$message({
                            type: 'success',
                            message: '回复成功'
                        });
                        this.passshow = false
                        this.getlist()
                    }
                })
            },
            opendetail(id) {
                //    打开详情
                this.isshow = true;
                this.id = id

            },
            close() {
                this.isshow = false
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
                    .post('/intelligentCommunity/manage/partyEventDay/queryAll?pageSize=' + this.pageSize + '&pageNum=' + this.pageNum, {
                        memberName: '',
                        createTime: '',
                        subject: '',
                        status: '',
                    })
                    .then(data => {
                        this.loading = false;
                        if (data.data.code === 200) {
                            this.tableData = data.data.details.list.list;
                            this.total = data.data.details.list.total;
                            console.log(this.tableData)
                            // this.currentChange = data.data.details.list.pageNum;
                        }
                    });
            },
            getStatus(row, column, cellValue) {
                if (cellValue == 1) {
                    return '待审批'
                } else if (cellValue == 2) {
                    return '同意'
                } else if (cellValue == 3) {
                    return '驳回'
                }

            }
        }
    }
</script>

<style scoped>
    .el-form--inline .el-form-item {
        width: 100%;
        margin-top: 2%;
        margin-right: 0;
    }
</style>
