import Vue from "vue";
import App from "./App.vue";
import router from "./router";
//通用样式
import "../styles/common.less";
//导入字体图标
import "../styles/iconfont.css";
//导图控制视口的插件
import "lib-flexible";
//项目中的px转化为rem
// import "postcss-px2rem";
//关闭提示
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
