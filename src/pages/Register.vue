<template>
  <div>
    <hm-header>注册</hm-header>
    <hm-logo></hm-logo>

    <hm-input
      type="text"
      placeholder="请输入用户名/手机号码"
      :rule="/^1\d{4,10}$/"
      message="用户名格式有误"
      v-model="username"
      ref="username"
    ></hm-input>
    <!-- 密码 -->
    <hm-input
      type="text"
      placeholder="请输入昵称"
      message="昵称格式有误"
      :rule="/^[\u4e00-\u9fa5]{3,7}$/"
      v-model="nickname"
      ref="nickname"
    ></hm-input>
    <hm-input
      type="password"
      placeholder="请输入密码"
      message="密码格式有误"
      :rule="/^\d{3,12}$/"
      ref="password"
      v-model="password"
    ></hm-input>
    <!-- 昵称 -->
    <hm-button @click="register">注册</hm-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      nickname: "",
      password: "",
    };
  },
  methods: {
    //用户注册
    register() {
      //表单校验
      let status1 = this.$refs.username.valiDate(this.username);
      let status2 = this.$refs.nickname.valiDate(this.nickname);
      let status3 = this.$refs.password.valiDate(this.password);
      //校验全部通过后发送ajax请求
      if (status1 && status2 && status3) {
        this.$axios({
          url: "/register",
          method: "post",
          data: {
            username: this.username,
            nickname: this.nickname,
            password: this.password,
          },
        }).then((res) => {
          //注册后的提示
          if (res.data.statusCode === 200) {
            this.$toast.success(res.data.message);
            //登录成功后跳转到登录页 并且传递参数 使用params来传递参数时必须使用命名路由 这是使用query传递参数会暴露在地址栏
            //在目标页使用this.$route.parmas来获取数据
            //<router-link to='/login'>和<router-link name='login'> 是一样的 但是使用name时路由要是命名路由
            this.$router.push({
              name: "login",
              params: {
                username: this.username,
                password: this.password,
              },
            });
          } else {
            this.$toast.fail(res.data.message);
          }
          console.log(res);
        });
      } else {
        return;
      }
    },
  },
};
</script>

<style></style>
