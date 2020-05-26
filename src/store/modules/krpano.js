const state = {
  editKrpano: 1, //当前编辑场景
  wordsData: {
    initKrpano: 1, //初始化场景
    //当前所有数据
    krpanoList: [
      {
        id: 1,
        name: '办公室',
        logo: require('../../assets/test_logo.png'),
        url: `${process.env.BASE_URL}/xml/home.xml`,
        hostList: [], //当前所有热点
        autoRotate: true,
        hlookat: 0,
        vlookat: 0,
        hlookatmin: -180,
        hlookatmax: 180,
        vlookatmin: -90,
        vlookatmax: 90
      },
      {
        id: 2,
        name: '雪地',
        logo: require('../../assets/test1/pano_b.jpg'),
        url: `${process.env.BASE_URL}/xml/home.xml`,
        hostList: [],
        autoRotate: true,
        hlookat: 0,
        vlookat: 0,
        hlookatmin: -180,
        hlookatmax: 180,
        vlookatmin: -90,
        vlookatmax: 90
      },
      {
        id: 3,
        name: '室外',
        logo: require('../../assets/test2/mobile_b.jpg'),
        url: `${process.env.BASE_URL}/xml/home.xml`,
        hostList: [],
        autoRotate: true,
        hlookat: 0,
        vlookat: 0,
        hlookatmin: -180,
        hlookatmax: 180,
        vlookatmin: -90,
        vlookatmax: 90
      }
    ]
  },
  krpanoList: [
    //当前可用的所有场景
    {
      id: 1,
      name: '办公室',
      logo: require('../../assets/test_logo.png'),
      url: `${process.env.BASE_URL}/xml/home.xml`
    },
    {
      id: 2,
      name: '雪地',
      logo: require('../../assets/test1/pano_b.jpg'),
      url: `${process.env.BASE_URL}/xml/test2.xml`
    },
    {
      id: 3,
      name: '室外',
      logo: require('../../assets/test2/mobile_b.jpg'),
      url: `${process.env.BASE_URL}/xml/test3.xml`
    }
  ]
};

const mutations = {
  SET_WORKSDATA(state, wordsData) {
    state.wordsData = wordsData;
  },
  SET_EDITKRPANO(state, editKrpano) {
    state.editKrpano = editKrpano;
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
