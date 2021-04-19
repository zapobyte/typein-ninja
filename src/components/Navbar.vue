<template>
  <nav class="navbar navbar-expand-lg navbar-dark col-12 align-self-start">
    <h1 class="align-self-start"><router-link to="/" class="navbar-brand">typein.ninja</router-link></h1>
    <button
      class="navbar-toggler ml-auto"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link class="nav-link text-right" :class="{ active: $route.name == 'Scoreboard' }" to="/scoreboard" aria-expanded="false">
            <i class="nes-icon trophy is-small"></i>
            <span class="pl-2">scoreboard</span>
          </router-link>
        </li>
        <li class="nav-item dropdown" style="max-width: 350px">
          <a class="nav-link dropdown-toggle text-right text-truncate" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-expanded="false">
            <i class="nes-icon is-small heart" v-if="$store.getters.isAuth"></i>
            <i class="nes-icon is-small heart is-half" v-else></i>
            <span class="text-truncate pl-2" :class="{ 'text-white': $route.name == 'Profile' }">{{ $store.getters.isAuth ? `${user.displayName}` : 'account' }}</span>
          </a>
          <ul class="dropdown-menu mr-auto" aria-labelledby="navbarDropdown">
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
              <button type="button" class="nes-btn is-small" @click="login">
                <i class="nes-icon google is-small mr-1"></i>
                <small>Signin with Google</small>
              </button>
            </li>

            <li class="p-3">
              <small>
                *by Signin you agree with our
                <router-link to="/terms-condition">Terms and Conditions</router-link>
                and
                <router-link to="/privacy-policy">Privacy Policy</router-link>.
              </small>
            </li>

            <li class="text-right text__small pr-3">
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
