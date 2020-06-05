<template>
  <div class="works-code">
    <div class="mb10">作品二维码</div>
    <img
      class="w100"
      :src="form.code"
      alt="这是作品二维码"
    />
    <div class="flex-row sp-be-cen mb10 mt20">
      <span>作品链接</span>
      <a
        class="link"
        href="https://wwww.baidu.com"
        target="_blank"
      >查看</a>
    </div>
    <el-input
      v-model="form.workLink"
      :disabled="false"
      placeholder="作品链接"
    ></el-input>
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
        this.form.code = newValue.code;
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
  font-size: 14px;
  .link {
    color: #427afb;
    cursor: pointer;
  }
}
</style>