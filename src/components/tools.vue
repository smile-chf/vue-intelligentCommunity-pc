<template>
  <div class="tools">
    <div>
      <p>姓名</p>
      <input type="text">
    </div>
    <p>增加</p>
    <p>修改</p>
  </div>
</template>

<script>
export default {
  name: 'tools',
  data () {
    return {
      msg: ''
    }
  }
}
</script>

<style scoped>
.tools{
  height: 3.2rem;
  width: 100%;
  background: #fff;
  display: flex;
  align-items: center;
}
.tools p{
  height: 2.2rem;
  width: 5rem;
  background: #f54133;
  margin: 0 .5rem;
  line-height: 2.2rem;
  text-align: center;
  border-radius: .3rem;
  color: #fff;
  cursor: pointer;
}
</style>
