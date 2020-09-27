<template>
  <div id="app" class="min-vh-100 d-flex">
    <div class="container d-flex flex-column align-items-center">
      <header class="header">
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
                    <i class="fas fa-user"></i> 
                    <span class="">User</span>
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li class="dropdown-item" v-if="isAuth" @click="deleteAcc">
                      <i class="fas fa-user-times"></i>
                      <span class=""> Delete typein.ninja account</span> 
                    </li>
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
      </header>
      <router-view class="flex-grow-1"/>
      <footer class="footer p-2">
        <small>copyright <i class="far fa-copyright"></i> typein.ninja</small>
      </footer>
    </div>
  </div>
</template>

<style lang="scss">

@font-face {
  font-family: 'NotoSans';
  src: url('./assets/fonts/yumin.ttf');
}

html,body {
  font-family: 'NotoSans', sans-serif;
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

</style>

<script>
import { 
  firebaseInit,
  googleSignIn,
  logout
} from '@/functions/firebase.js';

export default {
  name:'App',
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
    logout(){
        logout();
    },
    login(){
      googleSignIn();
    },
    deleteAcc(){
      
    }
  }
}
</script>
