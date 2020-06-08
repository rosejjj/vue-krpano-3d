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
        <template>
          <img
            style="width: 20px; height: 20px"
            src="@/assets/triangle.png"
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
          name: '音乐1',
          date: '2017-08-12',
          url:
            'https://isure.stream.qqmusic.qq.com/C400000Umkct2IjBZg.m4a?guid=8471296062&vkey=7C68785A13D6C0C0EB3A2466D9E2943AF281F591B7EE3D8A87B57BD4B83F8F47DDBC822264445908DE71D99FED3C1C495CD98FE57ECA1304&uin=0&fromtag=66'
        },
        {
          id: 12,
          name: '音乐2',
          date: '2017-08-12',
          url:
            'https://isure.stream.qqmusic.qq.com/C400000Umkct2IjBZg.m4a?guid=8471296062&vkey=7C68785A13D6C0C0EB3A2466D9E2943AF281F591B7EE3D8A87B57BD4B83F8F47DDBC822264445908DE71D99FED3C1C495CD98FE57ECA1304&uin=0&fromtag=66'
        },
        {
          id: 13,
          name: '音乐3',
          date: '2017-08-12',
          url:
            'https://isure.stream.qqmusic.qq.com/C400000Umkct2IjBZg.m4a?guid=8471296062&vkey=7C68785A13D6C0C0EB3A2466D9E2943AF281F591B7EE3D8A87B57BD4B83F8F47DDBC822264445908DE71D99FED3C1C495CD98FE57ECA1304&uin=0&fromtag=66'
        },
        {
          id: 14,
          name: '音乐4',
          date: '2017-08-12',
          url:
            'https://isure.stream.qqmusic.qq.com/C400000Umkct2IjBZg.m4a?guid=8471296062&vkey=7C68785A13D6C0C0EB3A2466D9E2943AF281F591B7EE3D8A87B57BD4B83F8F47DDBC822264445908DE71D99FED3C1C495CD98FE57ECA1304&uin=0&fromtag=66'
        },
        {
          id: 15,
          name: '音乐5',
          date: '2017-08-12',
          url:
            'https://isure.stream.qqmusic.qq.com/C400000Umkct2IjBZg.m4a?guid=8471296062&vkey=7C68785A13D6C0C0EB3A2466D9E2943AF281F591B7EE3D8A87B57BD4B83F8F47DDBC822264445908DE71D99FED3C1C495CD98FE57ECA1304&uin=0&fromtag=66'
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