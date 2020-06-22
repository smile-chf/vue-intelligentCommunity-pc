<template>
    <div class="allWrap">
        <div class="head">
            <img src="@/assets/img/party_icon.png" alt="">
            <p>智慧党建后台管理系统</p>
            <div class="exit" @click="exit()">退出登录</div>
        </div>
        <div class="foot">
            <div class="nav">
                <!-- <el-menu
                    class="el-menu-vertical-demo"
                    background-color=" #ab2d24"
                    text-color="rgba(255,255,255,.9)"
                    active-text-color="#fff"
                    :default-active="activedMenu($route.path)"
                    :defaultOpeneds=defaultOpen
                    router
                > -->
                <el-menu
                    class="el-menu-vertical-demo"
                    :default-active="activedMenu($route.path)"
                    :defaultOpeneds=defaultOpen
                    router
                >
                    <el-submenu index="/index/user/list">
                        <template slot="title">
                            <i class="el-icon-s-data"></i>
                            <span style="color:#fff">基础信息</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/index/user/list" style="color:#fff">用户管理</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/index/party_manage" style="color:#fff">党组织管理</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/index/message_manage" style="color:#fff">党员信息管理</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/index/party_member_transfer" style="color:#fff">党员转移</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/index/register" style="color:#fff">非公企业登记</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="/index/meet_manage">
                        <template slot="title">
                            <i class="el-icon-s-cooperation"></i>
                            <span style="color:#fff">三会一课</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/index/meet_manage" :class="focus1? 'activesure':''"
                                          style="color:#fff">会议管理
                            </el-menu-item>
                        </el-menu-item-group>
                        <!--                        <el-menu-item-group>-->
                        <!--                            <el-menu-item index="/index/meet_location_manage" style="color:#fff">会议地址管理</el-menu-item>-->
                        <!--                        </el-menu-item-group>-->
                        <!--                        <el-menu-item-group>-->
                        <!--                            <el-menu-item index="/index/meet_type" style="color:#fff">会议类别管理</el-menu-item>-->
                        <!--                        </el-menu-item-group>-->
                        <el-menu-item-group>
                            <el-menu-item index="/index/please_leave"
                                          style="color:#fff">会议请假
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="/index/partyMemberDay">
                        <template slot="title">
                            <i class="el-icon-s-cooperation"></i>
                            <span style="color:#fff">党员活动日</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/index/partyMemberDay" style="color:#fff">活动管理</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/index/partyMemberDayLeave" style="color:#fff">活动日请假</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="/index/democraticComments/comments_list">
                        <template slot="title">
                            <i class="el-icon-s-cooperation"></i>
                            <span style="color:#fff">民主评议</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/index/democraticComments/comments_list" style="color:#fff">民主评议列表
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="/index/partyOpen/index">
                        <template slot="title">
                            <i class="el-icon-s-cooperation"></i>
                            <span style="color:#fff">党务公开</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/index/partyOpen/index" style="color:#fff">党务公开列表</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/index/typelist" style="color:#fff">类型列表</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/index/commentlist" style="color:#fff">评论审核</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="/index/opinionCollection/index">
                        <template slot="title">
                            <i class="el-icon-s-cooperation"></i>
                            <span style="color:#fff">意见征集</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/index/opinionCollection/index" style="color:#fff">意见征集列表
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/index/opinionCollection/suggest_list" style="color:#fff">建议列表
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/index/opinionCollection/opinion_question" style="color:#fff">意见征集题库
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="/index/partyPhotos/index">
                        <template slot="title">
                            <i class="el-icon-s-cooperation"></i>
                            <span style="color:#fff">党建相册</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/index/partyPhotos/index" style="color:#fff">相册列表</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/index/partyPhotos/photosType" style="color:#fff">相册类型</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <!--          <el-submenu index="7">-->
                    <!--            <template slot="title">-->
                    <!--              <i class="el-icon-s-cooperation"></i>-->
                    <!--              <span>志愿活动</span>-->
                    <!--            </template>-->
                    <!--            <el-menu-item-group>-->
                    <!--              <el-menu-item index="/index/charitableActivity/index">志愿活动列表</el-menu-item>-->
                    <!--            </el-menu-item-group>-->
                    <!--            <el-menu-item-group>-->
                    <!--              <el-menu-item index="/index/charitableActivity/typeList">项目类型列表</el-menu-item>-->
                    <!--            </el-menu-item-group>-->
                    <!--            <el-menu-item-group>-->
                    <!--              <el-menu-item index="/index/charitableActivity/itemList">项目列表</el-menu-item>-->
                    <!--            </el-menu-item-group>-->
                    <!--          </el-submenu>-->
                    <el-submenu index="/index/exam/index">
                        <template slot="title">
                            <i class="el-icon-s-cooperation"></i>
                            <span style="color:#fff">在线考试</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/index/exam/index" style="color:#fff">在线考试</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/index/exam/exam_config" style="color:#fff">考试题库</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="/index/onlineStudy/index">
                        <template slot="title">
                            <i class="el-icon-s-cooperation"></i>
                            <span style="color:#fff">在线学习</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/index/onlineStudy/index" style="color:#fff">课程类型</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/index/onlineStudy/lesson_list" style="color:#fff">课程列表</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="/bigData">
                        <template slot="title">
                            <i class="el-icon-s-cooperation"></i>
                            <span style="color:#fff">党建大数据</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/bigData" style="color:#fff">党建大数据</el-menu-item>
                            <!--                            <el-menu-item @click="gobigdata">党建大数据</el-menu-item>-->
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="/index/visual" router>
                        <template slot="title">
                            <i class="el-icon-s-cooperation"></i>
                            <span style="color:#fff">党建台账</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/index/visual" style="color:#fff">组织概况</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item index="/personnelPortrait" style="color:#fff">人员画像</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <!-- <el-menu-item :index="{path:'/threeLessonsStatistics',query:{data:some}}">三会一课统计</el-menu-item> -->
                            <el-menu-item :index="threeLessonsStatistics" style="color:#fff"
                                          :class="surefocus? 'activesure':''">三会一课统计
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item :index="learningInstruction" style="color:#fff"
                                          :class="surefocus1? 'activesure':''">教育学习统计
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item :index="onlineStudyStatistics" style="color:#fff"
                                          :class="surefocus2? 'activesure':''">在线考试统计
                            </el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group>
                            <el-menu-item :index="partyOpenStatistics" style="color:#fff"
                                          :class="surefocus3? 'activesure':''">党务公开统计
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </div>
            <div class="main">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                surefocus: false,
                surefocus1: false,
                surefocus2: false,
                surefocus3: false,
                focus1: false,
                some: "",
                threeLessonsStatistics: "/threeLessonsStatistics",
                learningInstruction: "",
                onlineStudyStatistics: "", partyOpenStatistics: "",
                defaultOpen: []
            }
        },
        created() {
            var myDate = Date.parse(new Date());
            this.some = myDate;
            this.threeLessonsStatistics = "/threeLessonsStatistics?data=" + this.some
            this.learningInstruction = "/index/learningInstruction?data=" + this.some
            this.onlineStudyStatistics = "/index/onlineStudyStatistics?data=" + this.some
            this.partyOpenStatistics = "/index/partyOpenStatistics?data=" + this.some

            //默认打开导航栏
            if (this.$route.path.indexOf('threeLessonsStatistics') !== -1) {
                this.defaultOpen = ['/index/visual']
            } else if (this.$route.path.indexOf('learningInstruction') !== -1) {
                this.defaultOpen = ['/index/visual']
            } else if (this.$route.path.indexOf('onlineStudyStatistics') !== -1) {
                this.defaultOpen = ['/index/visual']
            } else if (this.$route.path.indexOf('partyOpenStatistics') !== -1) {
                this.defaultOpen = ['/index/visual']
            } else {
                this.defaultOpen = this.$route.path.split()
            }

        },
        mounted() {
            document.onkeypress = function (e) {
                var keycode = document.all ? event.keyCode : e.which;
                if (keycode == 13) {
                    e.preventDefault();
                    return false;
                }
            };
        },
        methods: {

            activedMenu(val) {
                if (val == "/threeLessonsStatistics/allStatistics") {
                    this.surefocus = true;
                    this.surefocus1 = false;
                    this.surefocus2 = false;
                    this.surefocus3 = false;
                    this.focus1 = false;
                } else if (val == "/index/learningInstruction/learningallStatistics") {
                    this.surefocus = false;
                    this.surefocus1 = true;
                    this.surefocus2 = false;
                    this.surefocus3 = false;
                    this.focus1 = false;
                } else if (val == "/index/onlineStudyStatistics/allOnline") {
                    this.surefocus = false;
                    this.surefocus1 = false;
                    this.surefocus2 = true;
                    this.surefocus3 = false;
                    this.focus1 = false;
                } else if (val == "/index/partyOpenStatistics/allOpenStatistics") {
                    this.surefocus = false;
                    this.surefocus1 = false;
                    this.surefocus2 = false;
                    this.surefocus3 = true;
                    this.focus1 = false;
                } else if (val == "/index/meet_location_manage") {
                    this.surefocus = false;
                    this.surefocus1 = false;
                    this.surefocus2 = false;
                    this.surefocus3 = false;
                    this.focus1 = true;
                } else if (val == "/index/meet_type") {
                    this.surefocus = false;
                    this.surefocus1 = false;
                    this.surefocus2 = false;
                    this.surefocus3 = false;
                    this.focus1 = true;
                } else {
                    this.surefocus = false;
                    this.surefocus1 = false;
                    this.surefocus2 = false;
                    this.surefocus3 = false;
                    this.focus1 = false;
                }
                return val
            },

            exit() {
                this.axios.get("/intelligentCommunity/user/logout").then(res => {
                    this.$router.push("/");
                });
            }
        }
    };
</script>

<style scoped>
    .exit {
        flex: 1;
        text-align: right;
        margin-right: 1.5rem;
        font-size: 18px;
        color: #fef9ed;
        cursor: pointer;
    }

    .exit:hover {
        color: #fff0ca;
    }

    i {
        color: #ffffff;
    }

    .allWrap {
        height: 100%;
        width: 100%;
    }

    .head {
        height: 7%;
        width: 100%;
        background: #D52215;
        display: flex;
        align-items: center;
    }

    .head img {
        width: 2.2rem;
        height: 2.2rem;
        padding-left: 1.6rem;
        padding-right: .85rem;
    }

    .head p {
        font-size: 1.2rem;
        color: #fff;
        position: relative;
        top: -.1rem;
    }

    .foot {
        display: flex;
        height: 93%;
    }

    .nav {
        width: 12.5%;
        height: 100%;
        background-color: #D52215;
        overflow: hidden;
    }

    .el-menu {
        height: 100%;
        overflow-y: auto;
    }

    .el-menu::-webkit-scrollbar {
        width: 2px;
        height: 16px;
        background-color: #D52215;
    }

    .main {
        width: 87.5%;
        height: 100%;
        box-sizing: border-box;
        background: #fef9ed;
        overflow-y: auto;

    }

    ::-webkit-scrollbar {
        display: none; /* Chrome Safari */
    }

</style>
<style lang="less">
    .el-menu-item:focus {
        outline: none;
        background-color: #962820;
    }

    .el-menu-item:hover {
        outline: none;
        background-color: #962820;
    }

    .el-submenu__title:focus {
        outline: none;
        background-color: #962820;
    }

    .el-submenu__title:hover {
        outline: none;
        background-color: #962820;
    }

    .el-menu-vertical-demo {
        background-color: #AB2D24;

    }

    .el-menu-item-group {
        background-color: #AB2D24;

    }

    .activesure {
        outline: none;
        background-color: #962820;
    }
</style>
