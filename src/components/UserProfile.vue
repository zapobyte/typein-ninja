<template>
  <div class="pixiejs">
      {{ username }}
  </div>
</template>

<script>
export default {
    name: 'UserProfile',
    computed:{
        username(){
            return this.$store.getters.getAuthUser.displayName
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
