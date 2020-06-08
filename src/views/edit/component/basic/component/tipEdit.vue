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
        <img
          v-if="form.pcUrl"
          :src="form.pcUrl"
          class="tip-avatar"
        />
        <div class="w100 flex-row sp-be-cen mt10">
          <div
            class="el-upload__tip"
            slot="tip"
          >建议尺寸 300 X 300</div>
          <el-button
            @click="() => {
              isMobile = false
              selectVisiable = true
            }"
            size="small"
            type="primary"
          >选择图片</el-button>
        </div>
      </el-form-item>
      <el-form-item label="移动端">
        <img
          v-if="form.mobileUrl"
          :src="form.mobileUrl"
          class="tip-avatar"
        />
        <div class="w100 flex-row sp-be-cen mt10">
          <div
            class="el-upload__tip"
            slot="tip"
          >建议尺寸 300 X 300</div>
          <el-button
            @click="() => {
               isMobile = true
              selectVisiable = true
            }"
            size="small"
            type="primary"
          >选择图片</el-button>
        </div>
      </el-form-item>
      <el-form-item label="显示时间(秒)">
        <el-slider
          :min="0"
          :max="10"
          v-model="form.duration"
          :marks="marks"
        ></el-slider>
      </el-form-item>
      <el-form-item
        style="margin-top: 40px"
        class="w100 text-center"
      >
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
  components: {
    SelectImage
  },
  name: 'tip-edit',
  mixins: [setWorksData],
  data() {
    return {
      isMobile: false, //判断当前是否为移动端
      selectVisiable: false,
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
      this.$message.success('设置成功');
      this.close();
    },
    //选择对应素材图片
    selectItem(item) {
      let type = this.isMobile ? 'mobileUrl' : 'pcUrl';
      this.$refs.selectImage.clearCurrentRow();
      this.form[type] = item.logo;
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
    'worksData.tip': {
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
  .tip-avatar {
    width: 210px;
    height: 210px;
  }
}
</style>