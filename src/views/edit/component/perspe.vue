<template>
  <div class="view">
    <el-form
      label-position="top"
      lable-width="80px"
    >
      <el-form-item label="当前初始视角">
        <img
          class="view-img"
          src="@/assets/WechatIMG50.jpeg"
          alt="这是视角图片"
        />
      </el-form-item>
      <el-form-item
        class="p10"
        label="水平视角范围"
      >
        <el-slider
          v-model="hlookatRanger"
          range
          show-stops
          :min="-180"
          :max="180"
        ></el-slider>
      </el-form-item>
      <el-form-item
        class="p10"
        label="垂直视角限制"
      >
        <el-slider
          v-model="vlookatRanger"
          range
          show-stops
          :min="-90"
          :max="90"
        ></el-slider>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="form.keepFov">自动巡游时是否保持初始视角</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="saveView"
          type="primary"
        >应用到此场景</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import setWorksData from '@/mixins/setWorksData.js';

export default {
  mixins: [setWorksData],
  mounted() {
    setTimeout(() => {
      this.krpano = document.getElementById('krpanoSWFObject');
    }, 500);
  },
  data() {
    return {
      krpano: '',
      hlookatRanger: [-180, 180], //水平视角范围
      vlookatRanger: [-90, 90], //垂直视角范围
      form: {
        hlookatmin: -180, //水平最小视角
        hlookatmax: 180, //水平最大视角
        vlookatmin: -90, //垂直最小视角
        vlookatmax: 90, //垂直最大视角
        keepFov: false //迅游时是否保持初始视角
      }
    };
  },
  methods: {
    //通用设置krpano属性
    setValue(key, value) {
      this.krpano.call(`set(${key}, ${value})`);
    },
    editView(minStr, maxStr, value) {
      this.form[minStr] = value[0];
      this.form[maxStr] = value[1];
      this.setValue(`view.${minStr}`, this.form[minStr]);
      this.setValue(`view.${maxStr}`, this.form[maxStr]);
    },
    //保存当前视角
    saveView() {
      this.buildWorks(this.form);
      this.$message.success('应用成功');
    }
  },
  watch: {
    hlookatRanger(value) {
      if (!this.krpano) return;
      this.editView('hlookatmin', 'hlookatmax', value);
    },
    vlookatRanger(value) {
      if (!this.krpano) return;
      this.editView('vlookatmin', 'vlookatmax', value);
    }
  }
};
</script>

<style lang="scss" scoped>
.view {
  .view-img {
    width: 200px;
    height: 100px;
  }
}
</style>
