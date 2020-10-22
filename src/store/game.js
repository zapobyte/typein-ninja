
const state = {
    gameDifficulty:'easy',
    loading:false,
  };
  
const getters = {
    getGameDifficulity(state){
        return state.gameDifficulty;
      },
    getLoading(state){
        return state.loading;
    }
};
  
const mutations = {
    setGameDifficulty(state,value){
        state.gameDifficulty= value;
    },
    updateLoading(state,value){
        state.loading=value;
    }
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
        },
        setLoading({commit},value){
            commit('updateLoading',value);
        }
  };
  
export default {
    state,
    getters,
    mutations,
    actions
};