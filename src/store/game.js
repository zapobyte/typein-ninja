
const state = {
    gameDifficulty:'easy',
    difficulty:{
        easy:{
            xp:75,
            count:10
        },
        normal:{
            xp:100,
            count:25
        },
        hard:{
            xp:125,
            count:50
        }
    },
    loading:false,
  };
  
const getters = {
    getDifficulities(state){
        return state.difficulty;
    },
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