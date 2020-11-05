import {
    createGameHistory
} from '@/functions/gameHistory';

import store from '@/store/index';

const state = {
    wpm:'',
    acm:'',
    difficulty:'',
    date:''
  };
  
  const getters = {
    getScore(state){
        return state
    },
    getUserDifficulty(state){
        return state.difficulty;
    },
    getUserWpm(state){
        return state.wpm;
    },
    getUserAcm(state){
        return state.acc;
    },
    getDate(state){
        return state.date;
    }
  };
  
  const mutations = {
    setScore(state,value){
        state = value;
    },
    setDifficulty(state,value){
        state.difficulty = value;
    },
    setUserWpm(state,value){
        state.wpm = value;
    },
    setUserAcc(state,value){
        state.acm = value;
    },
    setDate(state,value){
        state.date = value;
    }
  };
  
  const actions = {
   async addGameHistory(context,value){
       try {
        const user = store.getters.getAuthUser;
        const newGameEntry = {
            ...value,
            uid:user.uid
        }
        createGameHistory(newGameEntry);
        const difficulties = context.getters.getDifficulities;
        let xp = difficulties[value.difficulty].xp;
        let newXp = Number(user.xp) + xp;
        let newLvl = Math.floor(newXp / 1000);
        const userRank = await store.dispatch('getUserRank',newXp);
        const data = {
            xp: newXp,
            lvl:newLvl > 1 ? newLvl:1,
            rank:userRank
        }
        store.dispatch('updateUser',data);
        context.commit('setScore',data);
       } catch (error) {
           console.log(error)
       }
       
    }
  };
  
  export default {
    state,
    getters,
    mutations,
    actions
  };