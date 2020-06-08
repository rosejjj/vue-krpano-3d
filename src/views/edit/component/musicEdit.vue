<template>
  <div class="music-edit">
    <audio
      ref="music"
      :src="music.url"
      :loop="music.loop"
    >真香</audio>
    <audio
      ref="narrator"
      :src="narrator.url"
      :loop="narrator.loop"
    >真香</audio>
    <div class="mb20 w100">
      <div class="form-item flex-row sp-be-cen">
        <span>背景音乐</span>
        <el-button
          @click="() => { isMusicEdit = true; selectVisiable = true }"
          size="small"
          type="primary"
        >选择音乐</el-button>
      </div>
      <div class="form-item music">
        <div
          v-if="music.url"
          class="w100 h100 flex-row -cen"
        >
          <img
            @click="startMusic('music', 'isPlay')"
            style="width: 35px; height: 35px"
            :src="isPlay ?  require('@/assets/icon/stop.png') : require('@/assets/icon/play.png') "
            alt="播放图标"
          />
          <div class="music-data">
            <div class="music-name">{{ music.name }}</div>
            <div
              @click="deleteMusic('music')"
              class="music-btn"
            >删除</div>
          </div>
        </div>
        <div
          v-else
          style="line-height: 48px"
          class="w100 h100 text-center"
        >请使用MP3格式</div>
      </div>
      <div class="form-item">
        <div class="w100 flex-row sp-be-cen">
          <span>音乐音量</span>
          <span>{{ music.volume }}%</span>
        </div>
        <el-slider
          class="mt10"
          :min="0"
          :max="100"
          v-model="music.volume"
        ></el-slider>
      </div>
      <div class="form-item flex-row sp-be-cen">
        <span>循环播放</span>
        <el-checkbox v-model="music.loop"></el-checkbox>
      </div>
      <div class="form-item flex-row sp-be-cen">
        <span>应用到:</span>
        <el-button
          @click="setMusic(true)"
          size="mini"
          type="primary"
        >选择场景</el-button>
      </div>
    </div>
    <div
      style="width: 100%; height: 2px; border-top: 1px solid rgba(0,0,0); border-bottom: 1px solid rgba(75,75,75)"
    ></div>
    <div
      style="margin-top: 25px"
      class="w100"
    >
      <div class="form-item flex-row sp-be-cen">
        <span>语言讲解</span>
        <el-button
          @click="() => { isMusicEdit = false; selectVisiable = true }"
          size="small"
          type="primary"
        >选择音乐</el-button>
      </div>
      <div class="form-item music">
        <div
          v-if="narrator.url"
          class="w100 h100 flex-row -cen"
        >
          <img
            @click="startMusic('narrator','isNarrator')"
            style="width: 35px; height: 35px"
            :src="isNarrator ?  require('@/assets/icon/stop.png') : require('@/assets/icon/play.png') "
            alt="播放图标"
          />
          <div class="music-data">
            <div class="music-name">{{ narrator.name }}</div>
            <div
              @click="deleteMusic('narrator')"
              class="music-btn"
            >删除</div>
          </div>
        </div>
        <div
          v-else
          style="line-height: 48px"
          class="w100 h100 text-center"
        >请使用MP3格式</div>
      </div>
      <div class="form-item">
        <div class="w100 flex-row sp-be-cen">
          <span>音乐音量</span>
          <span>{{ narrator.volume }}%</span>
        </div>
        <el-slider
          class="mt10"
          :min="0"
          :max="100"
          v-model="narrator.volume"
        ></el-slider>
      </div>
      <div class="form-item flex-row sp-be-cen">
        <span>循环播放</span>
        <el-checkbox v-model="narrator.loop"></el-checkbox>
      </div>
    </div>
    <div class="form-item flex-row sp-be-cen">
      <span>应用到:</span>
      <el-button
        @click="setMusic(false)"
        type="primary"
        size="mini"
      >选择场景</el-button>
    </div>
    <el-dialog
      :modal-append-to-body="false"
      :visible.sync="dialogVisible"
      title="选择需要应用到的场景"
    >
      <div style="min-height: 400px">
        <div class="krpano-wrapper">
          <div
            v-for="(item,index) in newKrpanoList"
            :key="item.id"
            class="krpano-item"
          >
            <div
              @click.stop="selectKrpano(index)"
              :class="{ active: item.status }"
              :style="{ backgroundImage: `url(${item.logo})` }"
              class="bg-img"
            ></div>
            <div
              style="color: black"
              class="text-center mt10"
            >{{ item.name }}</div>
          </div>
        </div>
      </div>
      <div
        slot="footer"
        class="w100 flex-row cen-cen"
      >
        <el-button
          @click="saveMusic"
          :disabled="!someSelect"
          style="width: 120px"
          size="small"
          type="danger"
        >应用</el-button>
        <el-checkbox
          v-model="selectAll"
          class="select_btn"
        >全选</el-checkbox>
      </div>
    </el-dialog>
    <select-music
      ref="selectMusic"
      :selectVisiable="selectVisiable"
      @close="selectVisiable = false"
      @selectItem="selectItem"
    ></select-music>
  </div>
</template>

<script>
import setWorksData from '@/mixins/setWorksData.js';
import { mapGetters } from 'vuex';
import SelectMusic from '@/components/selectMusic/selectMusic';

export default {
  name: 'music-edit',
  mixins: [setWorksData],
  components: {
    SelectMusic
  },
  created() {
    this.music = { ...this.changeMusic };
    this.narrator = { ...this.changeNarrator };
  },
  data() {
    return {
      selectVisiable: false, //是否选择音乐
      isMusicEdit: false, //是否正在应用设置音乐
      newKrpanoList: [], //当前选择的场景
      selectAll: false, //选择全部
      dialogVisible: false, //场景弹窗
      isPlay: false,
      isNarrator: false,
      //背景音乐
      music: {
        url:
          'https://isure.stream.qqmusic.qq.com/C400000Umkct2IjBZg.m4a?guid=8471296062&vkey=7C68785A13D6C0C0EB3A2466D9E2943AF281F591B7EE3D8A87B57BD4B83F8F47DDBC822264445908DE71D99FED3C1C495CD98FE57ECA1304&uin=0&fromtag=66',
        name: '后来遇见他',
        volume: 100,
        loop: false
      },
      //旁白
      narrator: {
        url:
          'https://isure.stream.qqmusic.qq.com/C400000Umkct2IjBZg.m4a?guid=8471296062&vkey=7C68785A13D6C0C0EB3A2466D9E2943AF281F591B7EE3D8A87B57BD4B83F8F47DDBC822264445908DE71D99FED3C1C495CD98FE57ECA1304&uin=0&fromtag=66',
        name: '后来遇见他',
        volume: 100,
        loop: false
      }
    };
  },
  methods: {
    //删除音乐
    deleteMusic(type) {
      let form =
        type == 'music'
          ? { music: { url: '', name: '', volume: 100, loop: false } }
          : { narrator: { url: '', name: '', volume: 100, loop: false } };
      this.buildWorks(form);
    },
    //选择对应音乐
    selectItem(item) {
      this.$refs.selectMusic.clearCurrentRow({});
      let { url, name } = item;
      let type = this.isMusicEdit ? 'music' : 'narrator';
      let audio = this.$refs[type];
      audio.pause();
      audio.currentTime = 0;
      this[type].url = url;
      this[type].name = name;
    },
    //点击场景取反
    selectKrpano(index) {
      let status = this.newKrpanoList[index].status;
      this.$set(this.newKrpanoList[index], 'status', !status);
    },
    //设置场景音乐
    setMusic(isMusic) {
      this.isMusicEdit = isMusic;
      this.dialogVisible = true;
      this.newKrpanoList.forEach(item => (item.status = false));
    },
    setValue(obj, key, value) {
      this.$refs[obj][key] = key == 'volume' ? value / 100 : value;
    },
    startMusic(obj = 'music', str = 'isPlay') {
      let audio = this.$refs[obj];
      if (audio.paused) {
        audio.play();
        this[str] = true;
      } else {
        audio.pause();
        audio.currentTime = 0;
        this[str] = false;
      }
    },
    //多场景配置音乐或旁白
    saveMusic() {
      let form = this.isMusicEdit
        ? { music: this.music }
        : { narrator: this.narrator };
      this.newKrpanoList.forEach(item => {
        if (item.status) {
          this.buildWorks(form, item.id);
        }
      });
      this.$message.success('设置成功');
      this.dialogVisible = false;
    }
  },
  computed: {
    ...mapGetters(['krpanoList', 'krpanoDetail']),
    someSelect() {
      return this.newKrpanoList.some(item => item.status == true);
    },
    changeMusic() {
      return this.krpanoDetail.music
        ? this.krpanoDetail.music
        : { url: '', name: '', volume: 100, loop: false };
    },
    changeNarrator() {
      return this.krpanoDetail.narrator
        ? this.krpanoDetail.narrator
        : { url: '', name: '', volume: 100, loop: false };
    }
  },
  watch: {
    'music.volume'(value) {
      this.setValue('music', 'volume', value);
    },
    'music.loop'(value) {
      this.setValue('music', 'loop', value);
    },
    'narrator.volume'(value) {
      this.setValue('narrator', 'volume', value);
    },
    'narrator.loop'(value) {
      this.setValue('narrator', 'loop', value);
    },
    dialogVisible(status) {
      if (status) {
        this.newKrpanoList = JSON.parse(
          JSON.stringify(this.krpanoList.slice(0))
        );
      }
    },
    selectAll(status) {
      if (status) {
        this.newKrpanoList.forEach(item => (item.status = status));
      }
    },
    newKrpanoList: {
      handler(newValue) {
        this.selectAll = newValue.every(item => item.status === true);
      },
      deep: true
    },
    changeMusic: {
      handler(newValue) {
        this.music = { ...newValue };
      },
      deep: true
    },
    changeNarrator: {
      handler(newValue) {
        this.narrator = { ...newValue };
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import '@/style/mixins.scss';
.music-edit {
  padding: 10px;
  font-size: 15px;
  .form-item {
    margin-bottom: 20px;
    width: 100%;
  }
  .music {
    padding: 0 10px;
    height: 50px;
    background-color: #2c2c2c;
    color: #aaa;
    border: 1px solid #4b4b4b;
    border-radius: 3px;
    .music-data {
      flex: 1;
      padding-left: 10px;
      .music-name {
        font-size: 13px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        min-height: 1em;
        color: white;
        margin-bottom: 2px;
      }
      .music-btn {
        user-select: none;
        color: #427afb;
        cursor: pointer;
        font-size: 13px;
        margin-top: 2px;
      }
    }
  }

  .krpano-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .krpano-item {
      width: 84px;
      margin: 10px 5px 0;
      cursor: pointer;
      .bg-img {
        box-sizing: border-box;
        width: 80px;
        height: 80px;
        @include background;
        &.active {
          border: 2px solid yellow;
        }
      }
    }
  }
  .select_btn {
    position: absolute;
    left: 30px;
    bottom: 20px;
  }
}
</style>