<template>
  <div id="app" class="container"  v-if="!loading"> 
    <div class="row no-gutters flex-column align-items-start min-vh-100">
      <Navbar />
      <router-view class="router"/>
      <BottomFooter />
    </div>
  </div>
  <div class="loading" v-else>
    <p>LOADING</p>
    <img src="~@/assets/loading.gif" class="img-fluid" />
  </div>
</template>

<style lang="scss">
html,body {
  font-family: 'Press Start 2P', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white !important;
  background:rgb(55,37,56) !important;
  font-size:14px;
}
small{
  font-size:70% !important;
}
a{
  text-decoration: none !important;
  transition: 0.1s all ease-in;
  :hover{
    transition: 0.1s all ease-in;
  }
}

.router{
  flex:1;
}
.nes-avatar{
  border:2px solid #222;
}

.loading{
  text-align: center;
  width:auto;
  height:300px;
  position:absolute;
  margin:auto;
  top:0;
  left:0;
  right:0;
  bottom:0;
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
    loading(){
      return this.$store.getters.getLoading
    }
  },
  created(){
    firebaseInit();
  },
  methods:{
  }
}
</script>
