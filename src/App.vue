<template>
  <div id="app" class="min-vh-100 container">
    <Navbar />
    <router-view />
    <BottomFooter />
  </div>
</template>

<style lang="scss">
html,body {
  font-family: 'Press Start 2P', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white !important;
  background:rgb(55,37,56) !important;
  font-size:14px;
}

#app{
  position: relative;
}
a{
  text-decoration: none !important;
}
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
  },
  created(){
    firebaseInit();
  },
  methods:{
  }
}
</script>
