<template>
  <div class="login">
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>
    <!-- v-model相当于@input和:value的合体 会自动更改msg的值 相当于以下代码-->
    <!-- <hm-input
      type="text"
      placeholder="请输入用户名"
      :value="msg"
      @input="inputFn"
    ></hm-input> -->
    <!-- 用户名 -->
    <hm-input
      type="text"
      placeholder="请输入用户名"
      v-model="username"
      :rule="/^1\d{4,10}$/"
      message="用户名格式有误"
      ref="username"
    ></hm-input>
    <!-- 密码 -->
    <hm-input
      type="password"
      placeholder="请输入密码"
      v-model="password"
      :rule="/^\d{3,12}$/"
      message="密码格式有误"
      ref="password"
    ></hm-input>
    <!-- 昵称 -->
    <hm-button @click="login">登录</hm-button>
  </div>
</template>

<script>
export default {
  methods: {
    //发送登录请求
    login() {
      //因为使用了ref所以可以用refs访问到子组件上的方法和数据 进行表单校验
      this.$refs.username.valiDate(this.username);
      this.$refs.password.valiDate(this.password);
      console.log(this.$refs.username);
      console.log(this.$refs.password);
      if (this.$refs.username.valiDate(this.username) === false) {
        console.log("账号校验错误");
        return;
      }
      if (this.$refs.password.valiDate(this.password) === false) {
        console.log("密码校验错误");
        return;
      }
      //因为把axios绑定到vue的原型上了所以可以直接用this.$axios发送请求
      this.$axios({
        method: "post",
        url: "/login",
        data: {
          username: this.username,
          password: this.password,
        },
      }).then((res) => {
        //登录成功后跳转到user页
        if (res.status === 200) {
          console.log("请求成功");
          if (res.data.statusCode === 200) {
            this.$toast.success("成功文案");
            this.$router.push("/user");
          } else {
            this.$toast.fail("失败文案");
          }
        }
      });
    },
    // inputFn(e) {
    //   this.msg = e;
    // },
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
};
</script>

<style></style>
