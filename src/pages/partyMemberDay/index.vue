<template>
    <div class="wrap">
        <!-- 列表1 -->
        <div class="list" v-if="!isShow&&!addShow&&!isSign">
            <div class="tools">
                <div class="searchForm">
                    <div class="search_unit">
                        <p class="search_title">主题:</p>
                        <el-input v-model="search.Ssubject" placeholder="请输入会议名"></el-input>
                    </div>

                    <div class="search_unit">
                        <p class="search_title">状态:</p>
                        <el-select v-model="search.Sstatus" placeholder="请选择状态">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="发起未结束" value="1"></el-option>
                            <el-option label="发起已结束" value="2"></el-option>
                            <el-option label="取消" value="3"></el-option>
                        </el-select>
                    </div>
                    <div class="search_unit">
                        <p class="search_title">组织:</p>
                        <el-input v-model="search.depart" placeholder="请输入会议名"></el-input>
                    </div>
                    <div class="search_unit handle">
                        <p class="close" @click="Onsearch">搜索</p>
                    </div>
                    <!--                    分类   状态   主题   组织-->
                </div>
                <div class="handle">
                    <p @click="add">增加</p>
                    <p @click="opendelete()">删除</p>
                </div>
            </div>
            <el-table :data="tableData" style="width: 100%" @selection-change="handleChange">
                <el-table-column type="selection" width="120"></el-table-column>
                <el-table-column prop="subject" label="主题"></el-table-column>
                <el-table-column prop="partyDepart" label="组织名字"></el-table-column>
                <el-table-column prop="attendRate" label="参会率"></el-table-column>
                <el-table-column prop="topic" label="议题"></el-table-column>

                <el-table-column fixed="right" label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button @click="opendetail(scope.row.id)" type="text" size="small">详情</el-button>
                        <el-button @click="goModify(scope.row.id)" type="text" size="small">修改</el-button>
                        <el-button @click="gosign(scope.row.id)" type="text" size="small">签到列表</el-button>
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
        <!-- 列表1    结束-->

        <!-- 详情  弹出框   -->
        <partyMemberDayDetail :id="id" @goback="goback" v-if="isShow"></partyMemberDayDetail>
        <partyActiveAdd :id="Id" @goback="goback" v-if="addShow"></partyActiveAdd>
        <activiteSignList :id="signid" @goback="goback" v-if="isSign"></activiteSignList>
        <!--    弹出框   结束-->
    </div>
</template>

<script>
    import partyMemberDayDetail from "./detail/partyMemberDayDetail";
    import partyActiveAdd from "./partyActiveAdd";
    import activiteSignList from "./detail/activiteSignList";

    export default {
        name: "partyMemberDay",
        data() {
            return {
                id: '',
                Id: '',
                signid:'',
                isSign:false,
                currentPage: 1, //当前页码
                total: 0, //数据总条数
                pageSize: "10", //每条页数
                pageNum: "1", ////当前页码
                isShow: false,
                addShow: false,
                small_show: false,
                hostList: '',
                attendList: '',
                unitid: '',
                idArr: [],
                tableData: [],
                smallTableData: [],
                form: {},
                content: '',
                search: {
                    Sstatus: '',
                    Ssubject: '',
                    depart: '',
                },
                departArr: [],
                imgarr: []
            };
        },
        components: {
            partyMemberDayDetail,
            partyActiveAdd,
            activiteSignList
        },
        watch: {
            'form.punchType': function (data) {
                if (data == 0) {
                    return this.form.punchType = '不签到'
                } else if (data == 1) {
                    return this.form.punchType = '扫码签到'
                } else if (data == 2) {
                    return this.form.punchType = '定位签到'
                } else if (data == 3) {
                    return this.form.punchType = '电子签名'
                } else if (data == 4) {
                    return this.form.punchType = '扫码签到、电子签名'
                } else if (data == 5) {
                    return this.form.punchType = '定位签到、电子签名'
                }
            }
        },
        created() {
            this.getlist();
            this.getdepart();
        },
        methods: {
            gosign(id){
                this.isSign=true;
                this.signid=id
            },
            goback() {
                this.isShow = false;
                this.addShow = false;
                this.isSign = false;
            },
            Onsearch() {
                this.axios.post('/intelligentCommunity/manage/partyEventDay/queryByTypeStatus?pageSize=' + this.pageSize + '&pageNum=' + this.pageNum, {
                    partyDepart: this.search.depart,
                    subject: this.search.Ssubject,
                    status: this.search.Sstatus,
                }).then(data => {
                    if (data.data.code === 200) {
                        this.tableData = data.data.details.list.list;
                        this.total = data.data.details.list.total;
                    }
                })
            },
            goModify(id) {
                this.Id = id;
                this.addShow = true
            },
            getdepart() {
                this.axios
                    .get("/intelligentCommunity/manage/party/commonDeparts").then(data => {
                    if (data.data.code === 200) {
                        this.departArr = data.data.details.list
                    }
                });
            },
            //切换每页条数
            sizeChange(val) {
                this.pageSize = val;
                this.Onsearch()
            },
            //切换页码
            currentChange(val) {
                this.pageNum = val;
                this.currentPage = val;
                this.Onsearch()
            },
            // 点击详情
            opendetail(id) {
                this.isShow = true;
                this.id = id
            },
            opensamll(id, type) {
                this.small_show = true;
                this.content = '';

                if (type == 0) {
                    //    心得
                    this.axios
                        .get("/intelligentCommunity/manage/partyEventDay/conference/getExperience/" + this.unitid + '/' + id)
                        .then(res => {
                            if (res.data.code === 200) {
                                if (res.data.details.data) {
                                    this.content = res.data.details.data.content
                                }
                            }
                        });
                } else if (type == 1) {
                    //    纪要
                    this.axios
                        .get("/intelligentCommunity/manage/partyEventDay/conference/getSummary/" + this.unitid + '/' + id)
                        .then(res => {
                            if (res.data.code === 200) {
                                if (res.data.details.data) {
                                    this.content = res.data.details.data.content
                                }
                            }
                        });
                }
            },

            close() {
                this.isShow = false;
                this.small_show = false;
            },
            closesmall() {
                this.small_show = false;
            },

            getlist() {
                this.axios
                    .get("/intelligentCommunity/manage/partyEventDay/conferences/paged", {
                        params: {
                            pageSize: this.pageSize,
                            pageNum: this.currentPage
                        }
                    })
                    .then(data => {
                        if (data.data.code === 200) {
                            this.tableData = data.data.details.data.list;
                            this.total = data.data.details.data.total;
                        }
                    });
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
                        url: '/intelligentCommunity/manage/partyEventDay/conference/deleteConference',
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
            add() {
                this.addShow = true;
                this.Id = '';
            },
        }
    };
</script>

<style>
    .detail .detail_wrap {
        transform: translateX(0) translateY(0);
    }


    .form {
        margin-top: 1rem;
    }

    .details_table {
        box-sizing: border-box;
        padding: 0 2rem;
        margin-top: 1rem;
    }

    .small_detail {
        background: #f6f6f6;
        position: fixed;
        top: 50%;
        left: 55%;
        transform: translateX(-50%) translateY(-50%);
        width: 36%;
        height: 40%;
        box-sizing: border-box;
        z-index: 999999;
    }

    .small_detail .content {
        padding: 1rem;
        font-size: .8rem;
        color: #333;
    }

    /* 表格属性 */

    .line {
        width: 100%;
    }

    .el-form-item {
        width: 100%;
    }

    .el-form--inline .el-form-item__content {
        width: 35%;
    }

    .el-form--inline .el-form-item__label {
        width: 20%;
    }

    .line .el-input {
        width: 100%;
    }

    .line img {
        width: 5rem;
        height: 5rem;
        padding: 0 2rem;
    }

    .el-select {
        width: 100%;
    }

    .el-form--inline .el-form-item {
        margin-right: 0 !important;
    }

    /* 导航栏hover效果 */


    /*  弹出框dialog*/
    .el-dialog {
        height: 80%;
        overflow-y: hidden;
        margin: 0 auto;
    }

    .el-dialog__body {
        height: 88%;
        overflow-y: auto;
    }

    .el-dialog__headerbtn {
        right: 2rem;
    }

    .el-form-item__content img {
        margin-right: .5rem;
    }
</style>
