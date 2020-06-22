<template>
  <div class="org">
    <div class="topgo">
      <div class="toptext" @click="gopreviouspage">< &nbsp;&nbsp;&nbsp; 返回</div>
      <div>{{resdata.name}}</div>
    </div>
    <div class="searchtop">
      <el-input
        size="small"
        placeholder="请输入姓名"
        style="width:200px;margin-right:20px"
        suffix-icon="el-icon-search"
        v-model="searchname"
      ></el-input>
      <el-select
        v-model="org"
        size="small"
        style="width:200px;margin-right:20px"
        placeholder="请选择会议分类"
      >
      
        <el-option
          v-for="(item, index) in options"
          :key="index"
          :value="item.id"
          :label="item.name"
        ></el-option>
      </el-select>

       <el-button type="warning" style="margin-left:20px" @click="search" size="small">查询</el-button>

    </div>
    <div class="bodyright">
      <el-table :data="resdata.list" style="width: 100%;background-color:#fff">
        <el-table-column prop="title" label="试卷名称"></el-table-column>
        <el-table-column prop="update_time" label="答题时间">
          <template slot-scope="a">
            <div>
              {{$d(a.row.update_time).format("YYYY-MM-DD  HH:mm:ss")}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="isPass" label="成绩状态"></el-table-column>
        <el-table-column prop="deadline" label="试卷有效期">
           <template slot-scope="a">
            <div>
              {{$d(a.row.deadline).format("YYYY-MM-DD  HH:mm:ss")}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间">
           <template slot-scope="a">
            <div>
              {{$d(a.row.create_time).format("YYYY-MM-DD  HH:mm:ss")}}
            </div>
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
import {
 
  onlgetPersonalDataDetail
} from "../../../../../api/http";
export default {
  data() {
    return {
      pageNum: "1",
      total:0,
      currentpage:1,
      resdata: {},
      options: [
        {id:"",name:"全部"},
        {id:"1",name:"通过"},
        {id:"0",name:"未通过"},
      ],
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
    search(){
     
      
      this.currentpage = 1;
      this.pageNum=1
      this.edugetPersonalDataDetailvue();
    },
      changepage(val) {
      console.log(val);
      this.pageNum = val;
      this.currentpage = val
      this.edugetPersonalDataDetailvue();
    },
    gopreviouspage() {
      this.$router.push({
        path: "/index/onlineStudyStatistics/otherOnline",
        query: { surepage: 2 }
      });
    },
    // async getLessonTypevue() {
    //   let res = await getLessonType();
    //   this.options = res.details.data;
    // },
    async edugetPersonalDataDetailvue() {
      let res = await onlgetPersonalDataDetail({
        id: this.id,
        title: this.searchname,
        type: this.org,
        pageNum: this.pageNum,
      });
      this.resdata = res.details.data;
      this.total=res.details.data.totalCount
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    console.log(this.id);
    // this.getLessonTypevue();
    this.edugetPersonalDataDetailvue();
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
  flex: 1;
  background-color: #fff;
  box-sizing: border-box;
  padding: 2rem;
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