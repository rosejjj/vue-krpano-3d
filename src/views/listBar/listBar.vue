<template>
  <div class="list-bar">
    <router-link
      :to="item.link"
      tag="div"
      @click.native="onActive(item.type)"
      v-for="item in list"
      :key="item.type"
      class="list-item flex-colum cen-cen"
    >
      <img
        class="margin-bottom: 3px"
        :style="item.size"
        :src="$route.path == item.link ? item.activeUrl :item.iconUrl"
      />
      <div style="margin-top: 3px">{{ item.name }}</div>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeType: 1, //当前编辑项
      list: [
        {
          type: 1,
          name: '基础',
          iconUrl: require('@/assets/basic-icon.png'),
          activeUrl: require('@/assets/basic-icon-active.png'),
          size: {
            width: '18px',
            height: '18px'
          },
          link: '/basic'
        },
        {
          type: 2,
          name: '热点',
          iconUrl: require('@/assets/host-icon.png'),
          activeUrl: require('@/assets/host-icon-active.png'),
          size: {
            width: '18px',
            height: '18px'
          },
          link: '/hotspot'
        },
        {
          type: 3,
          name: '视角',
          iconUrl: require('@/assets/eyes-icon.png'),
          activeUrl: require('@/assets/eyes-icon-active.png'),
          size: {
            width: '18px',
            height: '14px'
          },
          link: '/perspe'
        },
        {
          type: 4,
          name: '音乐',
          iconUrl: require('@/assets/music-icon.png'),
          activeUrl: require('@/assets/music-icon-active.png'),
          size: {
            width: '18px',
            height: '18px'
          },
          link: '/music'
        }
      ]
    };
  },
  methods: {
    onActive(type) {
      this.activeType = type;
      this.$emit('editActive', type);
    }
  }
};
</script>

<style lang="scss" scoped>
.list-bar {
  width: 100%;
  height: 100%;
  border-color: #4b4b4b #000 #000 #4b4b4b;
  border-style: solid;
  border-width: 1px;
  .list-item {
    width: 100%;
    height: 60px;
    font-size: 14px;
    color: #999999;
    cursor: pointer;
    &.active {
      background-color: #409eff;
      color: white;
    }
  }
}
</style>
