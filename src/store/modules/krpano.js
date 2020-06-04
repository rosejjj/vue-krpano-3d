const state = {
  initData: false, //是否已初始化数据
  editKrpano: 1, //当前编辑场景
  prevKrpano: 1, //当前预览场景
  wordsData: {
    initKrpano: 1, //初始化场景
    tipIconPc: `${process.env.BASE_URL}/img/tip.png`, //pc端提示图片
    tipIconMobile: `${process.env.BASE_URL}/img/tip.png`, //移动端提示图片
    tipDuration: 3, //提示持续时间
    workLink: '', //作品链接
    //全局开关
    switch: {
      krpanoSelect: false,
      isShowTitle: false,
      isShowShare: false
    },
    //是否开启开场动画
    animateType: false,
    //提示
    tip: {
      pcUrl: `https://ssl-static.720static.com/imgs/32j4Y2lC5oDk.png`,
      mobileUrl: `https://ssl-static.720static.com/imgs/1AzyG1T2bZNK.png`,
      duration: 3
    },
    //logo配置
    logo: {
      title: '这是logo',
      href: 'https://www.baidu.com',
      posType: 1,
      isShow: true,
      url: `https://ssl-static.720static.com/imgs/32j4Y2lC5oDk.png`
    },
    //开场封面
    cover: {
      pcUrl: `${process.env.BASE_URL}/img/tip.png`,
      mobileUrl: `${process.env.BASE_URL}/img/tip.png`
    },
    //自动巡游
    cruise: {
      auto: true,
      speed: 12.0,
      autoLoad: true
    },
    //所有场景单独数据
    krpanoList: [
      {
        id: 1,
        name: '办公室',
        logo: `${process.env.BASE_URL}/img/test_logo.png`,
        url: `${process.env.BASE_URL}/xml/home.xml`,
        hostList: [], //当前所有热点
        //音乐数据
        music: {
          url:
            'https://ws.stream.qqmusic.qq.com/C400000Umkct2IjBZg.m4a?guid=8471296062&vkey=46C63E06AFA2F9EF5BB0FF141999960F251D8BA4EA317165E1F065CFE3A7BF38AB17EC2129202C0F0ABA1F87802D6873F724550B48FBD895&uin=0&fromtag=66',
          name: '后来遇见他',
          volume: 100,
          loop: false
        },
        narrator: {
          url:
            'https://ws.stream.qqmusic.qq.com/C400000Umkct2IjBZg.m4a?guid=8471296062&vkey=46C63E06AFA2F9EF5BB0FF141999960F251D8BA4EA317165E1F065CFE3A7BF38AB17EC2129202C0F0ABA1F87802D6873F724550B48FBD895&uin=0&fromtag=66',
          name: '后来遇见他',
          volume: 100,
          loop: false
        },
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
        logo: `${process.env.BASE_URL}/img/test1/pano_b.jpg`,
        url: `${process.env.BASE_URL}/xml/test2.xml`,
        hostList: [],
        //音乐数据
        music: {
          url:
            'https://ws.stream.qqmusic.qq.com/C400000Umkct2IjBZg.m4a?guid=8471296062&vkey=46C63E06AFA2F9EF5BB0FF141999960F251D8BA4EA317165E1F065CFE3A7BF38AB17EC2129202C0F0ABA1F87802D6873F724550B48FBD895&uin=0&fromtag=66',
          name: '后来遇见他',
          volume: 100,
          loop: false
        },
        narrator: {
          url:
            'https://ws.stream.qqmusic.qq.com/C400000Umkct2IjBZg.m4a?guid=8471296062&vkey=46C63E06AFA2F9EF5BB0FF141999960F251D8BA4EA317165E1F065CFE3A7BF38AB17EC2129202C0F0ABA1F87802D6873F724550B48FBD895&uin=0&fromtag=66',
          name: '后来遇见他',
          volume: 100,
          loop: false
        },
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
        logo: `${process.env.BASE_URL}/img/test2/mobile_b.jpg`,
        url: `${process.env.BASE_URL}/xml/test3.xml`,
        hostList: [],
        //音乐数据
        music: {
          url:
            'https://ws.stream.qqmusic.qq.com/C400000Umkct2IjBZg.m4a?guid=8471296062&vkey=46C63E06AFA2F9EF5BB0FF141999960F251D8BA4EA317165E1F065CFE3A7BF38AB17EC2129202C0F0ABA1F87802D6873F724550B48FBD895&uin=0&fromtag=66',
          name: '后来遇见他',
          volume: 100,
          loop: false
        },
        narrator: {
          url:
            'https://ws.stream.qqmusic.qq.com/C400000Umkct2IjBZg.m4a?guid=8471296062&vkey=46C63E06AFA2F9EF5BB0FF141999960F251D8BA4EA317165E1F065CFE3A7BF38AB17EC2129202C0F0ABA1F87802D6873F724550B48FBD895&uin=0&fromtag=66',
          name: '后来遇见他',
          volume: 100,
          loop: false
        },
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
      logo: `${process.env.BASE_URL}/img/test_logo.png`,
      url: `${process.env.BASE_URL}/xml/home.xml`
    },
    {
      id: 2,
      name: '雪地',
      logo: `${process.env.BASE_URL}/img/test1/pano_b.jpg`,
      url: `${process.env.BASE_URL}/xml/test2.xml`
    },
    {
      id: 3,
      name: '室外',
      logo: `${process.env.BASE_URL}/img/test2/mobile_b.jpg`,
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
