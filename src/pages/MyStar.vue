<template>
  <div class="my-star">
    <hm-header>我的收藏</hm-header>
    <div class="list" v-for="item in list" :key="item.id">
      <div class="item">
        <div class="info">
          <div class="title">{{ item.title }}</div>
          <div class="bottom">
            <span>{{ item.user.nickname }}</span>
            <span>{{ item.comments.length }}评论</span>
          </div>
        </div>
        <img :src="item.cover[0].url" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  async created() {
    const res = await this.$axios({
      url: "/user_star",
      method: "get",
    });
    const { statusCode, data } = res.data;
    if (statusCode === 200) {
      this.list = data;
    }
  },
};
</script>

<style lang="less" scoped>
.item {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
  .info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .title {
      font-size: 16px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .bottom {
      font-size: 12px;
      color: #999;
      span {
        margin-right: 10px;
      }
    }
  }

  // 图片失真
  img {
    width: 121px;
    height: 75px;
    display: block;
    // 可以让图片等比例的压缩 取值:cover  contain
    // 类似于 background-size: cover contain
    object-fit: cover;
  }
}
</style>
