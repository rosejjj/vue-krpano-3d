const state = {
  //当前编辑热点
  activeHost: {},
  //当前初始化渲染
  isInit: false
};

const mutations = {
  SET_ACTIVEHOST(state, data) {
    state.activeHost = data;
  },
  SET_ISINIT(state, data) {
    state.isInit = data;
  }
};

const getters = {
  activeHost: state => state.activeHost,
  isInit: state => state.isInit
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
