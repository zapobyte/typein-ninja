<template>
  <div class="home ml-auto mr-auto mt-0 align-self-start">
    <PixieAnimation />
    <GameText />
  </div>
</template>

<script>
// @ is an alias to /src
import GameText from '@/components/GameText.vue'
import PixieAnimation from '@/components/PixieAnimation.vue';

export default {
  name: 'Home',
  components: {
    GameText,
    PixieAnimation
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

<style lang="scss" scoped>
.home{
  @media screen and (min-width:980px) {
      width:70%;
  }
  width:100%;
}
</style>
