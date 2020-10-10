<template>
  <div class="user">
      <img :src="user.photoURL" class="user-avatar" />
      {{ user.displayName }} -  LVL {{ user.lvl }} 
  </div>
</template>

<script>
export default {
    name: 'UserProfile',
    computed:{
        user(){
            return this.$store.getters.getAuthUser
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.user{
    &-avatar{
        max-width:48px;
        max-height:48px;
        border-radius:50%;
    }
}
</style>
