import {
    checkFsUser,
    updateUser as updateUserFs
} from '@/functions/firestore'
const state = {
    user:{},
    users:[],
    token:'',
    gameDifficulty:'easy'
  };
  
const getters = {
    getGameDifficulity(state){
        return state.gameDifficulty;
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
    },
    getUserXp(state){
        return state.appVersion;
    },
};
  
const mutations = {
    setUserXp(state,value){
        state.user.xp = value;
    },
    setUserLvl(state,value){
        state.user.lvl = value;
    },
    setToken(state,token){
        state.token=token;
    },
    setUser(state,value){
        state.user = value;
    },
    setUsers(state,value){
        state.users= value;
    },
    setDifficulty(state,value){
        state.users= value;
    },
};
  
const actions = {
    async setUser({commit},user)
    {
        commit('setUser',user);
      },
      authenticate({commit}, token){
        commit('setToken',token);
      },
      async updateUser({commit},data){
            await updateUserFs(data);
            commit('setUserXp',data.xp);
            commit('setUserLvl',data.lvl);
      },
      async checkFsUser({
        commit
      },user){
        await checkFsUser(user);
      },
      async addUserXp({commit},data){
        commit('setUserXp',data)
      },
      async setGameDifficulty({commit},data){
        commit('setDifficulty',data)
      },
  };
  
export default {
    state,
    getters,
    mutations,
    actions
};