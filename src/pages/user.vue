<template>
  <div class="user">
    <hm-header>个人中心</hm-header>
    <div
      class="info"
      @click="
        () => {
          $router.push('/edit');
        }
      "
    >
      <div class="left">
        <img :src="$axios.defaults.baseURL + info.head_img" alt />
      </div>
      <div class="center">
        <div class="name">
          <span v-if="info.gender === 0" class="iconfont iconxingbienan"></span>
          <span v-else class="iconfont iconxingbienv"></span>
          <span>{{ info.nickname }}</span>
        </div>
        <div class="time">{{ info.create_date | date }}</div>
      </div>
      <div class="right">
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <hm-navbar
      title="我的关注"
      content="关注的用户"
      @click="
        () => {
          $router.push('/myfollow');
        }
      "
    ></hm-navbar>
    <hm-navbar
      title="我的跟帖"
      content="跟帖/回复"
      @click="
        () => {
          $router.push('/mycomments');
        }
      "
    ></hm-navbar>
    <hm-navbar
      title="我的收藏"
      @click="
        () => {
          $router.push('/mystar');
        }
      "
      content="文章/视频"
    ></hm-navbar>
    <hm-navbar
      title="设置"
      @click="
        () => {
          $router.push('/edit');
        }
      "
    ></hm-navbar>
    <hm-button @click="checkOut">退出登录</hm-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {},
    };
  },
  methods: {
    // 退出登录
    checkOut() {
      console.log(123);
      this.$dialog
        .confirm({
          title: "退出",
          message: "是否确认退出",
        })
        .then(() => {
          console.log("确认");
          localStorage.removeItem("user_id");
          localStorage.removeItem("token");
          this.$router.push("/login");
          this.$toast.success("退出成功");
        })
        .catch(() => {
          // on cancel
          // console.log("取消");
          this.$toast("取消退出");
        });
    },
    //去信息编辑页
    // goEdit() {
    //   console.log(123);
    // },
  },
  async created() {
    // 获取到登录后的token和userId
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");
    // 发送请求获取用户信息
    const res = await this.$axios({
      method: "get",
      url: `/user/${userId}`,
      //请求头验证token
    });
    console.log(res);
    const { statusCode, data } = res.data;
    //请求成功存储用户信息
    if (statusCode === 200) {
      this.info = data;
    }
  },
};
</script>

<style lang="less" scoped>
.user {
  .info {
    display: flex;
    height: 100px;
    border-bottom: 3px solid #ccc;
    align-items: center;
    padding: 0 20px;
    .left {
      width: 70px;
      img {
        width: 70px;
        height: 70px;
        display: block;
        border-radius: 50%;
      }
    }
    .center {
      flex: 1;
      padding-left: 10px;
      .name {
        .iconxingbienan {
          color: aqua;
        }
        .iconxingbienv {
          color: pink;
        }
        span {
          font-size: 18px;
        }
      }
      .time {
        font-size: 14px;
        color: #999;
      }
    }
    .right {
      width: 30px;
      text-align: right;
    }
  }
}
</style>
