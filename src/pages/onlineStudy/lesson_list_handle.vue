<template>
    <div class="commonDetail">
        <div class="formMain special">
            <el-form :inline="true" :model="form" class="form">
                    <el-form-item label="标题">
                        <el-input v-model="form.title" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item label="简介">
                        <el-input v-model="form.briefs" type="textarea" placeholder="请输入简介"></el-input>
                    </el-form-item>

                    <el-form-item label="视频链接">
                        <el-input v-model="form.videoUrl" type="textarea" placeholder="请输入视频链接"></el-input>
                    </el-form-item>

                    <el-form-item label="类型">
                        <el-select v-model="form.depart" placeholder="请选择">
                            <el-option
                                v-for="item in typeList"
                                :key="item.key"
                                :label="item.label"
                                :value="item.key">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="截止时间">
                        <el-date-picker
                            v-model="form.deadline"
                            value-format="yyyy-MM-dd HH:mm:ss"
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
            </el-form>
            <div id="wangeditor">
                <div ref="editorElem" style="text-align:left;"></div>
            </div>
            <div class="footHander" style="margin-top: 2rem;margin-bottom: 1rem">
                <p class="save footcommon" @click="add">保存</p>
                <p class="cancel footcommon" @click="goback">取消</p>
            </div>
        </div>
    </div>
</template>

<script>
    import E from "wangeditor";

    export default {
        name: "lesson_list_handle",
        data() {
            return {
                loading: false,
                form: {
                    depart: '',
                    title: '',
                    briefs: '',
                    pic: '',
                    deadline: '',
                    videoUrl: '',
                },
                //人数id
                examMembers: [],
                typeList: [],
                imageUrl: "",
                optionsList: [],
                props: {multiple: true},
                editor: null,
                editorContent: ''
            }
        },
        props: ['Id'],
        created() {
            // this.getpeoplelist();

            this.getclasslist();
            this.getthreeList();
        },
        mounted() {
            this.useeditor();
            document.onkeypress = undefined
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
                            }
                        }
                    });
            },

            handleAvatarSuccess(res, file) {
                this.imageUrl = res.details.path;
                this.$message({
                    type: 'success',
                    message: '图片选取成功!'
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
            modifyData() {
                this.axios
                    .get("/intelligentCommunity/manage/education/getLessonById/" + this.Id)
                    .then(res => {
                        if (res.data.code === 200) {
                            let Form = res.data.details.data;
                            this.form.title = Form.title;
                            this.form.depart = Form.typeId;
                            this.form.briefs = Form.brief;
                            this.imageUrl = Form.pic;
                            //视频链接
                            this.form.videoUrl = Form.link;
                            //富文本
                            this.editorContent = Form.content;
                            if (this.editorContent) {
                                this.editor.txt.html(this.editorContent)
                            }
                            this.form.deadline = Form.deadline;
                            this.examMembers = this.delData(res.data.details.memberIds);
                            // this.examMembers = res.data.details.memberIds.split(",").map(Number)
                        }
                    });
            },
            add() {
                if (!this.form.title) {
                    this.$message({
                        type: 'info',
                        message: '请输入标题!'
                    });
                    return false
                }
                if (!this.form.briefs) {
                    this.$message({
                        type: 'info',
                        message: '请输入简介!'
                    });
                    return false
                }
                if (!this.form.depart) {
                    this.$message({
                        type: 'info',
                        message: '请选择类型!'
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
                if (!this.editorContent) {
                    this.$message({
                        type: 'info',
                        message: '请输入视频内容!'
                    });
                    return false
                }
                // if (!this.form.videoUrl) {
                //     this.$message({
                //         type: 'info',
                //         message: '请输入视频链接!'
                //     });
                //     return false
                // }
                let arr1 = [];
                for (let i = 0; i < this.examMembers.length; i++) {
                    arr1.push(this.examMembers[i][1])
                }
                if (this.Id) {
                    //    修改
                    this.axios
                        .post("/intelligentCommunity/manage/education/saveLesson", {
                            id: this.Id,
                            title: this.form.title,
                            typeId: parseInt(this.form.depart),
                            brief: this.form.briefs,
                            pic: this.imageUrl,
                            content: this.editorContent,
                            link: this.form.videoUrl,
                            deadline: this.form.deadline,
                            memberIds: arr1.toString()
                        })
                        .then(res => {
                            if (res.data.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '保存成功!'
                                });
                                this.goback()
                            }
                        });
                } else {
                    //    增加
                    this.axios
                        .post("/intelligentCommunity/manage/education/saveLesson", {
                            title: this.form.title,
                            typeId: parseInt(this.form.depart),
                            brief: this.form.briefs,
                            pic: this.imageUrl,
                            content: this.editorContent,
                            link: this.form.videoUrl,
                            deadline: this.form.deadline,
                            memberIds: arr1.toString()
                        })
                        .then(res => {
                            if (res.data.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '保存成功!'
                                });
                                this.goback()
                            }
                        });
                }

            },
            //获取类型
            getclasslist() {
                this.axios
                    .get("/intelligentCommunity/manage/education/getAllLessonType")
                    .then(res => {
                        if (res.status == 200) {
                            let data = res.data.details.data;
                            let arr = [];
                            for (let i = 0; i < data.length; i++) {
                                var json = {};
                                json.key = data[i].id;
                                json.label = data[i].name;
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
            },
            useeditor() {
                this.editor = new E(this.$refs.editorElem);
                // 编辑器的事件，每次改变会获取其html内容
                this.editor.customConfig.onchange = html => {
                    this.editorContent = html;
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
            }
        }
    }
</script>

<style>
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

    .wrap .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .wrap .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
