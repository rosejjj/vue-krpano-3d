import { mapGetters, mapMutations } from 'vuex';

export default {
  methods: {
    buildWorks(form) {
      let worksData = JSON.parse(JSON.stringify(this.worksData));
      let index = worksData.krpanoList.findIndex(
        item => item.id === this.editKrpano
      );
      let obj = { ...worksData.krpanoList[index], ...form };
      worksData.krpanoList[index] = obj;
      console.log(obj);
      this.setWorksData(worksData);
    },
    buildGlobal(key, form) {
      let worksData = JSON.parse(JSON.stringify(this.worksData));
      worksData[key] = form;
      this.setWorksData(worksData);
    },
    ...mapMutations({
      setWorksData: 'krpano/SET_WORKSDATA'
    })
  },
  computed: {
    ...mapGetters(['worksData', 'editKrpano'])
  }
};
