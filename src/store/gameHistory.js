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
    addGameHistory(context,value){
        const user = store.getters.getAuthUser;
        const newGameEntry = {
            ...value,
            uid:user.uid
        }
        createGameHistory(newGameEntry);
        let xp = 0;
        switch(value.difficulty){
            case 'easy':
                xp = 100;
                break;
            case 'normal':
                xp = 175;
                break;
            case 'hard':
                xp = 250;
                break;
        }
        let newXp = Number(user.xp) + xp;
        let newLvl = Math.floor(newXp / 1000);
        const data = {
            xp: newXp,
            lvl:newLvl > 1 ? newLvl:1
        }
        store.dispatch('updateUser',data);
        context.commit('setScore',value);
    }
  };
  
  export default {
    state,
    getters,
    mutations,
    actions
  };