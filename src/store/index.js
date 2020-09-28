import Vue from 'vue';
import Vuex, { Store } from 'vuex';
import {
  checkFsUser
} from '@/functions/firestore';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user:{
    },
    appVersion: process.env.VERSION || '0',
    users:[],
    token:''
  },
  mutations: {
    setToken(state,token){
      state.token=token;
    },
    setUser(state,value){
      state.user = value;
    },
    setUsers(state,value){
      state.users= value;
    }
  },
  actions: {
    async setUser({commit},user){
      commit('setUser',user)
    },
    authenticate({commit}, token){
      commit('setToken',token);
    },
    async checkFsUser({
      commit
    },user){
      await checkFsUser(user);
    },
  },
  getters: {
    getAppVersion(state){
      return state.appVersion;
    },
    isAuth(state){
      return state.token.length > 0 ? true : false;
    },
    getAuthUser:(state) => {
      return state.user;
    },
    getUsers:(state) => (ids) => {
      return state.users.filter(user=>{
        if(ids){
          return user.id == user[ids[user.id]].id;
        }
        return user; 
      });
    }
  }
});
