<template>
  <div class="wrap meet_location_manage">
    <!-- 列表1 -->
    <div class="list">
      <div class="tools">
        <div class="searchForm">
          <div class="searchForm">
            <div class="search_unit">
              <p class="search_title">名称:</p>
              <el-input v-model="search.name" placeholder="请输入"></el-input>
            </div>
            <div class="search_unit">
              <p class="search_title">地址:</p>
              <el-input v-model="search.location" placeholder="请输入"></el-input>
            </div>
            <div class="search_unit">
              <p class="search_title">所属组织:</p>
              <el-input v-model="search.departName" placeholder="请输入"></el-input>
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
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="location" label="地址"></el-table-column>
        <el-table-column prop="depart" label="组织名字"></el-table-column>

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

    <el-dialog title="增加地址" :visible.sync="addshow" width="35%">
      <!--   头部基本档案 -->
      <el-form :inline="true" :model="addform" class="form" @submit.native.prevent>
        <el-form-item label="名称：">
          <el-input v-model="addform.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="地址：">
          <el-input v-model="addform.location" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label="组织：">
          <el-select v-model="addform.depart" placeholder="请选择组织">
            <el-option :label="item.name" :value="item.id" v-for="item in departArr" :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input type="textarea" v-model="addform.content" placeholder="请输入描述"></el-input>
        </el-form-item>
      </el-form>
      <div class="handleDetail" style="padding: 0">
        <p class="close" @click="addSure()">保存</p>
        <p class="close" @click="close()">关闭</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "meet_location_manage",
  data() {
    return {
      search: {
        name: "",
        location: "",
        departName: ""
      },
      addshow: false,
      currentPage: 1, //当前页码
      total: 0, //数据总条数
      pageSize: "10", //每条页数
      pageNum: "1", ////当前页码
      tableData: [],
      addform: {
        name: "",
        location: "",
        depart: "",
        content: ""
      },
      departArr: [],
      isadd: 0,
      idArr: [],
      modifyId: ""
    };
  },
  created() {
    this.getlist();
    this.getdepart();
  },
  methods: {
    Onsearch() {
      this.pageNum = 1;
      this.getlist();
    },
    add() {
      //    添加
      this.addform.name = "";
      this.addform.location = "";
      this.addform.depart = "";
      this.addform.content = "";
      this.modifyId = "";
      this.addshow = true;
      this.isadd = 0;
    },
    addSure() {
      //    确定添加
      if (!this.addform.name) {
        alert("请输入姓名");
        return false;
      }
      if (!this.addform.location) {
        alert("请输入地址");
        return false;
      }
      if (!this.addform.depart) {
        alert("请选择组织");
        return false;
      }
      if (!this.addform.content) {
        alert("请输入详情");
        return false;
      }
      if (this.isadd == 0) {
        //    增加
        this.axios
          .post("/intelligentCommunity/manage/party/conference/location", {
            name: this.addform.name,
            location: this.addform.location,
            departId: this.addform.depart,
            detail: this.addform.content
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
          .post("/intelligentCommunity/manage/party/conference/location", {
            id: this.modifyId,
            name: this.addform.name,
            location: this.addform.location,
            departId: this.addform.depart,
            detail: this.addform.content
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
        .get("/intelligentCommunity/manage/party/conference/getLocation/" + id)
        .then(res => {
          if (res.data.code == 200) {
            this.addform.name = res.data.details.data.name;
            this.addform.location = res.data.details.data.location;
            this.addform.depart = res.data.details.data.departId;
            this.addform.content = res.data.details.data.detail;
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
      // 批量删除
      if (this.idArr.toString() == "") {
        this.$message({
          type: "info",
          message: "请选择删除项!"
        });
        return false;
      }
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios({
            method: "post",
            url: "/intelligentCommunity/manage/party/conference/deleteLocation",
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
      this.axios({
        url: "/intelligentCommunity/manage/party/conference/locations",
        method: "post",
        params: {
          pageSize: this.pageSize,
          pageNum: this.currentPage,
          departName: this.search.departName
        },
        data: {
          name: this.search.name,
          location: this.search.location
        }
      }).then(data => {
        if (data.data.code === 200) {
          this.tableData = data.data.details.list.list;
          this.total = data.data.details.list.total;
        }
      });
    },
    getdepart() {
      this.axios
        .get("/intelligentCommunity/manage/party/commonDeparts")
        .then(data => {
          if (data.data.code === 200) {
            this.departArr = data.data.details.list;
          }
        });
    }
  }
};
</script>

<style scoped>
.el-form--inline .el-form-item {
  width: 100%;
  margin-top: 2%;
  margin-right: 0;
}
</style>
