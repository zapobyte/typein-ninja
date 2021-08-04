<template>
  <div id="app" class="container">
    <div class="row no-gutters flex-column align-items-start min-vh-100" v-if="!this.$store.getters.getLoading">
      <Navbar />
      <router-view class="router" :key="$route.params.uid ? $route.params.uid : '0'" />
      <BottomFooter />
    </div>
  </div>
</template>

<style lang="scss">
@import '~@/scss/app.scss';
</style>

<script>
import { firebaseInit } from '@/functions/firebase.js';
import Navbar from '@/components/Navbar';
import BottomFooter from '@/components/BottomFooter';

export default {
  name: 'App',
  components: {
    Navbar,
    BottomFooter,
  },
  data() {
    return {};
  },
  computed: {
  },
  created() {
    if (process.env.NODE_ENV == 'production' && window.location.protocol !== 'https:') {
      window.location.replace(`https:${window.location.href.substring(window.location.protocol.length)}`);
    }
    firebaseInit();
  },
};
</script>
