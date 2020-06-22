<template>
  <div
    class="block"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0)"
  >
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
            <el-table-column type="selection" width="120"></el-table-column>
            <el-table-column prop="name" label="姓名" width="100"></el-table-column>
            <el-table-column prop="departName" label="组织" width="320"></el-table-column>
            <el-table-column prop="readCount" label="阅读图文数"></el-table-column>
            <el-table-column prop="commentCount" label="评论条数"></el-table-column>
            <el-table-column prop="likeCount" label="点赞数"></el-table-column>
            <el-table-column prop="collectCount" label="收藏数"></el-table-column>


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
import { getDepartTree, pubgetPersonalData } from "@/api/http";
import { derive } from "../../../../utils/derive";
export default {
  data() {
    return {
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
            "/intelligentCommunity/manage/statistics/publicPartyWork/exportPersonalData",
          ids: a,
          filename: "党务公开个人统计表"
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

      let res = await pubgetPersonalData({
        pageSize: 10,
        pageNum: this.pageNum,
        departId: this.departId,
        ...this.search
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
  watch: {
    "$store.state.six": {
      handler() {
        if (this.$store.state.six.data == 38) {
          this.search.startDate = "";
          this.search.endDate = "";
          this.search.username = this.$store.state.six.username;
        } else {
          this.search.startDate = this.$store.state.six.data[0];
          this.search.endDate = this.$store.state.six.data[1];
          this.search.username = this.$store.state.six.username;
        }
        if (this.search.endDate == undefined) {
          this.search.endDate = "";
        }
        if (this.search.startDate == undefined) {
          this.search.startDate = "";
        }

        console.log(this.search);
        this.currentpage = 1;

        this.getPersonalDatavue();
      },
      deep: true
    }
  }
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
  width: 100%;
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
  height: 100%;

  .bodyleft {
    width: 14.5rem;
    height: 100%;
    background-color: #fff;
    margin-right: 0.5rem;
    box-sizing: border-box;
    padding: 1rem;
  }
  .bodyright {
    //    ::-webkit-scrollbar {display:none}
    flex: 1;
    width: 100%;
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
</style>
