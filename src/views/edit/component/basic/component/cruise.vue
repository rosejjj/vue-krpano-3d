<template>
  <div class="cruise">
    <div class="cruise-head">
      <h4 class="head-title">自动巡游</h4>
      <img
        @click="close"
        class="close"
        src="@/assets/close.png"
        alt="关闭按钮"
      />
    </div>
    <el-form class="p10">
      <el-form-item>
        <div class="w100 flex-row sp-be-cen">
          <span>自动巡游</span>
          <el-switch
            v-model="form.auto"
            active-color="#409EFF"
            inactive-color="#ff4949"
          ></el-switch>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="flex-row sp-be-cen">
          <span>场景旋转时间</span>
          <span>{{ form.roteTime | formatSeconds}}</span>
        </div>
      </el-form-item>
      <el-form-item class="p10">
        <el-slider
          :min="30"
          :max="360"
          v-model="form.roteTime"
        ></el-slider>
      </el-form-item>
      <el-form-item>
        <div class="w100 flex-row sp-be-cen">
          <span>旋转一圈自动跳转下一场景</span>
          <el-checkbox v-model="form.autoLoad"></el-checkbox>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">完成</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        auto: false, //是否自动巡游
        roteTime: 30, //旋转时间
        autoLoad: false //旋转一圈自动跳转下一场景
      }
    };
  },
  methods: {
    close() {
      this.$emit('close');
    }
  },
  filters: {
    formatSeconds(value) {
      let minutes = parseInt(value / 60).toString();
      let seconds = (value % 60).toString().padStart(2, '0');
      return minutes > 1 ? `${minutes}分${seconds}秒` : `${seconds}秒`;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/style/mixins.scss';
.cruise {
  @include edit-box;
  .cruise-head {
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