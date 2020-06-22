<template>
    <div class="commonDetail">
        <div class="formMain special">
            <el-form :inline="true" :model="form" class="form">
                <div class="line">
                    <el-form-item label="发布人">
                        <el-select filterable v-model="form.memberId" placeholder="请选择">
                            <el-option
                                v-for="item in peopleList"
                                :key="item.key"
                                :label="item.label"
                                :value="item.key">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="标题">
                        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item label="类型">
                        <el-select filterable v-model="form.type" placeholder="请选择">
                            <el-option
                                v-for="item in typeList"
                                :key="item.key"
                                :label="item.label"
                                :value="item.key">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="可见范围">
                        <el-cascader
                            :options="optionsList"
                            :props="props"
                            v-model="examMembers"
                            collapse-tags
                            clearable>
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="上传图片">
                        <div class="imgBox" v-if="!this.Id">
                            <el-upload
                                action="/intelligentCommunity/ftp/commonsFileUpload"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-success="uploadsuccess"
                                :before-remove="beforremove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                        <div class="imgBox" v-if="this.Id">
                            <el-upload
                                action="/intelligentCommunity/ftp/commonsFileUpload"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :on-success="uploadsuccess"
                                :file-list="imgArr"
                                :before-remove="beforremove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                    </el-form-item>
                </div>
            </el-form>

            <div class="footHander" style="margin-top: 2rem;margin-bottom: 1rem">
                <p class="save footcommon" @click="add">保存</p>
                <p class="cancel footcommon" @click="goback">取消</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "partyPhoto_add",
        data() {
            return {
                form: {
                    memberId: '',
                    title: '',
                    type: '',
                },
                examMembers: [],
                // transdata: [],
                peopleList: [],
                typeList: [],
                imgArr: [],
                dialogImageUrl: '',
                dialogVisible: false,
                optionsList:[],
                props: {multiple: true},
            }
        },
        props:['Id'],
        created() {
            this.getpeoplelist();
            this.getclasslist();
            this.getthreeList();
        },
        methods: {

            //获取人员列表
            //获取三个   组织人员列表
            getthreeList() {
                this.axios
                    .get("/intelligentCommunity/manage/party/getMemberTree")
                    .then(res => {
                        if (res.data.code === 200) {
                            this.optionsList = res.data.details.list;
                            if (this.Id) {
                                //    修改
                                this.modifyData()
                            }
                        }
                    });
            },

            add() {
                if (!this.form.memberId) {
                    this.$message({
                        type: 'info',
                        message: '请选择发布人!'
                    });
                    return false
                }
                if (!this.form.title) {
                    this.$message({
                        type: 'info',
                        message: '请输入标题!'
                    });
                    return false
                }
                if (!this.form.type) {
                    this.$message({
                        type: 'info',
                        message: '请选择类型!'
                    });
                    return false
                }
                if (this.examMembers.length === 0) {
                    this.$message({
                        type: 'info',
                        message: '请选择可见范围!'
                    });
                    return false
                }
                if (this.imgArr.length === 0) {
                    this.$message({
                        type: 'info',
                        message: '请上传图片!'
                    });
                    return false
                }
                let arr1=[];
                for (let i = 0; i < this.examMembers.length; i++) {
                    arr1.push(this.examMembers[i][1])
                }
                if (this.Id) {
                    //    修改
                    let arr = [];
                    for (let i = 0; i < this.imgArr.length; i++) {
                        arr.push(this.imgArr[i].url)
                    }
                    this.axios
                        .post("/intelligentCommunity/manage/partyPhotos/updatePartyPhotos", {
                            id: this.Id,
                            memberId: this.form.memberId,
                            title: this.form.title,
                            type: this.form.type,
                            memberIds: arr1.toString(),
                            filesPath: arr.toString()
                        })
                        .then(res => {
                            if (res.data.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '修改成功!'
                                });
                                this.goback()
                            }
                        });
                } else {
                    //添加
                    this.axios
                        .post("/intelligentCommunity/manage/partyPhotos/savePartyPhotos", {
                            memberId: this.form.memberId,
                            title: this.form.title,
                            type: this.form.type,
                            memberIds: arr1.toString(),
                            filesPath: this.imgArr.toString()
                        })
                        .then(res => {
                            console.log(res)
                            if (res.data.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                });
                                this.goback()
                            }
                        });
                }

            },
            //文件删除之前
            beforremove(file, fileList) {
                if (this.Id) {
                    //    修改
                    let img = file.url
                    for (let i = 0; i < this.imgArr.length; i++) {
                        if (this.imgArr[i].url == img) {
                            this.imgArr.splice(i, 1);
                            break;
                        }
                    }
                } else {
                    //    添加
                    let img = file.response.details.path
                    for (var i = 0; i < this.imgArr.length; i++) {
                        if (this.imgArr[i] == img) {
                            this.imgArr.splice(i, 1);
                            break;
                        }
                    }
                }

            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            uploadsuccess(res, file) {
                if (this.Id) {
                    //    修改
                    let path = res.details.path
                    let uid = file.uid
                    let json = {}
                    json.name = uid
                    json.url = path
                    this.imgArr.push(json)
                } else {
                    //增加
                    let path = res.details.path
                    this.imgArr.push(path)
                }

            },
            getpeoplelist() {
                this.axios
                    .get("/intelligentCommunity/manage/party/allMembers")
                    .then(res => {
                        if (res.status == 200) {
                            let data = res.data.details.list;
                            let arr = [];
                            for (let i = 0; i < data.length; i++) {
                                var json = {};
                                json.key = data[i].id;
                                json.label = data[i].name;
                                arr.push(json)
                            }
                            // this.transdata = arr
                            this.peopleList = arr
                        }
                    })
                    .catch(res => {
                        alert("网络错误")
                    });
            },
            //处理   下拉选择的 回显
            delData(data){
                let allArr=[];
                let resultData=data.split(",").map(Number);
                for (let i = 0; i < this.optionsList.length; i++) {
                    for (let j = 0; j < this.optionsList[i].children.length; j++) {
                        for (let k = 0; k < resultData.length; k++) {
                            if(this.optionsList[i].children[j].value==resultData[k]){
                                let Arr=[];
                                Arr.push(this.optionsList[i].value,resultData[k]);
                                allArr.push(Arr)
                            }
                        }
                    }
                }
                return allArr
            },

            modifyData() {
                this.axios
                    .get("/intelligentCommunity/manage/partyPhotos/getPartyPhotosById/" + this.Id)
                    .then(res => {
                        if (res.data.code === 200) {
                            let form = res.data.details.data.entity;
                            this.examMembers = this.delData(res.data.details.data.ids);
                            // this.examMembers = res.data.details.data.ids.split(",").map(Number)
                            this.form.memberId = form.memberId;
                            this.form.title = form.title;
                            this.form.type = Number(form.type);
                            for (let i = 0; i < res.data.details.data.fileList.length; i++) {
                                let json = {}
                                json.name = res.data.details.data.fileList[i].id
                                json.url = res.data.details.data.fileList[i].path
                                this.imgArr.push(json)
                            }
                        }
                    });
            },
            //获取类型
            getclasslist() {
                this.axios
                    .get("/intelligentCommunity/manage/partyPhotos/getAllPartyPhotosTypeList")
                    .then(res => {
                        if (res.status == 200) {
                            let data = res.data.details.data;
                            let arr = [];
                            for (let i = 0; i < data.length; i++) {
                                var json = {};
                                json.key = data[i].id;
                                json.label = data[i].title;
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
            goback() {
                this.$emit('goback')
            }
        }
    }
</script>

<style scoped>
    /*.form{*/
    /*    padding-top: 1rem;*/
    /*}*/
    /*.el-transfer{*/
    /*    height: 25rem;*/
    /*}*/
    /*.wrap .list .line {*/
    /*    display: flex;*/
    /*    justify-content: space-between;*/
    /*}*/

    /*.wrap .list .line .el-form-item {*/
    /*    width: 30%;*/
    /*}*/

    /*.wrap .list .el-form--inline .el-form-item__content {*/
    /*    width: 60%;*/
    /*}*/

    /*.wrap .list .line .el-form-item .el-form-item__label {*/
    /*    width: 30% !important;*/
    /*}*/

    /*.wrap .list .el-form-item__content {*/
    /*    width: 50% !important;*/
    /*}*/

    .imgBox {
        box-sizing: border-box;
        padding: 0 4.5%;
    }
</style>
