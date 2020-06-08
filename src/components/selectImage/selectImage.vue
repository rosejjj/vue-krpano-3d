<template>
  <el-dialog
    class="select-image"
    :visible.sync="visiable"
    width="80%"
    top="10vh"
    :modal-append-to-body="false"
  >
    <div
      style="padding: 0 40px 0 20px"
      class="flex-row sp-be-cen"
      slot="title"
    >
      <div class="flex-row -cen">
        <span class="title">图片素材库</span>
        <el-input
          class="ml20"
          placeholder="请输入内容"
        >
          <el-button slot="append">搜素</el-button>
        </el-input>
      </div>
      <el-button
        size="small"
        type="danger"
      >上传素材</el-button>
    </div>
    <el-table
      ref="multipleTable"
      @current-change="selectChange"
      highlight-current-row
      :data="data"
      :show-header="false"
    >
      <el-table-column width="80">
        <template slot-scope="scope">
          <el-radio
            :label="scope.row.id"
            v-model="selectId"
          >
            <span></span>
          </el-radio>
        </template>
      </el-table-column>
      <el-table-column width="50">
        <template slot-scope="scope">
          <img
            style="width: 20px; height: 20px"
            :src="scope.row.logo"
          />
        </template>
      </el-table-column>
      <el-table-column
        min-width="60"
        prop="name"
      ></el-table-column>
      <el-table-column
        fixed="right"
        prop="date"
      ></el-table-column>
    </el-table>
    <div
      slot="footer"
      class="text-center"
    >
      <el-button
        :disabled="isItem"
        @click="setImage"
        style="width: 150px"
        size="small"
        type="danger"
      >应用</el-button>
    </div>
  </el-dialog>
</template>

<script>
import selectMixins from '@/mixins/selectDialog.js';
export default {
  mixins: [selectMixins],
  data() {
    return {
      visiable: false,
      selectItem: {},
      data: [
        {
          id: 11,
          name: '图片1',
          date: '2017-08-12',
          logo: `${this.publicPath}/img/test2/mobile_b.jpg`
        },
        {
          id: 12,
          name: '图片2',
          date: '2017-08-12',
          logo: `${this.publicPath}/img/test2/mobile_b.jpg`
        },
        {
          id: 13,
          name: '图片3',
          date: '2017-08-12',
          logo: `${this.publicPath}/img/test2/mobile_b.jpg`
        },
        {
          id: 14,
          name: '图片4',
          date: '2017-08-12',
          logo: `${this.publicPath}/img/test2/mobile_b.jpg`
        },
        {
          id: 15,
          name: '图片5',
          date: '2017-08-12',
          logo: `${this.publicPath}/img/test2/mobile_b.jpg`
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.select-image {
  .title {
    color: black;
    width: 110px;
    font-weight: bold;
  }
}
</style>