<template>
  <div class="works-code">
    <el-form>
      <el-form-item label="作品二维码">
        <img
          class="w100"
          :src="form.code"
          alt="这是作品二维码"
        />
      </el-form-item>
      <el-form-item label="作品地址">
        <el-input
          v-model="form.workLink"
          placeholder="作品链接地址"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      form: {
        workLink: '',
        code: ''
      }
    };
  },
  computed: {
    ...mapGetters(['worksData'])
  },
  watch: {
    worksData: {
      handler(newValue, oldValue) {
        this.form.workLink = newValue.workLink;
        this.form.code = newValue.tipIconPc;
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
.works-code {
  padding: 10px;
  width: 100%;
}
</style>