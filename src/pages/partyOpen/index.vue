<template>
    <div class="wrap sss">
        <div v-if="!isshow&&!addshow" class="list">
            <div class="tools">
                <div class="searchForm">
                    <div class="search_unit">
                        <p class="search_title">标题:</p>
                        <el-input v-model="search.Stitle" placeholder="请输入标题"></el-input>
                    </div>
                    <div class="search_unit">
                        <p class="search_title">类别:</p>
                        <el-select v-model="search.Stype" placeholder="请选择">
                            <el-option label="全部" value></el-option>
                            <el-option
                                v-for="item in classfilyList"
                                :key="item.key"
                                :label="item.label"
                                :value="item.label"
                            ></el-option>
                        </el-select>
                    </div>
                    <div class="search_unit handle">
                        <p class="close" @click="Onsearch">搜索</p>
                    </div>
                </div>
                <div class="handle">
                    <p @click="add()">增加</p>
                    <p @click="opendelete()">删除</p>
                </div>
            </div>
            <el-table :data="tableData" style="width: 100%" @selection-change="handleChange">
                <el-table-column type="selection" width="120"></el-table-column>
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column prop="departName" label="组织名称"></el-table-column>
                <el-table-column prop="type" label="类型"></el-table-column>
                <el-table-column prop="createDate" label="创建时间"></el-table-column>
                <el-table-column fixed="right" label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button @click="opendetail(scope.row.id)" type="text" size="small">详情</el-button>
                        <el-button @click="modify(scope.row.id)" type="text" size="small">修改</el-button>
                        <el-button
                            @click="isTop(scope.row.id,scope.row.flag)"
                            type="text"
                            size="small"
                        >{{scope.row.flag==0?'已置顶':'置顶'}}
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

        <partyOpen_detail v-if="isshow" :id="id" @goback="goback"></partyOpen_detail>
        <partyOpen_add v-if="addshow" :Id="addid" @goback="goback"></partyOpen_add>
    </div>
</template>

<script>
    import {
        queryPersonnelListById,
        queryCommentatorsListById
    } from "../../api/http";
    import partyOpen_detail from "./detail/partyOpen_detail";
    import partyOpen_add from "./partyOpen_add";

    export default {
        name: "index",
        data() {
            return {
                id: "",
                addid: "",
                isshow: false,
                addshow:false,
                loading: false,
                currentPage: 1, //当前页码
                total: 0, //数据总条数
                pageSize: "10", //每条页数
                pageNum: "1", ////当前页码
                tableData: [],
                form: {},
                idArr: [],
                search: {
                    Stitle: "",
                    Stype: ""
                },
                classfilyList: [],
                s: ""
            };
        },
        created() {
            this.getlist();
            this.getclasslist();
        },
        components:{
            partyOpen_detail,
            partyOpen_add
        },
        methods: {

            goback(){
                this.isshow=false;
                this.addshow=false;
            },
            //    审核
            audit(id) {
                console.log(id + "审核");
            },

            //置顶
            isTop(id, flag) {
                if (flag == 0) {
                    this.axios
                        .post("/intelligentCommunity/manage/publicPartyWork/updateSetTop", {
                            id: id,
                            flag: 1
                        })
                        .then(data => {
                            if (data.data.code === 200) {
                                this.Onsearch();
                            }
                        });
                } else {
                    this.axios
                        .post("/intelligentCommunity/manage/publicPartyWork/updateSetTop", {
                            id: id,
                            flag: 0
                        })
                        .then(data => {
                            if (data.data.code === 200) {
                                this.Onsearch();
                            }
                        });
                }
            },

            Onsearch() {
                this.axios
                    .post(
                        "/intelligentCommunity/manage/publicPartyWork/selectTitleAndType?pageSize=" +
                        this.pageSize +
                        "&pageNum=" +
                        this.pageNum,
                        {
                            title: this.search.Stitle,
                            type: this.search.Stype
                        }
                    )
                    .then(data => {
                        if (data.data.code === 200) {
                            console.log(data)
                            this.tableData = data.data.details.list.list;
                            this.total = data.data.details.list.total;
                        }
                    });
            },

            modify(id) {
                this.addshow=true;
                this.addid=id
                // this.$router.push({
                //     path: "/index/partyOpen/partyOpen_add",
                //     query: {
                //         id: id
                //     }
                // });
            },
            add() {
                this.addshow=true;
                this.addid='';
                //    增加
            },
            close() {
                this.isshow = false;
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
                        this.axios
                            .get("/intelligentCommunity/manage/publicPartyWork/delPartyWork", {
                                params: {
                                    ids: this.idArr.toString()
                                }
                            })
                            .then(data => {
                                if (data.data.code === 200) {
                                    this.$message({
                                        type: "success",
                                        message: "删除成功!"
                                    });
                                    this.Onsearch();
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
            opendetail(id) {
                this.id = id;
                this.isshow = true;
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
                    .get("/intelligentCommunity/manage/publicPartyWork/getPartyWorkList", {
                        params: {
                            pageSize: this.pageSize,
                            pageNum: this.pageNum
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
            getclasslist() {
                this.axios
                    .get(
                        "/intelligentCommunity/manage/publicPartyWork/getAllPartyWorkTypeList"
                    )
                    .then(res => {
                        if (res.status == 200) {
                            let data = res.data.details.data;
                            let arr = [];
                            for (let i = 0; i < data.length; i++) {
                                var json = {};
                                json.key = data[i].id;
                                json.label = data[i].title;
                                arr.push(json);
                            }
                            this.classfilyList = arr;
                        }
                    })
                    .catch(res => {
                        this.$message({
                            type: "info",
                            message: "网络错误!"
                        });
                    });
            },
            changepage(val) {
                console.log(val);
                this.pageNum1 = val;
                this.currentpage1 = val;
                if (this.s == 1) {
                    this.queryCommentatorsListById();
                }
                if (this.s == 2) {
                    this.queryPersonnelListById();
                }
            }
        }
    };
    // }
    // };
</script>

<style>
    /*.partyOpen {*/
    /*    width: 100%;*/
    /*    height: 100%;*/
    /*    position: relative;*/
    /*}*/


    /*.details .el-form-item__content {*/
    /*    width: 55% !important;*/
    /*}*/

    .sss .el-dialog {
        margin: 10vh auto 0;
    }
</style>

<style>
    /*.el-form--inline .el-form-item {*/
    /*    width: 100%;*/
    /*    margin-right: 0;*/
    /*}*/
</style>

<style lang="less" scoped>
    .huixian {
        width: 100%;
        padding: 1rem 2rem;
        box-sizing: border-box;

        div:nth-child(2) {
            border: 1px solid #ccc;
            min-height: 5rem;
        }
    }

    .doflex {
        display: flex;

        div:last-child {
            cursor: pointer;
        }

        div:last-child:hover {
            color: #f58733;
        }
    }
</style>
<style lang="less">
    .sss {
        .el-dialog {
            /*margin: 0 30rem;*/
        }

        .page {
            margin-top: 1.5rem;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            .el-pagination {
                position: relative;
                justify-content: center;
            }
        }
    }
</style>
