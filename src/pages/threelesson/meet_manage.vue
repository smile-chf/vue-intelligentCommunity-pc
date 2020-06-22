<template>
    <div class="wrap">
        <!-- 列表1 -->
        <div class="list" v-if="!isShow&&!isAdd&&!isSign&&!newRecord">
            <div class="mainTitle">
                <p class="p1">会议管理</p>
                <el-dropdown>
                          <span class="el-dropdown-link">
                            设置<i class="el-icon-arrow-down el-icon--right"></i>
                          </span>
                    <el-dropdown-menu slot="dropdown">
                        <router-link to="/index/meet_location_manage">
                            <el-dropdown-item>会议室管理</el-dropdown-item>
                        </router-link>
                        <router-link to="/index/meet_type">
                            <el-dropdown-item>类别管理</el-dropdown-item>
                        </router-link>
                    </el-dropdown-menu>
                </el-dropdown>
                <!--                </el-col>-->
            </div>
            <div class="tools">
                <div class="handle" style="padding-right: 0">
                    <p @click="add(1)" style="width: 4.5rem">预约会议</p>
                    <p @click="add(2)" style="width: 4.5rem">录入会议</p>
                </div>
                <div class="searchForm">
                    <div class="search_unit">
                        <p class="search_title">分类:</p>
                        <el-select v-model="search.Stype">
                            <el-option label="请选择分类" value=''>请选择分类</el-option>
                            <el-option :label=item.label :value=item.label v-for="item in classifyList"></el-option>
                        </el-select>
                    </div>
                    <div class="search_unit">
                        <p class="search_title">状态:</p>
                        <el-select v-model="search.Sstatus">
                            <el-option label="请选择状态" value=""></el-option>
                            <el-option label="未开始" value="1"></el-option>
                            <el-option label="进行中" value="2"></el-option>
                            <el-option label="已结束" value="3"></el-option>
                            <el-option label="草稿" value="4"></el-option>
                        </el-select>
                    </div>
                    <div class="search_unit">
                        <p class="search_title">会议时间:</p>
                        <el-date-picker
                            v-model="search.Stime"
                            type="daterange"
                            value-format="yyyy-MM-dd"
                            range-separator="至"
                            start-placeholder="会议开始日期"
                            end-placeholder="会议结束日期">
                        </el-date-picker>
                    </div>
                    <div class="search_unit">
                        <p class="search_title">主题:</p>
                        <el-input v-model="search.Ssubject" placeholder="搜索会议主题"></el-input>
                    </div>
                    <div class="search_unit">
                        <p class="search_title">组织:</p>
                        <el-input v-model="search.depart" placeholder="搜索组织"></el-input>
                    </div>
                    <div class="search_unit handle">
                        <p class="close" @click="Onsearch">查询</p>
                    </div>
                    <!--                    分类   状态   主题   组织-->
                </div>
            </div>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column :show-overflow-tooltip="true" label="主题">
                    <template slot-scope="scope">
                        <p style="cursor: pointer;color: #409EFF" @click="opendetail(scope.row.id)">
                            {{scope.row.subject}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="type" :show-overflow-tooltip="true" label="分类" width="200"></el-table-column>
                <el-table-column prop="party_depart" :show-overflow-tooltip="true" label="所属组织"></el-table-column>
                <el-table-column prop="location" :show-overflow-tooltip="true" label="会议地点"></el-table-column>
                <el-table-column prop="conference_date" label="会议时间"></el-table-column>
                <el-table-column prop="status" :formatter="tableStatus" label="会议状态"></el-table-column>
                <el-table-column prop="sponsorName" label="创建人"></el-table-column>
                <el-table-column fixed="right" label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button @click="opendelete(scope.row.id)" type="text" size="small">删除</el-button>
                        <el-button @click="goModify(scope.row.id,3)" type="text" size="small">复制</el-button>
                        <el-button type="text" size="small">
                            <el-dropdown style="color: #409EFF">
                                  <span class="el-dropdown-link">
                                    更多<i class="el-icon-arrow-down el-icon--right"></i>
                                  </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item v-if="scope.row.status==3">导出</el-dropdown-item>
                                    <el-dropdown-item @click.native="NewRecord(scope.row.id)">新建记录</el-dropdown-item>
                                    <el-dropdown-item>查看记录</el-dropdown-item>
                                    <el-dropdown-item @click.native="signList(scope.row.id)"
                                                      v-if="scope.row.status!==4">统计
                                    </el-dropdown-item>
                                    <el-dropdown-item @click.native="goModify(scope.row.id,4)"
                                                      v-if="scope.row.status==1||scope.row.status==4">编辑
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
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
        <!-- 列表1    结束-->
        <!--        详情-->
        <meetManageDetail :id="Id" v-if="isShow" @goBack="goBack()"></meetManageDetail>
        <addMetting :Id="addId" v-if="isAdd" :addMettingType="addMettingType" @goBack="goBack()"></addMetting>
        <signList :id="signid" v-if="isSign" @goBack="goBack()"></signList>
        <newRecord :Id="newRecordId" v-if="newRecord" @goBack="goBack()"></newRecord>
    </div>
</template>

<script>
    import meetManageDetail from './detail/meet_manage_detail'
    import addMetting from './add_metting'
    import signList from "./detail/signList";
    import newRecord from "./detail/newRecord";
    import {derive} from "../../utils/derive";

    export default {
        name: "index",
        data() {
            return {
                Id: '',
                addId: '',
                signid: '',
                newRecordId: '',
                isAdd: false,
                isSign: false,
                newRecord: false,
                currentPage: 1, //当前页码
                total: 0, //数据总条数
                pageSize: "10", //每条页数
                pageNum: "1", ////当前页码
                isShow: false,
                small_show: false,
                notepeople: '',
                hostList: '',
                attendList: '',
                unitid: '',
                idArr: [],
                tableData: [],
                smallTableData: [],
                form: {},
                content: '',
                search: {
                    Stype: '',
                    Sstatus: '',
                    Ssubject: '',
                    depart: '',
                    Stime: ''
                },
                departArr: [],
                classifyList: [],
                //进入添加页面的状态     1:预约会议 2：录入会议 3：复制 4：编辑
                addMettingType: 1
            };
        },
        components: {
            meetManageDetail,
            addMetting,
            signList,
            newRecord,
        },
        watch: {
            isAdd(n, o) {
                if(o){
                    this.Onsearch()
                }
            }
        },
        created() {
            this.getlist();
            this.getdepart();
            this.getclasstype();
        },
        methods: {
            getclasstype() {
                this.axios
                    .get("/intelligentCommunity/manage/conferenceType/getAllTypeList")
                    .then(res => {
                        if (res.data.code === 200) {
                            let arr = [];
                            let list = res.data.details.data;
                            for (let i = 0; i < list.length; i++) {
                                let json = {};
                                json.value = list[i].id;
                                json.label = list[i].title;
                                arr.push(json)
                            }
                            this.classifyList = arr
                        }
                    });
            },
            //新建记录
            NewRecord(id) {
                this.newRecord = true;
                this.newRecordId = id
            },
            goBack() {
                this.isShow = false;
                this.isAdd = false;
                this.isSign = false;
                this.newRecord = false;
            },

            Onsearch() {
                let start = this.search.Stime[0] || '', end = this.search.Stime[1] || '';
                this.axios.post('/intelligentCommunity/manage/party/queryByTypeStatus?meetingStart=' + start + '&meetingOver=' + end + '&=pageSize' + this.pageSize + '&pageNum=' + this.pageNum, {
                    type: this.search.Stype,
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
            goModify(id, type) {
                this.isAdd = true;
                this.addId = id;
                this.addMettingType = type
            },
            signList(id) {
                this.isSign = true;
                this.signid = id
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
                this.Id = id
            },
            opensamll(id, type) {
                this.small_show = true;
                this.content = '';
                let detailHeight = this.$refs['detail'].height;
                console.log(this.$refs['detail'].height)
                if (type == 0) {
                    //    心得
                    this.axios
                        .get("/intelligentCommunity/manage/party/conference/getExperience/" + this.unitid + '/' + id)
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
                        .get("/intelligentCommunity/manage/party/conference/getSummary/" + this.unitid + '/' + id)
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
                    .get("/intelligentCommunity/manage/party/conferences/paged", {
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

            //录入会议
            educe() {
                // if (this.idArr.toString() == '') {
                //     this.$message({
                //         type: 'info',
                //         message: '请选择导出项!'
                //     });
                //     return false
                // }
                //
                //
                // let a = this.idArr.toString();
                //
                // derive({
                //     url:
                //         "/intelligentCommunity/manage/party/exportConferenceData",
                //     ids: a,
                //     filename: "三会一课会议"
                // });
            },

            opendelete(id) {
                // 批量删除
                this.$confirm('确定删除该条数据?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios({
                        method: 'post',
                        url: '/intelligentCommunity/manage/party/conference/deleteConference',
                        data: [id]
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
            add(type) {
                this.isAdd = true;
                this.addId = '';
                this.addMettingType = type
            },
            tableStatus(a, b, c) {
                if (c == 1) {
                    return '未开始'
                }
                if (c == 2) {
                    return '进行中'
                }
                if (c == 3) {
                    return '已结束'
                }
                if (c == 4) {
                    return '草稿'
                }
            }
        }
    };
</script>

<style scoped>

</style>
