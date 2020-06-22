<template>
    <div class="commonDetail">
        <div class="formMain special">
            <!--            <div class="tools">-->
            <!--                <div class="searchForm"></div>-->
            <!--                <div class="handle">-->
            <!--                    <p @click="sure">保存</p>-->
            <!--                    <p @click="goback">返回</p>-->
            <!--                </div>-->
            <!--            </div>-->
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
                    <!--                    <el-form-item label="内容">-->
                    <!--                        <el-input v-model="form.content" type="textarea" placeholder="请输入内容"></el-input>-->
                    <!--                    </el-form-item>-->
                    <el-form-item label="类型">
                        <el-select v-model="form.type" placeholder="请选择">
                            <el-option
                                v-for="item in classfilyList"
                                :key="item.key"
                                :label="item.label"
                                :value="item.key">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="line">
                    <el-form-item label="允许成员评论">
                        <el-select v-model="form.isComment" placeholder="请选择">
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="0"></el-option>
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
                    <el-form-item label="议题图片">
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
            <!--            <div class="descript">-->
            <!--                <p>选择可见范围：</p>-->
            <!--            </div>-->
            <!--            <el-transfer-->
            <!--                filterable-->
            <!--                :titles="['选择','选择']"-->
            <!--                v-model="examMembers"-->
            <!--                :data="transdata"-->
            <!--            >-->
            <!--            </el-transfer>-->


            <!--富文本编辑器-->
            <div class="contentEdit">
                <p>内容编辑</p>
            </div>
            <div id="wangeditor">
                <div ref="editorElem" style="text-align:left;"></div>
            </div>

            <div class="footHander" style="margin-top: 2rem;margin-bottom: 1rem">
                <p class="save footcommon" @click="sure">保存</p>
                <p class="cancel footcommon" @click="goback">取消</p>
            </div>
        </div>
    </div>
</template>

<script>
    import E from "wangeditor";

    export default {
        name: "partyOpen_add",
        data() {
            return {
                props: {multiple: true},
                optionsList: [],
                examMembers: [],
                transdata: [],
                form: {
                    memberId: '',
                    title: '',
                    content: '',
                    isComment: '',
                    type: ''
                },
                imageUrl: '',
                peopleList: [],
                classfilyList: [],
                editor: null,
                editorContent: ''
            }
        },
        mounted() {
            document.onkeypress = undefined;

            this.editor = new E(this.$refs.editorElem);
            // 编辑器的事件，每次改变会获取其html内容


            this.editor.customConfig.onchange = html => {
                this.editorContent = html;
                // this.catchData(this.editorContent); // 把这个html通过catchData的方法传入父组件
            };
            this.editor.customConfig.uploadImgServer = '/';
            this.editor.customConfig.showLinkImg = false;
            this.editor.customConfig.uploadImgServer = '/intelligentCommunity/ftp/commonsFileUpload'//配置上传到服务器地址
            let that = this;
            this.editor.customConfig.customUploadImg = function (files, insert) {//对上传的图片进行处理，图片上传的方式
                var filess = new FormData();
                filess.append("file", files[0]);
                that.axios({
                    url: "/intelligentCommunity/ftp/commonsFileUpload",
                    method: "POST",
                    data: filess,
                    processData: false,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }).then(res => {
                    let imgurl = res.data.details.path;
                    //这里是对图片格式进行处理，我这里因为是要保存到本地服务器上，将图片前缀修改
                    that.editor.cmd.do('insertHTML', '<img src=' + imgurl + '   alt="">')
                })
                    .catch(e => {
                        alert("图片上传错误")
                    })
            };
            this.editor.customConfig.menus = [
                // 菜单配置
                'head', // 标题
                'bold', // 粗体
                'fontSize', // 字号
                'fontName', // 字体
                'italic', // 斜体
                'underline', // 下划线
                'strikeThrough', // 删除线
                'foreColor', // 文字颜色
                'backColor', // 背景颜色
                'link', // 插入链接
                'list', // 列表
                'justify', // 对齐方式
                'quote', // 引用
                'emoticon', // 表情
                'image', // 插入图片
                'table', // 表格
                'code', // 插入代码
                'undo', // 撤销
                'redo' // 重复
            ];
            this.editor.create();
        },
        props: ['Id'],
        created() {
            this.getpeoplelist();
            this.getclasslist();
            this.getthreeList();
        },
        methods: {
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
            delData(data) {
                let allArr = [];
                let resultData = data.split(",");
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


            modifyData() {
                this.axios
                    .get("/intelligentCommunity/manage/publicPartyWork/getPartyWorkById/" + this.Id)
                    .then(res => {
                        if (res.data.code === 200) {
                            let form = res.data.details.data;
                            this.form.memberId = form.memberId;
                            this.form.title = form.title;
                            this.editorContent = form.content;
                            this.form.isComment = form.isComment;
                            this.form.type = Number(form.type);
                            this.examMembers = this.delData(form.memberIds);
                            this.imageUrl = form.filePath;
                            if (this.editorContent) {
                                this.editor.txt.html(this.editorContent)
                            }
                        }
                    });
            },

            sure() {
                let arr = [];

                // 确定添加

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
                if (!this.editorContent) {
                    this.$message({
                        type: 'info',
                        message: '请输入内容!'
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
                if (!this.form.isComment) {
                    this.$message({
                        type: 'info',
                        message: '请选择是否可以评论!'
                    });
                    return false
                }
                if (!this.imageUrl) {
                    this.$message({
                        type: 'info',
                        message: '请上传图片!'
                    });
                    return false
                }
                if (this.examMembers.length == 0) {
                    this.$message({
                        type: 'info',
                        message: '请选择可见范围!'
                    });
                    return false
                }
                for (let i = 0; i < this.examMembers.length; i++) {
                    arr.push(this.examMembers[i][1])
                }
                if (this.Id) {
                    //    修改
                    this.axios
                        .post("/intelligentCommunity/manage/publicPartyWork/updatePartyWork", {
                            id: this.Id.toString(),
                            memberId: this.form.memberId.toString(),
                            title: this.form.title,
                            content: this.editorContent,
                            type: this.form.type.toString(),
                            isComment: this.form.isComment,
                            filePath: this.imageUrl,
                            memberIds: this.examMembers.toString(),
                        })
                        .then(res => {
                            if (res.data.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '修改成功!'
                                });
                                this.$emit("goback")
                            }
                        })
                        .catch(e => {
                            this.$message({
                                type: 'info',
                                message: '网络错误，添加失败!'
                            });
                        });
                } else {
                    //    增加
                    this.axios
                        .post("/intelligentCommunity/manage/publicPartyWork/savePartyWork", {
                            memberId: this.form.memberId,
                            title: this.form.title,
                            content: this.editorContent,
                            type: this.form.type.toString(),
                            isComment: this.form.isComment,
                            filePath: this.imageUrl,
                            memberIds: this.examMembers.toString(),
                        })
                        .then(res => {
                            if (res.data.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                });
                                this.$emit("goback")
                            }
                        })
                        .catch(e => {
                            this.$message({
                                type: 'info',
                                message: '网络错误，添加失败!'
                            });
                        });
                }


            },
            goback() {
                this.$emit("goback")
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
                            this.peopleList = arr
                        }
                    })
                    .catch(res => {
                        this.$message({
                            type: 'info',
                            message: '网络错误!'
                        });
                    });
            },
            //获取类型
            getclasslist() {
                this.axios
                    .get("/intelligentCommunity/manage/publicPartyWork/getAllPartyWorkTypeList")
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
                            this.classfilyList = arr
                        }
                    })
                    .catch(res => {
                        this.$message({
                            type: 'info',
                            message: '网络错误!'
                        });
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
        }
    }
</script>

<style scoped>
    .el-transfer {
        height: 25rem;
    }

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

    .contentEdit {
        width: 100%;
        padding: 1rem 0;
    }

    .contentEdit p {
        box-sizing: border-box;
        padding-left: 8.5%;
        font-size: .9rem;
        font-weight: 600;
    }
</style>
