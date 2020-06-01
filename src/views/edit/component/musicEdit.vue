<template>
  <div class="music-edit">
    <audio
      ref="music"
      style="display: none"
      :src="music.url"
      :loop="music.loop"
    >真香</audio>
    <audio
      ref="narrator"
      style="display: none"
      :src="narrator.url"
      :loop="narrator.loop"
    >真香</audio>
    <div class="mb20 w100 bg-box">
      <div class="form-item flex-row sp-be-cen">
        <span>背景音乐</span>
        <el-button
          size="small"
          type="primary"
        >选择音乐</el-button>
      </div>
      <div class="form-item music flex-row -cen mt20">
        <img
          @click="startMusic('music', 'isPlay')"
          style="width: 35px; height: 35px"
          :src="isPlay ?  require('@/assets/icon/stop.png') : require('@/assets/icon/play.png') "
          alt="播放图标"
        />
        <div class="music-data">
          <div class="music-name">{{ music.name }}</div>
          <div class="music-btn">删除</div>
        </div>
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
    </div>
    <div class="w100">
      <div class="form-item flex-row sp-be-cen">
        <span>语言讲解</span>
        <el-button
          size="small"
          type="primary"
        >选择音乐</el-button>
      </div>
      <div class="form-item music flex-row -cen mt20">
        <img
          @click="startMusic('narrator','isNarrator')"
          style="width: 35px; height: 35px"
          :src="isNarrator ?  require('@/assets/icon/stop.png') : require('@/assets/icon/play.png') "
          alt="播放图标"
        />
        <div class="music-data">
          <div class="music-name">{{ narrator.name }}</div>
          <div class="music-btn">删除</div>
        </div>
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
      <el-button
        @click="save"
        class="w100"
        type="primary"
      >应用到此场景</el-button>
    </div>
  </div>
</template>

<script>
import setWorksData from '@/mixins/setWorksData.js';

export default {
  name: 'music-edit',
  mixins: [setWorksData],
  data() {
    return {
      isPlay: false,
      isNarrator: false,
      //背景音乐
      music: {
        url:
          'https://ws.stream.qqmusic.qq.com/C400002TRY4a3zfxC8.m4a?guid=8471296062&vkey=B67A82022DB6C9514B1C002626F89620FC809584D6E7119BC8C03FB2345609FB75F0EBB5D9143565A8A124F790B661B57E56A3243E72185F&uin=417&fromtag=66',
        name: '年少有为',
        volume: 100,
        loop: false
      },
      //旁白
      narrator: {
        url:
          'https://ws.stream.qqmusic.qq.com/C400002TRY4a3zfxC8.m4a?guid=8471296062&vkey=B67A82022DB6C9514B1C002626F89620FC809584D6E7119BC8C03FB2345609FB75F0EBB5D9143565A8A124F790B661B57E56A3243E72185F&uin=417&fromtag=66',
        name: '年少有为翻版',
        volume: 100,
        loop: false
      }
    };
  },
  methods: {
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
        this[str] = false;
      }
    },
    save() {
      this.buildWorks({ music: this.music });
      this.buildWorks({ narrator: this.narrator });
      this.$message.success('应用成功');
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
  .bg-box {
    border-bottom: 2px solid white;
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
}
</style>