<template>
  <div class="_select-file">
    <i-circle
      :percent="proNumber"
      :size="60"
      class="pro"
      v-show="showPro"
    >
      <span
        class="demo-Circle-inner"
        style="font-size:16px"
      >{{ proNumber }}%</span>
    </i-circle>
    <div class="select-file">
      <slot v-if="$slots.default"></slot>
      <Button v-else>
        <Icon type="ios-cloud-upload-outline"></Icon>
        {{ '上传文件' }}
      </Button>
      <input
        ref="filElem"
        type="file"
        :accept="accept"
        @change="getFile"
        class="input"
      />
    </div>
  </div>
</template>

<script>
import { streamToBase64 } from '@/utils/tools';
export default {
  props: {
    progressBar: {
      type: Boolean,
      default: false
    },
    format: {
      type: Array,
      default() {
        return [];
      }
    },
    accept: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      file: [],
      showPro: false,
      proNumber: 0
    };
  },
  methods: {
    startPro() {
      this.showPro = true;
      this.pro = setInterval(() => {
        if (this.proNumber >= 100) {
          this.endPro();
        }
        this.proNumber += 1;
      }, 10);
    },
    endPro() {
      clearInterval(this.pro);
      this.pro = null;
      this.proNumber = 100;
      setTimeout(() => {
        this.showPro = false;
      }, 1000);
    },
    isFormat(fileName) {
      if (this.format && this.format.length) {
        //取出上传文件的扩展名
        let index = fileName.lastIndexOf('.');
        let ext = fileName.substr(index + 1);

        if (!this.format.includes(ext)) return false;
        else return true;
      } else {
        return true;
      }
    },
    getFile(e) {
      if (!this.isFormat(e.target.value)) {
        this.$emit('on-format-error', {
          msg: '文件类型错误',
          files: e.target.files
        });
        this.$refs.filElem.value = '';
        return;
      }
      if (this.pro) this.startPro();
      let file = this.$refs.filElem.files;
      this.getBase64(file).then(res => {
        this.$emit('change', res);
        this.file = res;
        this.$refs.filElem.value = '';
        if (this.pro) this.endPro();
      });
    },
    getBase64(file) {
      return streamToBase64(file).then(res => {
        return res;
      });
    }
  }
};
</script>

<style lang="scss" scope>
._select-file {
  display: inline-block;
}
.pro {
  margin-right: 10px;
}
.select-file {
  overflow: hidden;
  position: relative;
  & input {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
  }
}
</style>
