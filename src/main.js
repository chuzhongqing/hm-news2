import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
//通用样式
import "../styles/common.less";
//导入字体图标
import "../styles/iconfont.css";
//导图控制视口的插件
import "lib-flexible";
//引入vant插件
// import Vant from "vant";
import {
  Button,
  Toast,
  Dialog,
  Field,
  RadioGroup,
  Radio,
  Uploader,
  List,
} from "vant";
Vue.use(Button);
// 引入 Toast 组件后，会自动在 Vue 的 prototype 上挂载 $toast 方法，便于在组件内调用。
Vue.use(Toast);
Vue.use(List);
Vue.use(Dialog);
Vue.use(Field);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.use(Uploader);
//引入时间格式化插件
import moment from "moment";
//使用vue的过滤器来格式化时间
Vue.filter("date", function(value, formart = "YY-MM-DD") {
  return moment(value).format(formart);
});
import HmHeader from "./components/HmHeader.vue";
import HmLogo from "./components/HmLogo.vue";
import HmButton from "./components/HmButton.vue";
import HmInput from "./components/HmInput.vue";
import HmNavbar from "./components/HmNavbar.vue";
//关闭提示
Vue.config.productionTip = false;
//给axios配置一个基础路径
axios.defaults.baseURL = "http://localhost:3000";
//把axios绑定到vue的原型上
Vue.prototype.$axios = axios;
//给axios配置一个响应拦截器 用来过滤掉失效的token 所有的axios请求结果都会经过axios响应拦截器
axios.interceptors.response.use((res) => {
  const { statusCode, message } = res.data;
  // token失效了跳到登录页 并且删除token和用户id
  if (statusCode === 401 && message === "用户信息验证失败") {
    router.push("/login");
    localStorage.removeItem("user_id");
    localStorage.removeItem("token");
    Toast.fail(message);
  }
  // 必须把结果返回出去 否则请求将接受不到返回值
  return res;
});
// 给axios配置一个请求拦截器拦截器  所有的axios请求都会经过axios请求拦截器
axios.interceptors.request.use((config) => {
  // 设置统一请求头 省的每个请求都要写请求头
  const token = localStorage.getItem("token");
  config.headers.Authorization = token;
  // 必须把请求返回出去 否则请求将发送不出去
  return config;
});
Vue.component("hm-header", HmHeader);
Vue.component("hm-logo", HmLogo);
Vue.component("hm-button", HmButton);
Vue.component("hm-input", HmInput);
Vue.component("hm-navbar", HmNavbar);
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
