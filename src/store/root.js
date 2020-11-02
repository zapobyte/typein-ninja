import store from '@/store/index';

const state = {
    snapshots:[],
    packageVersion: process.env.VUE_APP_PACKAGE_VERSION,
  };
  
  const getters = {
    getSnapshots(state){
        return state.snapshots;
    },
    appVersion: (state) => {
      return state.packageVersion
    }
  };
  
  const mutations = {
    appendSnapshot(state,value){
      state.snapshots.push(value);
    }
  };
  
  const actions = {
    unsubscribeSnapshots(context,value){
        const snapshots = context.getters.getSnapshots;
        snapshots.forEach((snapshot)=>{
            snapshot();
        })
    },
    addSnapshot(context,value){
        context.commit('appendSnapshot',value);
    }
}
  
  export default {
    state,
    getters,
    mutations,
    actions
  };