const state = {
  //当前编辑热点
  activeHost: {}
};

const mutations = {
  SET_ACTIVEHOST(state, data) {
    state.activeHost = data;
  }
};

const getters = {
  activeHost: state => state.activeHost
};

const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
