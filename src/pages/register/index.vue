<template>
  <div class="wrap specialTable">
    <!-- 列表1 -->
    <div class="list">
      <div class="tools">
        <div class="searchForm">
          <div class="searchForm">
            <div class="search_unit">
              <p class="search_title">企业名称:</p>
              <el-input v-model="search.name" placeholder="请输入"></el-input>
            </div>
            <div class="search_unit handle">
              <p class="close" @click="Onsearch">搜索</p>
            </div>
          </div>
        </div>
        <div class="handle">
          <!-- <p @click="add">增加</p>
          <p @click="opendelete()">删除</p> -->
          <p>
              <el-upload
                        class="upload-demo"
                        action="/intelligentCommunity/manage/partyCompanyRegister/excelImport"
                        :on-success="filesuccess"
                        accept=".xls,.xlsx"
                        :show-file-list="false"
                        >
                        <p>导入</p>
                    </el-upload>
          </p>
        </div>
      </div>
      <div style="padding:1rem">
           <el-table :data="tableData" style="width: 100%" @selection-change="handleChange">
        <!-- <el-table-column type="selection" width="120"></el-table-column> -->
        <el-table-column prop="name" label="企业名称"></el-table-column>
        <el-table-column prop="parentArea" label="地区"></el-table-column>
        <el-table-column prop="area" label="社区"></el-table-column>
        <el-table-column prop="committee" label="居委会"></el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <el-button @click="opendetail(scope.row.id)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="currentPage"
        :page-sizes="[10, 24, 36, 48]"
        :page-size="100"
        layout="sizes, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>

    <div class="styledialog" v-if="addshow">
      <el-dialog :visible.sync="addshow" width="50%"  >
      <!--   头部基本档案 -->
     <div style="height:600px">
         <el-form :inline="true" :model="addform" class="form" @submit.native.prevent>
        <el-form-item label="序号:">
          <el-input v-model="addform.serialNumber"  :readonly="showckeck"  style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="地区:">
          <el-input v-model="addform.parentArea"  :readonly="showckeck"  style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="社区:">
          <el-input v-model="addform.area"  :readonly="showckeck"  style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="居委会:">
          <el-input v-model="addform.committee"  :readonly="showckeck"  style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="企业名称:">
          <el-input v-model="addform.name"   :readonly="showckeck" style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="党组织名称:">
          <el-input v-model="addform.departName"  :readonly="showckeck"  style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="是否纳入全省非公平台管理:">
          <el-input v-model="addform.platformManage"  :readonly="showckeck"  style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="是否是非公有制互联网企业:">
          <el-input v-model="addform.internetCompany"  :readonly="showckeck"  style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="地址:">
          <el-input v-model="addform.location"  :readonly="showckeck"  style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="法人姓名:">
          <el-input v-model="addform.legalUsername"  :readonly="showckeck"  style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="法人政治面貌:">
          <el-input v-model="addform.legalPoliticsStatus"  :readonly="showckeck"  style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="法人是否兼任党组织书记:">
          <el-input v-model="addform.legalSecretary"  :readonly="showckeck"  style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="职工数量:">
          <el-input v-model="addform.workersNum"  :readonly="showckeck"  style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="企业经营状况:">
          <el-input v-model="addform.managementStatus"  :readonly="showckeck"  style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="是否缴纳社保:">
          <el-input v-model="addform.socialSecurity"   :readonly="showckeck" style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="社保缴纳职工数:">
          <el-input v-model="addform.socialSecurityPersons"  :readonly="showckeck"  style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="社会保险号:">
          <el-input v-model="addform.socialSecurityNumber"  :readonly="showckeck"  style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="社保缴纳属地:">
          <el-input v-model="addform.dependency"  :readonly="showckeck"  style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="组织关系已转入党员数:">
          <el-input v-model="addform.transitionMemberNum"  :readonly="showckeck"  style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="组织关系未转入党员数:">
          <el-input v-model="addform.notTransitionMemberNum"  :readonly="showckeck"  style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="是否建立党组织:">
          <el-input v-model="addform.buildDeparty"  :readonly="showckeck"  style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="党组织组建方式:">
          <el-input v-model="addform.buildType"  :readonly="showckeck"  style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="党组织建制类型:">
          <el-input v-model="addform.departyType"  :readonly="showckeck"  style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="党组织成立时间:">
          <el-input v-model="addform.departyBuildDate"  :readonly="showckeck"  style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="党组织负责人姓名:">
          <el-input v-model="addform.principal"  :readonly="showckeck"  style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="党内外职务:">
          <el-input v-model="addform.principalJob"  :readonly="showckeck"  style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label=" 负责人电话:">
          <el-input v-model="addform.principalTel"  :readonly="showckeck"  style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="是否成立群团组织:">
          <el-input v-model="addform.groupOrg"  :readonly="showckeck"  style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="是否规模以上企业:">
          <el-input v-model="addform.sizedEnterprise"  :readonly="showckeck"  style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="标准化建设是否达标:">
          <el-input v-model="addform.standard"  :readonly="showckeck"  style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="当前非公党组织摸排进展情况:">
          <el-input v-model="addform.development"   :readonly="showckeck" style="width:500px"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input v-model="addform.note"  :readonly="showckeck"  style="width:500px"></el-input>
        </el-form-item>
       
      </el-form>
      <div class="handleDetail">
        <p class="close" @click="addSure()">保存</p>
        <p class="close" @click="close()">关闭</p>
      </div>
     </div>
    </el-dialog>
    </div>
  </div>
</template>

<script>
import {getById} from '@/api/http'
export default {
  name: "meet_type",
  data() {
    return {
      showckeck:true,
      search:{
          name:""
      },
      addshow: false,
      currentPage: 1, //当前页码
      total: 0, //数据总条数
      pageSize: "10", //每条页数
      pageNum: "1", ////当前页码
      tableData: [],
      addform: {
     
      },
      departArr: [],
      isadd: 0,
      idArr: [],
      modifyId: "",
      isdelete: true
    };
  },
  created() {
    this.getlist();
  },
  methods: {
      filesuccess(response) {
                if (response.code == 200) {
                    this.$message({
                        type: 'success',
                        message: '导入成功'
                    });
                } else {
                    this.$message({
                        type: 'info',
                        message: '导入失败'
                    });
                }
            },



      Onsearch(){
         
         
          this.pageNum=1
          console.log(this.pageNum);
          this.getlist()
      },
    add() {
      //    添加
      this.addform.title = "";
      this.modifyId = "";
      this.addshow = true;
      this.isadd = 0;
    },
    addSure() {
        this.addshow = false;
    },
   async opendetail(id) {
     let res = await getById(id)
    this.addform= res.details.data
      //  修改
      this.addshow = true;
 
      
    },



    close() {
      //关闭时置空
      this.addform.name = "";
      this.addform.location = "";
      this.addform.depart = "";
      this.addform.content = "";
      this.modifyId = "";
      this.addshow = false;
      //    关闭添加
    },
    handleChange(val) {
      let arr = [];
      for (let i = 0; i < val.length; i++) {
        arr.push(val[i].id);
      }
      this.idArr = arr;
    },
    opendelete() {
      if (this.idArr.toString() == "") {
        this.$message({
          type: "info",
          message: "请选择删除项!"
        });
        return false;
      }
      this.axios({
        method: "post",
        url: "/intelligentCommunity/manage/party/queryByTitle",
        async: true,
        data: this.idArr
      }).then(data => {
        if (data.data.code == 200) {
          let isDelete = data.data.details.map;
          if (isDelete["count(title)"] !== 0) {
            this.$message({
              type: "info",
              message: "“" + isDelete.title + "”" + "下有活动，不能删除"
            });
            return false;
          }
          // 批量删除

          this.$confirm("是否删除该数据?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              this.axios({
                method: "post",
                url: "/intelligentCommunity/manage/conferenceType/delType",
                data: this.idArr
              }).then(data => {
                if (data.data.code === 200) {
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                  this.pageNum = 1;
                  this.getlist();
                }
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除"
              });
            });
        }
      });
    },

    //切换每页条数
    sizeChange(val) {
      this.pageSize = val;
      this.pageNum = 1;
      this.getlist();
    },
    //切换页码
    currentChange(val) {
      this.pageNum = val;
      this.currentPage = val;
      this.getlist();
    },
    getlist() {
      this.axios
        .get("/intelligentCommunity/manage/partyCompanyRegister/getListByPage", {
          params: {
            pageSize: this.pageSize,
            pageNum: this.pageNum,
            name:this.search.name
          }
        })
        .then(data => {
          if (data.data.code === 200) {
            this.tableData = data.data.details.list.list;
            this.total = data.data.details.list.total;
          }
        });
    }
  }
};
</script>

<style scoped>
</style>
<style lang="less" >

  .specialTable  .el-dialog {
   margin-top: 10vh !important; 
}


</style>
