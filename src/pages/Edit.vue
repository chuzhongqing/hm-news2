<template>
  <div class="edit">
    <hm-header>编辑资料</hm-header>
    <!-- avatar: 头像 -->
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + info.head_img" alt />
      <van-uploader
        :before-read="beforeRead"
        class="uploader"
        :after-read="afterRead"
      />
      <div class="cropper-mask" v-show="showCropper">
        <vue-cropper
          :img="img"
          :autoCrop="true"
          :autoCropWidth="150"
          :autoCropHeight="150"
          :fixed="true"
          ref="cropper"
        ></vue-cropper>
        <van-button class="crop" type="primary" @click="checkImg"
          >裁剪</van-button
        >
        <van-button @click="cancel" class="cancel" type="info">取消</van-button>
      </div>
    </div>
    <hm-navbar
      title="昵称"
      :content="info.nickname"
      @click="showName"
    ></hm-navbar>
    <hm-navbar title="密码" content="******" @click="showPassword"></hm-navbar>
    <hm-navbar
      title="性别"
      :content="info.gender === 0 ? '男' : '女'"
      @click="showGender"
    ></hm-navbar>
    <van-dialog
      v-model="show"
      title="修改昵称"
      show-cancel-button
      @confirm="changeName(info.nickname)"
    >
      <van-field v-model="nickname" placeholder="请输入新昵称" />
    </van-dialog>
    <van-dialog
      v-model="show1"
      title="修改密码"
      show-cancel-button
      @confirm="changePassword"
    >
      <van-field v-model="password" placeholder="请输入新密码" />
    </van-dialog>
    <van-dialog
      v-model="show2"
      title="修改性别"
      show-cancel-button
      @confirm="changeGender"
    >
      <van-radio-group v-model="radio" direction="horizontal">
        <van-radio name="0">男</van-radio>
        <van-radio name="1">女</van-radio>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
import { VueCropper } from "vue-cropper";

// const id = localStorage.getItem("user_id");
export default {
  data() {
    return {
      info: {},
      show: false,
      show1: false,
      show2: false,
      nickname: "",
      password: "",
      radio: "",
      img: "",
      showCropper: false,
    };
  },
  methods: {
    checkImg() {
      this.$refs.cropper.getCropBlob(async (data) => {
        // do something
        // console.log(data);
        const fd = new FormData();
        fd.append("file", data);
        const res = await this.$axios({
          url: `/upload`,
          method: "post",
          data: fd,
        });
        // console.log(fd);
        if (res.data.statusCode === 200) {
          this.$toast.success(res.data.message);
          //修改头像
          this.changeUser({ head_img: res.data.data.url });
          this.showCropper = false;
          this.img = "";
        } else {
          this.$toast.fail(res.data.message);
        }
      });
    },
    cancel() {
      this.showCropper = false;
      this.img = "";
    },
    //显示修改框
    showName() {
      this.show = true;
      // 老昵称显示在输入框
      this.nickname = this.info.nickname;
    },
    showPassword() {
      this.show1 = true;
      this.password = this.info.password;
    },
    showGender() {
      this.show2 = true;
      this.radio = this.info.gender.toString();
    },
    //获取用户信息
    async getInfo() {
      const id = localStorage.getItem("user_id");
      const res = await this.$axios({
        method: "get",
        url: `/user/${id}`,
      });
      const { statusCode, data } = res.data;
      //请求成功存储用户信息
      if (statusCode === 200) {
        this.info = data;
        console.log(res);
        console.log(this.info);
      }
    },
    async changeUser(data) {
      const res = await this.$axios({
        url: `/user_update/${id}`,
        method: "post",

        data,
      });
      console.log(res);
      if (res.data.statusCode === 200) {
        this.$toast.success(res.data.message);
        // 如果传入对象的键是password就应该修改完密码后重新登陆
        if (Object.keys(data)[0] === "password") {
          localStorage.removeItem("user_id");
          localStorage.removeItem("token");
          this.$router.push("/login");
        }
      }
      this.getInfo();
    },
    // 修改昵称
    changeName() {
      this.changeUser({ nickname: this.nickname });
    },
    // 修改密码
    changePassword() {
      this.changeUser({ password: this.password });
    },

    changeGender() {
      this.changeUser({ gender: this.radio });
    },
    // changeImg() {},
    afterRead(file) {
      this.showCropper = true;
      this.img = file.content;
      // 上传头像
    },

    beforeRead(file) {
      if (file.type !== "image/jpeg") {
        this.$toast("请上传 jpg 格式图片");
        return false;
      }
      return true;
    },
  },
  components: {
    VueCropper,
  },
  created() {
    this.getInfo();
  },
};
</script>

<style lang="less" scoped>
.avatar {
  position: relative;

  .cropper-mask {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 999;
    top: 0;
    left: 0;
  }
  .crop,
  .cancel {
    position: absolute;
    top: 0;
  }
  .crop {
    left: 0;
  }
  .cancel {
    right: 0;
  }
  img {
    width: 80px;
    height: 80px;
    display: block;
    border-radius: 50%;
    margin: 30px auto;
  }
  .uploader {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    opacity: 0;
    margin: 0;
  }
}
.van-radio-group--horizontal {
  justify-content: space-around;
  height: 50px;
}
</style>
