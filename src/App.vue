<template>
  <div id="app" class="min-vh-100 d-flex">
    <div class="container d-flex flex-column align-items-center">
      <header class="header">
       <Navbar />
      </header>
      <router-view class="flex-grow-1"/>
      <BottomFooter />
    </div>
  </div>
</template>

<style lang="scss">

@font-face {
  font-family: 'NotoSans';
  src: url('./assets/fonts/yumin.ttf');
}

html,body {
font-family: 'Noto Sans JP', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size:18px;
}

.header{
  display:block;
  width:100%;
  & nav ul li i{
    min-width:1.5rem;
  }
}
.small{
  font-size:85%;
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
<style lang="scss" >
body{
  background:url('~@/assets/c.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>