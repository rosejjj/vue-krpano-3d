<template>
  <div class="music-edit">
    <div class="form-item flex-row sp-be-cen">
      <span>背景音乐</span>
      <el-button
        size="small"
        type="primary"
      >选择音乐</el-button>
    </div>
    <div class="form-item music flex-row -cen mt20">
      <img
        style="width: 35px; height: 35px"
        src="@/assets/icon/play.png"
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
      music: {
        url: '',
        name: '卡农',
        volume: 0,
        loop: false
      }
    };
  },
  methods: {
    save() {
      this.buildWorks({ music: this.music });
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
}
</style>