<template>
  <nav class="navbar navbar-expand-lg navbar-dark">
      <router-link to="/" class="navbar-brand" >typein.ninja</router-link>
      <button class="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto ">
            <li class="nav-item  ">
                <router-link class="nav-link text-right" to="/history" aria-expanded="false">
                <i class="nes-icon trophy is-small"></i>
                <span class="pl-2">scoreboard</span>
                </router-link>

            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle text-right" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                  <i class="nes-icon is-small heart" v-if="$store.getters.isAuth"></i>
                  <i class="nes-icon is-small heart is-half" v-else></i>
                  <small class="small pl-2">{{ $store.getters.isAuth ? `${user.displayName}`:'user'}}</small>
                </a>
                <ul class="dropdown-menu " aria-labelledby="navbarDropdown">
                <li class="dropdown-item " v-if="isAuth">
                    <router-link :to="{name:'Profile',params:{user:$store.getters.getAuthUser }}">
                    profile</router-link> 
                </li>
                <div class="dropdown-divider"  v-if="isAuth"></div>
                <li class="dropdown-item " v-if="isAuth" @click="logout">
                    <span class=""> logout</span>
                </li>
                <li class="dropdown-item" v-if="!isAuth">
                    <button type="button" class="nes-btn" @click="login">
                    <i class="nes-icon google is-small"></i>
                    Signin with Google
                    </button>
                </li>
                </ul>
            </li>
          </ul>
      </div>
  </nav>
</template>


<script>
import { 
  googleSignIn,
  logout
} from '@/functions/firebase.js';
export default {
  name:'Navbar',
  data(){
    return {

    }
  },
  computed:{
    isAuth(){
      return this.$store.getters.isAuth;
    },
    user(){
      return this.$store.getters.getAuthUser;
    }
  },
  methods:{
    logout(){
        logout();
    },
    login(){
      googleSignIn();
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar-toggler{
  &:focus{
    border:0;
  }
  border:0;
}
</style>