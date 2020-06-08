import { mapGetters, mapMutations } from 'vuex';

export default {
  methods: {
    //设置对应场景属性
    buildWorks(form, krpanoId) {
      let worksData = JSON.parse(JSON.stringify(this.worksData));
      let editKrpano = krpanoId ? krpanoId : this.editKrpano;
      let index = worksData.krpanoList.findIndex(
        item => item.id === editKrpano
      );
      let obj = { ...worksData.krpanoList[index], ...form };
      worksData.krpanoList[index] = obj;
      console.log(obj);
      this.setWorksData(worksData);
    },
    //设置对应全局属性
    buildGlobal(key, form) {
      let worksData = JSON.parse(JSON.stringify(this.worksData));
      worksData[key] = { ...form };
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
