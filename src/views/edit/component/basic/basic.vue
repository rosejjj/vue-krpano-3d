<template>
  <div class="basic">
    <el-form
      class="p20"
      label-position="top"
      label-width="100px"
    >
      <el-form-item label="基础设置">
        <div class="w100 basic-detail">
          <div
            class="logo"
            :style="{ backgroundImage: `url(${form.logo})` }"
          >
            <el-upload
              :show-file-list="false"
              accept=".jpg, .png, .gif, jpeg"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-success="handleSuccess"
              :before-upload="beforeUpload"
            >
              <el-button
                class="btn"
                size="small"
                type="primary"
              >修改封面</el-button>
              <div class="text">建议尺寸 512 X 512</div>
            </el-upload>
          </div>
          <div class="basic-form">
            <el-select
              v-model="form.type"
              placeholder="请选择全景图类型"
            >
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              ></el-option>
            </el-select>
            <el-input
              style="width: 500px"
              class="block mt20"
              placeholder="请输入全景图名称"
              v-model="form.name"
            ></el-input>
            <el-input
              style="width: 500px"
              class="block mt20"
              placeholder="请输入作品描述"
              type="textarea"
              v-model="form.desc"
              :rows="3"
            ></el-input>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="全局设置">
        <el-button
          class="mt10"
          @click="baseType = item.id"
          v-for="item in globalSet"
          :key="item.id"
          type="primary"
        >{{ item.name }}</el-button>
      </el-form-item>
      <el-form-item label="全局开关">
        <div class="w100 flex-row -cen">
          <div class="mr20">
            <span class="pr10">场景选择</span>
            <el-switch v-model="switchFrom.krpanoSelect"></el-switch>
          </div>
          <div class="mr20">
            <span class="pr10">场景标题</span>
            <el-switch v-model="switchFrom.isShowTitle"></el-switch>
          </div>
          <div class="mr20">
            <span class="pr10">分享按钮</span>
            <el-switch v-model="switchFrom.isShowShare"></el-switch>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <transition-group name="slider">
      <tip-edit
        key="1"
        @close="baseType = ''"
        v-show="baseType === 1"
      ></tip-edit>
      <cover-edit
        key="2"
        @close="baseType = ''"
        v-show="baseType === 2"
      ></cover-edit>
      <logo-edit
        key="5"
        @close="baseType = ''"
        v-show="baseType === 5"
      ></logo-edit>
      <cruise
        key="4"
        @close="baseType = ''"
        v-show="baseType === 4"
      ></cruise>
      <animate-edit
        key="3"
        @close="baseType = ''"
        v-show="baseType === 3"
      ></animate-edit>
    </transition-group>
  </div>
</template>

<script>
import TipEdit from './component/tipEdit';
import LogoEdit from './component/logoEdit';
import AnimateEdit from './component/animateEdit';
import CoverEdit from './component/coverEdit';
import Cruise from './component/cruise';
import setWorksData from '@/mixins/setWorksData';
import { mapGetters } from 'vuex';

export default {
  name: 'basic',
  mixins: [setWorksData],
  components: {
    TipEdit,
    LogoEdit,
    AnimateEdit,
    CoverEdit,
    Cruise
  },
  data() {
    return {
      baseType: '', //当前编辑设置
      form: {
        type: 1,
        logo: require('../../../../assets/WechatIMG50.jpeg'),
        name: '测试全景',
        desc: '描述' //全景描述
      },
      //当前全局开关字段
      switchFrom: {
        krpanoSelect: false,
        isShowTitle: false,
        isShowShare: false
      },
      //全局设置
      globalSet: [
        {
          id: 1,
          name: '开场提示'
        },
        // {
        //   id: 2,
        //   name: '开场封面'
        // },
        {
          id: 3,
          name: '开场动画'
        },
        {
          id: 4,
          name: '自动巡游'
        },
        {
          id: 5,
          name: '自定义logo'
        }
      ],
      typeList: [
        {
          id: 1,
          name: '风光'
        },
        {
          id: 2,
          name: '办公室'
        }
      ]
    };
  },
  methods: {
    handleSuccess(res) {
      this.form.logo = require('../../../../assets/WechatIMG50.jpeg');
    },
    beforeUpload(res) {
      let is5M = res.size / 1024 / 1024 < 0.5;
      if (is5M) this.$message.warning('上传文件不能大于500kb');
      return is5M;
    }
  },
  watch: {
    switchFrom: {
      handler(newValue) {
        this.buildGlobal('switch', newValue);
      },
      deep: true
    },
    'worksData.basic': {
      handler(newValue) {
        if (!this.isInit) {
          this.form = { ...newValue };
        }
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters('active', ['isInit'], ['worksData'])
  }
};
</script>

<style lang="scss" scoped>
.basic {
  width: 100%;
  height: 100%;
  &-detail {
    display: flex;
    .logo {
      position: relative;
      min-width: 200px;
      min-height: 200px;
      border-radius: 10px;
      box-shadow: 0px 0px 20px rgba(7, 17, 27, 0.5);
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      & .btn {
        position: absolute;
        bottom: 15px;
        left: 15px;
      }
      & .text {
        text-align: center;
        line-height: 15px;
        font-size: 12px;
        position: absolute;
        width: 60px;
        bottom: 15px;
        left: 110px;
        color: white;
      }
    }
    .basic-form {
      flex: 1;
      padding-left: 20px;
    }
  }
}
</style>
