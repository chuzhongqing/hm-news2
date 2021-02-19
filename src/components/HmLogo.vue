<template>
  <div class="hm-logo">
    <span class="iconfont iconnew"></span>
  </div>
</template>
<script>
export default {};
</script>

<style lang="less" scoped>
// 在单文件组件中， style有两个属性需要掌握
// lang="less" 指定css的预处理器
// scoped: 只要给某个组件的style添加scoped属性，那么就可以保证当前组件的样式只会影响到当前组件本身。
.hm-logo {
  text-align: center;
  span {
    font-size: 126px;
    color: rgb(216, 30, 6);
  }
}
</style>
