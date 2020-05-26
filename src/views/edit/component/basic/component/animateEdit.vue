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
  </div>
</template>

<script>
export default {
  data() {
    return {};
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