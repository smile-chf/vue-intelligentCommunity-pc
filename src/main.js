// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/css/cssreset.css'
import '../static/css/style.css'
Vue.config.productionTip = false;
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
Vue.prototype.axios = axios;
Vue.use(ElementUI);
import store from './store'
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;
import dayjs from "dayjs";
// 导入 dayjs 的语言包
import "dayjs/locale/zh-cn";
dayjs.locale('zh-cn');
//滚动插件
import scroll from 'vue-seamless-scroll'
Vue.use(scroll)

Vue.prototype.$d = dayjs;
    /* eslint-disable no-new */
    // 时间戳转日期
Vue.filter('formatTime', (value, arg) => {
    function getMyDate(str) {
        var oDate = new Date(str),
            oYear = oDate.getFullYear(),
            oMonth = oDate.getMonth() + 1,
            oDay = oDate.getDate(),
            oHour = oDate.getHours(),
            oMin = oDate.getMinutes(),
            oSen = oDate.getSeconds(),
            oTime = oYear + '-' + addZero(oMonth) + '-' + addZero(oDay) + ' ' + addZero(oHour) + ':' + addZero(oMin)
            // +':'+addZero(oSen);
        if (arg == 'birth') {
            return oTime.substring(0, 10);
        } else {
            return oTime;
        }
    }

    //补零操作
    function addZero(num) {
        if (parseInt(num) < 10) {
            num = '0' + num;
        }
        return num;
    }
    if (value == "" || value == null) {
        return ""
    } else {
        let date = getMyDate(parseInt(value))
        return date;
    }
});

import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}


// 响应拦截器
axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.data.code === 200) {
      return Promise.resolve(response);
    } else if (response.data.code === 403) {
      router.replace({
        path: '/',
      });
    } else {
      return Promise.reject(response);
    }
  },
);
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
});
