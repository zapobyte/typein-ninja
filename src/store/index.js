import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import user from '@/store/user';
import gameHistory from '@/store/gameHistory';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    user:user,
    gameHistory:gameHistory
  }
});
