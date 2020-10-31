import store from '@/store/index';

const state = {
    snapshots:[]
  };
  
  const getters = {
    getSnapshots(state){
        return state.snapshots;
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
        console.log(value)
        context.commit('appendSnapshot',value);
    }
}
  
  export default {
    state,
    getters,
    mutations,
    actions
  };