<template>
  <div class="list-bar">
    <router-link
      :to="item.link"
      tag="div"
      @click.native="onActive(item.type)"
      v-for="item in list"
      :key="item.type"
      class="list-item"
    >{{ item.name }}</router-link>
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
          link: '/basic'
        },
        {
          type: 2,
          name: '热点',
          link: '/hotspot'
        },
        {
          type: 3,
          name: '视角',
          link: 'perspe'
        },
        {
          type: 4,
          name: '音乐',
          link: 'music'
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
    line-height: 60px;
    text-align: center;
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
