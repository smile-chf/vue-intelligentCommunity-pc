<template>
    <div class="commonDetail meet">
        <div class="commonHead">
            <div class="mainTitle">
                <div class="p1">
                    {{addMettingType==1?'预约会议':addMettingType==2?'录入会议':addMettingType==3?'复制会议':'编辑会议'}}
                </div>
            </div>
            <div class="goback">
                <img src="@/assets/img/toleft.png" alt="">
                <p @click="goback">返回</p>
            </div>
        </div>
        <div class="formMain">
            <el-form :inline="true" :model="form" class="form" style="margin-top: 0">
                <div class="specialbox">
                    <p class="special_title"><span class="require">*</span> 分类：</p>
                    <div class="special_main">
                        <p class="special_unit" v-for="item in classifyList">
                            <label>
                                <input type="radio" name="type1" :value=item.label v-model="form.type">
                                <div>{{item.label}}</div>
                            </label>
                        </p>
                    </div>
                </div>

                <!--                <el-form-item label="*会议日期：" class="specialTime" color="red">-->
                <div class="specialbox specialTime">
                    <p class="special_title"><span class="require">*</span> 会议日期：</p>
                    <div class="special_main">
                        <el-date-picker
                            class="time1"
                            v-model="form.conferenceDate"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="选择时间"
                            :picker-options="pickerOptions0"
                            v-if="addMettingType!==2"
                        >
                        </el-date-picker>
                        <el-date-picker
                            class="time1"
                            v-model="form.conferenceDate"
                            value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="选择时间"
                            :picker-options="pickerOptions1"
                            v-if="addMettingType==2"
                        >
                        </el-date-picker>
                        <el-time-picker
                            class="time2"
                            v-model="form.beginTime"
                            value-format='HH:mm'
                            format='HH:mm'
                            placeholder="开始时间">
                        </el-time-picker>
                        至
                        <el-time-picker
                            class="time3 "
                            v-model="form.endTime"
                            value-format='HH:mm'
                            format='HH:mm'
                            placeholder="结束时间">
                        </el-time-picker>
                    </div>
                </div>
                <!--                </el-form-item>-->

                <!--                <el-form-item label="：">-->
                <div class="specialbox usermargin">
                    <p class="special_title"><span class="require">*</span> 会议地点：</p>
                    <div class="special_main">
                        <el-radio v-model="localradio" :label="1">已有</el-radio>
                        <el-radio v-model="localradio" :label="2">自定义</el-radio>
                    </div>
                </div>
                <!--                </el-form-item>-->
                <div class="specialbox">
                    <p class="special_title"></p>
                    <div class="special_main">
                        <div v-if="localradio==1" style="margin-bottom: 2rem;width: 45.8%">
                            <el-select v-model="form.locationId" placeholder="请选择">
                                <el-option
                                    v-for="item in siteList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                        <div v-if="localradio==2" style="margin-bottom: 2rem;width: 45.8%">
                            <el-input v-model="location" type="textarea" placeholder="请输入地点" maxlength="64"
                                      show-word-limit></el-input>
                        </div>
                    </div>
                </div>

                <!--                <el-form-item label="：">-->
                <div class="specialbox usermargin" style="margin-top: 0">
                    <p class="special_title"><span class="require">*</span> 所属组织：</p>
                    <div class="special_main delWidth">
                        <el-select v-model="form.partyDepartId" filterable @change="selectGet" placeholder="请选择">
                            <el-option
                                v-for="item in depart"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <!--                </el-form-item>-->
                <!--                </div>-->
                <!--                <div class="line">-->
                <!--                <el-form-item label="参会率：">-->
                <div class="specialbox usermargin">
                    <p class="special_title">会议参会率：</p>
                    <div class="special_main delWidth">
                        <el-input v-model="form.attendRate" type="number" placeholder="请输入0-100的有效数字"></el-input>
                    </div>
                </div>
                <!--                </el-form-item>-->
                <!--                <el-form-item label="会议主题：">-->
                <div class="specialbox usermargin">
                    <p class="special_title"><span class="require">*</span> 会议主题：</p>
                    <div class="special_main delWidth">
                        <el-input v-model="form.subject" type="textarea" placeholder="请输入主题" maxlength="64"
                                  show-word-limit></el-input>
                    </div>
                </div>
                <!--                </el-form-item>-->
                <div class="specialbox">
                    <p class="special_title"><span class="require">*</span> 会议议题：</p>
                    <div class="special_main">
                        <div id="wangeditor" style="margin-left: 0;margin-bottom: 2rem">
                            <div ref="editorElem"></div>
                        </div>
                    </div>
                </div>
                <!--                <el-form-item label="议题图片：">-->
                <!--                    <el-upload-->
                <!--                        class="avatar-uploader"-->
                <!--                        action="/intelligentCommunity/ftp/commonsFileUpload"-->
                <!--                        :show-file-list="false"-->
                <!--                        :on-success="handleAvatarSuccess"-->
                <!--                    >-->
                <!--                        <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
                <!--                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
                <!--                    </el-upload>-->
                <div class="specialbox" style="margin-bottom: 2rem">
                    <p class="special_title">上传附件：</p>
                    <el-upload
                        class="upload-demo"
                        action="/intelligentCommunity/ftp/commonsFileUpload"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-success="handleAvatarSuccess"
                        :before-remove="beforeRemove"
                        multiple
                        accept=".doc,.docx,.ppt,.pptx,.txt,.xlsx,.xls,.pdf,.png,.jpg,.webp,.bmp,.tif,.bmp"
                        :limit="10"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                        <el-button size="small" type="primary" style="margin-right: 1rem">点击上传</el-button>
                        <span slot="tip" class="el-upload__tip">最多可上传10个，小于20MB，格式包括.doc.docx.ppt.pptx.txt.xlsx.xls.pdf,.png,.jpg.webp.bmp.tif.bmp的文件</span>
                    </el-upload>
                </div>
                <!--                </el-form-item>-->
                <!--                <el-form-item label="会议要求：">-->
                <div class="specialbox usermargin">
                    <p class="special_title">会议要求：</p>
                    <div class="special_main delWidth">
                        <el-input v-model="form.require" type="textarea" :rows="6" placeholder="请输入"></el-input>
                    </div>
                </div>
                <!--                </el-form-item>-->

                <!--                <el-form-item label="提交心得体会：">-->
                <div class="specialbox usermargin">
                    <p class="special_title"><span class="require">*</span> 提交心得体会：</p>
                    <div class="special_main">
                        <el-radio v-model="form.isSubmitNote" :label=true>是</el-radio>
                        <el-radio v-model="form.isSubmitNote" :label=false>否</el-radio>

                    </div>
                </div>
                <!--                </el-form-item>-->

                <!--                <el-form-item label="发布人：">-->
                <div class="specialbox usermargin">
                    <p class="special_title">发布人：</p>
                    <div class="special_main delWidth">
                        <el-select v-model="form.sponsorId" filterable placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.key"
                                :label="item.label"
                                :value="item.key"
                            >
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <!--                </el-form-item>-->
                <!--                <el-form-item label="主持人：">-->
                <div class="specialbox usermargin">
                    <p class="special_title"><span class="require">*</span> 主持人：</p>
                    <div class="special_main delWidth">
                        <el-cascader
                            :options="optionsList"
                            :props="{multiple: false}"
                            v-model="form.hostIds"
                            collapse-tags
                            clearable
                            filterable
                        >
                        </el-cascader>
                    </div>
                </div>
                <!--                </el-form-item>-->
                <!--                <el-form-item label="参会人：">-->
                <div class="specialbox usermargin">
                    <p class="special_title"><span class="require">*</span> 参会人：</p>
                    <div class="special_main">
                        <p class="special_unit1">
                            <label>
                                <input type="radio" name="type" value=1 v-model="joinpeople">
                                <div class="div1">全体党员</div>
                            </label>
                        </p>
                        <p class="special_unit1">
                            <label>
                                <input type="radio" name="type" value=2 v-model="joinpeople">
                                <div class="div2">指定党员</div>
                            </label>
                        </p>
                    </div>
                </div>
                <!--                </el-form-item>-->

                <div class="specialbox">
                    <p class="special_title"></p>
                    <div class="special_main">
                        <div v-if="joinpeople==2" style="margin-bottom: 2rem;width: 45.8%">
                            <el-cascader
                                :options="optionsList"
                                :props="props"
                                collapse-tags
                                v-model="form.attendIds"
                                placeholder="请选择党员"
                                clearable
                                filterable
                            >
                            </el-cascader>
                        </div>

                    </div>
                </div>

                <!--                <el-form-item label="记录人：">-->
                <div class="specialbox usermargin" style="margin-top: 0">
                    <p class="special_title">记录人：</p>
                    <div class="special_main delWidth">
                        <el-cascader
                            :options="optionsList"
                            :props="props"
                            v-model="form.noteTakerIds"
                            collapse-tags
                            clearable
                            filterable
                        >
                        </el-cascader>
                    </div>
                </div>
                <!--                </el-form-item>-->
                <!--                <el-form-item label="会议签到：">-->
                <div class="specialbox usermargin" v-if="addMettingType!==2">
                    <p class="special_title"><span class="require">*</span> 会议签到：</p>
                    <div class="special_main">
                        <el-radio v-model="form.punchType" label='0'>不签到</el-radio>
                        <el-radio v-model="form.punchType" label='1'>扫码签到</el-radio>
                    </div>
                </div>
                <!--                </el-form-item>-->
            </el-form>
            <div class="footHander">
                <p class="cancel footcommon" @click="goback">取消</p>
                <p class="cancel footcommon" @click="suredraft">存为草稿</p>
                <p class="save footcommon" @click="sure">发布</p>
            </div>
        </div>
    </div>
</template>

<script>
    import E from "wangeditor";

    export default {
        name: "add_metting",
        data() {
            return {
                props: {multiple: true},
                form: {
                    sponsorId: '',
                    type: '',
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
                    punchType: 1,
                    isSubmitNote: true,
                    hostIds: [],
                    attendIds: [],
                    noteTakerIds: [],
                    // signPerson:[]
                },
                location: '',
                imageUrl: '',
                //分类
                // istrue: '',
                classifyList: [],

                //会议地址
                siteList: [],
                //    组织
                depart: [],
                //主持人  等列表
                options: [],
                optionsList: [],
                //会议地点单选值
                localradio: 1,
                joinpeople: 1,
                fileList: [],
                allChoose: [],
                pickerOptions0: {
                    disabledDate(time) {
                        return time.getTime() < Date.now() - 8.64e7;//如果没有后面的-8.64e7就是不可以选择今天的
                    }
                },
                pickerOptions1: {
                    disabledDate(time) {
                        return time.getTime() > Date.now() - 8.64e6;//如果没有后面的-8.64e7就是不可以选择今天的
                    }
                },
            }
        },
        // 1:预约会议 2：录入会议 3：复制 4：编辑
        props: ['Id', 'addMettingType'],
        created() {
            this.getlocation();
            this.getpartList();
            this.gethostList();
            this.getclasstype();
            this.getthreeList();
        },
        mounted() {
            document.onkeypress = undefined;

            this.editor = new E(this.$refs.editorElem);
            // 编辑器的事件，每次改变会获取其html内容


            this.editor.customConfig.onchange = html => {
                this.form.topic = html;
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
        methods: {
            //修改的回显
            modifyDate() {
                this.axios
                    .get("/intelligentCommunity/manage/party/conference/" + this.Id)
                    .then(res => {
                        if (res.data.code === 200) {
                            let data = res.data.details.data;
                            this.form.sponsorId = data.sponsorId;
                            this.form.type = data.type;
                            this.form.conferenceDate = data.conferenceDate;
                            this.form.beginTime = data.beginTime;
                            this.form.endTime = data.endTime;
                            if (data.locationId) {
                                this.form.locationId = data.locationId;
                                this.localradio = 1;
                            } else {
                                this.localradio = 2;
                                this.location = data.location
                            }
                            //会议地点
                            this.form.partyDepartId = data.partyDepartId;
                            this.form.partyDepart = data.partyDepart;
                            this.form.attendRate = data.attendRate;
                            this.form.subject = data.subject;
                            this.form.topic = data.topic;
                            if (this.form.topic) {
                                this.editor.txt.html(this.form.topic)
                            }
                            this.form.require = data.require;
                            if (data.punchType) {
                                this.form.punchType = data.punchType.toString();//特殊回显
                            }
                            this.form.isSubmitNote = data.isSubmitNote;
                            this.form.hostIds = this.delHost(data.hostIds);
                            this.form.attendIds = this.delData(data.attendIds);
                            //回显   参会人  是否是全选
                            if (this.allChoose.length == data.attendIds.split(",").length) {
                                this.joinpeople = 1
                            } else {
                                this.joinpeople = 2
                            }
                            this.form.noteTakerIds = this.delData(data.noteTakerIds);
                            let arr=JSON.parse(data.topicPic);
                            for (let i in arr) {
                                this.fileList.push({
                                    name:arr[i].split("/").pop(),
                                    url:arr[i]
                                })
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

            // 确认发布
            sure() {
                let arr1 = [];
                let arr2 = [];
                let arr3 = [];
                //附件
                let arr4 = [];

                if (!this.form.type) {
                    this.$message({
                        type: 'info',
                        message: '请选择分类!'
                    });
                    return false
                }

                // 全体党员
                for (let i = 0; i < this.fileList.length; i++) {
                    arr4.push(this.fileList[i].url)
                }

                if (0 > this.form.attendRate || this.form.attendRate > 100) {
                    this.$message({
                        type: 'info',
                        message: '参会率未输入1-100的数字!'
                    });
                    return false
                }

                arr1.push(this.form.hostIds[1]);
                //判断选择的是全体党员还是指定党员
                if (this.joinpeople == 1) {
                    arr2.push(this.allChoose)
                } else {
                    //    指定党员
                    for (let i = 0; i < this.form.attendIds.length; i++) {
                        arr2.push(this.form.attendIds[i][1])
                    }
                }
                for (let i = 0; i < this.form.noteTakerIds.length; i++) {
                    arr3.push(this.form.noteTakerIds[i][1])
                }
                //会议地点

                if (this.localradio == 1) {
                    this.location = this.delsite(this.form.locationId)
                } else {
                    this.form.locationId = ''
                }
                let modifyjson = {
                    id: this.Id,
                    sponsorId: this.form.sponsorId,
                    type: this.form.type,
                    conferenceDate: this.form.conferenceDate,
                    beginTime: this.form.beginTime,
                    endTime: this.form.endTime,
                    locationId: this.form.locationId,
                    location: this.location,
                    partyDepart: this.form.partyDepart,
                    partyDepartId: this.form.partyDepartId,
                    attendRate: this.form.attendRate,
                    subject: this.form.subject,
                    topic: this.form.topic,
                    topicPic: JSON.stringify(arr4),
                    require: this.form.require,
                    hostIds: arr1.toString(),
                    attendIds: arr2.toString(),
                    noteTakerIds: arr3.toString(),
                    punchType: this.form.punchType,
                    isSubmitNote: this.form.isSubmitNote,
                };
                let addjson = {
                    sponsorId: this.form.sponsorId,
                    type: this.form.type,
                    conferenceDate: this.form.conferenceDate,
                    beginTime: this.form.beginTime,
                    endTime: this.form.endTime,
                    locationId: this.form.locationId,
                    location: this.location,
                    partyDepart: this.form.partyDepart,
                    partyDepartId: this.form.partyDepartId,
                    attendRate: this.form.attendRate,
                    subject: this.form.subject,
                    topic: this.form.topic,
                    topicPic: JSON.stringify(arr4),
                    require: this.form.require,
                    hostIds: arr1.toString(),
                    attendIds: arr2.toString(),
                    noteTakerIds: arr3.toString(),
                    punchType: this.form.punchType,
                    isSubmitNote: this.form.isSubmitNote,
                    status: 1
                };
                if (this.addMettingType == 1) {
                    //    预约会议
                    this.axios
                        .post("/intelligentCommunity/manage/party/saveConference", addjson)
                        .then(res => {
                            if (res.data.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                });
                                this.goback()
                            }
                        });
                } else if (this.addMettingType == 2) {
                    //    录入会议
                    addjson.status = 3;
                    addjson.punchType = '';
                    this.axios
                        .post("/intelligentCommunity/manage/party/saveConference", addjson)
                        .then(res => {
                            if (res.data.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                });
                                this.goback()
                            }
                        });
                } else if (this.addMettingType == 3) {
                    //    复制
                    this.axios
                        .post("/intelligentCommunity/manage/party/saveConference", addjson)
                        .then(res => {
                            if (res.data.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                });
                                this.goback()
                            }
                        });
                } else if (this.addMettingType == 4) {
                    //    编辑
                    this.axios
                        .post("/intelligentCommunity/manage/party/updateConference", modifyjson)
                        .then(res => {
                            if (res.data.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '修改成功!'
                                });
                                this.goback()
                            }
                        });
                }
            },

            delsite(id) {
                for (let i = 0; i < this.siteList.length; i++) {
                    if (this.siteList[i].value == id) {
                        return this.siteList[i].label
                    }
                }
            },

            //存为草稿
            suredraft() {
                let arr1 = [];
                let arr2 = [];
                let arr3 = [];
                //附件
                let arr4 = [];
                // 全体党员
                for (let i = 0; i < this.fileList.length; i++) {
                    arr4.push(this.fileList[i].url)
                }

                if (0 > this.form.attendRate || this.form.attendRate > 100) {
                    this.$message({
                        type: 'info',
                        message: '参会率未输入1-100的数字!'
                    });
                    return false
                }

                arr1.push(this.form.hostIds[1]);
                //判断选择的是全体党员还是指定党员
                if (this.joinpeople == 1) {
                    arr2.push(this.allChoose)
                } else {
                    //    指定党员
                    for (let i = 0; i < this.form.attendIds.length; i++) {
                        arr2.push(this.form.attendIds[i][1])
                    }
                }
                for (let i = 0; i < this.form.noteTakerIds.length; i++) {
                    arr3.push(this.form.noteTakerIds[i][1])
                }
                if (this.localradio == 1) {
                    this.location = this.delsite(this.form.locationId)
                } else {
                    this.form.locationId = ''
                }

                let modifyjson = {
                    id: this.Id,
                    sponsorId: this.form.sponsorId,
                    type: this.form.type,
                    conferenceDate: this.form.conferenceDate,
                    beginTime: this.form.beginTime,
                    endTime: this.form.endTime,
                    locationId: this.form.locationId,
                    location: this.location,
                    partyDepart: this.form.partyDepart,
                    partyDepartId: this.form.partyDepartId,
                    attendRate: this.form.attendRate,
                    subject: this.form.subject,
                    topic: this.form.topic,
                    topicPic: JSON.stringify(arr4),
                    require: this.form.require,
                    hostIds: arr1.toString(),
                    attendIds: arr2.toString(),
                    noteTakerIds: arr3.toString(),
                    punchType: this.form.punchType,
                    isSubmitNote: this.form.isSubmitNote,
                    status: 4
                };
                let addjson = {
                    sponsorId: this.form.sponsorId,
                    type: this.form.type,
                    conferenceDate: this.form.conferenceDate,
                    beginTime: this.form.beginTime,
                    endTime: this.form.endTime,
                    locationId: this.form.locationId,
                    location: this.location,
                    partyDepart: this.form.partyDepart,
                    partyDepartId: this.form.partyDepartId,
                    attendRate: this.form.attendRate,
                    subject: this.form.subject,
                    topic: this.form.topic,
                    topicPic: JSON.stringify(arr4),
                    require: this.form.require,
                    hostIds: arr1.toString(),
                    attendIds: arr2.toString(),
                    noteTakerIds: arr3.toString(),
                    punchType: this.form.punchType,
                    isSubmitNote: this.form.isSubmitNote,
                    status: 4
                };

                if (this.addMettingType == 1) {
                    //    预约会议   草稿
                    this.axios
                        .post("/intelligentCommunity/manage/party/saveConference", addjson)
                        .then(res => {
                            if (res.data.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                });
                                this.goback()
                            }
                        });
                } else if (this.addMettingType == 2) {
                    //    录入会议 草稿
                    addjson.punchType = '';
                    this.axios
                        .post("/intelligentCommunity/manage/party/saveConference", addjson)
                        .then(res => {
                            if (res.data.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                });
                                this.goback()
                            }
                        });
                } else if (this.addMettingType == 3) {
                    //    复制  草稿
                    this.axios
                        .post("/intelligentCommunity/manage/party/saveConference", addjson)
                        .then(res => {
                            if (res.data.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '添加成功!'
                                });
                                this.goback()
                            }
                        });
                } else if (this.addMettingType == 4) {
                    //    编辑 草稿
                    this.axios
                        .post("/intelligentCommunity/manage/party/updateConference", modifyjson)
                        .then(res => {
                            if (res.data.code === 200) {
                                this.$message({
                                    type: 'success',
                                    message: '修改成功!'
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
            //获取会议类型
            getclasstype() {
                this.axios
                    .get("/intelligentCommunity/manage/conferenceType/getAllTypeList")
                    .then(res => {
                        if (res.data.code === 200) {
                            let arr = [];
                            let list = res.data.details.data;
                            for (let i = 0; i < list.length; i++) {
                                let json = {};
                                json.value = list[i].id;
                                json.label = list[i].title;
                                arr.push(json)
                            }
                            this.classifyList = arr
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
                            let arr1 = [];
                            let list = res.data.details.list;
                            for (let i = 0; i < list.length; i++) {
                                let json = {};
                                json.key = list[i].id;
                                json.label = list[i].name;
                                arr.push(json);
                                arr1.push(list[i].id);
                            }
                            this.options = arr;
                            this.allChoose = arr1;
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

            //文件上传               文件上传

            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`);
            },

            handleAvatarSuccess(res, file) {
                this.fileList.push({
                    name: res.details.rawName,
                    url: res.details.path
                })
                // console.log(this.fileList)

                // this.fileList
                // this.imageUrl = res.details.path;
                // this.$message({
                //     type: 'success',
                //     message: '图片选取成功!'
                // });
            },
            //获取参会人列表
            goback() {
                this.$emit('goBack')
            }
        }
    }
</script>

<style scoped>
    .el-radio__input /deep/ {
        display: none !important;
    }

    .metting .el-form-item__label {
        width: 14% !important;
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

    .mainTitle {
        pointer-events: none;
    }
</style>
