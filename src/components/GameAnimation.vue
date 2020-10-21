<template>
  <div class="animation--container">
  <!--   <ion-phaser
      v-bind:game.prop='config'
      v-bind:initialize.prop='initialize'
      v-if="initialize"/> -->
      <div class="ninja"  v-if="!gameDone">
        <img src="@/assets/gameAssets/spritesheets/idle-Sheet.png" class="ninja--player ninja--player__idle pixelated" alt="ninja player"/>
      </div>
      <div class="ninja"  v-else>
        <img src="@/assets/gameAssets/spritesheets/slash-Sheet.png" class="ninja--player ninja--player__attack pixelated" alt="ninja player"/>
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

.animation--container{
  min-height:100px;
}

.ninja{
  width:32px;
  height:52px;
  overflow:hidden;
  &--player{
    width:128px;
    height:52px;
    &__idle{
        animation: moveIdleSpriteSheet 0.5s steps(4) infinite;
    }
    &__attack{
        animation: moveIdleSpriteSheet 0.5s steps(4) infinite;
    }
  }
}
.pixelated{
  image-rendering: pixelated;
}
@keyframes moveIdleSpriteSheet {
  from{
    transform: translate3d(0px,0,0);
  }
  to {
    transform: translate3d(-100%,0,0);
  }
}
</style>
