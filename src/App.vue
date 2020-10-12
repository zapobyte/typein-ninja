<template>
  <div id="app" class="min-vh-100 container">
    <div class="row min-vh-100">
      <Navbar class="col-12 align-self-start"/>
      <router-view class="col-12 align-self-start"/>
      <BottomFooter class="col-12 align-self-end" />
    </div>
  </div>
</template>

<style lang="scss">

@font-face {
  font-family: 'NotoSans';
  src: url('./assets/fonts/yumin.ttf');
}

html,body {
  font-family: 'Press Start 2P', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white !important;
  background:rgb(55,37,56) !important;
  font-size:14px;
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
