import { createGameHistory } from '@/functions/gameHistory';

const state = {
  difficulty: '',
  authUsersGames:[]
};

const getters = {
  getAuthUsersGames(state) {
    return state.authUsersGames;
  },
  getUserDifficulty(state) {
    return state.difficulty;
  },
};

const mutations = {
  setAuthUsersGames(state,data){
    state.authUsersGames = data;
  }
};

const actions = {
  async addGameHistory(context, value) {
    try {
      const user = context.getters.getAuthUser;
      const newGameEntry = {
        ...value,
        uid: user.uid,
      };
      createGameHistory(newGameEntry);
      const difficulties = context.getters.getDifficulities;
      let xp = difficulties[value.difficulty].xp;
      let newXp = Number(user.xp) + xp;
      let newLvl = Math.floor(newXp / 1000);
      const userRank = await context.dispatch('getUserRank', newXp);
      const data = {
        xp: newXp,
        lvl: newLvl > 1 ? newLvl : 1,
        rank: userRank,
      };
      context.dispatch('updateUser', data);
    } catch (error) {
      console.log(error);
    }
  },
  addAuthUsersGames(context,value){
    context.commit('setAuthUsersGames',value);
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
};
