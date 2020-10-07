<template>
    <nav class="navbar navbar-expand-lg navbar-light">
        <div class="container-fluid">
        <a class="navbar-brand" href="#">typein.ninja</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
            <li class="nav-item">
                <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" to="/about">About</router-link>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-trophy"></i> 
                <span class="">Leaderboard</span>
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="#">Top 100</a></li>
                <li><a class="dropdown-item" href="#">All users</a></li>
                </ul>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
                <i class="fas fa-user-circle"></i>
                <span class="">User</span>
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li class="dropdown-item" v-if="isAuth" @click="goToProfile">
                    <i class="fas fa-user"></i> 
                    <span class="">Profile</span> 
                </li>
                <div class="dropdown-divider"  v-if="isAuth"></div>
                <li class="dropdown-item" v-if="isAuth" @click="logout">
                    <i class="fas fa-sign-out-alt"></i>
                    <span class=""> Logout</span>
                </li>
                <li class="dropdown-item" v-if="!isAuth">
                    <button type="button" class="btn" @click="login">
                    <i class="fab fa-google"></i> 
                    <span>Signin with Google</span>
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
    },
    goToProfile(){
      
    }
  }
}
</script>