<template>

  <div class="nes-container is-dark with-title  p-3">
        <p class="title">Stats</p>
    <div class="row  align-items-center">
      <div class="col-auto">
          <img class="nes-avatar is-large" alt="Gravatar image example" :src="user.photoURL"  style="image-rendering: pixelated;">

      </div>
       <div class="col-auto">
           {{ user.displayName }}
      </div>
       <div class="col text-right">
             LVL {{ user.lvl }}
      </div>
    </div>
      <progress class="nes-progress mt-3" value="90" max="100"></progress>

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
<style scoped lang="scss" scoped>
.user{
    &-avatar{
        max-width:48px;
        max-height:48px;
        border-radius:50%;
    }
}
.nes-progress{
    height:16px;
}
</style>
