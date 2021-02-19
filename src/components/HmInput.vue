<template>
  <div class="hm-input">
    <input
      :type="type"
      :placeholder="placeholder"
      :class="{ success: status === 'success', error: status === 'error' }"
      :value="value"
      @input="inputFn"
    />
    <div class="tips" v-show="status === 'error'">{{ message }}</div>
  </div>
</template>

<script>
export default {
  //   props: ["type", "placeholder"],
  props: {
    type: {
      //规定传入数据的属性
      type: String,
      //值是否必填
      //   required: true,
      //默认值
      default: "text",
    },
    placeholder: {
      //规定传入数据的属性
      type: String,
      //属性是否必填
      //   required: true,
      default: "请输入...",
    },
    rule: {},
    value: String,
    message: String,
  },
  methods: {
    //表单校验
    valiDate(value) {
      //如果传入了校验规则就进行判断
      if (this.rule) {
        if (this.rule.test(value)) {
          this.status = "success";
          return true;
        } else {
          this.status = "error";
          return false;
        }
      }
    },
    inputFn(e) {
      this.$emit("input", e.target.value);
      //判断用户输入的是否正确
      this.valiDate(e.target.value);
    },
  },
  data() {
    return {
      status: "",
    };
  },
};
</script>

<style lang="less" scoped>
.hm-input {
  height: 50px;
  margin: 0 10px;
  input {
    height: 30px;
    line-height: 30px;
    outline: none;
    border: none;
    border-bottom: 1px solid #ccc;
    width: 100%;
    font-size: 16px;
    color: #666;

    &.success {
      border-color: green;
    }

    &.error {
      border-color: red;
    }
  }
  .tips {
    color: red;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
  }
}
</style>
