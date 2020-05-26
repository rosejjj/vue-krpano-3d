import Vue from 'vue';
import Vuex from 'vuex';
import krpano from './modules/krpano';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    krpano
  },
  getters
});
