<template>
    <div class="wrap">
        <div class="list">
            <div class="tools">
                <div class="searchForm">
                    <div class="search_unit">
                        <p class="search_title">姓名:</p>
                        <el-input v-model="search.name" placeholder="请输入姓名"></el-input>
                    </div>

                    <div class="search_unit">
                        <p class="search_title">所属组织:</p>
                        <el-select v-model="search.org">
                            <el-option label="全部" value></el-option>
                            <el-option v-for="item in orgdata" :key="item.id" :label="item.name"
                                       :value="item.id"></el-option>
                        </el-select>
                    </div>

                    <div class="search_unit">
                        <p class="search_title">状态:</p>
                        <el-select v-model="search.stu">
                            <el-option label="全部" value></el-option>
                            <el-option label="通过" value="1"></el-option>
                            <el-option label="未通过" value="0"></el-option>
                        </el-select>
                    </div>
                    <div class="search_unit">
                        <p class="search_title">成绩排序:</p>
                        <el-select v-model="search.cjpx">
                            <el-option label="升序" value="0"></el-option>
                            <el-option label="降序" value="1"></el-option>
                        </el-select>
                    </div>

                    <div class="search_unit handle">
                        <p class="close" @click="onsearch">搜索</p>
                    </div>
                </div>
                <div class="handle">
                    <p @click="derive">导出</p>
                    <p @click="goback">返回</p>
                </div>
            </div>
            <div class="flexstyle">
                <div>试卷名称：{{examData.title}}</div>
                <div>应考人数：{{examData.shouldCount}}人</div>
                <div>已考人数：{{examData.joinCount}}人</div>
                <div>未考人数：{{examData.noJoinCount}}人</div>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%;padding:0 2rem"
                @selection-change="handleChange"
            >
                <el-table-column width="100" label="排名" type="index" :index="indexMethod"></el-table-column>
                <!-- <el-table-column type="selection" width="120"></el-table-column> -->
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="departName" label="组织名称"></el-table-column>
                <el-table-column prop="score" label="分数"></el-table-column>
                <el-table-column prop="isPass" label="状态">
                    <template slot-scope="scope">
                        <div v-if="scope.row.isPass">通过</div>
                        <div v-else>未通过</div>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button @click="opendetail(scope.row.mid)" type="text" size="small">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="sizeChange"
                @current-change="currentChange"
                :current-page="currentPage"
                :page-sizes="[10]"
                :page-size="100"
                layout="sizes, prev, pager, next"
                :total="total"
            ></el-pagination>
        </div>
        <el-dialog :title="resdata.title" :visible.sync="isshow" width="70%" center>
            <div style="padding:0 2rem;">
                <div v-for="(item, index) in resdata.list" :key="index">
                    <div class="dialogtitle">{{index+1}}、{{item.type==0?('（ 单选 ） '):('（ 多选 ） ')}}{{item.question}}</div>
                    <div class="dialoganswer">
                        <div v-for="(l, index) in item.optionList" :key="index">{{l.optionKey}}、{{l.optionDescribe}}
                        </div>
                    </div>
                    <div class="youcheck">
                        <div>您选择的答案:{{item.userAnswer.answer}}</div>
                        <div>正确答案: {{item.answer}}</div>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>


<script>
    import {getExamsMemberDetails, getDepartList, getExamsMemberList, updateAuditById} from "@/api/http";
    import {derive} from "../../utils/derive";

    export default {
        name: "index",
        data() {
            return {
                resdata: {},
                orgdata: [],
                search: {
                    org: "",
                    name: "",
                    stu: "",
                    cjpx: "1",
                    sjpx: ""
                },
                gridData: [],
                total1: 10,
                pageNum1: 1,
                currentpage1: 1,
                isshow: false,
                loading: false,
                currentPage: 1, //当前页码
                total: 0, //数据总条数
                pageSize: "10", //每条页数
                pageNum: "1", ////当前页码
                tableData: [],
                form: {
                    title: "",
                    name: ""
                },
                partyArr: [],
                getId: "",
                getvalueid: "",
                idArr: [],
                isAdd: 0,
                id: "",
                examData: {},
                mid: ""
            };
        },
        props:['someid'],
        async created() {
            let res = await getDepartList();
            this.orgdata = res.details.data;
            this.getlist();
        },
        methods: {
            derive() {
                location.href =
                    "/intelligentCommunity/manage/exam/exportExamMemberData?ids=" +
                    this.someid;
                // derive({url:"/intelligentCommunity/manage/exam/exportExamMemberData",ids:this.someid,filename:"在线考试人员统计数据"})
            },
            onsearch() {
                this.currentPage = 1;
                this.pageNum = 1;
                this.getlist();
            },

            indexMethod(index) {
                if (this.search.cjpx == 1) {
                    return index + 1 + 10 * (this.pageNum - 1);
                } else {
                    return this.total - index - 10 * (this.pageNum - 1);
                }
            },
            goback() {
                this.$emit('goback')
            },

            handleChange(val) {
                let arr = [];
                for (let i = 0; i < val.length; i++) {
                    arr.push(val[i].id);
                }
                this.idArr = arr;
            },

            async opendetail(mid) {
                this.mid = mid;
                let res = await getExamsMemberDetails(this.someid, mid)
                this.resdata = res.details.data

                this.isshow = true;
            },
            changevalue(val) {
                this.getvalueid = val;
            },
            sure() {
                this.isshow = false;
            },
            close() {
                this.isshow = false;
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
            async getlist() {
                this.loading = true;
                let res = await getExamsMemberList({
                    pageNum: this.pageNum,
                    id: this.someid,
                    username: this.search.name,
                    departId: this.search.org,
                    status: this.search.stu,
                    order: this.search.cjpx
                });

                if (res.code == 200) {
                    this.tableData = res.details.data.list;
                    console.log(this.tableData);
                    this.total = res.details.data.totalCount;
                    this.examData = res.details.data.examData;
                }
                this.loading = false;
                //   this.axios
                //     .get("/intelligentCommunity/manage/publicPartyWork/getPartyWorkList", {
                //       params: {
                //         pageSize: this.pageSize,
                //         pageNum: this.pageNum
                //       }
                //     })
                //     .then(data => {
                //       this.loading = false;
                //       if (data.data.code === 200) {
                //         this.tableData = data.data.details.data;
                //         this.total = data.data.details.totalCount;
                //       }
                //     });
            }
        },
        watch: {
            "search.cjpx": {
                handler() {
                    this.currentPage = 1;
                    this.pageNum = 1;
                    this.getlist();
                },
                deep: true
            }
        }
    };
</script>

<style scoped>
    .partyOpen {
        width: 100%;
        height: 100%;
    }

    .el-form-item {
        display: block !important;
        padding: 1rem 0;
        margin-bottom: 0;
    }

    .el-form-item:last-child {
        padding-bottom: 2rem;
    }
</style>
<style lang="less" scoped>
    .dialogtitle {
        width: 100%;
        font-size: 16px;
        margin-bottom: 0.6rem;
        font-weight: 700;
    }

    .dialoganswer {
        width: 100%;
        font-size: 14px;

        div {
            margin-bottom: 0.2rem;
        }
    }

    .youcheck {
        margin: 1rem 0;
        width: 100%;
        font-size: 14px;
        display: flex;

        div:nth-child(1) {
            width: 200px;
        }
    }

    .page {
        height: 2rem;
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

    .flexstyle {
        height: 3rem;
        display: flex;
        align-items: center;

        div {
            font-size: 16px;
            width: 100%;
            text-align: center;
        }
    }
</style>
