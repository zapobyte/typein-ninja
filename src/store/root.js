const state = {
  snapshots: [],
  packageVersion: process.env.VUE_APP_PACKAGE_VERSION,
  loading: false,
};

const getters = {
  getSnapshots(state) {
    return state.snapshots;
  },
  appVersion: (state) => {
    return state.packageVersion;
  },
  getLoading(state) {
    return state.loading;
  },
};

const mutations = {
  appendSnapshot(state, value) {
    state.snapshots.push(value);
  },
  updateLoading(state, value) {
    state.loading = value;
  },
};

const actions = {
  unsubscribeSnapshots(context, value) {
    const snapshots = context.getters.getSnapshots;
    snapshots.forEach((snapshot) => {
      snapshot();
    });
  },
  addSnapshot(context, value) {
    context.commit('appendSnapshot', value);
  },
  setLoading({ commit }, value) {
    commit('updateLoading', value);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
