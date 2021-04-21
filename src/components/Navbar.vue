<template>
  <nav class="navbar navbar-expand-lg navbar-dark col-12 align-items-center">
    <h1 class="align-self-start"><router-link to="/" class="navbar-brand">typein.ninja <small> - typing accuracy & speed test</small> </router-link></h1>
    <button class="navbar-toggler me-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <router-link class="nav-link text-end" :class="{ active: $route.name == 'Scoreboard' }" to="/scoreboard" aria-expanded="false">
            <i class="nes-icon trophy is-small"></i>
            <span class="ps-2">scoreboard</span>
          </router-link>
        </li>
         <li class="nav-item dropdown text-end">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="nes-icon is-small heart" v-if="$store.getters.isAuth"></i>
            <i class="nes-icon is-small heart is-half" v-else></i>
            <span class="text-truncate ps-2" :class="{ 'text-white': $route.name == 'Profile' }">{{ $store.getters.isAuth ? `${user.displayName}` : 'account' }}</span>
          </a>
          <ul class="dropdown-menu me-auto" aria-labelledby="navbarDropdown">
            <li class="dropdown-item" v-if="isAuth" @click="toProfile($event)">
              <a> profile</a>
            </li>
            <li class="dropdown-item" v-if="isAuth" @click="logout">
              <span class=""> logout</span>
            </li>
            <div class="dropdown-divider" v-if="isAuth"></div>
            <li class="dropdown-item" v-if="isAuth" @click="deleteAccount">
              <span class="text-danger"> <i class="nes-icon close is-small"></i> delete account</span>
            </li>

            <li class="dropdown-item" v-if="!isAuth">
              <button type="button" class="nes-btn is-small" @click="login" :class="{'is-disabled':!agree}" :disabled="!agree">
                <i class="nes-icon google is-small mr-1"></i>
                <small>Signin with Google</small>
              </button>
            </li>

            <li class="p-3" v-if="!isAuth">
                <label>
                  <input type="checkbox" class="nes-checkbox" v-model="agree" @click="agreed()"/>
                  <span>
                    To Singin you agree with our
                    <router-link to="/terms-condition">Terms and Conditions</router-link>
                    and
                    <router-link to="/privacy-policy">Privacy Policy</router-link>.
                  </span>
                </label>
                
            </li>

            <li class="text-end text__small pe-3">
              <small>v{{ appVersion }}</small>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <Modal @confirm="deleteAcc">
      <template v-slot:title
        ><h4 class="text-danger pb-2">{{ modal.title }}</h4></template
      >
      <template v-slot:body> <p v-html="modal.body"></p></template>
    </Modal>
  </nav>
  
</template>

<script>
import { mapGetters } from 'vuex';

import { googleSignIn, logout } from '@/functions/firebase';
import { deleteCurrentUser } from '@/functions/user';
import Modal from '@/components/Dialog.vue';
export default {
  name: 'Navbar',
  data() {
    return {
      modal: {
        title: 'Account removal',
        body:
          "You are about to delete you're account. All your information and records will be lost for ever as they will be removed from our database. <br> Are you sure you want to do that?",
      },
      agree:false
    };
  },
  components: {
    Modal,
  },
  computed: {
    ...mapGetters(['appVersion']),
    isAuth() {
      return this.$store.getters.isAuth;
    },
    user() {
      return this.$store.getters.getAuthUser;
    },
  },

  methods: {
    agreed(){
      this.agree = !this.agree;
    },
    logout() {
      logout();
      window.location.replace('/');
    },
    login() {
      googleSignIn();
    },
    toProfile(e) {
      e.preventDefault();
      this.$router.push({ path: `/profile/${this.user.uid}` });
    },
    deleteAccount() {
      const isChrome = navigator.userAgent.includes('Chrome') && navigator.vendor.includes('Google Inc');

      if (isChrome) {
        document.getElementById('dialog').showModal();
      } else {
        if (confirm('Are you sure you want to delete your account and all info associated with it?')) {
          deleteCurrentUser();
        }
      }
    },
    deleteAcc() {
      deleteCurrentUser();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/scss/components/navbar.scss';
</style>
