import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './style/index.scss';

Vue.use(ElementUI);

Vue.config.productionTip = false;

Vue.prototype.publicPath = process.env.BASE_URL;

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
