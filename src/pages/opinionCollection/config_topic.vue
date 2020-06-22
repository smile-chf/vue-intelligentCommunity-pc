<template>
    <div class="commonDetail">
        <div class="formMain special">
            <el-form :inline="true" :model="form" class="form">
                <div class="line">
                    <el-form-item label="组织">
                        <el-select v-model="form.name" @change="changevalue" placeholder="请选择">
                            <el-option
                                v-for="item in partyArr"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="line">
                    <el-form-item label="标题">
                        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
                    </el-form-item>
                </div>
                <div class="line">
                    <el-form-item label="结束时间">
                        <el-date-picker
                            v-model="form.endDate"
                            type="datetime"
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                </div>
            </el-form>
            <div class="descript">
                <p>选择题目：</p>
            </div>
            <el-transfer
                filterable
                :titles="['选择','选择']"
                v-model="examMembers"
                :data="transdata"
                v-if="istrans"
            >
            </el-transfer>
            <div class="footHander">
                <el-upload
                    class="upload-demo"
                    action="fakeaction"
                    :http-request="uploadfile"
                    :on-success="filesuccess"
                    :show-file-list="false"
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
        name: "config_topic",
        data() {
            return {
                istrans: true,
                loading: false,
                partyArr: [],
                getvalueid: '',
                form: {
                    name: '',
                    title: '',
                    endDate: ''
                },
                //人数id
                examMembers: [],
                transdata: [{
                    key: 1,
                    label: '数据一'
                }],
                fileList: [],
            }
        },
        props: ['Id'],
        // inject:['reload'],
        created() {
            if (this.Id) {
                //    修改
                this.modifyData();
                this.getModifyPeopleList(this.Id)
            } else {
                this.getpeoplelist()
            }
            this.axios
                .get("/intelligentCommunity/manage/partyPhotos/getDepartList")
                .then(res => {
                    this.loading = false;
                    if (res.data.code === 200) {
                        this.partyArr = res.data.details.data
                    }
                });
        },
        methods: {
            //导入
            uploadfile(file) {
                let form = new FormData();
                form.append('file', file.file);
                form.append('oid', this.Id);
                this.istrans = false;
                this.axios({
                    method: 'post',
                    data: form,
                    url: '/intelligentCommunity/manage/opinion/excelImportQuestion'
                }).then(res => {
                    if (res.data.code == 200) {
                        this.$message.success("导入成功");
                        this.istrans = true;
                        // setTimeout(function () {
                        //     _this.reload()
                        // },1000)
                    }
                })
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

            modifyData() {
                this.axios
                    .get("/intelligentCommunity/manage/opinion/getOpinionById/" + this.Id)
                    .then(res => {
                        if (res.data.code === 200) {
                            let form = res.data.details.data.opinion;
                            let list = res.data.details.data.ids
                            this.form.title = form.title
                            this.form.endDate = form.endDate
                            this.form.name = form.departId
                            this.getvalueid = form.departId
                            this.examMembers = list.split(",").map(Number)
                        }
                    });
            },
            add() {
                //保存
                if (!this.getvalueid) {
                    this.$message({
                        type: 'info',
                        message: '请选择组织!'
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
                if (!this.form.endDate) {
                    this.$message({
                        type: 'info',
                        message: '请选择截止时间!'
                    });
                    return false
                }
                if (this.examMembers.length == 0) {
                    this.$message({
                        type: 'info',
                        message: '请选择题目!'
                    });
                    return false
                }
                if (this.Id) {
                    //    修改
                    this.axios
                        .post("/intelligentCommunity/manage/opinion/updateOpinion", {
                            id: this.Id,
                            title: this.form.title,
                            endDate: this.getDate(this.form.endDate),
                            departId: this.getvalueid,
                            questionIds: this.examMembers
                        })
                        .then(res => {
                            if (res.status == 200) {
                                this.$message({
                                    type: 'success',
                                    message: '修改成功'
                                });
                                this.goback()
                            }
                        })
                        .catch(e => {
                            this.$message({
                                type: 'info',
                                message: '网络错误，添加失败'
                            });
                        });
                } else {
                    //    增加
                    this.axios
                        .post("/intelligentCommunity/manage/opinion/saveOpinion", {
                            title: this.form.title,
                            endDate: this.getDate(this.form.endDate),
                            departId: this.getvalueid,
                            questionIds: this.examMembers
                        })
                        .then(res => {
                            if (res.status == 200) {
                                this.$message({
                                    type: 'success',
                                    message: '添加成功'
                                });
                                this.goback()
                            }
                        })
                        .catch(e => {
                            this.$message({
                                type: 'info',
                                message: '网络错误，添加失败'
                            });
                        });
                }

            },
            changevalue(val) {
                this.getvalueid = val
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
                const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
                const s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
                return Y + M + D + h + m + s;
            },
            getpeoplelist() {
                this.loading = true;
                this.axios
                    .get("/intelligentCommunity/manage/opinion/getNotSelectOpinionQuestionList")
                    .then(res => {
                        this.loading = false;
                        if (res.status == 200) {
                            let data = res.data.details.data;
                            let arr = [];
                            for (let i = 0; i < data.length; i++) {
                                var json = {};
                                json.key = data[i].id;
                                json.label = data[i].content;
                                arr.push(json)
                            }
                            this.transdata = arr
                        }
                    }).catch(res => {
                    alert("网络错误")
                });
            },
            getModifyPeopleList(id) {
                this.axios
                    .get("/intelligentCommunity/manage/opinion/getQuestionListByOpinionId/" + id)
                    .then(res => {
                        if (res.status == 200) {
                            let data = res.data.details.data;
                            let arr = [];
                            for (let i = 0; i < data.length; i++) {
                                var json = {};
                                json.key = data[i].id;
                                json.label = data[i].content;
                                arr.push(json)
                            }
                            this.transdata = arr
                        }
                    }).catch(res => {
                    alert("网络错误")
                });
            }
        }
    }
</script>

<style scoped>
    .wrap .list .line {
        display: flex;
        justify-content: space-between;
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

    .el-transfer {
        height: 25rem;
    }

    .footHander {
        margin-top: 1rem;
        box-sizing: border-box;
        padding-left: 11%;
    }
</style>
