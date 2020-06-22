<template>
    <div class="wrap">
        <!-- <tools></tools> -->
        <div class="list" v-if="!isShow&&!addShow&&!statistics">
            <div class="tools">
                <div class="searchForm">
                    <div class="search_unit">
                        <p class="search_title">考试状态:</p>
                        <!-- <el-input v-model="search.Sstatus" placeholder="请选择考试状态"></el-input> -->
                        <el-select v-model="search.Sstatus">
                            <el-option label="未开始" value="0" placeholder="请选择考试状态"></el-option>
                            <el-option label="考试中" value="1"></el-option>
                            <el-option label="已结束" value="2"></el-option>
                            <el-option label="全部" value></el-option>
                        </el-select>
                    </div>
                    <div class="search_unit">
                        <p class="search_title">考试名称:</p>
                        <el-input v-model="search.Sname" placeholder="请输入考试名称"></el-input>
                    </div>
                    <div class="search_unit">
                        <p class="search_title">开始时间:</p>
                        <el-date-picker
                            v-model="search.Sstart"
                            type="datetime"
                            format="yyyy-MM-dd HH:mm"
                            value-format="yyyy-MM-dd HH:mm"
                            placeholder="选择日期时间"
                        ></el-date-picker>
                    </div>
                    <div class="search_unit">
                        <p class="search_title">结束时间:</p>
                        <el-date-picker
                            v-model="search.Send"
                            type="datetime"
                            format="yyyy-MM-dd HH:mm"
                            value-format="yyyy-MM-dd HH:mm"
                            placeholder="选择日期时间"
                        ></el-date-picker>
                    </div>
                    <div class="search_unit handle">
                        <p class="close" @click="Onsearch">搜索</p>
                    </div>
                </div>
                <div class="handle">
                    <p @click="add">增加</p>
                    <p @click="opendelete()">删除</p>
                </div>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%"
                v-loading="loading"
                @selection-change="handleChange"
            >
                <el-table-column type="selection" width="120"></el-table-column>
                <el-table-column prop="title" label="标题" width="180"></el-table-column>
                <el-table-column prop="beginTime" label="开始时间"></el-table-column>
                <el-table-column prop="deadline" label="结束时间"></el-table-column>
                <el-table-column prop="duration" label="答题时长（分）"></el-table-column>
                <el-table-column prop="totalPoints" label="总分"></el-table-column>
                <el-table-column prop="passingScore" label="及格分"></el-table-column>
                <el-table-column prop="questionSize" label="题目个数"></el-table-column>
                <el-table-column prop="questionSize" label="考试状态">
                    <template slot-scope="scope">
                        <div v-if="scope.row.status==0">未开始</div>
                        <div v-if="scope.row.status==1">考试中</div>
                        <div v-if="scope.row.status==2">已结束</div>
                    </template>
                </el-table-column>

                <el-table-column fixed="right" label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button @click="opendetail(scope.row.id)" type="text" size="small">详情</el-button>
                        <el-button @click="modify(scope.row.id)" type="text" size="small">修改</el-button>
                        <el-button @click="gonextpage(scope.row.id)" type="text" size="small">统计</el-button>
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

        <examdetail v-if="isShow" :id="detailid" @goback="goback"></examdetail>
        <addExam v-if="addShow" :Id="addid" @goback="goback"></addExam>
        <statistics v-if="statistics" :someid="sid" @goback="goback"></statistics>
    </div>
</template>

<script>
    import examdetail from "./detail/examdetail";
    import addExam from "./addExam";
    import statistics from "./statistics";

    export default {
        name: "index",
        data() {
            return {
                detailid: '',
                addid: '',
                sid: '',
                isShow: false,
                addShow: false,
                statistics: false,
                tableData: [],
                loading: false,
                currentPage: 1, //当前页码
                total: 0, //数据总条数
                pageSize: "10", //每条页数
                pageNum: "1", ////当前页码
                addform: {},
                departArr: [],
                idArr: [],
                form: {},
                memberlist: [],
                questionlist: [],
                search: {
                    Sstatus: "",
                    Sname: "",
                    Sstart: "",
                    Send: ""
                }
            };
        },
        components: {
            examdetail,
            addExam,
            statistics,
        },
        created() {
            this.getList();
        },
        methods: {
            goback() {
                this.isShow = false;
                this.addShow = false;
                this.statistics = false;
            },

            gonextpage(id) {
                this.statistics=true;
                this.sid=id
                // this.$router.push({path: "/index/statistics", query: {id}});
            },
            Onsearch() {
                this.getList()
                if (this.search.Sstart && this.search.Send) {
                    if (
                        new Date(this.search.Sstart).getTime() -
                        new Date(this.search.Send).getTime() >
                        0
                    ) {
                        this.$message("开始时间不能晚于结束时间");
                        return false;
                    } else {
                        this.getList()

                    }
                }
            },

            add() {
                this.addid = '';
                this.addShow = true;
                // this.$router.push("/index/exam/addExam");
            },
            modify(id) {
                this.addid = id;
                this.addShow = true;
                // this.$router.push({
                //     path: "/index/exam/addExam",
                //     query: {
                //         id: id
                //     }
                // });
            },
            opendetail(id) {
                //    详情
                this.isShow = true;
                this.detailid = id
            },

            opendelete() {
                // 批量删除
                if (this.idArr.toString() == "") {
                    this.$message({
                        type: "info",
                        message: "请选择删除项!"
                    });
                    return false;
                }
                this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        this.axios({
                            method: "post",
                            url: "/intelligentCommunity/manage/exam/deleteExam",
                            data: this.idArr
                        }).then(data => {
                            if (data.data.code === 200) {
                                this.$message({
                                    type: "success",
                                    message: "删除成功!"
                                });
                                this.getList();
                            }
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            },
            handleChange(val) {
                let arr = [];
                for (let i = 0; i < val.length; i++) {
                    arr.push(val[i].id);
                }
                this.idArr = arr;
            },

            //切换每页条数
            sizeChange(val) {
                this.pageSize = val;
                this.getList();
            },
            //切换页码
            currentChange(val) {
                this.pageNum = val;
                this.currentPage = val;
                this.getList();
            },
            getList() {
                this.loading = true;
                this.axios
                    .post(`/intelligentCommunity/manage/exam/exams?pageSize=${this.pageSize}&&pageNum=${this.pageNum}`, {
                        title: this.search.Sname,
                        beginTime: this.search.Sstart,
                        deadline: this.search.Send,
                        status: this.search.Sstatus,
                    })
                    .then(res => {
                        this.loading = false;
                        if (res.status == 200) {
                            this.tableData = res.data.details.list.list;
                            this.total = res.data.details.list.total;
                            this.currentChange = data.data.details.list.pageNum;
                        }
                    })
                    .catch(res => {
                    });
            },
            close() {
                this.isShow = false;
            },
            gettime(a, b, c) {
                var d = new Date(c);
                var y = d.getFullYear();
                var m = d.getMonth() + 1;
                m = m < 10 ? "0" + m : m;
                var d = d.getDate();
                d = d < 10 ? "0" + d : d;
                return y + "-" + m + "-" + d;
            }
        }
    };
</script>

<style scoped>
    .detail .title {
        width: 100%;
        height: 2rem;
        font-size: 0.75rem;
        color: #333;
        font-weight: 700;
        padding-left: 1rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
    }

    .detail .title .line {
        width: 0.12rem;
        height: 0.8rem;
        background: rgb(214, 10, 10);
        margin-right: 0.4rem;
    }
</style>
