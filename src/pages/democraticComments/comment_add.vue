<template>
    <div class="commonDetail">
        <div class="formMain special">
            <el-form :inline="true" :model="form" class="form" @submit.native.prevent>
                <div class="line">
                    <el-form-item label="标题：">
                        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item label="内容：">
                        <el-input v-model="form.content" type="textarea" placeholder="请输入内容"></el-input>
                    </el-form-item>
                    <el-form-item label="优秀比例：">
                        <el-input v-model="form.ratio" type="number" placeholder="请输入优秀比例"></el-input>
                    </el-form-item>
                </div>
                <div class="line">
                    <el-form-item label="开始时间">
                        <el-date-picker
                            v-model="form.startTime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="datetime"
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束时间">
                        <el-date-picker
                            v-model="form.endTime"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            type="datetime"
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="互评方式">
                        <el-select v-model="form.type" placeholder="请选择">
                            <el-option label="按组织" value='0'></el-option>
                            <el-option label="按人员" value='1'></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="line">
                    <el-form-item label="所属组织">
                        <el-select v-model="form.departId" placeholder="请选择">
                            <el-option
                                v-for="item in depart"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="选择可见范围">
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
            <div class="footHander">
                <p class="save footcommon" @click="sure">保存</p>
                <p class="cancel footcommon" @click="goback">取消</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "comment_add",
        data() {
            return {
                props: {multiple: true},

                form: {
                    departId: '',
                    title: '',
                    content: '',
                    startTime: '',
                    endTime: '',
                    ratio: '',
                    type: '',
                },
                depart: [],
                examMembers: [],
                transdata: [],
                optionsList: []
            }
        },
        props:['Id'],
        created() {
            this.getpartList();
            this.getpeoplelist();
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
                                this.modifyData()
                            }
                        }
                    });
            },
            //处理   下拉选择的 回显
            delData(data){
                let allArr=[];
                let resultData=data.map(Number);
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
                    .get("/intelligentCommunity/manage/evaluate/getById/" + this.Id)
                    .then(res => {
                        if (res.data.code === 200) {
                            let form = res.data.details.data.entity;
                            let list = res.data.details.data.list;
                            this.form.departId = form.departId;
                            this.form.title = form.title;
                            this.form.content = form.content;
                            this.form.startTime = form.startTime;
                            this.form.endTime = form.endTime;
                            this.form.ratio = form.ratio;
                            this.form.type = form.type.toString();
                            this.examMembers =this.delData(list);
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
                            this.transdata = arr
                        }
                    })
                    .catch(res => {
                        alert("网络错误")
                    });
            },

            sure() {
                let arr=[];
                //    保存
                for (let i in this.form) {
                    if (!this.form[i]) {
                        this.$message({
                            type: 'info',
                            message: '有选项未填!'
                        });
                        return false
                    }
                }
                if (this.examMembers.length == 0) {
                    this.$message({
                        type: 'info',
                        message: '请选择可见范围!'
                    });
                    return false
                }
                if (this.examMembers.length <= 1) {
                    this.$message({
                        type: 'info',
                        message: '可见范围人数不能少于两个人!'
                    });
                    return false
                }
                for (let i = 0; i < this.examMembers.length; i++) {
                    arr.push(this.examMembers[i][1])
                }
                if (this.Id) {
                    //    修改
                    this.axios
                        .post("/intelligentCommunity/manage/evaluate/updateRecord/" + arr.toString(), {
                            id: this.Id,
                            departId: this.form.departId,
                            title: this.form.title,
                            content: this.form.content,
                            startTime: this.form.startTime,
                            endTime: this.form.endTime,
                            ratio: this.form.ratio,
                            type: this.form.type,
                        })
                        .then(data => {
                            if (data.data.code === 200) {
                                console.log(data)
                                this.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                });
                                this.goback()
                            }
                        }).catch(e => {
                        this.$message({
                            type: 'info',
                            message: '网络错误，添加失败!'
                        });
                    });
                } else {
                    //添加
                    this.axios
                        .post("/intelligentCommunity/manage/evaluate/addRecord/" + arr.toString(), {
                            departId: this.form.departId,
                            title: this.form.title,
                            content: this.form.content,
                            startTime: this.form.startTime,
                            endTime: this.form.endTime,
                            ratio: this.form.ratio,
                            type: this.form.type,
                        })
                        .then(data => {
                            if (data.data.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                });
                                this.goback()
                            }
                        }).catch(e => {
                        this.$message({
                            type: 'info',
                            message: '网络错误，添加失败!'
                        });
                    });
                }

            },
            goback() {
                this.$emit('goback')
            },
        }
    }
</script>

<style scoped>
    .wrap .list .line {
        display: flex;
    }

    .wrap .list .line .el-form-item {
        width: 30%;
    }

    .wrap .list .line .el-select {
        width: 100%;
    }

    .form {
        margin-top: 1rem;
    }
</style>
