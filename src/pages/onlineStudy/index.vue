<template>
  <div class="wrap onlineStudy">
    <div class="list">
      <div class="tools">
        <div class="searchForm">
          <div class="searchForm">
            <div class="search_unit">
              <p class="search_title">类型:</p>
              <el-input v-model="search.title" placeholder="请输入"></el-input>
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
        <el-table-column prop="name" label="类型"></el-table-column>
        <!--                <el-table-column prop="createTime" :formatter="gettime" label="创建时间"></el-table-column>-->
        <el-table-column prop="depart" label="机构"></el-table-column>
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
    <!-- 修改 -->
    <el-dialog :visible.sync="isShow" width="30%">
      <div class="small_detail_wrap">
        <!--   头部基本档案 -->
        <el-form :inline="true" :model="form" class="form" @submit.native.prevent>
          <el-form-item label="组织">
            <el-select v-model="form.depart" @change="changevalue" placeholder="请选择">
              <el-option
                v-for="item in partyArr"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="form.name" type="textarea" placeholder="标题"></el-input>
          </el-form-item>
        </el-form>
        <div class="handleDetail" style="padding: 0">
          <p class="close" @click="sure()">保存</p>
          <p class="close" @click="close()">关闭</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
        search:{
         title:"",
         departName:""
        },
      isShow: false,
      loading: false,
      currentPage: 1, //当前页码
      total: 0, //数据总条数
      pageSize: "10", //每条页数
      pageNum: "1", ////当前页码
      tableData: [],
      form: {
        depart: "",
        name: ""
      },
      isAdd: 0,
      partyArr: [],
      getvalueid: "",
      modifyId: "",
      idArr: []
    };
  },
  created() {
    this.getlist();
    this.axios
      .get("/intelligentCommunity/manage/partyPhotos/getDepartList")
      .then(res => {
        this.loading = false;
        if (res.data.code === 200) {
          this.partyArr = res.data.details.data;
        }
      });
  },
  methods: {
      Onsearch(){
          this.pageNum=1
      this.getlist();
      },
    opendetail(id) {
      this.isAdd = 0;
      this.modifyId = id;
      //    打开详情  修改
      this.isShow = true;
      this.axios
        .get("/intelligentCommunity/manage/education/getLessonTypeById/" + id)
        .then(res => {
          if (res.data.code === 200) {
            this.form.name = res.data.details.data.name;
            this.form.depart = res.data.details.data.departId;
          }
        });
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

      this.axios({
        method: "post",
        url: "/intelligentCommunity/manage/education/queryByIdCount",
        async: true,
        data: this.idArr
      }).then(data => {
        if (data.data.code == 200) {
          let isDelete = data.data.details.map;
          if (isDelete["countId"] !== 0) {
            this.$message({
              type: "info",
              message: "“" + isDelete.name + "”" + "下有记录，不能删除"
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
                url: "/intelligentCommunity/manage/education/deleteLessonType",
                data: this.idArr
              }).then(data => {
                if (data.data.code === 200) {
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                  this.pageNum=1
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
    handleChange(val) {
      let arr = [];
      for (let i = 0; i < val.length; i++) {
        arr.push(val[i].id);
      }
      this.idArr = arr;
    },
    add() {
      //    增加
      this.form.name = "";
      this.form.depart = "";
      this.isAdd = 1;
      this.isShow = true;
    },
    sure() {
      //    修改确定
      if (this.isAdd == 0) {
        this.axios
          .post("/intelligentCommunity/manage/education/saveLessonType", {
            id: this.modifyId,
            name: this.form.name,
            departId: this.form.depart
          })
          .then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: "success",
                message: "修改成功!"
              });
              this.isShow = false;
              this.pageNum=1
              this.getlist();
            }
          });
      } else {
        if (!this.form.name) {
          this.$message({
            type: "info",
            message: "请输入标题!"
          });
          return false;
        }
        if (!this.form.depart) {
          this.$message({
            type: "info",
            message: "请选择组织!"
          });
          return false;
        }
        this.axios
          .post("/intelligentCommunity/manage/education/saveLessonType", {
            name: this.form.name,
            departId: this.form.depart
          })
          .then(res => {
            if (res.data.code === 200) {
              this.$message({
                type: "success",
                message: "添加成功!"
              });
              this.isShow = false;
              this.pageNum=1
              this.getlist();
            }
          });
      }
    },
    close() {
      //    关闭弹窗
      this.isShow = false;
      this.modifyId = "";
      this.form.name = "";
      this.form.depart = "";
    },

    changevalue(val) {
      this.getvalueid = val;
    },
    //切换每页条数
    sizeChange(val) {
      this.pageSize = val;
      this.pageNum=1
      this.getlist();
    },
    //切换页码
    currentChange(val) {
      this.pageNum = val;
      this.currentPage = val;
      this.getlist();
    },
    getlist() {
      this.loading = true;
      this.axios
        .get("/intelligentCommunity/manage/education/types", {
          params: {
            pageSize: this.pageSize,
            pageNum: this.pageNum,
            title:this.search.title,
            departName:this.search.departName
          }
        })
        .then(data => {
          this.loading = false;
          if (data.data.code === 200) {
            this.tableData = data.data.details.list.list;
            this.total = data.data.details.list.total;
            // this.currentChange = data.data.details.list.pageNum;
          }
        });
    },
    gettime(a, b, c) {
      var d = new Date(c);
      var y = d.getFullYear();
      var m = d.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = d.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
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
