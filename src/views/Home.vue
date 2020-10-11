<template>
  <div class="text-center">
    <GameText />
  </div>
</template>

<script>
// @ is an alias to /src
import GameText from '@/components/GameText.vue'

export default {
  name: 'Home',
  components: {
    GameText,
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
/* .home{
  @media screen and (min-width:980px) {
      width:55%;
  }
  width:100%;
} */
</style>
