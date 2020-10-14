<template>
  <main class="home pt-4">
    <GameText />
  </main>
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
  }
}
</script>

<style lang="scss" scoped>
.home{
  padding-top:10vh;
  padding-bottom:132px;
}
</style>
