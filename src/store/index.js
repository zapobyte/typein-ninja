import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import user from '@/store/user';
import game from '@/store/game';
import root from '@/store/root';
import gameHistory from '@/store/gameHistory';
import ranking from '@/store/ranking';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    user:user,
    game,
    gameHistory:gameHistory,
    root:root,
    ranking:ranking
  }
});
