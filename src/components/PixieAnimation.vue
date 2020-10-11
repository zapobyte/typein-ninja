<template>
  <div class="animation-container">
  </div>
</template>

<script>
export default {
  name: 'PixieAnimation',
  props: {
    msg: String
  },
  mounted(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.animation-container{
  min-height:30vh;
  max-height:40vh;
  width: 100%;
}
</style>
