<template>
    <div class="commonDetail">
        <div class="formMain special">

            <el-form :inline="true" :model="form" class="form" style="margin-top: 0" >
                <el-form-item label="活动日期">
                    <el-date-picker
                        v-model="form.conferenceDate"
                        value-format="yyyy-MM-dd"
                        type="date"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="开始时间">
                    <el-time-picker
                        v-model="form.beginTime"
                        value-format='HH:mm'
                        format='HH:mm'
                        placeholder="任意时间点">
                    </el-time-picker>
                </el-form-item>
                <el-form-item label="结束时间">
                    <el-time-picker
                        v-model="form.endTime"
                        value-format='HH:mm'
                        format='HH:mm'
                        placeholder="任意时间点">
                    </el-time-picker>
                </el-form-item>

                <el-form-item label="活动地点">
                    <el-select v-model="form.locationId" placeholder="请选择">
                        <el-option
                            v-for="item in siteList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属组织">
                    <el-select v-model="form.partyDepartId" @change="selectGet" placeholder="请选择">
                        <el-option
                            v-for="item in depart"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="参与率">
                    <el-input v-model="form.attendRate" type="number" placeholder="请输入"></el-input>
                </el-form-item>

                <el-form-item label="主题">
                    <el-input v-model="form.subject" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="详情">
                    <el-input v-model="form.topic" type="textarea" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="活动要求">
                    <el-input v-model="form.require" type="textarea" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="活动签到">
                    <el-select v-model="form.punchType" placeholder="请选择">
                        <el-option
                            v-for="item in meetingpunch"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="发布人">
                    <el-select v-model="form.sponsorId" filterable placeholder="请选择">
                        <el-option
                            v-for="item in options"
                            :key="item.key"
                            :label="item.label"
                            :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="主持人">
                    <el-cascader
                        :options="optionsList"
                        :props="{multiple: false}"
                        v-model="form.hostIds"
                        collapse-tags
                        clearable>
                    </el-cascader>
                </el-form-item>

                <el-form-item label="参与人">
                    <el-cascader
                        :options="optionsList"
                        :props="props"
                        collapse-tags
                        v-model="form.attendIds"
                        clearable>
                    </el-cascader>
                </el-form-item>
                <el-form-item label="活动图片：" v-if="!this.Id">
                    <el-upload
                        action="/intelligentCommunity/ftp/commonsFileUpload"
                        :on-preview="handlePictureCardPreview"
                        list-type="picture-card"
                        :on-success="handleAvatarSuccess"
                        :limit="3"
                        :on-exceed="overlimit"
                        :before-remove="beforremove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>

                </el-form-item>
                <el-form-item label="活动图片：" v-if="this.Id">
                    <el-upload
                        action="/intelligentCommunity/ftp/commonsFileUpload"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-success="handleAvatarSuccess"
                        :file-list="imgArr"
                        :limit='3'
                        :on-exceed="overlimit"
                        :before-remove="beforremove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
            </el-form>
            <div class="footHander">
                <p class="save footcommon" @click="sure">保存</p>
                <p class="cancel footcommon" @click="goback">取消</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "partyActiveAdd",
        data() {
            return {
                props: {multiple: true},
                form: {
                    sponsorId: '',
                    // type: '',
                    conferenceDate: '',
                    beginTime: '',
                    endTime: '',
                    locationId: '',
                    partyDepartId: '',
                    partyDepart: '',
                    attendRate: '',
                    subject: '',
                    topic: '',
                    require: '',
                    punchType: '',
                    // isSubmitNote: '',
                    hostIds: [],
                    attendIds: [],
                    // noteTakerIds: [],
                },
                imageUrl: '',
                //分类
                istrue: '',
                // classifyList: [],
                meetingpunch: [
                    {value: '0', label: '不签到'},
                    {value: '1', label: '扫码签到'},
                    {value: '2', label: '定位签到'},
                    {value: '3', label: '电子签名'},
                    {value: '4', label: '扫码签到、电子签名'},
                    {value: '5', label: '定位签到、电子签名'},
                ],
                //会议地址
                siteList: [],
                //    组织
                depart: [],
                //主持人  等列表
                options: [],
                optionsList: [],
                dialogVisible: false,
                dialogImageUrl: [],
                imgArr: []
            }
        },
        props: ['Id'],
        created() {
            this.getlocation();
            this.getpartList();
            this.gethostList();
            this.getthreeList();
        },
        mounted() {

        },
        methods: {
            overlimit(files, fileList) {
                this.$message.info('只能上传最多三张图片')
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
                console.log(file)
            },

            beforremove(file, fileList) {
                if (this.Id) {
                    //    修改
                    let img = file.url;
                    for (let i = 0; i < this.imgArr.length; i++) {
                        if (this.imgArr[i].url == img) {
                            this.imgArr.splice(i, 1);
                            break;
                        }
                    }
                } else {
                    //    添加
                    let img = file.response.details.path;
                    for (var i = 0; i < this.imgArr.length; i++) {
                        if (this.imgArr[i] == img) {
                            this.imgArr.splice(i, 1);
                            break;
                        }
                    }
                }
            },

            //修改的回显
            modifyDate() {

                // this.form.hostIds=[[2,4],[2,100],[2,108]];
                this.axios
                    .get("/intelligentCommunity/manage/partyEventDay/conference/" + this.Id)
                    .then(res => {
                        if (res.data.code === 200) {
                            let data = res.data.details.data;
                            this.form.sponsorId = data.sponsorId;
                            this.form.conferenceDate = data.conferenceDate;
                            this.form.beginTime = data.beginTime;
                            this.form.endTime = data.endTime;
                            this.form.locationId = data.locationId;
                            this.form.partyDepartId = data.partyDepartId;
                            this.form.partyDepart = data.partyDepart;
                            this.form.attendRate = data.attendRate;
                            this.form.subject = data.subject;
                            this.form.topic = data.topic;
                            this.form.require = data.require;
                            this.form.punchType = data.punchType.toString();//特殊回显
                            // this.form.isSubmitNote = data.isSubmitNote.toString();
                            this.form.hostIds = this.delHost(data.hostIds);
                            this.form.attendIds = this.delData(data.attendIds);
                            if (data.topicPic) {
                                let arr = [];
                                let arr1 = JSON.parse(data.topicPic);
                                for (let i = 0; i < arr1.length; i++) {
                                    arr.push({url: arr1[i]})
                                }
                                this.imgArr = arr
                            }
                        }
                    });
            },


            //处理   下拉选择的 回显
            delData(data) {
                let allArr = [];
                let resultData = data.split(",").map(Number);
                for (let i = 0; i < this.optionsList.length; i++) {
                    for (let j = 0; j < this.optionsList[i].children.length; j++) {
                        for (let k = 0; k < resultData.length; k++) {
                            if (this.optionsList[i].children[j].value == resultData[k]) {
                                let Arr = [];
                                Arr.push(this.optionsList[i].value, resultData[k]);
                                allArr.push(Arr)
                            }
                        }
                    }
                }
                return allArr
            },
            //单独处理   主持人回显
            delHost(data) {
                let allArr = [];
                let resultData = data.split(",").map(Number);
                // console.log(data,resultData)
                for (let i = 0; i < this.optionsList.length; i++) {
                    for (let j = 0; j < this.optionsList[i].children.length; j++) {
                        for (let k = 0; k < resultData.length; k++) {
                            if (this.optionsList[i].children[j].value == resultData[k]) {
                                let Arr = [];
                                Arr.push(this.optionsList[i].value, resultData[k]);
                                allArr.push(Arr)
                            }
                        }
                    }
                }
                return allArr[0]
            },
            sure() {
                let arr = [];
                for (let i = 0; i < this.imgArr.length; i++) {
                    arr.push(this.imgArr[i].url)
                }
                // console.log(arr)
                // return false
                // 确认添加
                let arr1 = [];
                let arr2 = [];

                for (let key in this.form) {
                    if (!this.form[key]) {
                        this.$message({
                            type: 'info',
                            message: '有选项未填或未选!'
                        });
                        return false
                    }
                }
                if (this.form.hostIds.length == 0) {
                    this.$message({
                        type: 'info',
                        message: '有选项未填或未选!'
                    });
                    return false
                }
                // if (arr.length == 0) {
                //     this.$message({
                //         type: 'info',
                //         message: '有上传图片!'
                //     });
                //     return false
                // }

                // for (let i = 0; i < this.form.hostIds.length; i++) {
                //     arr1.push(this.form.hostIds[i][1])
                // }
                arr1.push(this.form.hostIds[1]);
                for (let i = 0; i < this.form.attendIds.length; i++) {
                    arr2.push(this.form.attendIds[i][1])
                }

                if (this.Id) {
                    //    修改
                    this.axios
                        .post("/intelligentCommunity/manage/partyEventDay/updateConference", {
                            id: this.Id,
                            sponsorId: this.form.sponsorId,
                            conferenceDate: this.form.conferenceDate,
                            beginTime: this.form.beginTime,
                            endTime: this.form.endTime,
                            locationId: this.form.locationId,
                            partyDepart: this.form.partyDepart,
                            partyDepartId: this.form.partyDepartId,
                            attendRate: this.form.attendRate,
                            subject: this.form.subject,
                            topic: this.form.topic,
                            topicPic: JSON.stringify(arr),
                            require: this.form.require,
                            hostIds: arr1.toString(),
                            attendIds: arr2.toString(),
                            // noteTakerIds: arr3.toString(),
                            punchType: this.form.punchType,
                            // isSubmitNote: this.istrue
                        })
                        .then(res => {
                            console.log(res)
                            if (res.data.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '修改成功!'
                                });
                                this.goback()
                            }
                        });
                } else {
                    this.axios
                        .post("/intelligentCommunity/manage/partyEventDay/saveConference", {
                            sponsorId: this.form.sponsorId,
                            // type: this.form.type,
                            conferenceDate: this.form.conferenceDate,
                            beginTime: this.form.beginTime,
                            endTime: this.form.endTime,
                            locationId: this.form.locationId,
                            partyDepart: this.form.partyDepart,
                            partyDepartId: this.form.partyDepartId,
                            attendRate: this.form.attendRate,
                            subject: this.form.subject,
                            topic: this.form.topic,
                            topicPic: JSON.stringify(arr),
                            require: this.form.require,
                            hostIds: arr1.toString(),
                            attendIds: arr2.toString(),
                            // noteTakerIds: arr3.toString(),
                            punchType: this.form.punchType,
                            // isSubmitNote: this.istrue
                        })
                        .then(res => {
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
            //获取地址
            getlocation() {
                this.axios
                    .get("/intelligentCommunity/manage/party/conference/allLocation")
                    .then(res => {
                        if (res.data.code === 200) {
                            let arr = [];
                            let list = res.data.details.list;
                            for (let i = 0; i < list.length; i++) {
                                let json = {};
                                json.value = list[i].id;
                                json.label = list[i].name;
                                arr.push(json)
                            }
                            this.siteList = arr
                        }
                    });
            },

            //获取组织
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
            //获取主持人列表
            gethostList() {
                this.axios
                    .get("/intelligentCommunity/manage/party/allMembers")
                    .then(res => {
                        if (res.data.code === 200) {
                            let arr = [];
                            let list = res.data.details.list;
                            for (let i = 0; i < list.length; i++) {
                                let json = {};
                                json.key = list[i].id;
                                json.label = list[i].name;
                                arr.push(json)
                            }
                            this.options = arr;
                        }
                    });
            },
            //获取三个   组织人员列表
            getthreeList() {
                this.axios
                    .get("/intelligentCommunity/manage/party/getMemberTree")
                    .then(res => {
                        if (res.data.code === 200) {
                            this.optionsList = res.data.details.list;
                            if (this.Id) {
                                //    修改
                                this.modifyDate()
                            }
                        }
                    });
            },
            selectGet(vId) {
                let obj = {};
                obj = this.depart.find((item) => {//这里的userList就是上面遍历的数据源
                    return item.value === vId;//筛选出匹配数据
                });
                this.form.partyDepart = obj.label
            },
            //图片上传后
            handleAvatarSuccess(res, file) {
                this.imgArr.push({
                    url: res.details.path,
                    name: res.details.name
                });
                this.$message({
                    type: 'success',
                    message: '图片选取成功!'
                });
            },
            //获取参会人列表
            goback() {
                this.$emit('goback')
                console.log(1)
            }
        }
    }
</script>

<style scoped>
    /*.form {*/
    /*    margin-top: 1rem;*/
    /*}*/

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

    .trans_box {
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0 2%;
        height: 17rem;
    }

    .trans_box .unit {
        width: 30%;
        height: 100%;
    }

    .trans_box .el-transfer {
        width: 100%;
        height: 100%;
    }

    .trans_box .el-transfer .el-transfer-panel {
        width: 30% !important;
        height: 100% !important;
    }



    .el-upload {
        width: 5rem;
        height: 5rem;
    }



</style>
