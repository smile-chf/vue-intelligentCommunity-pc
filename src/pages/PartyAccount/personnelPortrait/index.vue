<template>
  <div class="block"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0)">
    <div class="searchtop">
      <el-input
        size="small"
        placeholder="请输入姓名"
        style="width:200px;margin-right:20px"
        suffix-icon="el-icon-search"
        v-model="searchname"
      ></el-input>

       <el-date-picker
          size="small"
          v-model="searchdata"
          type="monthrange"
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          value-format="yyyy-MM"
        ></el-date-picker>
      <el-button type="warning" style="margin-left:20px" size="small" @click="seach">查询</el-button>
    </div>

      <div class="body">
      <div class="bodyleft">
        <el-tree
          :data="data5"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          @node-click="dosome"
        >
          <span class="custom-tree-node" slot-scope="{node,data}">
            <span>
              <!-- <i :class="node.icon"></i> -->
              <img :src="data.icon" style="width:15px;height:15px" alt />
              {{ node.label }}
            </span>
          </span>
        </el-tree>
      </div>
      <div class="bodyright">
        <div class="btop">
          <div v-if="title!=''">{{title}}</div>
          <div v-else>全部</div>
          <!-- <div class="checkman">选择成员</div> -->
          <div class="getdata" @click="derive">导出数据</div>
        </div>

        <div style="width:100%">
          <el-table
            :data="tableData"
            style="width: 100%;background-color:#fff"
            @selection-change="handleChange"
          >
            <el-table-column type="selection" ></el-table-column>
            <el-table-column prop="name" label="姓名" width="100"></el-table-column>
            <el-table-column prop="departName" label="组织"  ></el-table-column>
            <el-table-column prop="age" label="年龄"></el-table-column>
            <el-table-column prop="joinPartyYear" label="党龄"></el-table-column>
            <el-table-column prop="gender" label="性别"></el-table-column>
            <el-table-column prop="education" label="学历"></el-table-column>
            <el-table-column prop="nationality" label="民族"></el-table-column>
            <el-table-column prop="actualJoinCount" label="三会一课(参加次数)"  width="150"></el-table-column>
            <el-table-column prop="studyLessonCount" label="教育学习(学习课程数)" width="160"></el-table-column>
            <el-table-column prop="readCount" label="查看党务公开数"  width="150"></el-table-column>
            <el-table-column prop="examCount" label="在线考试(参加场次)"  width="150"></el-table-column>


          </el-table>
        </div>

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
  </div>
</template>

<script>
import { getDepartTree,getMemberListData } from "@/api/http";
import { derive } from "../../../utils/derive";
export default {
  data() {
    return {
      loading:false,
      startDate:'',
      endDate:'',
      search: {},
      data: [],
      data5: [

      ],
      searchdata: "",
      searchname: "",
      tableData: [],
      title: "",
      departId: "",
      currentpage: 1,
      loading: false,
      total: 0,
      pageNum: "1",
      idlist: []
    };
  },

  methods: {
    seach(){

     if(this.searchdata==null || this.searchdata==""){
      this.startDate=''
      this.endDate=''
      }else{
      this.startDate=this.searchdata[0]
      this.endDate=this.searchdata[1]
      }
     this.currentpage = 1;
      this.getPersonalDatavue();
    //  console.log(this.searchname);
    //  console.log( this.startDate);
    //  console.log( this.endDate);
    },


    async derive() {
      if (this.idlist.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择导出人员",
          type: "error"
        });
      } else {
        let a = this.idlist.toString();
        console.log(a);

        derive({
          url:
            "/intelligentCommunity/manage/statistics/member/exportMemberData",
          ids: a,
          filename: "人员画像表格"
        });
      }
    },
    handleChange(val) {
      // console.log(val);
      this.idlist = [];
      val.forEach(item => {
        this.idlist.push(item.id);
      });
      console.log(this.idlist);
    },
    changepage(val) {
      console.log(val);
      this.pageNum = val;
      this.currentpage = val;
      this.getPersonalDatavue();
    },

    dosome(a, b, c) {
      this.title = a.label;
      this.departId = a.id;
      this.currentpage = 1;
      this.getPersonalDatavue();
    },


    async getDepartTreevue() {
      let res = await getDepartTree();
      this.data5 = JSON.parse(
        JSON.stringify(res.details.data).replace(/name/g, "label")
      );
      this.data = res.details.data;

      console.log(this.data5);
    },
    async getPersonalDatavue() {
      this.loading = true;

      let res = await getMemberListData({
        pageSize: 10,
        pageNum: this.pageNum,
        departId: this.departId,
        username:this.searchname,
        startDate:this.startDate,
        endDate:this.endDate
      });
      this.tableData = res.details.data.list;
      this.total = res.details.data.totalCount;
      this.pageNum = 1;
      this.loading = false;
    }
  },
  mounted() {
    this.getDepartTreevue();
    this.getPersonalDatavue();
  },

};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  padding-right: 10px;
}
</style>
<style lang="less">
.block {
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
  .el-tree-node:focus > .el-tree-node__content {
    color: red;
  }
  .el-tree-node__content:hover {
    background-color: #feeeee;
  }
  .el-tree-node__expand-icon {
    font-size: 18px;
  }
  .el-table,
  .el-table__expanded-cell {
    background-color: #fff !important ;
  }
  .el-table th,
  .el-table tr {
    background-color: #fff !important;
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: rgba(233, 37, 37, 0.08);
    // background-color: #feeeee;
  }
}
.el-input.is-active .el-input__inner,
.el-input__inner:focus {
  border-color: #e92525;
  outline: 0;
}
.el-range-editor.is-active,
.el-range-editor.is-active:hover {
  border-color: #e92525;
}
.el-date-table td.today span {
  color: #e92525;
  font-weight: 700;
}
.el-date-table td.end-date span,
.el-date-table td.start-date span {
  background-color: #e92525;
}
.el-date-table td.available:hover {
  color: #e92525;
}
</style>


<style lang="less" scoped>
.block {
  height: 100%;
  box-sizing: border-box;
  padding: 1.5rem;
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
.body {
  display: flex;
  width: 100%;
  height: 90%;

  .bodyleft {
    width: 14.5rem;
    height: 100%;
    background-color: #fff;
    margin-right: 0.5rem;
    box-sizing: border-box;
    padding: 1rem;
  }
  .bodyright {
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
.page{
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
