<template>
    <div class="wrap">
        <div class="list" v-if="!isShow&&!isDialog">
            <div class="tools">
                <div class="searchForm">
                    <div class="search_unit">
                        <p class="search_title">课程名称:</p>
                        <el-input v-model="search.name" placeholder="请输入课程名称"></el-input>
                    </div>
                    <div class="search_unit">
                        <p class="search_title">分类:</p>
                        <el-select v-model="search.Stype" placeholder="请选择分类">
                            <el-option label="全部分类" value=""></el-option>
                            <el-option
                                v-for="item in typeList"
                                :key="item.key"
                                :label="item.label"
                                :value="item.key">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="search_unit">
                        <p class="search_title">创建时间:</p>
                        <el-date-picker
                            v-model="search.Screatetime"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </div>
                    <div class="search_unit">
                        <p class="search_title">课程状态:</p>
                        <el-select v-model="search.Stuatus" placeholder="请选择状态">
                            <el-option label="全部状态" value=""></el-option>
                            <el-option label="上架" value="1"></el-option>
                            <el-option label="下架" value="0"></el-option>
                        </el-select>
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
                <el-table-column prop="createTime" :formatter="gettime1" label="创建时间"></el-table-column>
                <el-table-column prop="deadline" label="截止时间"></el-table-column>
                <el-table-column prop="type" label="类型"></el-table-column>
                <!--                <el-table-column prop="brief" label="简介"></el-table-column>-->
                <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="opendetail(scope.row.id)" type="text" size="small">修改</el-button>
                        <el-button @click="choosestatus(scope.row.id,scope.row.flag)" type="text" size="small">
                            {{scope.row.flag=='0'?'上架':'下架'}}
                        </el-button>
                        <el-button @click="lookMore(scope.row.id)" type="text" size="small">查看</el-button>
                        <!--                        <el-button @click="opendetail(scope.row.id)" type="text" size="small">详情</el-button>-->
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
        <!-- 修改 -->

        <lesson_list_handle v-if="isShow" @goback="goback" :Id="id"/>
        <!--        查看-->
        <look_lesson v-if="isDialog" @goback="goback" :id="Id"></look_lesson>

    </div>
</template>

<script>
    import lesson_list_handle from "./lesson_list_handle";
    import look_lesson from "./detail/look_lesson";
    export default {
        name: "lesson_list",
        data() {
            return {
                id:'',
                Id:'',
                isShow: false,
                loading: false,
                currentPage: 1, //当前页码
                total: 0, //数据总条数
                pageSize: "10", //每条页数
                pageNum: "1", ////当前页码
                tableData: [],
                form: {
                    depart: '',
                    title: '',
                    brief: '',
                    pic: '',
                    content: '',
                    deadline: ''
                },
                isAdd: 0,
                partyArr: [],
                getvalueid: '',
                modifyId: '',
                idArr: [],
                search: {
                    name: '',
                    Stype: '',
                    Screatetime: '',
                    Stuatus: '',
                },
                typeList: [],
                isDialog: false,
            }
        },
        components:{
            lesson_list_handle,
            look_lesson
        },
        created() {
            this.getlist();
            this.getclasslist();
            this.axios
                .get("/intelligentCommunity/manage/education/getAllLessonType")
                .then(res => {
                    this.loading = false;
                    if (res.data.code === 200) {
                        this.partyArr = res.data.details.data
                    }
                });
        },
        methods: {
            goback(){
              this.isShow=false;
              this.isDialog=false;
            },
            //查看
            lookMore(id) {
                this.isDialog = true;
                this.Id=id
            },
            //切换

            //搜索
            Onsearch() {
                this.getlist(this.search.name, this.search.Stype, this.search.Screatetime, this.search.Stuatus)
            },
            choosestatus(id, flag) {
                let Id = Number(id);
                if (flag == 0) {
                    this.axios({
                        method: 'post',
                        url: '/intelligentCommunity/manage/education/updateFlagById',
                        data: {
                            id: Id,
                            flag: 1
                        }
                    })
                        .then(data => {
                            if (data.data.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '上架成功!'
                                });
                                this.getlist();
                            }
                        });
                } else {
                    this.axios({
                        method: 'post',
                        url: '/intelligentCommunity/manage/education/updateFlagById',
                        data: {
                            id: Id,
                            flag: 0
                        }
                    })
                        .then(data => {
                            if (data.data.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '下架架成功!'
                                });
                                this.getlist();
                            }
                        });
                }
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
                        url: '/intelligentCommunity/manage/education/deleteLesson',
                        data: this.idArr
                    })
                        .then(data => {
                            if (data.data.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                                this.getlist();
                            }
                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            opendetail(id) {
                this.isShow=true;
                this.id=id;
            },
            handleChange(val) {
                let arr = [];
                for (let i = 0; i < val.length; i++) {
                    arr.push(val[i].id)
                }
                this.idArr = arr
            },
            add() {
                this.id='';
                this.isShow=true

            },
            changevalue(val) {
                this.getvalueid = val
            },
            sure() {
                //    修改确定
                if (!this.form.title) {
                    this.$message({
                        type: 'info',
                        message: '请输入标题!'
                    });
                    return false
                }
                if (!this.form.brief) {
                    this.$message({
                        type: 'info',
                        message: '请输入简介!'
                    });
                    return false
                }
                if (!this.form.depart) {
                    this.$message({
                        type: 'info',
                        message: '请选择类型!'
                    });
                    return false
                }
                if (!this.form.pic) {
                    this.$message({
                        type: 'info',
                        message: '请输入视频链接!'
                    });
                    return false
                }
                if (!this.form.content) {
                    this.$message({
                        type: 'info',
                        message: '请输入视频内容!'
                    });
                    return false
                }
                if (this.isAdd == 0) {
                    let Time = ''
                    if (typeof (this.form.deadline) == 'string') {
                        Time = this.form.deadline
                    } else {
                        Time = this.gettime(this.form.deadline)
                    }
                    this.axios
                        .post("/intelligentCommunity/manage/education/saveLesson", {
                            id: this.modifyId,
                            title: this.form.title,
                            typeId: parseInt(this.form.depart),
                            brief: this.form.brief,
                            pic: this.form.pic,
                            content: this.form.content,
                            deadline: Time,
                        })
                        .then(res => {
                            if (res.data.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '修改成功!'
                                });
                                this.isShow = false
                                this.getlist()
                            }
                        });
                } else {
                    // 添加
                    this.axios
                        .post("/intelligentCommunity/manage/education/saveLesson", {
                            title: this.form.title,
                            typeId: parseInt(this.form.depart),
                            brief: this.form.brief,
                            pic: this.form.pic,
                            content: this.form.content,
                            deadline: this.gettime(this.form.deadline),
                        })
                        .then(res => {
                            if (res.data.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                });
                                this.isShow = false
                                this.getlist()
                            }
                        });

                }
            },
            close() {
                //    关闭弹窗
                this.isShow = false
                this.modifyId = ''
                this.form.title = ''
                this.form.depart = ''
                this.form.content = ''
                this.form.pic = ''
                this.form.deadline = ''
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
            getlist(name, type, time, status) {
                if (!time) {
                    time = ''
                }
                this.loading = true;
                this.axios
                    .post("/intelligentCommunity/manage/education/lessons?pageSize=" + this.pageSize + '&pageNum=' + this.pageNum + '&dateStr=' + time, {
                        title: name,
                        flag: status,
                        typeId: type,
                    })
                    .then(data => {
                        this.loading = false;
                        if (data.data.code === 200) {
                            this.tableData = data.data.details.list.list;
                            this.total = data.data.details.list.total;
                        }
                    });
            },
            gettime(date) {
                var y = date.getFullYear();
                var m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                var h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                var minute = date.getMinutes();
                minute = minute < 10 ? ('0' + minute) : minute;
                var s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + s;
            },
            gettime1(a, b, c) {
                var d = new Date(c);
                var y = d.getFullYear();
                var m = d.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var r = d.getDate();
                r = r < 10 ? ('0' + r) : r;
                return y + '-' + m + '-' + r;
            },
            //获取类型
            getclasslist() {
                this.axios
                    .get("/intelligentCommunity/manage/education/getAllLessonType")
                    .then(res => {
                        if (res.status == 200) {
                            let data = res.data.details.data;
                            let arr = [];
                            for (let i = 0; i < data.length; i++) {
                                var json = {};
                                json.key = data[i].id;
                                json.label = data[i].name;
                                arr.push(json)
                            }
                            this.typeList = arr
                        }
                    })
                    .catch(res => {
                        this.$message({
                            type: 'info',
                            message: '网络错误!'
                        });
                    });
            },
        }
    }
</script>

<style>


</style>
