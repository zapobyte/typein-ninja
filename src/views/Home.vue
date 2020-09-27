<template>
  <div class="home">
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
  }
}
</script>
