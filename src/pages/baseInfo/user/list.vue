<template>
    <div class="wrap userList">
        <div class="list">
            <div class="tools">
                 <div class="searchForm">
                    <div class="search_unit">
                        <p class="search_title">用户名:</p>
                        <el-input v-model="search.Sname" placeholder="请输入"></el-input>
                    </div>
                    <div class="search_unit">
                        <p class="search_title">姓名:</p>
                        <el-input v-model="search.Sdepart" placeholder="请输入"></el-input>
                    </div>

                    <div class="search_unit">
                        <p class="search_title">所在组织:</p>
                        <el-input v-model="search.Stel" placeholder="请输入"></el-input>
                    </div>
                    <div class="search_unit handle">
                        <p class="close" @click="Onsearch">搜索</p>
                    </div>
                </div>
                <div class="handle">
                    <p @click="add()">添加</p>
                    <p @click="del()">删除</p>
                </div>
            </div>
            <el-table :data="tableData" style="width: 100%" v-loading="isLoading"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="120"></el-table-column>
                <el-table-column prop="username" label="用户名"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="tel" label="手机号"></el-table-column>
                <el-table-column prop="departName" label="党委/党总支/党支部"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="modify(scope.row.id)" type="text" size="small">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="sizeChange"
                @current-change="currentChange"
                :current-page="pageInfo.currentPage"
                :page-sizes="[10, 24, 36, 48]"
                :page-size="100"
                layout="sizes, prev, pager, next"
                :total="pageInfo.totalCount"
            ></el-pagination>
        </div>
        <el-dialog
            title="用户管理"
            :visible.sync="detail.dialogVisible"
            width="38%"
            height="36%"
            center>
            <el-form ref="form" :model="detail" @submit.native.prevent>
                <el-form-item required label="姓名">
                    <el-input v-model="detail.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item required label="用户名">
                    <el-input v-model="detail.username" placeholder="请输入登录用户名"></el-input>
                </el-form-item>
                <el-form-item required label="密码" v-show="hideOrShowController.passwordShow">
                    <el-input v-model="detail.password" type="password" placeholder="请输入登录密码"></el-input>
                </el-form-item>
                <el-form-item required label="确认密码" v-show="hideOrShowController.confirmPasswordShow">
                    <el-input v-model="detail.confirmPassword" type="password" placeholder="请再次输入登录密码"></el-input>
                </el-form-item>
                <el-form-item required label="联系电话">
                    <el-input v-model="detail.tel" placeholder="请输入联系电话"></el-input>
                </el-form-item>
                <el-form-item required label="党组织">
                    <el-select style="width: 100%" v-model="detail.departId" filterable placeholder="请选择党组织">
                        <el-option
                            v-for="item in departArr"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="detail.dialogVisible = false" style="background-color: #f58733;border: none">取 消</el-button>
                <el-button type="primary" @click="save" style="background-color: #f58733;border: none">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: "userList",
        data() {
            return {
                search:{
                    Sdepart:"",
                    Sname:"",
                    Stel:""
                },
                tableData: [],
                searchCondition: {},
                detail: {
                    dialogVisible: false,
                    id: '',
                    name: '',
                    username: '',
                    password: '',
                    confirmPassword: '',
                    tel: '',
                    departId: ''
                },
                detailInit: {
                    dialogVisible: false,
                    id: '',
                    name: '',
                    username: '',
                    password: '',
                    confirmPassword: '',
                    tel: '',
                    departId: ''
                },
                currentUrl: "",
                saveUrl: "/intelligentCommunity/user/addUser",
                modifyUrl: "/intelligentCommunity/user/modifyUser",
                departArr: [],
                pageInfo: {
                    pageSize: 10,
                    pageNum: 1,
                    currentPage: 1,
                    totalCount: 0
                },
                hideOrShowController: {
                    passwordShow: true,
                    confirmPasswordShow: true
                },
                selectedIds: [],
                isLoading: false
            }
        },
        created() {
            this.getList();
        },
        methods: {
            //搜索
            Onsearch(){
              console.log("搜索");
              this.pageInfo.pageNum=1
                this.getList()
            },


            //切换每页条数
            sizeChange(val) {
                this.pageInfo.pageSize = val;
                this.getlist();
            },
            //切换页码
            currentChange(val) {
                this.pageInfo.pageNum = val;
                this.pageInfo.currentPage = val;
                this.getlist();
            },
            handleSelectionChange(val) {
                this.selectedIds = [];
                val.forEach(item => {
                    this.selectedIds.push(item.id);
                })
            },
            getList() {
                this.isLoading = true;
                this.axios.post("/intelligentCommunity/user/userList?pageSize=" + this.pageInfo.pageSize + "&pageNum=" + this.pageInfo.pageNum,
                {
                  name:this.search.Sdepart,
                  username:this.search.Sname,
                  departName:this.search.Stel,

                }
                ).then(data => {
                    this.isLoading = false;
                    if (data.data.code === 200) {
                        this.tableData = data.data.details.data;
                        this.pageInfo.totalCount = data.data.details.totalCount;
                    }
                });
            },
            getDeparts() {
                this.axios.get("/intelligentCommunity/manage/party/getDepartsByDepartId").then(res => {
                    if (res.data.code == 200) {
                        this.departArr = res.data.details.data;
                    }
                });
            },
            add() {
                this.detail = this.detailInit;
                this.detail.dialogVisible = true;
                this.hideOrShowController.passwordShow = true;
                this.hideOrShowController.confirmPasswordShow = true;
                this.currentUrl = this.saveUrl;
                this.getDeparts();
            },
            save() {
                if(this.detail.name.trim()==""||this.detail.username.trim()==""||this.detail.tel.trim()==""||this.detail.departId==""){
                    this.$message.error('请输入必填项！');
                    return;
                }
                if(this.detail.id==""&&(this.detail.password.trim()==""||this.detail.confirmPassword.trim()=="")){
                    this.$message.error('请输入必填项！');
                    return;
                }else{
                    if(this.detail.password.trim()!=this.detail.confirmPassword.trim()){
                        this.$message.error('两次密码不一致');
                        return;
                    }
                }

                this.axios.post(this.currentUrl, this.detail).then(data => {
                    if (data.data.code === 200) {
                        this.$message({type: 'success', message: '操作成功！'});
                        this.detail.dialogVisible = false;
                        this.getList();
                    }
                }).catch(res => {
                    if (res.data.message === "user already exists") {
                        this.$message.error('用户名已存在！');
                    }
                });
            },
            modify(idObj) {
                this.detail.dialogVisible = true;
                this.hideOrShowController.passwordShow = false;
                this.hideOrShowController.confirmPasswordShow = false;
                this.currentUrl = this.modifyUrl;
                this.getDeparts();
                this.axios.get("/intelligentCommunity/user/getUserById", {
                    params: {
                        id: idObj
                    }
                }).then(res => {
                    if (res.data.code == 200) {
                        this.detail.id = res.data.details.data.id;
                        this.detail.name = res.data.details.data.name;
                        this.detail.username = res.data.details.data.username;
                        this.detail.password = '';
                        this.detail.confirmPassword = '';
                        this.detail.tel = res.data.details.data.tel;
                        this.detail.departId = res.data.details.data.departId;
                    }
                });
            },
            del() {
                if(this.selectedIds.length == 0){
                    return;
                }
                this.$confirm('确定要删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.axios.post("/intelligentCommunity/user/deleteUsers", this.selectedIds).then(res => {
                        if (res.data.code == 200) {
                            this.$message({type: 'success', message: '删除成功！'});
                            this.getList();
                        } else {
                            this.$message.error("删除失败！")
                        }
                    }).catch(res => {
                        this.$message.error("删除失败！");
                    });
                })
            }
        }
    }
</script>

<style>

    .userList .el-dialog__body {
        height: 68%;
        padding: 2rem 1rem 0;
    }
    .userList .el-dialog{
        height: 60%;
        margin-top:  22vh!important;
    }
    .userList .el-dialog__header{
        padding:1.5rem 1rem .5rem ;

    }

    /*.userList .el-dialog__headerbtn{*/
    /*     display: none;*/
    /* }*/
</style>
