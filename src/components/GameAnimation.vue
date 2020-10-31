<template>
  <div class="animation--container">
      <div class="ninja">
        <img  v-if="!gameDone" src="@/assets/gameAssets/spritesheets/idle-Sheet.png" class="ninja--player ninja--player__idle pixelated" alt="ninja player"/>
        <img  v-else src="@/assets/gameAssets/spritesheets/slash-Sheet.png" class="ninja--player ninja--player__attack pixelated" alt="ninja player"/>
      </div>
      <div class="bg">
          <div class="bg--terrain__dummy" :class="gameDone ? 'bg--terrain__dummy__attack':''"></div>
          <div class="bg--terrain__building"></div>
          <div class="bg--terrain__tree"></div>
          <div  class="bg--terrain__lend" alt="background"/>
          <div  class="bg--terrain__body" alt="background"/>
          <div  class="bg--terrain__rend" alt="background"/>
      </div>
  </div>
</template>

<script>
/* import {config} from '@/functions/gameAnimation';
 */ 
export default {
  name:"GameAnimation",
  props:{
    gameDone:{
      type:Boolean,
      default:false
  }},
  data() {
    return {
      initialize: false,
/*       config:config
 */    };
  },
  methods: {

  }
}; 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '~@/scss/components/game_animation.scss';

</style>
