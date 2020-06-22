<template>
    <div class="wrap">
        <!-- <tools></tools> -->
        <div class="list" v-if="!isShow&&!configShow">
            <div class="tools">
                <div class="searchForm">
                    <div class="search_unit">
                        <p class="search_title">课程标题:</p>
                        <el-input v-model="search.Sname" placeholder="请输入标题"></el-input>

                    </div>
                    <div class="search_unit">
                        <p class="search_title">状态:</p>
                        <el-select v-model="search.Stype" placeholder="请选择分类">
                            <el-option label="全部状态" value=""></el-option>
                            <el-option label="进行中" value="0"></el-option>
                            <el-option label="已结束" value="1"></el-option>
                        </el-select>
                    </div>
                    <div class="search_unit">
                        <p class="search_title">创建时间:</p>
                        <el-date-picker
                            v-model="search.Screatetime"
                            type="datetime"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期时间">
                        </el-date-picker>
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
            <el-table :data="tableData" style="width: 100%" @selection-change="handleChange">
                <el-table-column type="selection" width="120"></el-table-column>
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column prop="endDate" label="截止时间"></el-table-column>
                <el-table-column prop="createDate" label="创建时间"></el-table-column>
                <el-table-column prop="status" :formatter="getstaus" label="状态"></el-table-column>
                <el-table-column fixed="right" label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button @click="opendetail(scope.row.id)" type="text" size="small">详情</el-button>
                        <el-button @click="modify(scope.row.id)" type="text" size="small">修改</el-button>
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
        <opininoCollectionDetail v-if="isShow" :id="id" @goback="goback"/>
        <config_topic v-if="configShow" :Id="Id" @goback="goback"/>
    </div>
</template>

<script>
    import opininoCollectionDetail from "./detail/opininoCollectionDetail";
    import config_topic from "./config_topic";

    export default {
        name: "index",
        data() {
            return {
                id: '',
                Id: '',
                isShow: false,
                configShow: false,
                loading: false,
                currentPage: 1, //当前页码
                total: 0, //数据总条数
                pageSize: "10", //每条页数
                pageNum: "1", ////当前页码
                tableData: [],
                form: {},
                idArr: [],
                party_type: [],
                topicList: [],
                search: {
                    Sname: '',
                    Stype: '',
                    Screatetime: '',
                },
            }
        },
        components: {
            opininoCollectionDetail,
            config_topic
        },
        created() {
            this.Onsearch()
        },
        methods: {
            goback() {
                this.isShow = false;
                this.configShow = false;
                this.Id=''
            },
            Onsearch() {
                this.loading = true;
                if (this.search.Screatetime == null) {
                    this.search.Screatetime == ''
                }
                this.axios
                    .post("/intelligentCommunity/manage/opinion/getOpinionList?dateStr=" + this.search.Screatetime, {
                        pageSize: this.pageSize,
                        pageNum: this.pageNum,
                        title: this.search.Sname,
                        status: this.search.Stype,
                    })
                    .then(data => {
                        this.loading = false;
                        if (data.data.code === 200) {
                            this.tableData = data.data.details.data;
                            this.total = data.data.details.totalCount;
                        }
                    });
            },


            modify(id) {
                this.Id=id;
                this.configShow=true
                // this.$router.push({
                //     path: '/index/opinionCollection/config_topic',
                //     query: {
                //         id: id
                //     }
                // })
            },
            opendetail(id) {
                //    打开详情
                this.id = id
                this.isShow = true;

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
            close() {
                this.isShow = false
            },
            add() {
                this.configShow=true
                // this.$router.push('/index/opinionCollection/config_topic')
            },
            //批量删除
            opendelete() {
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
                        .get("/intelligentCommunity/manage/opinion/delOpinion", {
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
                                this.Onsearch()
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
            getstaus(a, b, c) {
                if (c == 0) {
                    return '进行中'
                }
                if (c == 1) {
                    return '已结束'
                }

            }
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

    .small_detail_wrap {
        max-height: 50%;
    }
</style>
