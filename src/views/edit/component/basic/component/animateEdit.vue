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
    <div class="text-center mt20">
      <el-button
        class="save_btn"
        @click="save"
        type="primary"
      >完成</el-button>
    </div>
  </div>
</template>

<script>
import setWorksData from '@/mixins/setWorksData.js';
import { mapGetters } from 'vuex';
export default {
  mixins: [setWorksData],
  data() {
    return {
      animateType: true
    };
  },
  methods: {
    //完成
    save() {
      this.buildGlobal('animateType', this.animateType);
      this.$message.success('设置成功');
      this.close();
    },
    close() {
      this.$emit('close');
    }
  },
  computed: {
    ...mapGetters(['worksData'])
  },
  watch: {
    'worksData.animateType': {
      handler(newValue, oldValue) {
        this.animateType = newValue;
      },
      immediate: true
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
  .save_btn {
    width: 50%;
  }
}
</style>