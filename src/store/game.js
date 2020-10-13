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
    setDifficulty(state,value){
        state.gameDifficulty= value;
    },
};  
  
const actions = {
      async loadGame({commit,dispatch},user){
          try {
            const dbUser = await getFsSnapshotUser(user);
            dispatch('setUser',dbUser);
          } catch (error) {
              console.log(error)
          }

      },
  };
  
export default {
    state,
    getters,
    mutations,
    actions
};