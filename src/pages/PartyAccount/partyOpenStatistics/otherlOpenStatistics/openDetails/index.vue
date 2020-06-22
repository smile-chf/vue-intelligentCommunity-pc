<template>
  <div class="org">
      <div class="topgo">
        <div class="toptext" @click="gopreviouspage"> < &nbsp;&nbsp;&nbsp; 返回 </div>
        <div>姓名</div>
      </div>
    <div class="searchtop">
      <el-input
        size="small"
        placeholder="请输入姓名"
        style="width:200px;margin-right:20px"
        suffix-icon="el-icon-search"
        v-model="searchname"
      ></el-input>

      <el-select v-model="org" size="small" style="width:200px;margin-right:20px" placeholder="请选择">
        <!-- <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        ></el-option>-->
      </el-select>
      <el-select v-model="org" size="small" style="width:200px;margin-right:20px" placeholder="请选择">
        <!-- <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        ></el-option>-->
      </el-select>

    
    </div>
    <div class="bodyright">
      <div class="btop">
        组织子部二组织子部二组织子部二组织子部二
        <div class="getdata">导出数据</div>
      </div>

      <el-table :data="tableData" style="width: 100%;background-color:#fff">
        <el-table-column prop="date" label="姓名"></el-table-column>
        <el-table-column prop="name" label="年龄"></el-table-column>
        <el-table-column prop="address" label="党龄"></el-table-column>
        <el-table-column prop="address" label="性别"></el-table-column>
        <el-table-column prop="address" label="学历"></el-table-column>
        <el-table-column prop="address" label="民族"></el-table-column>

   
      </el-table>

      <div class="page">
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        searchname:'',
        searchdata:"",
        org:"",
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
      gopreviouspage(){
          this.$router.push({path:"/index/partyOpenStatistics/otherlOpenStatistics",query:{surepage:2}})
      }
  },
};
</script>

<style lang="less" scoped>
.topgo{
     display: flex;
    height: 1.5rem;
    width: 100%;
    background-color: #fff;
    align-items: center;
    box-sizing: border-box;
    padding-top: 0.5rem;
      div{
        color: #909399 ;
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
.toptext{
    box-sizing: border-box;
    padding: 0.5rem  1rem;
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