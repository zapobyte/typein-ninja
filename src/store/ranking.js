const state = {
    ranks:[{
        name:"Apprentice",
        xp:0
    },{
        name:"Genin",
        xp:25000
    },
    {
        name:"Chunin",
        xp:15000
    },
    {
        name:"Jonin",
        xp:35000
    },
    {
        name:"Ninja",
        xp:50000
    },
    {
        name:"Master Ninja",
        xp:100000
    }]
  };
  
  const getters = {
    getRanks(state){
        return state.ranks;
    },
  };
  
  const mutations = {
  };
  
  const actions = {
    getUserRank(context,xp){
        const rank = context.getters.getRanks.find((rank)=>{
            return xp > rank.xp;
        })
        return rank.name;
    },
}
  
  export default {
    state,
    getters,
    mutations,
    actions
  };