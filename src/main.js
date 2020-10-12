import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "nes.css/css/nes.min.css";
import VueAnalytics from 'vue-analytics';
require('dotenv').config();
import { defineCustomElements as defineIonPhaser } from '@ion-phaser/core/loader';
defineIonPhaser(window);

Vue.config.productionTip = false
//and then use it in main.js
Vue.use(VueAnalytics, {
    id: process.env.ANALYTICS_ID,
    router
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
