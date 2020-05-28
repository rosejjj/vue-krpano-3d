<template>
  <div class="tip-edit">
    <div class="tip-head">
      <h4 class="head-title">开场提示</h4>
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
      <el-form-item label="显示时间(秒)">
        <el-slider
          :min="0"
          :max="10"
          v-model="form.duration"
          :marks="marks"
        ></el-slider>
      </el-form-item>
      <el-form-item style="margin-top: 50px">
        <el-button
          @click="save"
          type="primary"
        >保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import setWorksData from '@/mixins/setWorksData.js';

export default {
  name: 'tip-edit',
  mixins: [setWorksData],
  data() {
    return {
      type: 1,
      form: {
        pcUrl: '',
        mobileUrl: '',
        duration: 10
      },
      marks: {
        0: '0',
        10: '10'
      }
    };
  },
  methods: {
    save() {
      this.buildGlobal('tip', this.form);
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
    'worksData.tip': {
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
.tip-edit {
  @include edit-box;
  .tip-head {
    @include edit-head;
    .head-title {
      font-size: 15px;
    }
    .close {
      width: 18px;
      height: 18px;
      cursor: pointer;
    }
  }
}
</style>