<template>
  <div>
    <hm-header>注册</hm-header>
    <hm-logo></hm-logo>

    <hm-input
      type="text"
      placeholder="请输入用户名"
      :rule="/^1\d{4,10}$/"
      message="用户名格式有误"
    ></hm-input>
    <!-- 密码 -->
    <hm-input type="password" placeholder="请输入密码"></hm-input>
    <hm-input type="password" placeholder="请输入密码"></hm-input>
    <!-- 昵称 -->
    <hm-button @click="register">注册</hm-button>
  </div>
</template>

<script>
export default {
  methods: {
    register() {
      1;
      console.log("注册");
    },
  },
};
</script>

<style></style>
