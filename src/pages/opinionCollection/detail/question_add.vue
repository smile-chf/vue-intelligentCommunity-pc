<template>
    <div class="commonDetail">
        <div class="formMain special">
            <el-form :inline="true" :model="form" class="form">
                <el-form-item label="类型：">
                    <el-select v-model="form.type">
                        <el-option label="多选" value="1"></el-option>
                        <el-option label="单选" value="2"></el-option>
                        <el-option label="问答" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="内容：">
                    <el-input v-model="form.content" type="textarea" placeholder="请输入问卷题目"></el-input>
                </el-form-item>
                <el-form-item label="选项个数：" v-if="form.type!=='3'">
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
                <div v-if="form.type!=='3'">
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
        name: "question_add",
        data(){
            return{
                form: {
                    type: '',
                    content: '',
                    num: 1,
                },
                answer: {
                    answer1: '',
                    answer2: '',
                    answer3: '',
                    answer4: '',
                    answer5: '',
                    answer6: '',
                    answer7: '',
                    answer8: ''
                },
            }
        },
        props:['id'],
        created(){
            this.form.type = '';
            this.form.content = '';
            this.form.num = 1;
            this.answer.answer1 = '';
            this.answer.answer2 = '';
            this.answer.answer3 = '';
            this.answer.answer4 = '';
            this.answer.answer5 = '';
            this.answer.answer6 = '';
            this.answer.answer7 = '';
            this.answer.answer8 = '';
        },
        methods:{
            goback(){
              this.$emit('goback')
            },
            sure() {
                //    确定添加
                if (!this.form.type) {
                    this.$message({
                        type: 'info',
                        message: '请选择问卷类型!'
                    });
                    return false
                }
                if (!this.form.content) {
                    this.$message({
                        type: 'info',
                        message: '请输入问卷题目!'
                    });
                    return false
                }

                if (this.form.type == 3) {
                    this.axios
                        .post("/intelligentCommunity/manage/opinion/saveOpinionQuestion", {
                            type: this.form.type,
                            content: this.form.content
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
                } else {
                    let arr = [];
                    for (let i in this.answer) {
                        if (this.answer[i]) {
                            arr.push(this.answer[i])
                        }
                    }
                    if (arr.length != this.form.num) {
                        this.$message({
                            type: 'info',
                            message: '有题目选项未填!'
                        });
                        return false
                    }
                    this.axios
                        .post("/intelligentCommunity/manage/opinion/saveOpinionQuestion", {
                            type: this.form.type,
                            content: this.form.content,
                            option: arr.toString() + ','
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
        }
    }
</script>

<style scoped>

</style>
