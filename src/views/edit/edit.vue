<template>
  <div class="edit">
    <router-view></router-view>
  </div>
</template>

<script>
import HotspotEdit from './component/hotspot';
import Perspe from './component/perspe';
import WorkCode from './component/workCode';
import MusicEdit from './component/musicEdit';
export default {
  components: {
    HotspotEdit,
    Perspe,
    WorkCode,
    MusicEdit
  },
};
</script>

<style lang="scss" scoped>
.edit {
  padding: 10px;
  width: 100%;
  height: 100%;
  color: white;
  border-color: #4b4b4b #000 #000 #4b4b4b;
  border-style: solid;
  border-width: 1px;
}
</style>
