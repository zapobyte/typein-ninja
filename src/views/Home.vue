<template>
  <div class="home">
    <span>App version {{ appVersion }}</span>
    <GameText />
  </div>
</template>

<script>
// @ is an alias to /src
import GameText from '@/components/GameText.vue'

export default {
  name: 'Home',
  components: {
    GameText
  },
  computed:{
    appVersion(){
      console.log(this.$store)
      return this.$store.getters.getAppVersion;
    }
  }
}
</script>
