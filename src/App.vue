<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
    data(){
      return{
          isRouterAlive:true
      }
    },
    provide(){ //提供
        return {
            reload: this.reload
        }
    },
    methods: {
        reload(){
            this.isRouterAlive = false;
            this.$nextTick( function () {
                this.isRouterAlive = true
            })
        }
    }
}
</script>

<style>
#app{
  height: 100vh;
  width: 100%;
  /*min-width: 1817px;*/
}
.el-table-column--selection .cell{
  padding-left: 10px!important;
}
.el-submenu .el-menu-item{
  min-width: 0!important;
}

.el-input__inner{
    vertical-align: bottom !important;
}
.el-tree-node__content {
    margin-bottom: 8px;
}
</style>
