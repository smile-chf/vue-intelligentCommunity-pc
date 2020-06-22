<template>
  <div class="threeLessonsStatistics">
    <div class="tabbar">
      <div :class="surepage==1?'active': 'noactive'" @click="changepage(1)">汇总统计</div>
      <div :class="surepage==2?'active': 'noactive'" @click="changepage(2)">个人统计</div>
      <div :class="surepage==3?'active': 'noactive'" @click="changepage(3)">组织统计</div>
    </div>
    <div class="searchtop">
      <div v-if="surepage==1 " style="display:flex">
        <el-select
          v-model="searchorg"
          size="small"
          placeholder="请选择"
          style="width:350px;margin-right:30px"
        >
          <el-option v-for="item in orgdata" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>

        <!-- <el-date-picker
          size="small"
          v-model="searchdata"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>-->

        <el-date-picker
          size="small"
          v-model="searchdata"
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
          v-model="nomsearchname"
        ></el-input>
        <!-- <el-date-picker
          size="small"
          v-model="nomsearchdata"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>-->

        <el-date-picker
          size="small"
          v-model="nomsearchdata"
          type="monthrange"
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          value-format="yyyy-MM"
        ></el-date-picker>
      </div>
      <div v-if="surepage==3">
        <el-select
          v-model="org"
          size="small"
          style="width:200px;margin-right:20px"
          placeholder="请选择组织"
        >
          <el-option v-for="item in orgdata" :key="item.id" :label="item.name" :value="item.id"></el-option>
          <!-- <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>-->
        </el-select>
        <el-select
          v-model="type"
          size="small"
          style="width:200px;margin-right:20px"
          placeholder="请选择组织类型"
        >
          <el-option label="党总支" value="1"></el-option>
          <el-option label="党支部" value="2"></el-option>
        </el-select>

        <!-- <el-date-picker
          size="small"
          v-model="searchdata3"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>-->
        <el-date-picker
          size="small"
          v-model="searchdata3"
          type="monthrange"
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          value-format="yyyy-MM"
        ></el-date-picker>
      </div>
      <el-button type="warning" style="margin-left:20px" @click="search" size="small">查询</el-button>
    </div>

    <div class="body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { getDepartList } from "../../../api/http";
export default {
  data() {
    return {
      searchdata3: [],
      type: "",
      orgdata: [],
      surepage: 1,
      searchorg: "",
      searchdata: "",
      org: "",
      nomsearchdata: [],
      nomsearchname: ""
    };
  },
  methods: {
    changepage(val) {
      console.log(val);

      this.surepage = val;
      if (val == 1) {
        this.$router.push({ path: "/threeLessonsStatistics/allStatistics" });
      }
      if (val == 2) {
        this.$router.push({
          path: "/threeLessonsStatistics/personageStatistics"
        });
      }
      if (val == 3) {
        this.$router.push({ path: "/threeLessonsStatistics/orgStatistics" });
      }
    },
    search() {
      if (this.surepage == 1) {
        this.$store.commit("add", {
          searchorg: this.searchorg,
          searchdata: this.searchdata
        });
      }
      if (this.surepage == 2) {
        this.$store.commit("add1", {
          nomsearchname: this.nomsearchname,
          nomsearchdata: this.nomsearchdata
        });
      }
      if (this.surepage == 3) {
        this.$store.commit("add3", {
          departId: this.org,
          type: this.type,
          data: this.searchdata3
        });
      }

      // console.log(this.$store.state);
    }
  },

  mounted() {
    this.surepage = this.$route.query.surepage;
    if (this.surepage == undefined) {
      this.surepage = 1;
    }
    console.log(this.surepag);

    if (this.surepage == 2) {
      this.$router.push({
        path: "/threeLessonsStatistics/personageStatistics"
      });
    } else {
      if (this.surepage == 3) {
        this.$router.push({ path: "/threeLessonsStatistics/orgStatistics" });
      } else {
        this.$router.push({ path: "/threeLessonsStatistics/allStatistics" });
      }
    }
  },
  watch: {
    $route: {
      handler() {
        this.$route.query.data;

        if (this.surepage == undefined) {
          this.surepage = 1;
        }
        if (this.surepage == 2) {
          this.$router.push({
            path: "/threeLessonsStatistics/personageStatistics"
          });
        } else {
          if (this.surepage == 3) {
            this.$router.push({
              path: "/threeLessonsStatistics/orgStatistics"
            });
          } else {
            this.$router.push({
              path: "/threeLessonsStatistics/allStatistics"
            });
          }
        }
      },
      deep: true
    }
  },
  async created() {
    let res = await getDepartList();
    this.orgdata = res.details.data;
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
  display: flex;
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
  height: 100%;
}
</style>
<style lang="less">
.el-select .el-input.is-focus .el-input__inner {
  border-color: #e92525;
}
</style>