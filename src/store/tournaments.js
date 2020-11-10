
const state = {
    tournament:{},
    tournaments:[]
  };
  
const getters = {
    getTournament(state){
        return state.tournament;
    },
    getTournament(state){
        return state.tournamnets;
    },
};
  
const mutations = {
    setTournament(state,value){
        state.tournament= value;
    },
    setTournaments(state,value){
        state.tournaments=value;
    }
};  
  
const actions = {
        async createTournament({commit},tournament){
            
        },
        activeTournament({commit},active){
        }
  };
  
export default {
    state,
    getters,
    mutations,
    actions
};