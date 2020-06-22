<template>
    <div class="wrap">
        <div class="tools">
            <p @click="add()">增加</p>
            <p @click="opendelete()">删除</p>
        </div>
        <div class="list">
            <el-table :data="tableData" style="width: 100%" @selection-change="handleChange">
                <el-table-column type="selection" width="120"></el-table-column>
                <el-table-column prop="name" label="标题"></el-table-column>
                <el-table-column prop="typeName" label="类型"></el-table-column>
                <el-table-column prop="detail" label="描述"></el-table-column>
                <el-table-column prop="createTime" :formatter="gettime" label="创建时间"></el-table-column>
                <el-table-column fixed="right" label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button @click="opendetail(scope.row.id)" type="text" size="small">修改</el-button>
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
        <div class="detail" v-show="isshow">
            <div class="small_detail_wrap">
                <div class="handle">
                    <p class="close" @click="sure()">保存</p>
                    <p class="close" @click="close()">关闭</p>
                </div>
                <!--   头部基本档案 -->
                <el-form :inline="true" :model="form" class="form" @submit.native.prevent>
                    <el-form-item label="标题：">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select v-model="form.typeId" filterable placeholder="请选择">
                            <el-option
                                v-for="item in typeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="描述：">
                        <el-input type="textarea" v-model="form.detail"></el-input>
                    </el-form-item>
                    <el-form-item label="上传图片">
                        <el-upload
                            class="avatar-uploader"
                            action="/intelligentCommunity/ftp/commonsFileUpload"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                        >
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "itemList",
        data(){
            return{
                isshow:false,
                loading: false,
                currentPage: 1, //当前页码
                total: 0, //数据总条数
                pageSize: "10", //每条页数
                pageNum: "1", ////当前页码
                tableData:[],
                idArr:[],
                form:{
                    name:'',
                    detail:'',
                    typeId:'',
                },
                imageUrl:'',
                isAdd:0,
                classId:'',
                typeList:[]
            }
        },
        created() {
            this.getlist()
            this.gettypeList()
        },
        methods:{
            handleChange(val){
                let arr=[];
                for (let i = 0; i < val.length; i++) {
                    arr.push(val[i].id)
                }
                this.idArr = arr
            },
            add(){
                //    增加
                this.form.name='';
                this.form.detail='';
                this.form.typeId='';
                this.imageUrl='';
                this.isshow=true;
                this.isAdd=1;
            },
            opendetail(id){
                //    修改
                this.isAdd=0;
                this.classId=id;
                this.isshow=true;
                this.axios.get('/intelligentCommunity/manage/activityProject/getProjectDetail/'+id).then(res=>{
                    if (res.data.code==200){
                        this.form.name=res.data.details.data.name
                        this.form.detail=res.data.details.data.detail
                        this.form.typeId=res.data.details.data.typeId
                        this.imageUrl=res.data.details.data.pic
                    }
                })
            },
            sure(){
                //确定
                if(!this.form.name){
                    this.$message({
                        type: 'info',
                        message: '请输入标题!'
                    });
                    return false
                }
                if(!this.form.typeId){
                    this.$message({
                        type: 'info',
                        message: '请选择类型!'
                    });
                    return false
                }
                if(!this.form.detail){
                    this.$message({
                        type: 'info',
                        message: '请输入描述!'
                    });
                    return false
                }
                if(this.isAdd==0){
                    // 修改
                    this.axios.post('/intelligentCommunity/manage/activityProject/saveProject',{
                        id:this.classId,
                        name:this.form.name,
                        detail:this.form.detail,
                        typeId:this.form.typeId,
                        pic:this.imageUrl
                    })
                        .then(res=>{
                            if (res.data.code==200){
                                this.$message({
                                    type: 'success',
                                    message: '修改成功!'
                                });
                                this.isshow=false;
                                this.getlist()
                            }
                        })
                }
                if(this.isAdd==1){
                    // 增加
                    this.axios.post('/intelligentCommunity/manage/activityProject/saveProject',{
                        name:this.form.name,
                        detail:this.form.detail,
                        typeId:this.form.typeId,
                        pic:this.imageUrl
                    })
                        .then(res=>{
                            if (res.data.code==200){
                                this.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                });
                                this.isshow=false;
                                this.getlist()
                            }
                        })
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
                        url: '/intelligentCommunity/manage/activityProject/delProject',
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

            close(){
                this.isshow=false
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
            getlist() {
                this.loading = true;
                this.axios
                    .get("/intelligentCommunity/manage/activityProject/getProjectList", {
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
            //获取活动类型
            gettypeList() {
                this.axios
                    .get("/intelligentCommunity/manage/activityProject/getAllProjectTypeList")
                    .then(res => {
                        if (res.data.code === 200) {
                            let arr = [];
                            let list = res.data.details.data;
                            for (let i = 0; i < list.length; i++) {
                                let json = {}
                                json.value = list[i].id
                                json.label = list[i].name
                                arr.push(json)
                            }
                            this.typeList = arr
                        }
                    });
            },
            //图片上传后
            handleAvatarSuccess(res, file) {
                this.imageUrl = res.details.path;
                this.$message({
                    type: 'success',
                    message: '图片选取成功!'
                });
            },
            gettime(a, b, c) {
                var d = new Date(c);
                var y = d.getFullYear();
                var m = d.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                var d = d.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            },
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
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
