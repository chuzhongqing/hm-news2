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
import { Button, Toast } from "vant";
Vue.use(Button);
// 引入 Toast 组件后，会自动在 Vue 的 prototype 上挂载 $toast 方法，便于在组件内调用。
Vue.use(Toast);
import HmHeader from "./components/HmHeader.vue";
import HmLogo from "./components/HmLogo.vue";
import HmButton from "./components/HmButton.vue";
import HmInput from "./components/HmInput.vue";
//关闭提示
Vue.config.productionTip = false;
//给axios配置一个基础路径
axios.defaults.baseURL = "http://localhost:3000";
//把axios绑定到vue的原型上
Vue.prototype.$axios = axios;
Vue.component("hm-header", HmHeader);
Vue.component("hm-logo", HmLogo);
Vue.component("hm-button", HmButton);
Vue.component("hm-input", HmInput);
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
