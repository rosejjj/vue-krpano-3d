const state = {
  editKrpano: 1, //当前编辑场景
  prevKrpano: 1, //当前预览场景
  wordsData: {
    initKrpano: 1, //初始化场景
    tipIconPc: `${process.env.BASE_URL}/img/tip.png`, //pc端提示图片
    tipIconMobile: `${process.env.BASE_URL}/img/tip.png`, //移动端提示图片
    tipDuration: 3, //提示持续时间
    workLink: '', //作品链接
    //提示
    tip: {
      pcUrl: `${process.env.BASE_URL}/img/tip.png`,
      mobileUrl: `${process.env.BASE_URL}/img/tip.png`,
      duration: 3
    },
    //logo配置
    logo: {
      title: '这是logo',
      href: 'https://www.baidu.com',
      posType: 1,
      isShow: true,
      url: `${process.env.BASE_URL}/img/tip.png`
    },
    //开场封面
    cover: {
      pcUrl: `${process.env.BASE_URL}/img/tip.png`,
      mobileUrl: `${process.env.BASE_URL}/img/tip.png`
    },
    //自动巡游
    cruise: {
      auto: true,
      speed: 30,
      autoLoad: true
    },
    //所有场景单独数据
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
  },
  SET_PREVKRPANO(state, prevKrpano) {
    state.prevKrpano = prevKrpano;
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
