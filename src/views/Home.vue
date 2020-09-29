<template>
  <div class="home">
    <PixieAnimation />
    <GameText />
    <UserProfile  v-if="isAuth"/>
  </div>
</template>

<script>
// @ is an alias to /src
import GameText from '@/components/GameText.vue'
import PixieAnimation from '@/components/PixieAnimation.vue';
import UserProfile from '@/components/UserProfile.vue';

export default {
  name: 'Home',
  components: {
    GameText,
    PixieAnimation,
    UserProfile
  },
  computed:{
    appVersion(){
      return this.$store.getters.getAppVersion;
    },
    isAuth(){
      return this.$store.getters.isAuth;
    }
  }
}
</script>
