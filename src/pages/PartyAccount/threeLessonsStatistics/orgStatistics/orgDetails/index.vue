<template>
  <div class="org">
    <div class="topgo">
      <div class="toptext" @click="gopreviouspage">< &nbsp;&nbsp;&nbsp; 返回</div>
      <div>{{tableData.departName}}</div>
    </div>
    <div class="searchtop">
      <el-input
        size="small"
        placeholder="请输入会议主题"
        style="width:200px;margin-right:20px"
        suffix-icon="el-icon-search"
        v-model="searchname"
      ></el-input>

      <el-select
        v-model="org"
        size="small"
        style="width:200px;margin-right:20px"
        placeholder="请选择分类"
      >
        <el-option v-for="(item, index) in op" :key="index" :value="item"></el-option>
      </el-select>
      <el-button type="warning" style="margin-left:20px" @click="search" size="small">查询</el-button>
    </div>
    <div class="bodyright">
      <div class="btop"></div>

      <el-table :data="tableData.list" style="width: 100%;background-color:#fff">
        <el-table-column prop="subject" label="会议"></el-table-column>
        <el-table-column prop="type" label="主题分类"></el-table-column>
        <el-table-column prop="name" label="所属组织"></el-table-column>
        <el-table-column prop="location" label="会议地点"></el-table-column>
        <el-table-column prop="conferenceDate" label="会议时间"></el-table-column>
        <el-table-column prop="createTime" label="创建时间">
           <template slot-scope="scope">
            <div>{{$d(scope.row.createTime).format("YYYY-MM-DD   hh:mm:ss")}}</div>
            <!-- <div>{{scope.row.createTime}}</div> -->
          </template>
        </el-table-column>
      </el-table>

      <div class="page">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :page-size="10"
          :current-page="currentpage"
          @current-change="changepage"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getConferenceType, getDepartDataDetail } from "@/api/http";
export default {
  data() {
    return {
      total: 0,
      currentpage: 1,
      pageNum: 1,
      op: [],
      id: "",
      searchname: "",
      searchdata: "",
      org: "",
      tableData: [
        {
          date: "1",
          name: "2",
          address: "3"
        },
        {
          date: "1",
          name: "2",
          address: "3"
        },
        {
          date: "1",
          name: "2",
          address: "3"
        }
      ]
    };
  },
  methods: {
    changepage(val) {
      console.log(val);
      this.pageNum = val;
      (this.currentpage = val), this.getDepartDataDetailvue();
    },
    search() {
      this.currentpage = 1;
      this.pageNum=1
      this.getDepartDataDetailvue();
    },
    gopreviouspage() {
      this.$router.push({
        path: "/threeLessonsStatistics",
        query: { surepage: 3 }
      });
    },
    async getConferenceTypevue() {
      let res = await getConferenceType();
      this.op = res.details.data;
    },
    async getDepartDataDetailvue() {
      let res = await getDepartDataDetail({
        departId: this.id,
        subject: this.searchname,
        type: this.org,
        pageSize: 10,
        pageNum: this.pageNum
      });
       this.tableData=res.details.data
      this.total=res.details.data.totalCount
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    console.log(this.id);
    this.getConferenceTypevue();
    this.getDepartDataDetailvue();
  }
};
</script>

<style lang="less" scoped>
.topgo {
  display: flex;
  height: 1.5rem;
  width: 100%;
  background-color: #fff;
  align-items: center;
  box-sizing: border-box;
  padding-top: 0.5rem;
  div {
    color: #909399;
  }
}

.page {
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
.org {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 1.5rem;
}
.bodyright {
  box-sizing: border-box;
  padding: 0 2rem 2rem 2rem;
  flex: 1;
  background-color: #fff;
  .btop {
    position: relative;
    width: 100%;
    height: 2.5rem;
    border-bottom: 1px solid #fef6f6;
    text-indent: 2rem;
    line-height: 2.5rem;
    color: #212121;
    font-size: 0.9rem;
    font-weight: 600;
  }
}
.checkman {
  position: absolute;
  color: #f58733;
  font-weight: 400;
  font-size: 0.7rem;
  right: 6rem;
  top: 0;
  cursor: pointer;
  text-align: center;
  text-indent: 0;
}
.getdata {
  position: absolute;
  color: #f58733;
  font-weight: 400;
  font-size: 0.7rem;
  right: 1rem;
  top: 0;
  cursor: pointer;
  text-align: center;
  text-indent: 0;
}
.searchtop {
  width: 100%;
  height: 3.2rem;
  background-color: #fff;
  margin-bottom: 0.9rem;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: 1rem;
}
.toptext {
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  color: #909399;
  margin-right: 3rem;
  cursor: pointer;
}
</style>
<style lang="less">
.org {
  .el-table th,
  .el-table tr {
    background-color: #fff !important;
  }
  .el-table__body {
    width: 100% !important;
  }
  .el-table__header {
    width: 100% !important;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #e92525;
    color: #fff;
  }
  .el-pager li.active {
    color: #e92525;
    cursor: default;
  }
  .el-pagination.is-background .el-pager li:not(.disabled):hover {
    color: #e92525;
  }
}
</style>