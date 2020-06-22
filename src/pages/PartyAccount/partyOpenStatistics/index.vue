<template>
  <div class="threeLessonsStatistics">
    <div class="tabbar">
      <div :class="surepage==1?'active': 'noactive'" @click="changepage(1)">汇总统计</div>
      <div :class="surepage==2?'active': 'noactive'" @click="changepage(2)">个人统计</div>
    </div>
    <div class="searchtop">
      <div v-if="surepage==1 ">
          <el-date-picker
          size="small"
          v-model="yeardata"
          type="year"
          value-format="yyyy"
          placeholder="选择年"
        ></el-date-picker>
      </div>

      <div v-if="surepage==2">
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
      </div>
      <el-button type="warning" style="margin-left:20px" size="small" @click="search">查询</el-button>
    </div>

    <div class="body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      yeardata:"",
      surepage: 1,
      searchname: "",
      searchdata: "",
      org: ""
    };
  },
  methods: {
   search(){
    if (this.surepage==1) {
        this.$store.commit("pushsome6",{
        yeardata:this.yeardata
      })
   }else{
         
      if (this.searchdata==null) {
        this.$store.commit("pushsome7",{
         username:this.searchname,
         data:38
      })
        
      }else{
         this.$store.commit("pushsome7",{
         username:this.searchname,
         data:this.searchdata
      })
      }
    }
   },
 

    changepage(val) {
      console.log(val);
      
      this.surepage = val;
      if (this.surepage  == 1) {
        this.$router.push({
          path: "/index/partyOpenStatistics/allOpenStatistics"
        });
      }
        if (this.surepage  == 2) {
          this.$router.push({
            path: "/index/partyOpenStatistics/otherlOpenStatistics"
          });
        }
    }
  },
  mounted() {
    this.surepage = this.$route.query.surepage;
      if (this.surepage == undefined) {
          this.surepage = 1;
        }

    if (this.surepage == 1) {
      this.$router.push({
        path: "/index/partyOpenStatistics/allOpenStatistics"
      });
    } else {
          this.$router.push({
          path: "/index/partyOpenStatistics/otherlOpenStatistics"
        })
    }
  },
  watch: {
    $route: {
      handler() {
        this.$route.query.data;
        if (this.surepage == undefined) {
          this.surepage = 1;
        }
        if (this.surepage == 1) {
          this.$router.push({
            path: "/index/partyOpenStatistics/allOpenStatistics"
          });
        }
        if (this.surepage == 2) {
            this.$router.push({
              path: "/index/partyOpenStatistics/otherlOpenStatistics"
            });
        }
      },
      deep: true
    }
  }
};
</script>

<style lang="less" scoped>
.threeLessonsStatistics {
  height: 100%;
  box-sizing: border-box;
  padding: 1.5rem;
}
.tabbar {
  width: 100%;
  height: 2.2rem;
  background-color: #fff;
  display: flex;
  box-sizing: border-box;
  padding: 0 1.5rem;
  div {
    width: 10rem;
    height: 90%;
    line-height: 2.2rem;
    text-align: center;
    font-size: 0.8rem;

    cursor: pointer;
  }
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
.active {
  border-bottom: 1px solid #e92525;
  color: #e92525;
}
.noactive {
  color: #6f6f6f;
}
.body {
  width: 100%;
  height: 85%;
}
</style>
<style lang="less">
.el-select .el-input.is-focus .el-input__inner {
  border-color: #e92525;
}
</style>