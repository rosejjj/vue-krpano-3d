import Vue from 'vue';
import Vuex from 'vuex';
import krpano from './modules/krpano';
import getters from './getters';
import active from './modules/active';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    krpano,
    active
  },
  getters
});
