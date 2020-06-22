<template>
  <div class="wrap specialTable">
    <!-- 列表1 -->
    <div class="list">
      <div class="tools">
        <div class="searchForm">
          <div class="searchForm">
            <div class="search_unit">
              <p class="search_title">类型名称:</p>
              <el-input v-model="search.name" placeholder="请输入"></el-input>
            </div>
            <div class="search_unit handle">
              <p class="close" @click="Onsearch">搜索</p>
            </div>
          </div>
        </div>
        <div class="handle">
          <p @click="add">增加</p>
          <p @click="opendelete()">删除</p>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%" @selection-change="handleChange">
        <el-table-column type="selection" width="120"></el-table-column>
        <el-table-column prop="title" label="类型名称"></el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <el-button @click="opendetail(scope.row.id)" type="text" size="small">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
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

    <el-dialog :visible.sync="addshow" width="35%">
      <!--   头部基本档案 -->
      <el-form :inline="true" :model="addform" class="form" @submit.native.prevent>
        <el-form-item label="名称：">
          <el-input v-model="addform.title" placeholder="请输入名称"></el-input>
        </el-form-item>
      </el-form>
      <div class="handleDetail">
        <p class="close" @click="addSure()">保存</p>
        <p class="close" @click="close()">关闭</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "meet_type",
  data() {
    return {
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
        title: ""
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
      Onsearch(){
          this.pageNum=1
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
      //    确定添加
      if (!this.addform.title) {
        alert("请输入类型名");
        return false;
      }
      if (this.isadd == 0) {
        //    增加
        this.axios
          .post("/intelligentCommunity/manage/conferenceType/saveType", {
            title: this.addform.title
          })
          .then(data => {
            if (data.data.code === 200) {
              this.$message({
                type: "success",
                message: "添加成功!"
              });
              this.pageNum = 1;
              this.getlist();
              this.addshow = false;
            }
          });
      } else {
        //    修改
        this.axios
          .post("/intelligentCommunity/manage/conferenceType/saveType/", {
            id: this.modifyId,
            title: this.addform.title
          })
          .then(data => {
            if (data.data.code === 200) {
              this.$message({
                type: "success",
                message: "修改成功!"
              });
              this.pageNum = 1;
              this.getlist();
              this.addshow = false;
            }
          });
      }
    },
    opendetail(id) {
      //  修改
      this.modifyId = id;
      this.isadd = 1;
      this.addshow = true;
      this.axios
        .get("/intelligentCommunity/manage/conferenceType/getTypeDetail/" + id)
        .then(res => {
          if (res.data.code == 200) {
            this.addform.title = res.data.details.data.title;
          }
        })
        .catch(e => {});
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
        .get("/intelligentCommunity/manage/conferenceType/getTypeList", {
          params: {
            pageSize: this.pageSize,
            pageNum: this.currentPage,
            name:this.search.name
          }
        })
        .then(data => {
          if (data.data.code === 200) {
            this.tableData = data.data.details.data;
            this.total = data.data.details.totalCount;
          }
        });
    }
  }
};
</script>

<style scoped>
</style>
