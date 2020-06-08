export default {
  props: {
    selectVisiable: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    selectChange(res) {
      this.selectItem = res;
    },
    setImage() {
      this.visiable = false;
      this.$emit('selectItem', this.selectItem);
    },
    clearCurrentRow() {
      this.$refs.multipleTable.setCurrentRow({});
    }
  },
  computed: {
    selectId() {
      return this.selectItem.id ? this.selectItem.id : null;
    },
    isItem() {
      return JSON.stringify(this.selectItem) === '{}';
    }
  },
  watch: {
    selectVisiable(isShow) {
      if (isShow) {
        this.visiable = isShow;
      }
    },
    visiable(isShow) {
      if (!isShow) {
        this.$emit('close');
      }
    }
  }
};
