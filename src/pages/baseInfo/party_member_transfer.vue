<template>
    <div class="wrap partymembertransfer">
        <div v-if="!isShow" class="list">
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
                </div>
            </div>
            <el-table :data="tableData" style="width: 100%" v-loading="loading" @selection-change="handleChange">
                <el-table-column type="selection" width="100"></el-table-column>
                <el-table-column prop="name" label="姓名" width="100"></el-table-column>
                <el-table-column prop="idCardNum" label="身份证号" width="180"></el-table-column>
                <el-table-column prop="gender" :formatter="usegender" label="性别" width="100"></el-table-column>
                <el-table-column prop="nationality" label="民族" width="100"></el-table-column>
                <el-table-column prop="depart" label="所在组织" :show-overflow-tooltip='true' width="400"></el-table-column>
                <el-table-column prop="age" label="年龄" width="100"></el-table-column>
                <el-table-column prop="cellNum" label="手机号码" width="180"></el-table-column>
                <el-table-column fixed="right" label="操作" width="300">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row.id)" type="text" size="small">详情</el-button>
                        <el-button @click="modify(scope.row.id)" type="text" size="small">转移</el-button>
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
        <party_member_transfer_detail @goback="goback" :id="id" v-if="isShow"></party_member_transfer_detail>
        <!--转移-->
        <el-dialog title="转移组织" :visible.sync="modifyshow" width="30%">
            <!--   头部基本档案 -->
            <el-form :inline="true" :model="modifyform" class="form" @submit.native.prevent>
                <el-form-item label="组织：">
                    <el-select v-model="modifyform.departId" @change="selectGet" placeholder="请选择">
                        <el-option
                            v-for="item in depart"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="handleDetail">
                <p class="close" @click="modifySure()">保存</p>
                <p class="close" @click="modifyclose()">关闭</p>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import party_member_transfer_detail from "./party_member_transfer_detail";
    export default {
        name: "party_member_transfer",
        data() {
            return {
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
                departArr: [],
                modifyform: {
                    departId: '',
                    partyDepart: ''
                },
                modifyId: '',
                depart: []
            };
        },
        created() {
            this.getlist();
            this.getpartList();
        },
        components:{
            party_member_transfer_detail
        },
        methods: {
            goback(){
              this.isShow=false
            },
            // 点击详情
            handleClick(id) {
                this.isShow = true;
                this.id=id;
                return false;
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
            //  转移
            modify(id) {
                this.modifyId = id;
                this.modifyshow = true;
                this.axios.get('/intelligentCommunity/manage/party/queryDepartById/' + id).then(res => {
                    if (res.data.code === 200) {
                        this.modifyform.departId = res.data.details.list[0].departId;
                    }
                })
            },
            modifySure() {
                // 转移确定
                this.axios.post('/intelligentCommunity/manage/party/updateDepartById', {
                    id: this.modifyId,
                    departId: this.modifyform.departId,
                    depart: this.modifyform.partyDepart
                }).then(data => {
                    if (data.data.code === 200) {
                        this.$message.success("修改成功！");
                        this.modifyshow = false;
                        this.getlist();
                    }
                });

            },
            selectGet(vId) {
                let obj = {};
                obj = this.depart.find((item) => {//这里的userList就是上面遍历的数据源
                    return item.value === vId;//筛选出匹配数据
                });
                this.modifyform.partyDepart = obj.label
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
            usegender(a, b, c) {
                if (c == 0) {
                    return '女'
                } else {
                    return '男'
                }
            },
            getpartList() {
                this.axios
                    .get("/intelligentCommunity/manage/partyPhotos/getDepartList")
                    .then(res => {
                        if (res.data.code === 200) {
                            let arr = [];
                            let list = res.data.details.data;
                            for (let i = 0; i < list.length; i++) {
                                let json = {};
                                json.value = list[i].id;
                                json.label = list[i].name;
                                arr.push(json)
                            }
                            this.depart = arr
                        }
                    });
            },
        }
    };
</script>

<style scoped>
    /*.el-button--text {*/
    /*    background-color: brown;*/
    /*    color: #fff;*/
    /*    padding: .5rem .7rem;*/
    /*}*/

    /*.el-form--inline .el-form-item {*/
    /*    width: 100%;*/
    /*    margin-top: 2%;*/
    /*    margin-right: 0;*/
    /*}*/

    /*.el-select--medium {*/
    /*    vertical-align: bottom;*/
    /*}*/

    /*.el-select {*/
    /*    width: 100%;*/
    /*}*/
</style>
