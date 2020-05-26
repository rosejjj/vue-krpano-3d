<template>
  <div class="hotspot">
    <el-button
      @click="showEdit"
      style="width: 100%"
      type="primary"
      size="small"
    >添加热点</el-button>
    <div class="hotspot-title">当前热点场景({{ this.hostList.length }})</div>
    <div class="hotspot-list">
      <div
        v-for="item in hostList"
        :key="item.spotname"
        class="hotspot-item"
        @click="setActive(item)"
      >
        <img
          class="icon"
          :src="item.url"
          alt="这是图标"
        />
        <span class="title">{{ item.title }}</span>
        <span class="type">{{ item.type === 1 ? '全景跳转':'超链接' }}</span>
      </div>
    </div>
    <transition name="slider">
      <div
        v-if="isEdit"
        class="hotspot-detail"
      >
        <div class="hotspot-head">
          <h4 class="head-title">添加热点</h4>
          <img
            @click="closeEdit"
            class="close"
            src="@/assets/close.png"
            alt="关闭按钮"
          />
        </div>
        <div class="hotspot-edit">
          <div class="item-title">选择图标</div>
          <div class="icon-box">
            <div
              @click="setIcon(item)"
              v-for="item in iconList"
              :key="item.id"
              class="icon-wrapper"
              :class="{ active: item.id === form.activeIcon }"
            >
              <img
                :style="item.style"
                :src="item.url"
                alt="热点图标"
              />
            </div>
          </div>
          <div class="item-title">选择热点类型</div>
          <el-form
            class="p10"
            label-position="top"
            label-width="80px"
          >
            <el-form-item label="热点类型">
              <el-select
                v-model="form.type"
                class="input"
                placeholder="热点类型"
              >
                <el-option
                  v-for="item in loadList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标题">
              <el-input
                v-model="form.title"
                class="input"
                placeholder="填写标题"
              ></el-input>
            </el-form-item>
            <el-form-item
              v-show="form.type == 1"
              label="选择目标场景"
            >
              <div class="w100 scene-box">
                <div
                  @click="setKrpano(item)"
                  v-for="item in krpanoList"
                  :key="item.id"
                  :style="{ backgroundImage: `url(${item.logo})` }"
                  class="scene-item"
                  :class="{ active: item.id === form.activeKrpano }"
                ></div>
              </div>
            </el-form-item>
            <el-form-item
              v-show="form.type === 2"
              label="超链接"
            >
              <el-input
                v-model="form.href"
                placeholder="请输入超链接"
              ></el-input>
            </el-form-item>
            <el-form-item
              v-show="form.type === 2"
              label="打开方式"
            >
              <el-select
                v-model="form.hrefType"
                placeholder="请选择打开方式"
              >
                <el-option
                  v-for="item in hyperList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="mt10">
              <el-button
                @click="saveSpot"
                type="primary"
              >保存</el-button>
              <el-button
                @click="removeHost"
                type="wran"
              >删除</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  mounted() {
    setTimeout(() => {
      this.krpano = document.getElementById('krpanoSWFObject');
    }, 500);
  },
  data() {
    return {
      isEdit: false, //显示热点编辑
      publicPath: process.env.BASE_URL, //静态资源绝对路径
      form: {
        url: require('../../../assets/icon/vtourskin_hotspot.png'),
        href: '', //超链接
        hrefType: '', //超链接弹出方式
        hlookat: 0.0, //水平定位
        vlookat: 0.0, //垂直定位
        spotname: '', //在全景图中的热点名称
        activeIcon: 1, //当前选中图标
        activeKrpano: 1, //热点跳转场景id
        type: 1, //当前热点类型
        title: '' //热点标题
      },
      //热点类型
      loadList: [
        {
          id: 1,
          name: '全景图'
        },
        {
          id: 2,
          name: '超链接'
        }
      ],
      //可选图标
      iconList: [
        {
          id: 1,
          url: require('../../../assets/icon/vtourskin_hotspot.png'),
          name: '图标1',
          style: {
            width: '30px',
            height: '30px'
          }
        },
        {
          id: 2,
          url: require('../../../assets/icon/vtourskin_mapspot.png'),
          name: '图标2',
          style: {
            width: '30px',
            height: '30px'
          }
        },
        {
          id: 3,
          url: require('../../../assets/icon/vtourskin_mapspotactive.png'),
          name: '图标3',
          style: {
            width: '30px',
            height: '30px'
          }
        }
      ],
      //hyper
      hyperList: [
        {
          id: 1,
          name: '新窗口打开'
        },
        {
          id: 2,
          name: '弹出层打开'
        }
      ]
    };
  },
  methods: {
    //删除热点
    removeHost(item) {
      this.krpano.call(`removehotspot(${this.form.spotname})`);
      if (this.isSaveIndex > -1) {
        let worksData = JSON.parse(JSON.stringify(this.worksData));
        let index = worksData.krpanoList.findIndex(
          item => item.id === this.editKrpano
        );
        worksData.krpanoList[index].hostList.splice(this.isSaveIndex, 1);
        this.setWorksData(worksData);
      } else {
        this.initEdit();
      }
      this.$message.success('删除成功');
      this.isEdit = false;
    },
    //当前编辑热点
    setActive(item) {
      this.isEdit = true;
      this.form = item;
    },
    //关闭热点编辑
    closeEdit() {
      if (this.isSaveIndex > -1) {
        this.isEdit = false;
      } else {
        this.$confirm('当前未保存的改动将丢失，确认继续？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(res => {
          this.krpano.call(`removehotspot(${this.form.spotname})`);
          this.isEdit = false;
        });
      }
    },
    //保存热点
    saveSpot() {
      this.form.hlookat = this.krpano.get(`hotspot[${this.form.spotname}].ath`);
      this.form.vlookat = this.krpano.get(`hotspot[${this.form.spotname}].atv`);
      let worksData = JSON.parse(JSON.stringify(this.worksData));
      let index = worksData.krpanoList.findIndex(
        item => item.id === this.editKrpano
      );
      let hostList = worksData.krpanoList[index].hostList;
      let hotIndex = hostList.findIndex(
        item => item.spotname === this.form.spotname
      );
      if (hotIndex > -1) {
        hostList[hotIndex] = this.form;
      } else {
        hostList.push(this.form);
      }
      this.setWorksData(worksData);
      this.isEdit = false;
      this.$message.success('保存热点成功');
    },
    //通用设置krpano属性
    setValue(key, value) {
      this.krpano.call(`set(${key}, ${value})`);
    },
    //初始化编辑热点
    initEdit() {
      this.form = {
        url: require('../../../assets/icon/vtourskin_hotspot.png'),
        href: '', //超链接
        hrefType: '', //超链接弹出方式
        hlookat: this.krpano.get('view.hlookat'), //水平定位
        vlookat: this.krpano.get('view.vlookat'), //垂直定位
        spotname: `spotname_${this.hostList.length + 1}`, //在全景图中的热点名称
        activeIcon: 1, //当前选中图标
        activeKrpano: 1, //热点跳转场景id
        type: 1, //当前热点类型
        title: '' //热点标题
      };
    },
    //选择对应热点编辑
    setActiveHot(name) {
      if (this.isSaveIndex > -1) {
        this.form = this.hostList.find(item => item.spotname === name);
        this.isEdit = true;
      } else {
        this.$confirm('当前未保存的改动将丢失，确认继续？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(res => {
            this.krpano.call(`removehotspot(${this.form.spotname})`);
            this.form = this.hostList.find(item => item.spotname === name);
          })
          .catch(res => {
            console.log('继续编辑');
          });
      }
    },
    //设置全景图对应热点
    setHot(krpano, item) {
      let awaitNum = this.previewShow ? 300 : 400;
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
      this[krpano].set(`hotspot[${item.spotname}].ondown`, `draghotspot()`);
      this[krpano].set(
        `hotspot[${item.spotname}].onclick`,
        this.setActiveHot.bind(this, item.spotname)
      );
    },
    //点击添加热点
    showEdit() {
      this.isEdit = true;
      this.initEdit();
      this.setHot('krpano', this.form);
    },
    //设置图标
    setIcon(item) {
      this.form.activeIcon = item.id;
      this.form.url = item.url;
      this.krpano.set(`hotspot[${this.form.spotname}].url`, this.form.url);
    },
    //热点对应场景
    setKrpano(item) {
      this.form.activeKrpano = item.id;
      this.form.href = item.url;
    },
    ...mapMutations({
      setWorksData: 'krpano/SET_WORKSDATA'
    })
  },
  watch: {
    'form.title'(value) {
      this.setValue(`plugin[tooltip_${this.form.spotname}].html`, value);
    }
  },
  computed: {
    ...mapGetters(['krpanoList', 'hostList', 'worksData', 'editKrpano']),
    //当前编辑热点是否有保存
    isSaveIndex() {
      let index = this.hostList.findIndex(
        item => item.spotname === this.form.spotname
      );
      return index;
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/style/mixins.scss';

.hotspot {
  width: 100%;
  .input {
    width: 200px;
  }
  .hotspot-title {
    margin-top: 10px;
    font-size: 15px;
  }
  .hotspot-list {
    width: 100%;
    .hotspot-item {
      padding: 0 10px;
      display: flex;
      align-items: center;
      margin: 15px 0;
      background-color: #3a3a3a;
      color: white;
      height: 35px;
      border-radius: 2px;
      cursor: pointer;
      &:hover {
        background-color: lightgray;
      }
      .icon {
        width: 22px;
        height: 22px;
      }
      .title {
        font-size: 14px;
        padding-left: 9px;
        width: 130px;
      }
      .type {
        font-size: 12px;
        color: #aaa;
      }
    }
  }
  .hotspot-detail {
    padding: 40px 0;
    @include edit-box;
    .hotspot-head {
      position: absolute;
      right: 0;
      top: 0;
      padding: 0 20px;
      width: 250px;
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      @include border;
      .head-title {
        font-size: 15px;
      }
      .close {
        width: 16px;
        height: 16px;
        cursor: pointer;
      }
    }
    .hotspot-edit {
      width: 100%;
      height: 100%;
      .icon-box {
        width: 100%;
        padding: 20px 15px 20px;
        display: flex;
        flex-wrap: wrap;
        .icon-wrapper {
          width: 40px;
          height: 40px;
          margin: 2px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          &.active {
            border: 2px solid yellow;
          }
        }
      }
      .scene-box {
        width: 100%;
        .scene-item {
          width: 80px;
          height: 80px;
          margin: 10px;
          float: left;
          background-repeat: no-repeat;
          background-size: cover;
          background-position: center center;
          cursor: pointer;
          &.active {
            border: 2px solid yellow;
          }
        }
      }
    }
  }
}
</style>
