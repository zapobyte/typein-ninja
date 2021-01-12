<template>
  <div id="app" class="container"> 
    <div class="row no-gutters flex-column align-items-start min-vh-100" >
      <Navbar />
      <router-view class="router" :key="$route.params.uid ? $route.params.uid :'0' "/>
      <BottomFooter />
    </div>
    <div class="loading align-items-center row" v-if="loading">
      <div class="col-12">
        <p>LOADING</p>
        <img src="~@/assets/loading.gif" class="img-fluid" />
      </div>
    </div>
  </div>

</template>

<style lang="scss">
@import '~@/scss/app.scss';
</style>

<script>
import { 
  firebaseInit,
} from '@/functions/firebase.js';
import Navbar from '@/components/Navbar';
import BottomFooter from '@/components/BottomFooter';

export default {
  name:'App',
  components:{
    Navbar,
    BottomFooter
  },
  data(){
    return {
    }
  },
  computed:{
    loading(){
      return this.$store.getters.getLoading
    }
  },
  created(){
    firebaseInit();
  }
}
</script>
