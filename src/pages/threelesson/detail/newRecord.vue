<template>
    <div class="commonDetail">
        <div class="commonHead">
            <div class="mainTitle">
                <div class="p1">
                    会议记录
                </div>
            </div>
            <div class="goback">
                <img src="@/assets/img/toleft.png" alt="">
                <p @click="goback">返回</p>
            </div>
        </div>
        <div class="formMain">
            <el-form>
                <div class="specialbox">
                    <p class="special_title"><span class="require">*</span> 会议议题：</p>
                    <div class="special_main">
                        <div id="wangeditor" style="margin-left: 0;margin-bottom: 2rem">
                            <div ref="editorElem"></div>
                        </div>
                    </div>
                </div>
                <div class="specialbox" style="margin-bottom: 2rem" v-if="!this.Id">
                    <p class="special_title">上传图片：</p>
                    <el-upload
                        action="/intelligentCommunity/ftp/commonsFileUpload"
                        :on-preview="handlePictureCardPreview"
                        list-type="picture-card"
                        :on-success="handleAvatarSuccess"
                        :limit="6"
                        :on-exceed="overlimit"
                        :before-remove="beforremove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
                <div class="specialbox" style="margin-bottom: 2rem" v-if="this.Id">
                    <p class="special_title">上传图片：</p>
                    <el-upload
                        action="/intelligentCommunity/ftp/commonsFileUpload"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-success="handleAvatarSuccess"
                        :file-list="imgArr"
                        :limit='6'
                        :on-exceed="overlimit"
                        :before-remove="beforremove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
            </el-form>
            <div class="footHander" style="display: flex;justify-content: center;padding: 0">
                <p class="save footcommon" @click="sure">保存</p>
            </div>
        </div>
    </div>
</template>

<script>
    import E from "wangeditor";

    export default {
        name: "newRecord",
        data() {
            return {
                topic: '',
                imageUrl: '',
                dialogVisible: false,
                dialogImageUrl: [],
                imgArr: []
            }
        },
        mounted() {
            document.onkeypress = undefined;

            this.editor = new E(this.$refs.editorElem);
            // 编辑器的事件，每次改变会获取其html内容


            this.editor.customConfig.onchange = html => {
                this.topic = html;
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
        methods: {
            sure(){
            //    确定保存
            },

            goback() {
                this.$emit('goBack')
            },
            overlimit(files, fileList) {
                this.$message.info('只能上传最多6张图片')
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

        }
    }
</script>

<style scoped>

</style>
