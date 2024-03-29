const state = {
  ranks: [
    {
      name: 'Apprentice',
      xp: 0,
      img: '~@/assets/gameAssets/ranks/rank_apprentice.png',
    },
    {
      name: 'Genin',
      xp: 7500,
      img: '~@/assets/gameAssets/ranks/rank_genin.png',
    },
    {
      name: 'Chunin',
      xp: 15000,
      img: '~@/assets/gameAssets/ranks/rank_chunin.png',
    },
    {
      name: 'Jonin',
      xp: 35000,
      img: '~@/assets/gameAssets/ranks/rank_jonin.png',
    },
    {
      name: 'Ninja',
      xp: 50000,
      img: '~@/assets/gameAssets/ranks/rank_ninja.png',
    },
    {
      name: 'Master Ninja',
      xp: 100000,
      img: '~@/assets/gameAssets/ranks/rank_master_ninja.png',
    },
  ],
};

const getters = {
  getRanks(state) {
    return state.ranks;
  },
};

const mutations = {};

const actions = {
  getUserRank(context, xp) {
    const rank = context.getters.getRanks.find((rank) => {
      if(  rank.xp <= xp ){
        return rank;
      }
    });
    return rank.name;
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
