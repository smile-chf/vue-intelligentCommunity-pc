<template>
  <div class="wrap">
    <div class="list">
      <!-- <div class="tools">
        <div class="searchForm"></div>
        <div class="handle"></div>
      </div> -->
      <el-table :data="tableData" style="width: 100%" @selection-change="handleChange">
        <!-- <el-table-column type="selection" width="120"></el-table-column> -->
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="departName" label="组织名称"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="createDate" label="创建时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="250">
          <template slot-scope="scope">
            <el-button @click="opendetail(scope.row.id)" type="text" size="small">查看评论</el-button>
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
    <el-dialog title="评论详情" :visible.sync="isshow" @closed="pageNum1=1">
      <div style="padding:0 2rem">
        <el-table :data="gridData">
          <el-table-column property="name" label="姓名"></el-table-column>
          <el-table-column property="depart" label="所属党组织"></el-table-column>
          <el-table-column property="content" label="评论内容"></el-table-column>
          <el-table-column property="audit" label="审核状态">
            <template slot-scope="sc">
              <div v-if="sc.row.audit==0">待审核</div>
              <div v-if="sc.row.audit==1">未通过</div>
              <div v-if="sc.row.audit==2">通过</div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="audit(scope.row.id,2)" type="text" size="mini">同意</el-button>
              <el-button @click="audit(scope.row.id,1)" type="text" size="mini">不同意</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
         <div class="page">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total1"
          :page-size="10"
          :current-page="currentpage1"
          @current-change="changepage"
        ></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

 

<script>
import { queryCommentById,updateAuditById } from "../../../api/http";
export default {
  name: "index",
  data() {
    return {
      gridData: [],
      total1: 10,
      pageNum1: 1,
      currentpage1: 1,
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
      isAdd: 0,
      id: ""
    };
  },
  created() {
    this.getlist();
  },
  methods: {
 async audit(id, val) {
      console.log(id, val);
      let res = await updateAuditById(id,val)
       if (res.code==200) {
           this.$message({
          message: '审核成功',
          type: 'success'
        });

         this.queryCommentById();
       }else{
      this.$message.error('审核失败');
       }
    },

    changepage(val) {
      console.log(val);
      this.pageNum1 = val;
      this.currentpage1 = val;
      this.queryCommentById();
    },

    async queryCommentById() {
      let res = await queryCommentById(this.id, this.pageNum1);
      this.gridData = res.details.data;
      this.total1 = res.details.totalCount;
    },
    handleChange(val) {
      let arr = [];
      for (let i = 0; i < val.length; i++) {
        arr.push(val[i].id);
      }
      this.idArr = arr;
    },

    opendetail(id) {
      this.id = id;
      this.queryCommentById();
      this.isshow = true;
    },
    changevalue(val) {
      this.getvalueid = val;
    },
    sure() {
      this.isshow = false;
    },
    close() {
      this.isshow = false;
    },
    //切换每页条数
    sizeChange(val) {
      this.pageSize = val;
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
        .get("/intelligentCommunity/manage/publicPartyWork/getPartyWorkList", {
          params: {
            pageSize: this.pageSize,
            pageNum: this.pageNum
          }
        })
        .then(data => {
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
<style lang="less" scoped>
.page {
  height: 2rem;
  margin-top: 1.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .el-pagination {
    position: relative;
    justify-content: center;
  }
}
</style>