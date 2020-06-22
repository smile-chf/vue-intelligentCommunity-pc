<template>
    <div class="commonDetail">
        <div class="commonHead">
            <div class="goback" @click="goBack">
                <img src="@/assets/img/toleft.png" alt="">
                <p>返回</p>
            </div>
            <div class="title">
                会议签到信息
            </div>
        </div>
        <div class="formMain">
            <el-table :data="TableData" style="width: 92%;margin-left: 4%">
                <el-table-column width="55"></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="departName" label="组织名字"></el-table-column>
                <el-table-column prop="status" :formatter="getstatus" label="状态"></el-table-column>
                <el-table-column prop="coordinate" label="坐标"></el-table-column>
                <el-table-column prop="signInDate" label="签到时间"></el-table-column>
                <el-table-column prop="isAccept" label="是否接受"></el-table-column>
                <!--                <el-table-column fixed="right" label="操作" width="200">-->
                <!--                    <template slot-scope="scope">-->
                <!--                        <el-button @click="opensamll(scope.row.id,0)" type="text" size="small">心得</el-button>-->
                <!--                    </template>-->
                <!--                </el-table-column>-->
            </el-table>
            <el-pagination
                @size-change="sizeChange1"
                @current-change="currentChange1"
                :current-page="currentPage1"
                :page-sizes="[10, 24, 36, 48]"
                :page-size="100"
                layout="sizes, prev, pager, next"
                :total="total1"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "signList",
        data() {
            return {
                currentPage1: 1, //当前页码
                total1: 0, //数据总条数
                pageSize1: "10", //每条页数
                pageNum1: "1", ////当前页码
                TableData: []
            }
        },
        props: ['id'],
        created() {
            this.axios.get('/intelligentCommunity/manage/party/conferencePunchInList?pageSize=' + this.pageSize1 + '&pageNum=' + this.pageNum1 + '&id=' + this.id).then(data => {
                if (data.data.code === 200) {
                    this.TableData = data.data.details.list.list;
                    this.total1 = data.data.details.list.totalCount;
                }
            })
        },
        methods: {
            sizeChange1(val) {
                this.pageSize1 = val;
                this.getdata()
            },
            //切换页码
            currentChange1(val) {
                this.pageNum1 = val;
                this.currentPage1 = val;
                this.getdata()
            },

            goBack() {
                this.$emit('goBack')
            },
            getdata() {

            },
            getstatus(a, b, c) {
                if (c == 0) {
                    return '未签到'
                } else if (c == 1) {
                    return '已签到'
                } else if (c == 2) {
                    return '请假'
                }
            }
        }
    }
</script>

<style scoped>

</style>
