<template>
  <main class="home">
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
  margin-top:5vh;
  padding-bottom:132px;
}
</style>
