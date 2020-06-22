<template>
    <div class="commonDetail">
        <div class="commonHead">
            <div class="goback" @click="goback">
                <img src="@/assets/img/toleft.png" alt="">
                <p>返回</p>
            </div>
            <div class="title">
                评议详情
            </div>
        </div>
        <div class="formMain">
            <el-form :inline="true" :model="form" class="form">
                <el-form-item label="标题">
                    <el-input v-model="form.title" placeholder="标题" disabled></el-input>
                </el-form-item>

                <el-form-item label="组织名字">
                    <el-input v-model="form.departName" placeholder="组织名字" disabled></el-input>
                </el-form-item>

                <el-form-item label="分类">
                    <el-input v-model="form.type" placeholder="分类" disabled></el-input>
                </el-form-item>
                <el-form-item label="发布时间">
                    <el-input v-model="form.createDate" placeholder="分类" disabled></el-input>
                </el-form-item>
                <el-form-item label="观看次数">
                    <el-input v-model="form.watchCount" placeholder="分类" disabled></el-input>
                </el-form-item>
                <el-form-item label="评论条数">
                    <el-input v-model="form.comment" placeholder="分类" disabled></el-input>
                </el-form-item>
                <el-form-item label="阅读数(已读/总人数)">
                    <div class="doflex">
                        <el-input v-model="form.reading" placeholder="分类" disabled></el-input>
                        <div style="width:100px;text-align: right;cursor: pointer" @click="openlist(1)">查看详情</div>
                    </div>
                </el-form-item>
                <el-form-item label="点赞次数">
                    <div class="doflex">
                        <el-input v-model="form.likeCount" placeholder="分类" disabled></el-input>
                        <div style="width:100px;text-align: right;cursor: pointer" @click="openlist(2)">查看详情</div>
                    </div>
                </el-form-item>

                <!-- <el-input v-model="form.content" type="textarea" placeholder="内容"></el-input> -->

                <el-form-item label="内容">
                </el-form-item>
                <div v-html="form.content"></div>
            </el-form>

        </div>
        <el-dialog :title="somename" :visible.sync="showlist" @closed="pageNum1=1">
            <div style="padding:0 2rem">
                <el-table :data="gridData">
                    <el-table-column property="name" label="姓名"></el-table-column>
                    <el-table-column property="depart" label="所属党组织"></el-table-column>
                </el-table>
            </div>
            <div class="page">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="total1"
                    :page-size="10"
                    :current-page="currentpage1"
                    @current-change="changepage"
                ></el-pagination>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {
        queryPersonnelListById,
        queryCommentatorsListById
    } from "../../../api/http";
    export default {
        name: "partyOpen_detail",
        data(){
            return{
                form:{
                    loading:false,
                },
                showlist:false,
                somename: "",
                gridData:[],
                total1: 10,
                pageNum1: 1,
                currentpage1: 1,
                s:''
            }
        },
        props:['id'],
        created(){
          this.getdata()
        },
        methods:{

            async queryCommentatorsListById() {
                let res = await queryCommentatorsListById(this.id, this.pageNum1);
                this.gridData = res.details.data;
                this.total1 = res.details.totalCount;
            },
            async queryPersonnelListById() {
                let res = await queryPersonnelListById(this.id, this.pageNum1);
                this.gridData = res.details.data;
                this.total1 = res.details.totalCount;
            },

            goback(){
                this.$emit('goback')
            },
            getdata(){
                this.loading = true;
                this.axios
                    .get(
                        "/intelligentCommunity/manage/publicPartyWork/getPartyWorkDetail/" +this.id
                    )
                    .then(res => {
                        this.loading = false;
                        if (res.data.code === 200) {
                            this.form = res.data.details.data[0];
                            this.form.createDate = this.$d(this.form.createDate).format(
                                "YYYY-MM-DD HH:mm:ss"
                            );
                            this.form.reading =
                                this.form.memberStatus + " / " + this.form.memberStatusCount;
                        }
                    });
            },
            openlist(s) {
                this.s = s
                if (s == 1) {
                    this.somename = "已读人员列表";
                    this.queryCommentatorsListById();
                } else {
                    this.somename = "点赞人员列表";
                    this.queryPersonnelListById();
                }
                this.showlist = true;
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
    }
</script>

<style scoped>

</style>
