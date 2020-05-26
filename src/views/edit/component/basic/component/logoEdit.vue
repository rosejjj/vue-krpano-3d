<template>
  <div class="logo-edit">
    <div class="logo-head">
      <h4 class="head-title">自定义logo</h4>
      <img
        @click="close"
        class="close"
        src="@/assets/close.png"
        alt="关闭按钮"
      />
    </div>
    <el-form
      class="p20"
      label-position="top"
    >
      <el-form-item>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="form.imageUrl"
            :src="form.imageUrl"
            class="avatar"
          />
          <i
            v-else
            class="el-icon-plus avatar-uploader-icon"
          ></i>
          <div
            class="el-upload__tip"
            slot="tip"
          >建议尺寸 300 X 300</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="显示位置">
        <el-input placeholder="测试"></el-input>
      </el-form-item>
      <el-form-item label="网址">
        <el-input placeholder="为LOGO添加网址"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        imageUrl: ''
      }
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    handleAvatarSuccess() {},
    beforeAvatarUpload() {}
  }
};
</script>

<style lang="scss" scoped>
@import '@/style/mixins.scss';
.logo-edit {
  @include edit-box;
  .logo-head {
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