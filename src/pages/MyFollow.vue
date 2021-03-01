<template>
  <div class="my-follow">
    <hm-header>我的关注</hm-header>

    <div class="list">
      <!-- 关注 -->
      <div class="item" v-for="item in list" :key="item.id">
        <div class="left">
          <img :src="$axios.defaults.baseURL + item.head_img" alt="" />
        </div>
        <div class="center">
          <div class="name">{{ item.nickname }}</div>
          <div class="date">{{ item.create_date | date }}</div>
        </div>
        <div class="right" @click="cancelFollow(item.id)">取消关注</div>
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
  created() {
    this.getFollows();
  },
  methods: {
    async getFollows() {
      const res = await this.$axios({
        url: "/user_follows",
        method: "get",
      });
      console.log(res);
      this.list = res.data.data;
    },
    cancelFollow(id) {
      this.$dialog
        .confirm({
          title: "取消关注",
          message: "是否确认取消关注",
        })
        .then(async () => {
          // on confirm
          const res = await this.$axios({
            url: `/user_unfollow/${id}`,
            method: "get",
          });
          console.log(res);
          this.getFollows();
          if (res.data.statusCode === 200) {
            this.$toast.success(res.data.message);
          }
        })
        .catch(() => {
          // on cancel
        });
    },
  },
};
</script>

<style lang="less" scoped>
.item {
  border-bottom: 1px solid #ccc;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .left {
    img {
      width: 40px;
      height: 40px;
      display: block;
      border-radius: 50%;
    }
  }
  .center {
    flex: 1;
    padding-left: 10px;
    .name {
      font-size: 14px;
    }
    .date {
      color: #999;
      font-size: 12px;
    }
  }
  .right {
    background-color: #ddd;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    padding: 0 15px;
    color: #000;
  }
}
</style>
