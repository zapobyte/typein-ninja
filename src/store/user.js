import { getOrCreateFsUser, updateUserBest, updateUser as updateUserFs } from '@/functions/user';
const state = {
  user: {},
  token: '',
};

const getters = {
  isAuth(state) {
    return state.token && state.token.length > 0 ? true : false;
  },
  getAuthUser: (state) => {
    return state.user;
  },
  getUsers: (state) => (ids) => {
    return state.users.filter((user) => {
      if (ids) {
        return user.id == user[ids[user.id]].id;
      }
      return user;
    });
  },
  getUserXp(state) {
    return state.appVersion;
  },
};

const mutations = {
  setUserXp(state, value) {
    state.user.xp = value;
  },
  setUserLvl(state, value) {
    state.user.lvl = value;
  },
  setToken(state, token) {
    state.token = token;
  },
  setUser(state, value) {
    state.user = value;
  },
};

const actions = {
  async setUser({ commit }, user) {
    commit('setUser', user);
  },
  async authenticate({ commit }, { user, token }) {
    try {
      await getOrCreateFsUser(user);
      commit('setToken', token);
      localStorage.setItem('token', token);
    } catch (error) {
      console.log(error);
      return error.message;
    }
  },
  async updateUserBestGame(context, data) {
    try {
      await updateUserBest(data);
    } catch (error) {
      console.log(error);
      return error.message;
    }
  },
  async updateUser(context, data) {
    try {
      await updateUserFs(data);
    } catch (error) {
      console.log(error);
      return error.message;
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
