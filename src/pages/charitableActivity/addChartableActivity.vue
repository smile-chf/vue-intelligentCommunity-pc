<template>
    <div class="wrap metting">
        <div class="tools">
            <p @click="sure">保存</p>
            <p @click="goback">返回</p>
        </div>
        <div class="list">
            <el-form :inline="true" :model="form" class="form" label-width="30%" @submit.native.prevent>
                <div class="line">
                    <el-form-item label="活动名称">
                        <el-input v-model="form.title" type="textarea" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="活动类型">
                        <el-select v-model="form.type" placeholder="请选择">
                            <el-option
                                v-for="item in activityList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="活动地址">
                        <el-input v-model="form.location" placeholder="请输入"></el-input>
                    </el-form-item>
                </div>
                <div class="line">
                    <el-form-item label="联系方式">
                        <el-input v-model="form.tel" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="举办单位">
                        <el-input v-model="form.company" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="签到类型">
                        <el-select v-model="form.signInType" placeholder="请选择">
                            <el-option
                                v-for="item in signInTypeList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="line">
                    <el-form-item label="报名截止时间">
                        <el-date-picker
                            v-model="form.joinEndDate"
                            value-format="yyyy-MM-dd HH:mm"
                            type="datetime"
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动开始时间">
                        <el-date-picker
                            v-model="form.startDate"
                            value-format="yyyy-MM-dd HH:mm"
                            type="datetime"
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动结束时间">
                        <el-date-picker
                            v-model="form.endDate"
                            value-format="yyyy-MM-dd HH:mm"
                            type="datetime"
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                </div>
                <div class="line">
                    <el-form-item label="招募人数">
                        <el-input v-model="form.peopleCount" type="number" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="招募要求">
                        <el-input v-model="form.require" type="textarea" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="活动内容">
                        <el-input v-model="form.content" type="textarea" placeholder="请输入"></el-input>
                    </el-form-item>
                </div>
                <div class="line">
                    <el-form-item label="获取积分">
                        <el-input v-model="form.points" type="number" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="所属组织">
                        <el-select v-model="form.departId" placeholder="请选择">
                            <el-option
                                v-for="item in departList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="发布人">
                        <el-select v-model="form.memberId" filterable placeholder="请选择">
                            <el-option
                                v-for="item in memberList"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="line">
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
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "addChartableActivity",
        data() {
            return {
                form: {
                    title: '',
                    type: '',
                    location: '',
                    tel: '',
                    company: '',
                    signInType: '',
                    joinEndDate: '',
                    startDate: '',
                    endDate: '',
                    peopleCount: '',
                    require: '',
                    content: '',
                    departId:'',
                    memberId:'',
                    points:''
                },
                imageUrl:'',
                //活动类型
                activityList: [],
                //签到类型
                signInTypeList: [
                    {value: '0', label: '不签到'},
                    {value: '1', label: '扫码签到'},
                    {value: '2', label: '定位签到'},
                    {value: '3', label: '电子签名'},
                    {value: '4', label: '扫码签到、电子签名'},
                    {value: '5', label: '定位签到、电子签名'},
                ],
                //所属组织
                departList:[],
                //发布人
                memberList:[],
            }
        },
        created() {
            this.getpartList()
            this.getdepartList()
            this.getmemberList()
        },
        methods: {
            sure() {
                //    确定添加
                for (let i in this.form){
                    if(!this.form[i]){
                        this.$message({
                            type: 'info',
                            message: '有选项未填或未选!'
                        });
                        return false
                    }
                }
                this.axios
                    .post("/intelligentCommunity/manage/charitableActivity/saveActivity", {
                        title:this.form.title,
                        type:this.form.type.toString(),
                        location:this.form.location,
                        tel:this.form.tel,
                        company:this.form.company,
                        signInType:this.form.signInType,
                        joinEndDate:this.form.joinEndDate,
                        startDate:this.form.startDate,
                        endDate:this.form.endDate,
                        peopleCount:this.form.peopleCount,
                        require:this.form.require,
                        content:this.form.content,
                        departId:this.form.departId.toString(),
                        memberId:this.form.memberId.toString(),
                        points:this.form.points,
                        picPath:this.imageUrl
                    })
                    .then(res => {
                        if (res.data.code === 200) {
                            this.$message({
                                type: 'success',
                                message: '添加成功!'
                            });
                            this.$router.go(-1)
                        }
                    });
            },

            //获取活动类型
            getpartList() {
                this.axios
                    .get("/intelligentCommunity/manage/charitableActivity/getActivityTypeList")
                    .then(res => {
                        if (res.data.code === 200) {
                            let arr = [];
                            let list = res.data.details.list;
                            for (let i = 0; i < list.length; i++) {
                                let json = {}
                                json.value = list[i].id
                                json.label = list[i].name
                                arr.push(json)
                            }
                            this.activityList = arr
                        }
                    });
            },
            //获取组织
            getdepartList() {
                this.axios
                    .get("/intelligentCommunity/manage/partyPhotos/getDepartList")
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
                            this.departList = arr
                        }
                    });
            },
            //获取发布人
            getmemberList() {
                this.axios
                    .get("/intelligentCommunity/manage/party/allMembers")
                    .then(res => {
                        if (res.data.code === 200) {
                            let arr = [];
                            let list = res.data.details.list;
                            for (let i = 0; i < list.length; i++) {
                                let json = {}
                                json.value = list[i].id
                                json.label = list[i].name
                                arr.push(json)
                            }
                            this.memberList = arr
                        }
                    });
            },



            goback() {
                this.$router.go(-1)
            },
            //图片上传后
            handleAvatarSuccess(res, file) {
                this.imageUrl = res.details.path;
                this.$message({
                    type: 'success',
                    message: '图片选取成功!'
                });
            },
        }
    }
</script>

<style scoped>
    .wrap .list .line {
        display: flex;
        /*justify-content: space-between;*/
    }

    .wrap .list .line .el-form-item {
        width: 30%;
    }

    .wrap .list .el-form--inline .el-form-item__content {
        width: 60%;
    }

    .wrap .list .line .el-form-item .el-form-item__label {
        width: 30% !important;
    }

    .wrap .list .el-form-item__content {
        width: 50% !important;
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
