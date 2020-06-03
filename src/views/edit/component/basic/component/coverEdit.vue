<template>
  <div class="cover-edit">
    <div class="cover-head">
      <h4 class="head-title">开场封面</h4>
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
      <el-form-item label="桌面端">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="form.pcUrl"
            :src="form.pcUrl"
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
      <el-form-item label="移动端">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="form.mobileUrl"
            :src="form.mobileUrl"
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
import setWorksData from 'vuex';

export default {
  name: 'cover-edit',
  mixins: [setWorksData],
  data() {
    return {
      form: {
        pcUrl: '',
        mobileUrl: ''
      }
    };
  },
  methods: {
    save() {
      this.buildGlobal('cover', this.form);
      this.$message.success('设置成功');
      this.close();
    },
    close() {
      this.$emit('close');
    },
    handleAvatarSuccess() {},
    beforeAvatarUpload() {}
  },
  computed: {
    ...mapGetters(['worksData'])
  },
  watch: {
    'worksData.cover': {
      handler(newValue, oldValue) {
        this.form = { ...newValue };
      },
      immediate: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/style/mixins.scss';
.cover-edit {
  @include edit-box;
  .cover-head {
    @include edit-head;
    .head-title {
      font-size: 12px;
    }
    .close {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
  }
}
</style>