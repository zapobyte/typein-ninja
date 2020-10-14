import {
    getFsSnapshotUser
} from '@/functions/firestore'
const state = {
    gameDifficulty:'easy'
  };
  
const getters = {
    getGameDifficulity(state){
        return state.gameDifficulty;
      },
};
  
const mutations = {
    setGameDifficulty(state,value){
        state.gameDifficulty= value;
    },
};  
  
const actions = {
      async loadGame({commit,dispatch},user){
        if(user){
            try {
                dispatch('checkFsUser', user);
            } catch (error) {
                console.log(error)
            }
        }
      },
      async setGameDifficulty({commit},gameDifficulty){
            commit('setGameDifficulty',gameDifficulty)
        }
  };
  
export default {
    state,
    getters,
    mutations,
    actions
};