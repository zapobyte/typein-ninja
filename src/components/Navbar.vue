<template>
  <nav class="navbar navbar-dark">
    <div class="container">
      <router-link to="/" class="navbar-brand" >typein.ninja</router-link>
      <button class="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown  mr-auto">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
              <i class="nes-icon trophy is-small"></i>
              <span class="pl-2">Scoreboard</span>
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Top 100</a></li>
              <li><a class="dropdown-item" href="#">All users</a></li>
              </ul>
          </li>
          <li class="nav-item dropdown mr-auto">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
              <i class="nes-icon is-small heart"></i>
              <small class="small pl-2">User</small>
              </a>
              <ul class="dropdown-menu " aria-labelledby="navbarDropdown">
              <li class="dropdown-item small" v-if="isAuth">
                  <router-link to="profile"></i> 
                   Profile</router-link> 
              </li>
              <div class="dropdown-divider"  v-if="isAuth"></div>
              <li class="dropdown-item small" v-if="isAuth" @click="logout">
                  <span class=""> Logout</span>
              </li>
              <li class="dropdown-item" v-if="!isAuth">
                  <button type="button" class="btn btn-sm" @click="login">
                  <i class="nes-icon google is-small"></i>
                  Signin with Google
                  </button>
              </li>
              </ul>
          </li>
          </ul>
      </div>
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