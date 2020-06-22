<template>
    <div class="commonDetail">
        <div class="formMain special">
            <el-form :inline="true" :model="form" class="form" @submit.native.prevent>
                <el-form-item label="类型：">
                    <el-select v-model="form.type">
                        <el-option label="单选" value="0"></el-option>
                        <el-option label="多选" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="题目：">
                    <el-input v-model="form.content" type="textarea" placeholder="请输入问卷题目"></el-input>
                </el-form-item>
                <el-form-item label="分数：">
                    <el-input v-model="form.score" type="number" placeholder="请输入考试分数"></el-input>
                </el-form-item>
                <el-form-item label="选项个数：">
                    <el-select v-model="form.num">
                        <el-option label="1" value="1"></el-option>
                        <el-option label="2" value="2"></el-option>
                        <el-option label="3" value="3"></el-option>
                        <el-option label="4" value="4"></el-option>
                        <el-option label="5" value="5"></el-option>
                        <el-option label="6" value="6"></el-option>
                        <el-option label="7" value="7"></el-option>
                        <el-option label="8" value="8"></el-option>
                    </el-select>
                </el-form-item>
                <div>
                    <el-form-item label="选项：A" v-if="form.num>=1">
                        <el-input v-model="answer.answer1"></el-input>
                    </el-form-item>
                    <el-form-item label="选项：B" v-if="form.num>=2">
                        <el-input v-model="answer.answer2"></el-input>
                    </el-form-item>
                    <el-form-item label="选项：C" v-if="form.num>=3">
                        <el-input v-model="answer.answer3"></el-input>
                    </el-form-item>
                    <el-form-item label="选项：D" v-if="form.num>=4">
                        <el-input v-model="answer.answer4"></el-input>
                    </el-form-item>
                    <el-form-item label="选项：E" v-if="form.num>=5">
                        <el-input v-model="answer.answer5"></el-input>
                    </el-form-item>
                    <el-form-item label="选项：F" v-if="form.num>=6">
                        <el-input v-model="answer.answer6"></el-input>
                    </el-form-item>
                    <el-form-item label="选项：G" v-if="form.num>=7">
                        <el-input v-model="answer.answer7"></el-input>
                    </el-form-item>
                    <el-form-item label="选项：H" v-if="form.num>=8">
                        <el-input v-model="answer.answer8"></el-input>
                    </el-form-item>
                </div>
                <!--                    单选-->
                <el-form-item label="正确答案：" v-if="form.type==0">
                    <el-radio v-model="radio" label="A" v-if="form.num>=1">A</el-radio>
                    <el-radio v-model="radio" label="B" v-if="form.num>=2">B</el-radio>
                    <el-radio v-model="radio" label="C" v-if="form.num>=3">C</el-radio>
                    <el-radio v-model="radio" label="D" v-if="form.num>=4">D</el-radio>
                    <el-radio v-model="radio" label="E" v-if="form.num>=5">E</el-radio>
                    <el-radio v-model="radio" label="F" v-if="form.num>=6">F</el-radio>
                    <el-radio v-model="radio" label="G" v-if="form.num>=7">G</el-radio>
                    <el-radio v-model="radio" label="H" v-if="form.num>=8">H</el-radio>
                </el-form-item>
                <!--                    多选-->
                <el-form-item label="正确答案：" v-if="form.type==1">
                    <el-checkbox v-model="check.check1" v-if="form.num>=1">A</el-checkbox>
                    <el-checkbox v-model="check.check2" v-if="form.num>=2">B</el-checkbox>
                    <el-checkbox v-model="check.check3" v-if="form.num>=3">C</el-checkbox>
                    <el-checkbox v-model="check.check4" v-if="form.num>=4">D</el-checkbox>
                    <el-checkbox v-model="check.check5" v-if="form.num>=5">E</el-checkbox>
                    <el-checkbox v-model="check.check6" v-if="form.num>=6">F</el-checkbox>
                    <el-checkbox v-model="check.check7" v-if="form.num>=7">G</el-checkbox>
                    <el-checkbox v-model="check.check8" v-if="form.num>=8">H</el-checkbox>
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
        name: "exam_config_add",
        data(){
            return{
                form: {
                    type: "",
                    content: "",
                    num: 1,
                    score: ""
                },
                answer: {
                    answer1: "",
                    answer2: "",
                    answer3: "",
                    answer4: "",
                    answer5: "",
                    answer6: "",
                    answer7: "",
                    answer8: ""
                },
                radio: "",
                check: {
                    check1: "",
                    check2: "",
                    check3: "",
                    check4: "",
                    check5: "",
                    check6: "",
                    check7: "",
                    check8: ""
                },
            }
        },
        created(){
            this.form.type = "";
            this.form.content = "";
            this.form.num = 1;
            this.form.score = "";
            this.answer.answer1 = "";
            this.answer.answer2 = "";
            this.answer.answer3 = "";
            this.answer.answer4 = "";
            this.answer.answer5 = "";
            this.answer.answer6 = "";
            this.answer.answer7 = "";
            this.answer.answer8 = "";
        },
        methods:{
            goback(){
              this.$emit('goback')
            },
            sure() {
                //    确定添加
                if (!this.form.type) {
                    this.$message({
                        type: "info",
                        message: "请选择问卷类型!"
                    });
                    return false;
                }
                if (!this.form.content) {
                    this.$message({
                        type: "info",
                        message: "请输入问卷题目!"
                    });
                    return false;
                }
                if (!this.form.score) {
                    this.$message({
                        type: "info",
                        message: "请输入分数!"
                    });
                    return false;
                }
                let optionList = [];
                for (let i in this.answer) {
                    let json = {};
                    if (this.answer[i]) {
                        if (i == "answer1") {
                            json.optionKey = "A";
                            json.optionDescribe = this.answer[i];
                        }
                        if (i == "answer2") {
                            json.optionKey = "B";
                            json.optionDescribe = this.answer[i];
                        }
                        if (i == "answer3") {
                            json.optionKey = "C";
                            json.optionDescribe = this.answer[i];
                        }
                        if (i == "answer4") {
                            json.optionKey = "D";
                            json.optionDescribe = this.answer[i];
                        }
                        if (i == "answer5") {
                            json.optionKey = "E";
                            json.optionDescribe = this.answer[i];
                        }
                        if (i == "answer6") {
                            json.optionKey = "F";
                            json.optionDescribe = this.answer[i];
                        }
                        if (i == "answer7") {
                            json.optionKey = "G";
                            json.optionDescribe = this.answer[i];
                        }
                        if (i == "answer8") {
                            json.optionKey = "H";
                            json.optionDescribe = this.answer[i];
                        }
                        optionList.push(json);
                    }
                }
                if (optionList.length != this.form.num) {
                    this.$message({
                        type: "info",
                        message: "有题目选项未填!"
                    });
                    return false;
                }
                if (this.form.type == 1) {
                    //    多选
                    let arr = [];
                    for (let i in this.check) {
                        if (i == "check1" && this.check[i]) {
                            arr.push("A");
                        }
                        if (i == "check2" && this.check[i]) {
                            arr.push("B");
                        }
                        if (i == "check3" && this.check[i]) {
                            arr.push("C");
                        }
                        if (i == "check4" && this.check[i]) {
                            arr.push("D");
                        }
                        if (i == "check5" && this.check[i]) {
                            arr.push("E");
                        }
                        if (i == "check6" && this.check[i]) {
                            arr.push("F");
                        }
                        if (i == "check7" && this.check[i]) {
                            arr.push("G");
                        }
                        if (i == "check8" && this.check[i]) {
                            arr.push("H");
                        }
                    }
                    if (!arr.length) {
                        this.$message({
                            type: "info",
                            message: "请选择正确答案!"
                        });
                        return false;
                    }
                    this.axios
                        .post("/intelligentCommunity/manage/exam/saveQuestion", {
                            question: this.form.content,
                            type: parseInt(this.form.type),
                            answer: arr.join(),
                            score: parseInt(this.form.score),
                            optionList: optionList
                        })
                        .then(res => {
                            if (res.data.code === 200) {
                                this.$message({
                                    type: "success",
                                    message: "添加成功!"
                                });
                                this.goback()
                            }
                        });
                } else {
                    //    单选
                    if (!this.radio) {
                        this.$message({
                            type: "info",
                            message: "请选择正确答案!"
                        });
                        return false;
                    }
                    this.axios
                        .post("/intelligentCommunity/manage/exam/saveQuestion", {
                            question: this.form.content,
                            type: parseInt(this.form.type),
                            answer: this.radio,
                            score: parseInt(this.form.score),
                            optionList: optionList
                        })
                        .then(res => {
                            if (res.data.code === 200) {
                                this.$message({
                                    type: "success",
                                    message: "添加成功!"
                                });
                                this.goback()
                            }
                        });
                }
            },
        }
    }
</script>

<style scoped>

</style>
