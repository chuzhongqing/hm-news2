import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import User from "../pages/user.vue";
import Edit from "../pages/Edit.vue";
import MyFollow from "../pages/MyFollow.vue";
import MyComments from "../pages/MyComments.vue";
import MyStar from "../pages/MyStar.vue";
import Home from "../pages/Home.vue";

Vue.use(VueRouter);
const router = new VueRouter({
  //配置路由规则
  routes: [
    { path: "/", component: Login },
    // 命名路由 给路由一个name
    { path: "/login", name: "login", component: Login },
    { path: "/register", component: Register },
    { path: "/user", component: User },
    { path: "/edit", component: Edit, name: "edit" },
    { path: "/myfollow", component: MyFollow, name: "MyFollow" },
    { path: "/mycomments", component: MyComments, name: "MyComments" },
    { path: "/mystar", component: MyStar, name: "MyStar" },
    { path: "/home", component: Home, name: "Home" },
  ],
});
//注册全局路由导航守卫 必须要有next不然页面就不放行
//to:到哪去 form：从哪来 next：放行
router.beforeEach(function(to, from, next) {
  const token = localStorage.getItem("token");
  // 去个人中心就必须要登录否则放行
  const authURL = ["/user", "/edit", "/myfollow", "/mystar"];
  // 如果数组里包含有和to.path一样的地址就判断token
  if (authURL.includes(to.path)) {
    if (token) {
      // 有token放行没有去登录
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});
export default router;
