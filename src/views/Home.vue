<template>
  <main class="home text-center">
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

</style>
