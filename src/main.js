import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'nes.css/css/nes.min.css';
import VueGtag from "vue-gtag";
require('dotenv').config();
Vue.use(VueGtag, {
  config: { id: process.env.VUE_APP_ANALYTICS_ID, }
}, router);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
