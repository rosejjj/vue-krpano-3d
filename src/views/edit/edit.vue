<template>
  <div class="edit">
    <work-code v-show="type === 1"></work-code>
    <hotspot-edit v-show="type === 2"></hotspot-edit>
    <perspe v-show="type === 3"></perspe>
  </div>
</template>

<script>
import HotspotEdit from './component/hotspot';
import Perspe from './component/perspe';
import WorkCode from './component/workCode';
export default {
  components: {
    HotspotEdit,
    Perspe,
    WorkCode
  },
  props: {
    type: {
      type: Number,
      default: 1
    }
  }
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
