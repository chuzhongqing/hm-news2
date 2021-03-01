<template>
  <div class="my-comment">
    <hm-header>我的跟帖</hm-header>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
      :offset="50"
    >
      <div class="list" v-for="item in list" :key="item.id">
        <div class="item">
          <div class="time">
            {{ item.create_date | date("YY-MM-DD HH:mm") }}
          </div>
          <!-- 父评论的内容 -->
          <div class="parent-comment" v-if="item.parent">
            <div class="parent-name">
              回复： {{ item.parent.user.nickname }}
            </div>
            <div class="parent-content">
              {{ item.parent.content }}
            </div>
          </div>
          <div class="content">{{ item.content }}</div>
          <div class="link">
            <div class="title one-txt-cut">
              {{ item.post.title }}
            </div>
            <span class="iconfont iconjiantou1"></span>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 10,
    };
  },
  methods: {
    async getComments() {
      const res = await this.$axios({
        url: `/user_comments`,
        method: "get",
        // get请求传递传输方params post的放到data
        params: { pageIndex: this.pageIndex, pageSize: this.pageSize },
      });
      // 数据加载完成了，记得让loading改成false,不然无法触发下一次的加载。
      this.loading = false;
      // 判断是否还有更多数据？ 如果返回的数据的条数比 每页的条数少，说明没有更多数据。
      if (res.data.data.length == 0) {
        // 没有更多数据
        this.finished = true;
      }
      console.log(res);
      this.list = [...this.list, ...res.data.data];
    },
    onLoad() {
      console.log("触底");

      setTimeout(() => {
        this.pageIndex++;
        this.getComments();
      }, 1000);
      // this.getComments();
    },
  },
  created() {
    this.getComments();
  },
};
</script>

<style lang="less" scoped>
.item {
  border-bottom: 1px solid #ccc;
  padding: 10px;
  .time {
    font-size: 14px;
    color: #999;
    height: 30px;
    line-height: 30px;
  }
  .content {
    font-size: 16px;
    padding: 10px 0;
  }
  .link {
    color: #999;
    display: flex;
    margin-top: 10px;
    font-size: 14px;
    justify-content: space-between;
    .title {
      flex: 1;
    }
    span {
      width: 50px;
      text-align: right;
    }
  }
  .parent-comment {
    background-color: #ddd;
    padding: 10px;
    font-size: 14px;
    color: #999;
    line-height: 30px;
    .parent-name {
      font-size: 12px;
    }
  }
}
</style>
