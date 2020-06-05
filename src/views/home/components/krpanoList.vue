<template>
  <div class="krpano-list">
    <div
      v-for="item in krpanoList"
      :key="item.spotname"
      class="krpano-item"
      @click="setItem(item)"
    >
      <div
        :style="{ backgroundImage: `url(${item.logo})` }"
        class="logo"
        :class="{ active: item.id === editKrpano }"
      ></div>
      <div class="text mt10">{{ item.name }}</div>
      <img
        @click.stop="close(item)"
        class="close-icon"
        src="@/assets/close-face.png"
      />
    </div>
    <div
      @click="showList"
      class="add_btn flex-colum cen-cen"
    >
      <img
        class="add_icon"
        src="@/assets/add-icon.png"
      />
      <div class="mt10">添加场景</div>
    </div>
    <el-dialog
      ref="dialog"
      title="提示"
      :modal-append-to-body="false"
      :visible.sync="dialogVisible"
      width="80%"
      top="10vh"
    >
      <div
        style="padding: 0 40px 0 20px"
        class="flex-row sp-be-cen"
        slot="title"
      >
        <div class="flex-row -cen">
          <span class="title">全景素材库</span>
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
        @selection-change="selectChange"
        :data="data"
        :show-header="true"
      >
        <el-table-column
          type="selection"
          width="50"
        ></el-table-column>
        <el-table-column
          label="全选"
          width="50"
        >
          <template slot-scope="scope">
            <img
              style="width: 30px; height: 30px"
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
      <div class="text-center mt20">
        <el-button
          :disabled="selectList.length === 0"
          @click="selecKrpano"
          style="width: 150px"
          size="small"
          type="danger"
        >确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      dialogVisible: false, //场景素材弹窗
      selectList: [], //当前选择的列表
      data: [
        {
          id: 11,
          name: '场景1',
          date: '2017-08-12',
          logo: `${this.publicPath}/img/test2/mobile_b.jpg`,
          url: `${this.publicPath}/xml/test3.xml`
        },
        {
          id: 12,
          name: '场景2',
          date: '2017-08-12',
          logo: `${this.publicPath}/img/test2/mobile_b.jpg`,
          url: `${this.publicPath}/xml/test3.xml`
        },
        {
          id: 13,
          name: '场景3',
          date: '2017-08-12',
          logo: `${this.publicPath}/img/test2/mobile_b.jpg`,
          url: `${this.publicPath}/xml/test3.xml`
        },
        {
          id: 14,
          name: '场景4',
          date: '2017-08-12',
          logo: `${this.publicPath}/img/test2/mobile_b.jpg`,
          url: `${this.publicPath}/xml/test3.xml`
        },
        {
          id: 15,
          name: '场景5',
          date: '2017-08-12',
          logo: `${this.publicPath}/img/test2/mobile_b.jpg`,
          url: `${this.publicPath}/xml/test3.xml`
        }
      ]
    };
  },
  methods: {
    close(item) {
      this.deleteKrpano(item);
    },
    //选择对应场景
    setItem(item) {
      this.$emit('setItem', item);
    },
    //显示场景素材
    showList() {
      this.dialogVisible = true;
    },
    //选项改变
    selectChange(list) {
      this.selectList = list;
    },
    //确认选择
    selecKrpano() {
      this.addKrpano(this.selectList).then(data => {
        this.dialogVisible = false;
        this.selectList = [];
        this.$refs.multipleTable.clearSelection();
      });
    },
    ...mapActions({
      addKrpano: 'krpano/addKrpano',
      deleteKrpano: 'krpano/deleteKrpano'
    })
  },
  computed: {
    ...mapGetters(['krpanoList', 'editKrpano'])
  }
};
</script>

<style lang="scss" scoped>
@import '@/style/mixins.scss';
.krpano-list {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  width: 100%;
  height: 18%;
  min-height: 100px;
  @include border;
  .krpano-item {
    position: relative;
    width: 70px;
    margin-right: 10px;
    cursor: pointer;
    .logo {
      width: 70px;
      height: 70px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center center;
      &.active {
        border: 2px solid yellow;
      }
    }
    .text {
      font-size: 12px;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height: 16px;
      text-align: center;
      width: 70px;
    }
    .close-icon {
      position: absolute;
      width: 15px;
      height: 15px;
      right: -7.5px;
      top: -7.5px;
      z-index: 1000;
    }
  }
  .add_btn {
    font-size: 13px;
    width: 70px;
    height: 70px;
    border: 1px dashed white;
    border-radius: 5px;
    font-size: 12px;
    cursor: pointer;
    .add_icon {
      width: 18px;
      height: 18px;
    }
  }
  .title {
    color: black;
    width: 110px;
    font-weight: bold;
  }
}
</style>