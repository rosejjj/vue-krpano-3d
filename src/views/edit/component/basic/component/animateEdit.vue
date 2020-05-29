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
    <div class="animate-wrapper p20">
      <div class="animate-item flex-row sp-be-cen">
        <span>小行星开场动画</span>
        <el-switch
          v-model="animateType"
          active-color="#409EFF"
          inactive-color="#ff4949"
        ></el-switch>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      animateType: true
    };
  },
  methods: {
    close() {
      this.$emit('close');
    }
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
  .animate-wrapper {
    width: 100%;
    .animate-item {
      width: 100%;
      font-size: 14px;
    }
  }
}
</style>