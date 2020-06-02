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
          <span>{{ roteTime | formatSeconds}}</span>
        </div>
      </el-form-item>
      <el-form-item class="p10">
        <el-slider
          :min="30"
          :max="360"
          v-model="roteTime"
        ></el-slider>
      </el-form-item>
      <el-form-item>
        <div class="w100 flex-row sp-be-cen">
          <span>旋转一圈自动跳转下一场景</span>
          <el-checkbox v-model="form.autoLoad"></el-checkbox>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="save"
          type="primary"
        >完成</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import setWorksData from '@/mixins/setWorksData.js';

export default {
  name: 'cruise',
  mixins: [setWorksData],
  data() {
    return {
      roteTime: 30, //旋转时间
      form: {
        auto: false, //是否自动巡游
        speed: 12, //旋转时间
        autoLoad: false //旋转一圈自动跳转下一场景
      }
    };
  },
  methods: {
    save() {
      this.buildGlobal('cruise', this.form);
      this.close();
    },
    close() {
      this.$emit('close');
    }
  },
  filters: {
    formatSeconds(value) {
      let minutes = parseInt(value / 60).toString();
      let seconds = (value % 60).toString().padStart(2, '0');
      return minutes > 0 ? `${minutes}分${seconds}秒` : `${seconds}秒`;
    }
  },
  computed: {
    ...mapGetters(['worksData'])
  },
  watch: {
    'worksData.cruise': {
      handler(newValue, oldValue) {
        this.form = { ...newValue };
        this.roteTime = parseInt(360 / this.form.speed);
      },
      immediate: true
    },
    roteTime: {
      handler(newValue, oldValue) {
        this.form.speed = (360 / newValue).toFixed(1);
      },
      immediate: true
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