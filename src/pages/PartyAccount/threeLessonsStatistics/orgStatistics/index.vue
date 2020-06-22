<template>
  <div class="org"  v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0)">
    <div class="bodyright">
      <div class="btop">
        
        <div class="getdata"  @click="derive">导出数据</div>
      </div>

      <el-table :data="datalist.list" style="width: 100%;background-color:#fff"   @selection-change="handleChange">
          <el-table-column type="selection" width="120"></el-table-column>
        <el-table-column :prop="item.value" :label="item.name" v-for="(item, index) in datalist.typeList" :key="index">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="nextpage(scope.row.id)">查看</el-button>
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
import {getDepartData} from '../../../../api/http'
import {derive} from '../../../../utils/derive'
export default {
  data() {
    return {
      loading:false,
      idlist:[],
      total:0,
      currentpage:1,
      pageNum:1,
      search:{},
      datalist:{},
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
       async derive() {
      if (this.idlist.length == 0) {
        this.$message({
          showClose: true,
          message: "请选择导出人员",
          type: "error"
        });
      } else {
        let a = this.idlist.toString();
      derive({url:'/intelligentCommunity/manage/statistics/conference/exportDepartData',ids:a,filename:"三会一课组织统计表"})
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
      (this.currentpage = val), 
      this.getDepartDatavue()
    },


 async  getDepartDatavue(){
   this.loading=true
let res= await getDepartData({
 pageNum:this.pageNum,
 pageSize:10,
 ...this.search
})
this.datalist=res.details.data
this.total = res.details.data.totalCount;
 this.loading=false
 },
    nextpage(id){
      console.log(id);
      
      this.$router.push({path:'/index/orgDetails',query:{id}})
    }
  },
  mounted() {
    this.getDepartDatavue()
  },
  watch: {
    "$store.state.three": {
      handler() {
        console.log(this.$store.state.three);
        if (this.$store.state.three.data.length==0) {
          this.search.startDate = "";
          this.search.endDate = "";
        }else{
          this.search.startDate = this.$store.state.three.data[0];
          this.search.endDate = this.$store.state.three.data[1];
        }
        this.search.departId= this.$store.state.three.departId
        this.search.type= this.$store.state.three.type
         console.log(this.search);

      this.getDepartDatavue()

      },
      deep: true
     
      
    }
  }
};
</script>

<style lang="less" scoped>
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
  background-color: #fff;
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