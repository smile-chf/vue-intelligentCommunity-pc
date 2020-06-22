<template>
  <div class="login">
    <div class="box">
      <p class="title">智慧党建后台管理系统</p>
      <el-input v-model="username" placeholder="请输入账号"></el-input>
      <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
      <el-alert v-if="isshow1" class="popup" title="账号或密码错误" type="error" center show-icon></el-alert>
      <el-alert v-if="isshow2" class="popup" title="网络错误" type="error" center show-icon></el-alert>
      <p @click="login" class="btn">登录</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      isshow1:false,
      isshow2:false,
      username: "",
      password: ""
    };
  },
  created() {
    let that = this;
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        that.login();
         return false;
      }
    };
  },
  methods: {
    login() {
      this.axios
        .post("/intelligentCommunity/user/login", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$router.push("/index");
          } else if (res.data.code == 403) {
            this.isshow1=true
          } else {
            this.isshow2=true
          }
        }).catch( res =>{
            alert("网络错误")
      });
    }
  }
};
</script>

<style scoped>
.popup{
  position: absolute;
  left: 12%;
  top: 66%;
  width: 76%;

}
.login {
  width: 100vw;
  height: 100vh;
  background: url("../assets/img/login_bg.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login::before {
  content: "";
  display: table;
}
.box {
  width: 20rem;
  height: 18rem;
  background: #fff;
  border-radius: 0.3rem;
  box-sizing: border-box;
  text-align: center;
  position: relative;
}
.title {
  font-size: 1.3rem;
  color: #333333;
  font-weight: 500;
  margin-top: 11.11%;
  margin-bottom: 6%;
}
.el-input {
  width: 75.5%;
  height: 10%;
  margin-top: 1.15rem;
}
.btn {
  width: 75.5%;
  height: 2.2rem;
  background: #e92525;
  border-radius: 0.3rem;
  font-size: 0.8rem;
  color: #ffffff;
  line-height: 2.2rem;
  text-align: center;
  margin-left: 12.25%;
  margin-top: 3rem;
  cursor: pointer;
}
</style>
