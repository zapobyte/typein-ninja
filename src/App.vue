<template>
  <div id="app" class="min-vh-100 container-fluid">
    <section class="no-gutters vh-100 row m-auto align-items-start">
      <header class="header align-self-start container" >
       <Navbar />
      </header>
      <router-view class="align-self-start container"/>
      <BottomFooter class="align-self-end" />
    </section>
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
  font-size:18px;
}

.header{
  & nav ul li i{
    min-width:1.5rem;
  }
}

</style>

<script>
import { 
  firebaseInit,
  googleSignIn,
  logout
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
    isAuth(){
      return this.$store.getters.isAuth;
    }
  },
  created(){
    firebaseInit();
  },
  methods:{
  }
}
</script>
