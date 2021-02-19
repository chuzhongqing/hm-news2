import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import User from "../pages/user.vue";
Vue.use(VueRouter);
const router = new VueRouter({
  //配置路由规则
  routes: [
    { path: "/", component: Login },
    // 命名路由 给路由一个name
    { path: "/login", name: "login", component: Login },
    { path: "/register", component: Register },
    { path: "/user", component: User },
  ],
});
export default router;
