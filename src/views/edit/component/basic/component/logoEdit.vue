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
          <el-checkbox v-model="form.isShow">显示LOGO</el-checkbox>
        </div>
      </el-form-item>
      <el-form-item>
        <img
          v-if="form.url"
          :src="form.url"
          class="logo-avatar"
        />
        <div class="w100 flex-row sp-be-cen mt10">
          <div class="el-upload__tip white">建议尺寸 300 X 300</div>
          <el-button
            @click="selectVisiable = true"
            size="small"
            type="primary"
          >选择图片</el-button>
        </div>
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
    <select-image
      ref="selectImage"
      :selectVisiable="selectVisiable"
      @close="selectVisiable = false"
      @selectItem="selectItem"
    ></select-image>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import setWorksData from '@/mixins/setWorksData.js';
import SelectImage from '@/components/selectImage/selectImage';

export default {
  mixins: [setWorksData],
  components: {
    SelectImage
  },
  data() {
    return {
      selectVisiable: false,
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
    selectItem(item) {
      this.$refs.selectImage.clearCurrentRow();
      this.form.url = item.logo;
    },
    close() {
      this.$emit('close');
    },
    handleAvatarSuccess() {},
    beforeAvatarUpload() {}
  },
  computed: {
    ...mapGetters('active', ['isInit'], ['worksData'])
  },
  watch: {
    'worksData.logo': {
      handler(newValue, oldValue) {
        if (!this.isInit) {
          this.form = { ...newValue };
        }
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
  .logo-avatar {
    width: 210px;
    height: 210px;
  }
}
</style>