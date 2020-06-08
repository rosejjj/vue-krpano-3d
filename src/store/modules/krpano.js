import { Message } from 'element-ui';

const state = {
  initData: false, //是否已初始化数据
  editKrpano: 1, //当前编辑场景
  wordsData: {
    initKrpano: 1, //初始化场景
    workLink: 'https://www.baidu.com', //作品链接
    code: 'https://ssl-static.720static.com/imgs/32j4Y2lC5oDk.png',
    //信息设置
    basic: {
      type: 1,
      logo: `${process.env.BASE_URL}/img/WechatIMG50.jpeg`,
      name: '测试全景',
      desc: '描述' //全景描述
    },
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
            'https://isure.stream.qqmusic.qq.com/C400000Umkct2IjBZg.m4a?guid=8471296062&vkey=7C68785A13D6C0C0EB3A2466D9E2943AF281F591B7EE3D8A87B57BD4B83F8F47DDBC822264445908DE71D99FED3C1C495CD98FE57ECA1304&uin=0&fromtag=66',
          name: '后来遇见他',
          volume: 100,
          loop: false
        },
        narrator: {
          url:
            'https://isure.stream.qqmusic.qq.com/C400000Umkct2IjBZg.m4a?guid=8471296062&vkey=7C68785A13D6C0C0EB3A2466D9E2943AF281F591B7EE3D8A87B57BD4B83F8F47DDBC822264445908DE71D99FED3C1C495CD98FE57ECA1304&uin=0&fromtag=66',
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
            'https://isure.stream.qqmusic.qq.com/C400000Umkct2IjBZg.m4a?guid=8471296062&vkey=7C68785A13D6C0C0EB3A2466D9E2943AF281F591B7EE3D8A87B57BD4B83F8F47DDBC822264445908DE71D99FED3C1C495CD98FE57ECA1304&uin=0&fromtag=66',
          name: '后来遇见他',
          volume: 100,
          loop: false
        },
        narrator: {
          url:
            'https://isure.stream.qqmusic.qq.com/C400000Umkct2IjBZg.m4a?guid=8471296062&vkey=7C68785A13D6C0C0EB3A2466D9E2943AF281F591B7EE3D8A87B57BD4B83F8F47DDBC822264445908DE71D99FED3C1C495CD98FE57ECA1304&uin=0&fromtag=66',
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
            'https://isure.stream.qqmusic.qq.com/C400000Umkct2IjBZg.m4a?guid=8471296062&vkey=7C68785A13D6C0C0EB3A2466D9E2943AF281F591B7EE3D8A87B57BD4B83F8F47DDBC822264445908DE71D99FED3C1C495CD98FE57ECA1304&uin=0&fromtag=66',
          name: '后来遇见他',
          volume: 100,
          loop: false
        },
        narrator: {
          url:
            'https://isure.stream.qqmusic.qq.com/C400000Umkct2IjBZg.m4a?guid=8471296062&vkey=7C68785A13D6C0C0EB3A2466D9E2943AF281F591B7EE3D8A87B57BD4B83F8F47DDBC822264445908DE71D99FED3C1C495CD98FE57ECA1304&uin=0&fromtag=66',
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
  }
};

const mutations = {
  SET_WORKSDATA(state, wordsData) {
    state.wordsData = wordsData;
  },
  SET_EDITKRPANO(state, editKrpano) {
    state.editKrpano = editKrpano;
  }
};

const actions = {
  addKrpano({ commit, state }, selectList) {
    return new Promise((resolve, reject) => {
      let isRepeat = false;
      let wordsData = JSON.parse(JSON.stringify(state.wordsData));
      wordsData.krpanoList.forEach(item => {
        let index = selectList.findIndex(krpano => krpano.id === item.id);
        isRepeat = index > -1;
      });
      if (!isRepeat) {
        selectList.forEach(item => {
          let newKrpano = {
            ...item,
            hostList: [], //当前所有热点
            //音乐数据
            music: {
              url: '',
              name: '',
              volume: 100,
              loop: false
            },
            narrator: {
              url: '',
              name: '',
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
          };
          wordsData.krpanoList.push(newKrpano);
        });
        commit('SET_WORKSDATA', wordsData);
        resolve(wordsData);
      } else {
        Message({
          message: '已有素材存在列表中，请重新选择',
          type: 'error',
          duration: 3 * 1000
        });
        reject(wordsData);
      }
    });
  },
  deleteKrpano({ commit, state }, krpano) {
    let wordsData = JSON.parse(JSON.stringify(state.wordsData));
    if (wordsData.krpanoList.length === 1) {
      Message({
        message: '最少保留一个初始场景',
        type: 'error',
        duration: 3 * 1000
      });
      return;
    }
    let index = wordsData.krpanoList.findIndex(item => item.id === krpano.id);
    wordsData.krpanoList.splice(index, 1);
    commit('SET_WORKSDATA', wordsData);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
