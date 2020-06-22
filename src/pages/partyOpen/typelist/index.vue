<template>
  <div class="wrap typeList">
    <div class="list">
      <div class="tools">
        <div class="searchForm">
          <div class="searchForm">
            <div class="search_unit">
              <p class="search_title">标题:</p>
              <el-input v-model="search.title" placeholder="请输入"></el-input>
            </div>
            <div class="search_unit">
              <p class="search_title">所属组织:</p>
              <el-input v-model="search.departName" placeholder="请输入"></el-input>
            </div>
            <div class="search_unit">
              <p class="search_title">创建时间:</p>
              <el-date-picker v-model="search.dateStr" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
            </div>
            <div class="search_unit handle">
              <p class="close" @click="Onsearch">搜索</p>
            </div>
          </div>
        </div>
        <div class="handle">
          <p @click="add">新增</p>
          <p @click="opendelete()">删除</p>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%" @selection-change="handleChange">
        <el-table-column type="selection" width="120"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="name" label="所属组织"></el-table-column>
        <el-table-column prop="createDate" label="创建时间"></el-table-column>
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
    <el-dialog :visible.sync="isshow" width="30%">
      <el-form :inline="true" :model="form" class="form">
        <el-form-item label="标题">
          <el-input v-model="form.title" type="textarea" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item label="组织">
          <el-select v-model="form.name" @change="changevalue" placeholder="请选择">
            <el-option v-for="item in partyArr" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="handleDetail">
        <p class="close" @click="sure()">保存</p>
        <p class="close" @click="close()">关闭</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      search: {
        title: "",
        departName: "",
        dateStr: ""
      },
      isshow: false,
      loading: false,
      currentPage: 1, //当前页码
      total: 0, //数据总条数
      pageSize: "10", //每条页数
      pageNum: "1", ////当前页码
      tableData: [],
      form: {
        title: "",
        name: ""
      },
      partyArr: [],
      getId: "",
      getvalueid: "",
      idArr: [],
      isAdd: 0
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    Onsearch() {
        this.pageNum=1;
      this.getlist();
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
        url: "/intelligentCommunity/manage/publicPartyWork/selectDeleteType",
        async: true,
        data: this.idArr
      }).then(data => {
        let isDelete = data.data.details.map;
        if (isDelete["count"] !== 0) {
          this.$message({
            type: "info",
            message: "“" + isDelete.title + "”" + "下有活动，不能删除"
          });
          return false;
        }
        this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.axios
              .get(
                "/intelligentCommunity/manage/publicPartyWork/delPartyWorkType",
                {
                  params: {
                    ids: this.idArr.toString()
                  }
                }
              )
              .then(data => {
                if (data.data.code === 200) {
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });
                  this.pageNum=1;
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
      });
      // 批量删除
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
      this.isshow = true;
      this.isAdd = 1;
      this.form = { title: "", name: "" };
      this.axios
        .get("/intelligentCommunity/manage/partyPhotos/getDepartList")
        .then(res => {
          this.loading = false;
          if (res.data.code === 200) {
            this.partyArr = res.data.details.data;
          }
        });
    },
    opendetail(id) {
      //获取组织
      this.isAdd = 0;
      this.getId = id;
      this.loading = true;
      this.isshow = true;
      this.axios
        .get("/intelligentCommunity/manage/partyPhotos/getDepartList")
        .then(res => {
          this.loading = false;
          if (res.data.code === 200) {
            this.partyArr = res.data.details.data;
          }
        });
      //    打开详情
      this.axios
        .get(
          "/intelligentCommunity/manage/publicPartyWork/getPartyWorkTypeDetail/" +
            id
        )
        .then(res => {
          this.loading = false;
          if (res.data.code === 200) {
            this.form = res.data.details.data;
            this.getvalueid = this.form.departId;
          }
        });
    },
    changevalue(val) {
      this.getvalueid = val;
    },
    sure() {
      //    修改
      if (this.isAdd == 0) {
        this.axios
          .post(
            "/intelligentCommunity/manage/publicPartyWork/savePartyWorkType/",
            {
              id: this.getId,
              departId: this.getvalueid,
              title: this.form.title
            }
          )
          .then(res => {
            this.loading = false;
            if (res.data.code === 200) {
              this.form = res.data.details.data;
              this.$message({
                type: "success",
                message: "修改成功!"
              });
              this.isshow = false;
              this.pageNum=1;
              this.getlist();
            }
          });
      } else if (this.isAdd == 1) {
        // 添加
        if (!this.getvalueid) {
          this.$message({
            type: "info",
            message: "请选择组织!"
          });
          return false;
        }
        if (!this.form.title) {
          this.$message({
            type: "info",
            message: "请输入标题!"
          });
          return false;
        }
        this.axios
          .post(
            "/intelligentCommunity/manage/publicPartyWork/savePartyWorkType/",
            {
              departId: this.getvalueid,
              title: this.form.title
            }
          )
          .then(res => {
            this.loading = false;
            console.log(res);
            if (res.data.code === 200) {
              this.form = res.data.details.data;
              this.$message({
                type: "success",
                message: "添加成功!"
              });
              this.isshow = false;
              this.pageNum=1;
              this.getlist();
            }
          });
      }
    },
    close() {
      this.getId = "";
      this.isshow = false;
    },
    //切换每页条数
    sizeChange(val) {
      this.pageSize = val;
      this.pageNum=1;
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
      // this.axios
      //     .post("/intelligentCommunity/manage/publicPartyWork/getPartyWorkTypeList", {
      //         params: {
      //             pageSize: this.pageSize,
      //             pageNum: this.pageNum
      //         }
      //     })
      if (this.search.dateStr==null) {
          this.search.dateStr=""
      }
      this.axios({
        url:
          "/intelligentCommunity/manage/publicPartyWork/getPartyWorkTypeList",
        method: "post",
        params: {
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          departName:this.search.departName,
          dateStr:this.search.dateStr
        },
        data: {
          title: this.search.title
        }
      }).then(data => {
        this.loading = false;
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
.partyOpen {
  width: 100%;
  height: 100%;
}

.el-form-item {
  display: block !important;
  padding: 1rem 0;
  margin-bottom: 0;
}

.el-form-item:last-child {
  padding-bottom: 2rem;
}
</style>
