<template>
  <div class="wrap partyPhotos">
    <div class="list" v-if="!addishow">
      <div class="tools">
        <div class="searchForm">
          <div class="searchForm">
            <div class="search_unit">
              <p class="search_title">名称:</p>
              <el-input v-model="search.name" placeholder="请输入"></el-input>
            </div>
            <div class="search_unit">
              <p class="search_title">所属组织:</p>
              <el-input v-model="search.departName" placeholder="请输入"></el-input>
            </div>
            <div class="search_unit">
              <p class="search_title">类型:</p>
              <el-input v-model="search.type" placeholder="请输入"></el-input>
            </div>
            <div class="search_unit">
              <p class="search_title">状态:</p>
              <el-select v-model="search.status">
                <el-option label="全部" value></el-option>
                <el-option label="未建" value="0"></el-option>
                <el-option label="已建" value="1"></el-option>
              </el-select>
            </div>

            <div class="search_unit handle">
              <p class="close" @click="Onsearch">搜索</p>
            </div>
          </div>
        </div>
        <div class="handle">
          <p @click="add()">增加</p>
          <p @click="opendelete()">删除</p>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%" @selection-change="handleChange">
        <el-table-column type="selection" width="120"></el-table-column>
        <el-table-column prop="member" label="姓名"></el-table-column>
        <el-table-column prop="depart" label="组织"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="status" :formatter="getStatus" label="状态"></el-table-column>
        <el-table-column prop="createDate" label="创建时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <el-button @click="opendetail(scope.row.id)" type="text" size="small">详情</el-button>
            <el-button @click="modify(scope.row.id)" type="text" size="small">修改</el-button>
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
    <el-dialog :visible.sync="isShow" width="30%">
      <div class="big_detail_wrap">
        <el-form :inline="true" :model="form" class="form" @submit.native.prevent>
          <div class="line">
            <el-form-item label="标题">
              <el-input v-model="form.title" placeholder="标题"></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-input v-model="form.createDate" placeholder="创建时间"></el-input>
            </el-form-item>
            <el-form-item label="类型">
              <el-input v-model="form.type" placeholder="类型"></el-input>
            </el-form-item>
          </div>
          <div class="line">
            <el-form-item label="状态">
              <el-input v-model="form.status==0?'未建':'已建'" placeholder="状态"></el-input>
            </el-form-item>
          </div>
          <div class="line">
            <div class="imgbox">
              <img :src="item.path" alt v-for="item of form.fileList" />
            </div>
          </div>
        </el-form>
      </div>
    </el-dialog>
    <partyPhoto_add :Id="id" v-if="addishow" @goback="goback"></partyPhoto_add>
  </div>
</template>

<script>
import partyPhoto_add from "./partyPhoto_add";
export default {
  name: "index",
  data() {
    return {
      search: {
        name: "",
        departName: "",
        type: "",
        status: ""
      },
      id: "",
      isShow: false,
      addishow: false,
      loading: false,
      currentPage: 1, //当前页码
      total: 0, //数据总条数
      pageSize: "10", //每条页数
      pageNum: "1", ////当前页码
      tableData: [],
      form: {},
      idArr: []
    };
  },
  created() {
    this.getlist();
  },
  components: {
    partyPhoto_add
  },
  methods: {
    Onsearch() {
        this.pageNum=1;
        this.getlist();
    },
    goback() {
      this.addishow = false;
    },
    modify(id) {
      this.addishow = true;
      this.id = id;
      // this.$router.push({
      //     path: '/index/partyPhotos/partyPhoto_add',
      //     query: {
      //         id: id
      //     }
      // })
    },
    opendetail(id) {
      //    打开详情
      this.isShow = true;
      this.loading = true;
      this.axios
        .get(
          "/intelligentCommunity/manage/partyPhotos/getPartyPhotosDetail/" + id
        )
        .then(res => {
          this.loading = false;
          if (res.data.code === 200) {
            this.form = res.data.details.data;
          }
        });
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
      this.axios
        .get("/intelligentCommunity/manage/partyPhotos/getPartyPhotosList", {
          params: {
            pageSize: this.pageSize,
            pageNum: this.pageNum,
            name: this.search.name,
            departName: this.search.departName,
            type: this.search.type,
            status: this.search.status
          }
        })
        .then(data => {
          this.loading = false;
          if (data.data.code === 200) {
            this.tableData = data.data.details.data;
            this.total = data.data.details.totalCount;
            // this.currentChange = data.data.details.list.pageNum;
          }
        });
    },
    close() {
      this.isShow = false;
    },
    add() {
      this.addishow = true;
      this.id = "";
      // this.$router.push('/index/partyPhotos/partyPhoto_add')
    },
    getStatus(a, b, c) {
      if (c == 0) {
        return "未建";
      } else if (c == 1) {
        return "已建";
      }
    },
    //批量删除
    opendelete() {
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
          this.axios
            .get("/intelligentCommunity/manage/partyPhotos/delPartyPhotos", {
              params: {
                ids: this.idArr.toString()
              }
            })
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
    },
    handleChange(val) {
      let arr = [];
      for (let i = 0; i < val.length; i++) {
        arr.push(val[i].id);
      }
      this.idArr = arr;
    }
  }
};
</script>

<style>
/*.el-form-item {*/
/*    display: block !important;*/
/*    !*padding: 1rem 0;*!*/
/*    margin-bottom: 0;*/
/*}*/

/*.el-form-item:last-child {*/
/*    padding-bottom: 2rem;*/
/*}*/

.imgbox img {
  width: 5rem;
  height: 5rem;
}
</style>
