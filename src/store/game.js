const state = {
  gameDifficulty: 'easy',
  difficulty: {
    easy: {
      xp: 75,
      count: 10,
    },
    normal: {
      xp: 100,
      count: 25,
    },
    hard: {
      xp: 125,
      count: 50,
    },
  },
};

const getters = {
  getDifficulities(state) {
    return state.difficulty;
  },
  getGameDifficulity(state) {
    return state.gameDifficulty;
  },
};

const mutations = {
  setGameDifficulty(state, value) {
    state.gameDifficulty = value;
  },
};

const actions = {
  async setGameDifficulty({ commit }, gameDifficulty) {
    commit('setGameDifficulty', gameDifficulty);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
