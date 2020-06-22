<template>
    <div class="commonDetail">

        <div class="formMain special">
            <el-form :inline="true" :model="form" class="form">
                <div class="line">
                    <el-form-item label="标题">
                        <el-input v-model="form.title" placeholder="标题"></el-input>
                    </el-form-item>
                    <el-form-item label="考试时长">
                        <el-input v-model="form.duration" type="number" placeholder="考试时长"></el-input>
                    </el-form-item>
                    <el-form-item label="总分">
                        <el-input v-model="form.totalPoints" type="number" placeholder="总分"></el-input>
                    </el-form-item>
                </div>
                <div class="line">
                    <el-form-item label="及格分">
                        <el-input v-model="form.passingScore" type="number" placeholder="及格分"></el-input>
                    </el-form-item>
                    <el-form-item label="题目数">
                        <el-input v-model="form.questionSize" type="number" placeholder="题目数"></el-input>
                    </el-form-item>
                    <el-form-item label="开始时间">
                        <el-date-picker
                            v-model="form.beginTime"
                            type="datetime"
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                </div>
                <div class="line" style="justify-content: normal;">
                    <el-form-item label="结束时间">
                        <el-date-picker
                            v-model="form.deadline"
                            type="datetime"
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="选择人员">
                        <el-cascader
                            :options="optionsList"
                            :props="props"
                            v-model="examMembers"
                            collapse-tags
                            clearable>
                        </el-cascader>
                    </el-form-item>
                </div>

            </el-form>
            <div class="descript">
                <p>选择题目：</p>
            </div>
            <el-transfer
                filterable
                :titles="['选择','选中']"
                v-model="examTopic"
                :data="transdata2"
                style="margin-top: 1rem"
            >
            </el-transfer>
            <div class="footHander">
                <el-upload
                    class="upload-demo"
                    action="fakeaction"
                    :http-request="uploadfile"
                    :on-success="filesuccess"
                    :show-file-list="false"
                    accept=".xls,.xlsx"
                    :file-list="fileList">
                    <p class="save footcommon" v-if="Id">导入</p>
                </el-upload>
                <p class="save footcommon" @click="add">保存</p>
                <p class="cancel footcommon" @click="goback">取消</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "addExam",
        data() {
            return {
                loading: false,
                form: {
                    title: '',
                    duration: '',
                    totalPoints: '',
                    passingScore: '',
                    questionSize: '',
                    beginTime: '',
                    deadline: '',
                },
                //人数id
                examMembers: [],
                examTopic: [],
                // transdata: [{
                //     key: 1,
                //     label: '数据一'
                // }],
                transdata2: [{
                    key: 1,
                    label: '数据二'
                }],
                fileList: [],
                optionsList: [],
                props: {multiple: true},
                istranf:true
            }
        },
        // inject: ['reload'],
        props:['Id'],
        created() {
            if (!this.Id) {
                //    添加
                this.gettopiclist();
            }
            // this.getpeoplelist();
            this.getthreeList();
        },
        methods: {
            //获取三个   组织人员列表
            getthreeList() {
                this.axios
                    .get("/intelligentCommunity/manage/party/getMemberTree")
                    .then(res => {
                        if (res.data.code === 200) {
                            this.optionsList = res.data.details.list;
                            if (this.Id) {
                                //    修改
                                this.modifyData();
                                this.gettopiclist2();
                            }
                        }
                    });
            },
            delData(data) {
                let allArr = [];
                let resultData = data;
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
            uploadfile(file) {
                let form = new FormData();
                form.append('file', file.file);
                form.append('eid', this.Id);
                this.istranf=false;
                this.axios({
                    method: 'post',
                    data: form,
                    url: '/intelligentCommunity/manage/exam/excelImportQuestion'
                }).then(res => {
                    if (res.data.code == 200) {
                        this.$message.success("导入成功");
                        let _this = this
                        // setTimeout(function () {
                        //     _this.reload()
                        // }, 1000)
                        this.istranf=true;
                    }
                })
            },

            //修改回显
            modifyData() {
                this.axios
                    .get("/intelligentCommunity/manage/exam/getExamById/" + this.Id)
                    .then(res => {
                        if (res.data.code === 200) {
                            let Form = res.data.details.data;
                            this.form.title = Form.title;
                            this.form.duration = Form.duration;
                            this.form.totalPoints = Form.totalPoints;
                            this.form.passingScore = Form.passingScore;
                            this.form.questionSize = Form.questionSize;
                            this.form.beginTime = Form.beginTime;
                            this.form.deadline = Form.deadline;
                            this.examMembers = this.delData(Form.examMemberIds);
                            this.examTopic = Form.questionIds;
                        }
                    });
            },
            add() {
                //保存

                if (this.form.beginTime - this.form.deadline > 0) {
                    this.$message({
                        type: 'info',
                        message: '开始时间超过结束时间'
                    });
                    return false
                }
                if (!this.form.title) {
                    this.$message({
                        type: 'info',
                        message: '请输入标题'
                    });
                    return false
                }
                if (!this.form.duration) {
                    this.$message({
                        type: 'info',
                        message: '请输入考试时长'
                    });
                    return false
                }
                if (!this.form.totalPoints) {
                    this.$message({
                        type: 'info',
                        message: '请输入总分'
                    });
                    return false
                }
                if (!this.form.passingScore) {
                    this.$message({
                        type: 'info',
                        message: '请输入及格分'
                    });
                    return false
                }
                if (!this.form.questionSize) {
                    this.$message({
                        type: 'info',
                        message: '请输入题目数'
                    });
                    return false
                }
                if (!this.form.beginTime) {
                    this.$message({
                        type: 'info',
                        message: '请选择开始时间'
                    });
                    return false
                }
                if (!this.form.deadline) {
                    this.$message({
                        type: 'info',
                        message: '请选择截止时间'
                    });
                    return false
                }
                if (this.examMembers.length === 0) {
                    this.$message({
                        type: 'info',
                        message: '请选择党员'
                    });
                    return false
                }
                // if (this.examTopic.length===0) {
                //     this.$message({
                //         type: 'info',
                //         message: '请选择题目'
                //     });
                //     return false
                // }
                let arr1 = [];
                for (let i = 0; i < this.examMembers.length; i++) {
                    arr1.push(this.examMembers[i][1])
                }
                if (this.Id) {
                    //    修改
                    this.loading = true;
                    this.axios
                        .post("/intelligentCommunity/manage/exam/updateExam", {
                            id: this.Id,
                            title: this.form.title,
                            duration: this.form.duration,
                            totalPoints: this.form.totalPoints,
                            passingScore: this.form.passingScore,
                            questionSize: this.form.questionSize,
                            beginTime: this.getDate(this.form.beginTime),
                            deadline: this.getDate(this.form.deadline),
                            examMemberIds: arr1,
                            questionIds: this.examTopic
                        })
                        .then(res => {
                            this.loading = false;
                            if (res.status == 200) {
                                this.$message({
                                    type: 'success',
                                    message: '添加成功'
                                });
                                this.goback()
                            }
                        })
                        .catch(e => {
                            alert("网络错误")
                        });
                } else {
                    this.loading = true;
                    this.axios
                        .post("/intelligentCommunity/manage/exam/addExam", {
                            title: this.form.title,
                            duration: this.form.duration,
                            totalPoints: this.form.totalPoints,
                            passingScore: this.form.passingScore,
                            questionSize: this.form.questionSize,
                            beginTime: this.getDate(this.form.beginTime),
                            deadline: this.getDate(this.form.deadline),
                            examMemberIds: arr1,
                            questionIds: this.examTopic
                        })
                        .then(res => {
                            this.loading = false;
                            if (res.status == 200) {
                                this.$message({
                                    type: 'success',
                                    message: '添加成功'
                                });
                                this.goback()
                            }
                        })
                        .catch(e => {
                            alert("网络错误")
                        });
                }

            },
            goback() {
                this.$emit('goback')
            },
            getDate(time) {
                const date = new Date(time);
                const Y = date.getFullYear() + '-';
                const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
                const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
                const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
                return Y + M + D + h + m;
            },
            // //穿梭框1
            // getpeoplelist() {
            //     this.loading = true;
            //     this.axios
            //         .get("/intelligentCommunity/manage/party/allMembers", {
            //             params: {
            //                 pageSize: this.pageSize,
            //                 pageNum: this.pageNum
            //             }
            //         })
            //         .then(res => {
            //             this.loading = false;
            //             if (res.status == 200) {
            //                 let data = res.data.details.list;
            //                 let arr = [];
            //                 for (let i = 0; i < data.length; i++) {
            //                     var json = {};
            //                     json.key = data[i].id;
            //                     json.label = data[i].name;
            //                     arr.push(json)
            //                 }
            //                 this.transdata = arr
            //             }
            //         }).catch(res => {
            //         alert("网络错误")
            //     });
            // },
            //穿梭框2
            gettopiclist() {
                this.loading = true;
                this.axios
                    .get("/intelligentCommunity/manage/exam/getNotSelectQuestionList")
                    .then(res => {
                        this.loading = false;
                        if (res.status == 200) {
                            let data = res.data.details.data;
                            let arr = [];
                            for (let i = 0; i < data.length; i++) {
                                var json = {};
                                json.key = data[i].id;
                                json.label = data[i].question;
                                arr.push(json)
                            }
                            this.transdata2 = arr
                        }
                    }).catch(res => {
                    alert("网络错误")
                });
            },
            gettopiclist2() {
                this.loading = true;
                this.axios
                    .get("/intelligentCommunity/manage/exam/getQuestionListByExamId/" + this.Id)
                    .then(res => {
                        this.loading = false;
                        if (res.status == 200) {
                            let data = res.data.details.data;
                            let arr = [];
                            for (let i = 0; i < data.length; i++) {
                                var json = {};
                                json.key = data[i].id;
                                json.label = data[i].question;
                                arr.push(json)
                            }
                            this.transdata2 = arr
                        }
                    }).catch(res => {
                    alert("网络错误")
                });
            }
        }
    }
</script>

<style scoped>


    .footHander {
        margin-top: 1rem;
    }
</style>
