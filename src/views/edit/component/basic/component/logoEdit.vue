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
        <div class="w100 flex-row sp-be-cen">
          <span>LOGO</span>
          <el-checkbox v-model="form.isShow"></el-checkbox>
        </div>
      </el-form-item>
      <el-form-item>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="form.url"
            :src="form.url"
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
        <el-radio-group v-model="form.posType">
          <el-radio
            v-for="item in posList"
            :key="item.id"
            :label="item.id"
          >{{ item.name }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="网址">
        <el-input
          v-model="form.title"
          placeholder="输入自定义标题"
        ></el-input>
        <el-input
          class="mt10"
          v-model="form.href"
          placeholder="为LOGO添加超链接"
        ></el-input>
      </el-form-item>
      <el-form-item class="w100 text-center">
        <el-button
          style="width: 60%"
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
  mixins: [setWorksData],
  data() {
    return {
      form: {
        isShow: false,
        url: '',
        posType: 1
      },
      posList: [
        {
          id: 1,
          name: '左上'
        },
        {
          id: 2,
          name: '左下'
        }
      ]
    };
  },
  methods: {
    save() {
      this.buildGlobal('logo', this.form);
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
    'worksData.logo': {
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