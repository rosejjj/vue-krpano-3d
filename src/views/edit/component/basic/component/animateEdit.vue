<template>
  <div class="animate-edit">
    <div class="animate-head">
      <h4 class="head-title">开场动画</h4>
      <img
        @click="close"
        class="close"
        src="@/assets/close.png"
        alt="关闭按钮"
      />
    </div>
    <el-form>
      <el-form-item></el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        animateType: 1
      },
      animateList: [
        {
          id: 1,
          name: '小行星开场'
        },
        {
          id: 2,
          name: '水平迅游开场'
        }
      ]
    };
  },
  methods: {
    close() {}
  }
};
</script>

<style lang="scss" scoped>
@import '@/style/mixins.scss';
.animate-edit {
  @include edit-box;
  .animate-head {
    @include edit-head;
    .head-title {
      font-size: 14px;
    }
    .close {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
  }
}
</style>