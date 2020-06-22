<template>
    <div class="commonDetail">
        <div class="commonHead">
            <div class="goback" @click="goback">
                <img src="@/assets/img/toleft.png" alt="">
                <p>返回</p>
            </div>
            <div class="title">
                学习详情
            </div>
        </div>
        <div class="formMain">
            <div class="Dswitch">
                <p :class="switchclass==1?'active':''" @click="switchUnit(1)">评论（{{Count1}}）</p>
                <p :class="switchclass==2?'active':''" @click="switchUnit(2)">已学习（{{Count2}}）</p>
                <p :class="switchclass==3?'active':''" @click="switchUnit(3)">未学习（{{Count3}}）</p>
            </div>
            <el-table :data="dialogFormData1" v-show="switchclass==1">
                <el-table-column property="name" label="姓名"></el-table-column>
                <el-table-column property="content" label="评论"></el-table-column>
                <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="checkComment(scope.row.id,scope.row.audit||'')"
                                   :disabled="scope.row.audit==1||''" type="text" size="small">
                            {{scope.row.audit==1?'已通过':'未通过' ||''}}
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-table :data="dialogFormData2" v-show="switchclass==2">
                <el-table-column property="name" label="姓名"></el-table-column>
                <el-table-column property="depart" label="所属组织"></el-table-column>
                <el-table-column property="studyDuration" label="学习时长"></el-table-column>
            </el-table>
            <el-table :data="dialogFormData3" v-show="switchclass==3">
                <el-table-column property="name" label="姓名"></el-table-column>
                <el-table-column property="depart" label="所属组织"></el-table-column>
                <el-table-column property="studyDuration" label="学习时长"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "look_lesson",
        data() {
            return {
                dialogFormData1: [],
                dialogFormData2: [],
                dialogFormData3: [],
                Count1: 0,
                Count2: 0,
                Count3: 0,
                switchclass: 1
            }
        },
        props: ['id'],
        created() {
            this.getdata()
        },
        methods: {
            goback() {
                this.$emit('goback')
            },
            getdata() {
                this.axios.post('/intelligentCommunity/manage/education/queryCountNumInformation', {
                    id: this.id
                }).then(res => {
                    if (res.data.code == 200) {
                        let data = res.data.details.list;
                        console.log(data, this.id)
                        if (data[1][0]) {
                            this.dialogFormData1 = data[1];
                        } else {
                            this.dialogFormData1 = []
                        }
                        this.dialogFormData2 = data[2];
                        this.dialogFormData3 = data[3];
                        this.Count1 = data[0][0].countInformation;
                        this.Count2 = data[0][1].countStudy;
                        this.Count3 = data[0][2].countStudied;
                    }
                })
            },
            switchUnit(type) {
                if (type === 1) {
                    this.switchclass = 1
                } else if (type === 2) {
                    this.switchclass = 2
                } else {
                    this.switchclass = 3
                }
            },

            checkComment(id) {
                this.$alert('是否确认审核通过', '', {
                    confirmButtonText: '确定',
                    callback: action => {
                        this.axios.post('/intelligentCommunity/manage/education/updateAuditById', {
                            id: id,
                            audit: 1
                        }).then(res => {
                            if (res.data.code == 200) {
                                this.$message({
                                    type: 'success',
                                    message: '审核通过'
                                });
                                this.lookMore()
                            }
                        })

                    }
                });
            },
        }
    }
</script>

<style scoped>
    .Dswitch {
        display: flex;
        height: 2.2rem;
        border-bottom: 1px solid #f6f6f6;
    }

    .Dswitch .active {
        color: #E92525;
        position: relative;
    }

    .Dswitch .active::after {
        content: '';
        display: block;
        width: 1.6rem;
        height: .1rem;
        background: #E92525;
        position: absolute;
        bottom: 0;
        left: 44%;
    }

    .Dswitch p {
        font-size: .8rem;
        color: #6F6F6F;
        width: 10rem;
        line-height: 2.2rem;
        text-align: center;
        cursor: pointer;
    }
</style>
