<template>
    <div class="wrap">
        <div  v-if="!isShow" class="list">
            <div class="tools">
                <div class="searchForm">
                    <div class="search_unit">
                        <p class="search_title">姓名:</p>
                        <el-input v-model="search.Sname" placeholder="请输入姓名"></el-input>
                    </div>
                    <div class="search_unit">
                        <p class="search_title">所在组织:</p>
                        <el-input v-model="search.Sdepart" placeholder="请输入姓名"></el-input>
                    </div>
                    <div class="search_unit">
                        <p class="search_title">身份证号:</p>
                        <el-input v-model="search.Sid" placeholder="请输入身份证号"></el-input>
                    </div>
                    <div class="search_unit">
                        <p class="search_title">手机号:</p>
                        <el-input v-model="search.Stel" placeholder="请输入手机号"></el-input>
                    </div>
                    <div class="search_unit handle">
                        <p class="close" @click="Onsearch">搜索</p>
                    </div>
                </div>
                <div class="handle">
                    <el-upload
                        class="upload-demo"
                        action="/intelligentCommunity/manage/party/excelImport"
                        :on-success="filesuccess"
                        accept=".xls,.xlsx"
                        :show-file-list="false"
                        :file-list="fileList">
                        <p>导入</p>
                    </el-upload>
                    <p @click="opendelete()">删除</p>
                </div>

            </div>
            <el-table :data="tableData" style="width: 100%" v-loading="loading" @selection-change="handleChange">
                <el-table-column type="selection" width="120"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="idCardNum" label="身份证号"></el-table-column>
                <el-table-column prop="gender" :formatter="usegender" label="性别"></el-table-column>
                <el-table-column prop="nationality" label="民族"></el-table-column>
                <el-table-column prop="depart" label="所在组织" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="age" label="年龄"></el-table-column>
                <el-table-column prop="cellNum" label="手机号码"></el-table-column>
                <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row.id)" type="text" size="small">详情</el-button>
                        <el-button @click="modify(scope.row.id)" type="text" size="small">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="sizechange"
                @current-change="currentchange"
                :current-page="currentPage"
                :page-sizes="[10, 24, 36, 48]"
                :page-size="100"
                layout="sizes, prev, pager, next"
                :total="total"
            ></el-pagination>
        </div>

        <!--弹出框   详情-->

        <message_manage_detail @goback="goback" :id="id" v-if="isShow"></message_manage_detail>
        <!--修改-->
        <el-dialog title="党员信息修改" :visible.sync="modifyshow" width="30%" height="36%">

            <!--   头部基本档案 -->
            <el-form :inline="true" :model="modifyform" class="form" @submit.native.prevent>
                <el-form-item label="工作岗位：">
                    <el-input v-model="modifyform.work" placeholder="请输入工作岗位"></el-input>
                </el-form-item>
                <el-form-item label="手机号码：">
                    <el-input v-model="modifyform.phone" placeholder="请输入手机号码"></el-input>
                </el-form-item>
                <el-form-item label="联系电话：">
                    <el-input v-model="modifyform.tel" placeholder="请输入联系电话"></el-input>

                </el-form-item>
                <el-form-item label="现居住地：">
                    <el-input v-model="modifyform.location" placeholder="请输入现居住地"></el-input>
                </el-form-item>
                <el-form-item label="是否为管理员：">
                    <el-select v-model="modifyform.manage" placeholder="请选择是否为管理员">
                        <el-option label="是" value='true'></el-option>
                        <el-option label="否" value='false'></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="handleDetail" style="padding: 0">
                <p class="close" @click="modifySure()">保存</p>
                <p class="close" @click="modifyclose()">取消</p>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import message_manage_detail from "./message_manage_detail";
    export default {
        name: "index",
        data() {
            return {
                id:'',
                loading: false,
                modifyshow: false,
                currentPage: 1, //当前页码
                total: 0, //数据总条数
                pageSize: "10", //每条页数
                pageNo: "1", ////当前页码
                pageNum: "1", ////当前页码
                isShow: false,
                fileList: [],
                tableData: [],
                form: {},
                idArr: [],
                search: {
                    Sname: '',
                    Sdepart: '',
                    Sid: '',
                    Stel: ''
                },
                modifyform: {
                    work: '',
                    phone: '',
                    tel: '',
                    location: '',
                    manage: '',
                },
                modifyId: '',
            };
        },
        components:{
            message_manage_detail
        },
        created() {
            this.getlist();
        },
        methods: {
            // 点击详情
            goback(){
                this.isShow=false
            },
            handleClick(id) {
                this.id=id
                this.isShow = true;
                return false;
                this.axios
                    .get("/intelligentCommunity/manage/party/member/" + id)
                    .then(data => {
                        this.loading = false;
                        if (data.data.code === 200) {
                            this.form = data.data.details.data
                        }
                    });
            },
            close() {
                this.isShow = false;
            },
            Onsearch() {
                this.axios.post('/intelligentCommunity/manage/party/queryInformation?pageSize=' + this.pageSize + '&pageNum=' + this.pageNum, {
                    name: this.search.Sname,
                    depart: this.search.Sdepart,
                    idCardNum: this.search.Sid,
                    cellNum: this.search.Stel,
                }).then(data => {
                    if (data.data.code === 200) {
                        this.tableData = data.data.details.list.list;
                        this.total = data.data.details.list.total;
                    }
                })
            },
            //修改
            modify(id) {
                this.modifyId = id
                this.modifyshow = true;
                this.axios.get('/intelligentCommunity/manage/party/queryById/' + id).then(res => {
                    if (res.data.code === 200) {
                        let data = res.data.details.list[0];
                        this.modifyform.work = data.job;
                        this.modifyform.phone = data.cellNum;
                        this.modifyform.tel = data.tel;
                        this.modifyform.location = data.liveLocation;
                        this.modifyform.manage = data.isAdministrator.toString();
                    }
                })
            },
            modifySure() {
                //修改确定
                for (let key in this.modifyform) {
                    if (key !== 'tel') {
                        if (!this.modifyform[key]) {
                            this.$message("请修改详细信息");
                            return false
                        }
                    }
                }
                if (this.modifyform.manage == 'true') {
                    this.modifyform.manage = 1
                } else {
                    this.modifyform.manage = 0
                }
                this.axios.post('/intelligentCommunity/manage/party/updateById', {
                    id: this.modifyId,
                    cellNum: this.modifyform.phone,
                    tel: this.modifyform.tel,
                    liveLocation: this.modifyform.location,
                    isAdministrator: this.modifyform.manage,
                    job: this.modifyform.work,
                }).then(data => {
                    if (data.data.code === 200) {
                        this.$message.success("修改成功！");
                        this.modifyshow = false;
                        this.getlist();
                    }
                });
            },
            modifyclose() {
                this.modifyshow = false
            },
            //切换每页条数
            sizechange(val) {
                this.pageSize = val;
                this.Onsearch();
            },
            //切换页码
            currentchange(val) {
                this.pageNum = val;
                this.currentPage = val;
                this.Onsearch();
            },
            getlist() {
                this.loading = true;
                this.axios
                    .get("/intelligentCommunity/manage/party/members", {
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
                            this.currentChange = data.data.details.list.pageNum;
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
                        url: '/intelligentCommunity/manage/party/delete',
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
            filesuccess(response) {
                if (response.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '导入成功'
                    });
                } else {
                    this.$message({
                        type: 'info',
                        message: '导入失败'
                    });
                }
            },
            usegender(a, b, c) {
                if (c == 0) {
                    return '女'
                } else {
                    return '男'
                }
            }
        }
    };
</script>

<style>
    .el-button--text {
        background-color: brown;
        color: #fff;
        padding: .5rem .7rem;
    }

    .el-form--inline .el-form-item {
        width: 100%;
        /*margin-top: 2%;*/
        margin-right: 0;
    }

    .el-select--medium {
        vertical-align: bottom;
    }


</style>
