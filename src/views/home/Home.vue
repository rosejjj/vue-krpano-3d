<template>
  <el-container class="home">
    <el-header
      style="height: 40px"
      class="header"
    >
      <el-row
        type="flex"
        justify="space-between"
        align="center"
      >
        <el-col
          class="text-left"
          :span="3"
        >
          <el-button type="text">返回</el-button>
        </el-col>
        <el-col
          class="text-center"
          :span="18"
        >室内全景图</el-col>
        <el-col
          class="text-right"
          :span="3"
        >
          <el-button
            @click="save"
            type="text"
          >保存</el-button>
          <el-button
            @click="preview"
            type="text"
          >预览</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="50px">
        <list-bar
          @editActive="editActive"
          class="list-bar"
        ></list-bar>
      </el-aside>
      <el-main>
        <div class="krpano-show">
          <basic v-show="type === 1"></basic>
          <div
            v-show="type !== 1"
            id="krpano"
          >
            <el-button
              @click="setInitView"
              v-show="type === 3"
              class="perspe-button"
              type="primary"
            >设置当前为默认视角</el-button>
            <div
              v-show="type === 3"
              class="perspe-box"
            ></div>
          </div>
        </div>
        <div class="krpano-wrapper">
          <div
            v-for="item in krpanoList"
            :key="item.spotname"
            class="krpano-item"
            @click="setItem(item)"
          >
            <div
              :style="{ backgroundImage: `url(${item.logo})` }"
              class="logo"
              :class="{ active: item.id === editKrpano }"
            ></div>
            <div class="text mt10">{{ item.name }}</div>
          </div>
          <div class="add_btn flex-colum cen-cen">
            <div class="mt10">添加场景</div>
          </div>
        </div>
      </el-main>
      <el-aside width="250px">
        <edit
          :type="type"
          class="edit"
        ></edit>
      </el-aside>
    </el-container>
    <el-dialog
      ref="dialog"
      title="提示"
      :modal-append-to-body="false"
      :visible.sync="dialogVisible"
      width="80%"
      top="10vh"
      :before-close="handleClose"
    >
      <!-- <div id="previewKrpano">
        <img
          v-show="isShowTip"
          class="tip-icon"
          :src="worksData.tip.pcUrl"
          alt="移动端提示图片"
        />
        <img
          :style="worksData.logo.posType === 1 ? leftStyle : rightStyle"
          class="logo-icon"
          :src="worksData.logo.url"
          alt="这是全景图logo"
        />
        <div
          v-show="iframeShow"
          class="popup"
        >
          <iframe
            style="width: 100%; height: 100%;"
            :src="iframeUrl"
            frameborder="0"
            scrolling="auto"
          ></iframe>
          <img
            @click="iframeShow = false"
            class="cancel"
            src="@/assets/close.png"
            alt="取消按钮"
          />
        </div>
        <div class="krpano-list flex-row cen-cen">
          <div
            v-for="item in krpanoList"
            :key="item.id"
            class="select-item"
            :style="{ backgroundImage: `url(${item.logo})` }"
            :class="{ active: item.id === prevKrpano }"
            @click="selectPreview(item)"
          ></div>
        </div>
      </div>-->
      <iframe
        v-if="dialogVisible"
        frameborder="0"
        id="view"
        src="http://192.168.103.147:8081"
        style="width: 100%; height: 600px"
      ></iframe>
    </el-dialog>
  </el-container>
</template>

<script>
import ListBar from '@/views/list-bar/list-bar';
import Edit from '@/views/edit/edit';
import Basic from '../edit/component/basic/basic';
import { mapGetters, mapMutations } from 'vuex';
import setWorksData from '@/mixins/setWorksData.js';

export default {
  name: 'home',
  mixins: [setWorksData],
  components: {
    ListBar,
    Edit,
    Basic
  },
  data() {
    return {
      iframeUrl: '', //超链接href
      iframeShow: false, //显示全景器弹窗
      type: 1, //当前编辑模块
      isShowTip: true, //是否显示预览全景图的提示图片
      krpano: '', //全景对象
      previewKrpano: '',
      dialogVisible: false, //显示弹窗
      publicPath: process.env.BASE_URL, //静态资源绝对路径
      leftStyle: {
        left: '10px',
        top: '10px'
      },
      rightStyle: {
        right: '10px',
        bottom: '10px'
      },
      form: {
        hlookat: 0.0,
        vlookat: 0.0
      }
    };
  },
  mounted() {
    embedpano({
      xml: `${this.publicPath}/xml/home.xml`,
      target: 'krpano',
      html5: 'auto',
      id: 'krpanoSWFObject',
      mobilescale: 1.0,
      passQueryParameters: true,
      onready: this.krpanoReady
    });
  },
  methods: {
    //设置对应热点
    setHot(krpano, item) {
      let awaitNum = this.previewShow ? 200 : 300;
      this[krpano].call(`addhotspot(${item.spotname})`);
      this[krpano].call(
        `hotspot[${item.spotname}].loadstyle(your_hotspotstyle)`
      );
      this[krpano].set(`hotspot[${item.spotname}].url`, item.url);
      this[krpano].set(`hotspot[${item.spotname}].ath`, item.hlookat);
      this[krpano].set(`hotspot[${item.spotname}].atv`, item.vlookat);
      this[krpano].set(`hotspot[${item.spotname}].scale`, 0.6);
      setTimeout(() => {
        this[krpano].set(`plugin[tooltip_${item.spotname}].html`, item.title);
      }, awaitNum);
      //编辑模式
      if (!this.dialogVisible) {
        this[krpano].set(`hotspot[${item.spotname}].ondown`, `draghotspot()`);
      }
      //预览模式
      if (this.dialogVisible) {
        this[krpano].set(
          `hotspot[${item.spotname}].onclick`,
          this.setLoad.bind(this, krpano, item)
        );
      }
    },
    //预览窗口场景列表选择
    selectPreview(item) {
      this.setPrevKrpano(item.id);
      this.previewKrpano.call(
        `loadpano( ${item.url} , null, MERGE, BLEND(0.3))`
      );
      setTimeout(() => {
        this.initKrpano('previewKrpano');
      }, 100);
    },
    //设置跳转方式和链接
    setLoad(krpano, item) {
      let { type, href, hrefType } = item;
      if (type != 2) {
        let selectKrpano = this.krpanoList.find(item => item.url === href);
        this.setPrevKrpano(selectKrpano.id);
        this[krpano].call(`loadpano( ${href} , null, MERGE, BLEND(0.3))`);
        setTimeout(() => {
          this.initKrpano(krpano);
        }, 100);
        return;
      }
      if (!hrefType || hrefType == 1) {
        window.open(href);
      } else if (hrefType == 2) {
        this.iframeShow = true;
        this.iframeUrl = href;
      }
    },
    //初始化场景数据
    initKrpano(obj) {
      //判断当前是预览还是编辑取对应数据
      let data = this.dialogVisible ? this.previewDetail : this.krpanoDetail;
      //图片提示时间
      let duration = this.worksData.tip.duration;
      this.isShowTip = true;
      setTimeout(() => {
        this.isShowTip = false;
      }, duration * 1000);
      if (this.dialogVisible) {
        this[obj].set('autorotate.speed', this.worksData.cruise.speed);
        this[obj].set('autorotate.enabled', this.worksData.cruise.auto);
      }
      this[obj].set('view.hlookat', data.hlookat);
      this[obj].set('view.vlookat', data.vlookat);
      this[obj].set('view.hlookatmin', data.hlookatmin);
      this[obj].set('view.hlookatmax', data.hlookatmax);
      this[obj].set('view.vlookatmin', data.vlookatmin);
      this[obj].set('view.vlookatmax', data.vlookatmax);
      data.hostList.forEach(item => this.setHot(obj, item));
    },
    //预览全景图渲染完成
    previewReady(obj) {
      this.previewKrpano = obj;
      setTimeout(() => {
        this.initKrpano('previewKrpano');
      }, 100);
    },
    handleClose() {
      this.iframeUrl = null;
      this.dialogVisible = false;
    },
    //预览初始化
    preview() {
      this.dialogVisible = true;
      // if (this.previewKrpano) {
      //   this.isShowTip = true
      //   this.initKrpano('previewKrpano');
      //   return;
      // }
      // setTimeout(() => {
      //   embedpano({
      //     xml: `${this.publicPath}/xml/home.xml`,
      //     target: 'previewKrpano',
      //     html5: 'auto',
      //     id: 'previewObject',
      //     mobilescale: 1.0,
      //     passQueryParameters: true,
      //     onready: this.previewReady
      //   });
      // }, 100);
      setTimeout(() => {
        let view = document.getElementById('view');
        view.contentWindow.postMessage(
          this.worksData,
          'http://192.168.103.147:8081'
        );
      }, 200);
    },
    //应用视角到场景
    setInitView() {
      this.form.hlookat = this.krpano.get('view.hlookat');
      this.form.vlookat = this.krpano.get('view.vlookat');
      this.$message.success('保存成功');
      this.buildWorks(this.form);
    },
    save() {
      this.$message.success('保存成功');
    },
    //当前活跃编辑
    editActive(type) {
      this.type = type;
    },
    //绘制完成回调
    krpanoReady(obj) {
      this.krpano = obj;
    },
    //设置编辑场景
    setItem(item) {
      this.krpano.call(`loadpano(${item.url})`);
      this.setKrpano(item.id);
      setTimeout(() => {
        this.initKrpano('krpano');
      }, 100);
    },
    ...mapMutations({
      setKrpano: 'krpano/SET_EDITKRPANO',
      setPrevKrpano: 'krpano/SET_PREVKRPANO'
    })
  },
  computed: {
    ...mapGetters([
      'krpanoList',
      'editKrpano',
      'prevKrpano',
      'worksData',
      'krpanoDetail',
      'previewDetail'
    ])
  }
};
</script>

<style lang="scss" scoped>
@import '@/style/mixins.scss';
.home {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  .el-header.header {
    height: 40px;
    line-height: 40px;
    border-color: #4b4b4b #000 #000 #4b4b4b;
    border-style: solid;
    border-width: 1px;
  }
  .krpano-show {
    width: 100%;
    height: 83%;
    @include border;
    #krpano {
      position: relative;
      width: 100%;
      height: 100%;
      box-shadow: 3px 3px 10px rgba(7, 17, 27, 0.2);
      .perspe-box {
        position: absolute;
        width: 60%;
        height: 60%;
        border: 2px solid white;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0);
        z-index: 1000;
        /* 设置css穿透 */
        -webkit-pointer-events: none;
        -moz-pointer-events: none;
        -ms-pointer-events: none;
        -o-pointer-events: none;
        pointer-events: none;
      }
      .perspe-button {
        position: absolute;
        left: 50%;
        bottom: 50%;
        transform: translate3D(-50%, 100px, 0);
        z-index: 1000;
      }
    }
  }
  .krpano-wrapper {
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    width: 100%;
    height: 15%;
    min-height: 100px;
    margin-top: 1%;
    @include border;
    .krpano-item {
      width: 70px;
      margin-right: 10px;
      cursor: pointer;
      .logo {
        width: 70px;
        height: 70px;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        &.active {
          border: 2px solid yellow;
        }
      }
      .text {
        font-size: 12px;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 16px;
        text-align: center;
        width: 70px;
      }
    }
    .add_btn {
      font-size: 13px;
      width: 70px;
      height: 70px;
      border: 1px dashed white;
      border-radius: 5px;
      font-size: 12px;
      cursor: pointer;
    }
  }
  #previewKrpano {
    position: relative;
    width: 100%;
    height: 600px;
    .tip-icon {
      z-index: 1000;
      position: absolute;
      width: 150px;
      height: 150px;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
    .logo-icon {
      z-index: 1000;
      position: absolute;
      width: 200px;
      height: 100px;
    }
    .popup {
      position: absolute;
      z-index: 3000;
      width: 85%;
      height: 70%;
      background-color: white;
      left: 50%;
      top: 50%;
      transform: translate3d(-50%, -50%, 0);
      .cancel {
        cursor: pointer;
        position: absolute;
        width: 30px;
        height: 30px;
        top: 0;
        right: -40px;
      }
    }
    .krpano-list {
      position: absolute;
      width: 100%;
      height: 100px;
      bottom: 10%;
      background-color: rgba(7, 17, 27, 0.4);
      z-index: 1000;
      .select-item {
        width: 85px;
        height: 85px;
        background-color: white;
        margin: 0 10px;
        @include background;
        &.active {
          border: 2px solid yellow;
        }
      }
    }
  }
}
</style>
