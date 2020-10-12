<template>
  <div class="animation-container">
  <!--   <ion-phaser
      v-bind:game.prop='config'
      v-bind:initialize.prop='initialize'
      v-if="initialize"/> -->
      <img src="@/assets/idle.gif"/>
  </div>
</template>

<script>
/* import {config} from '@/functions/gameAnimation';
 */ 
export default {
  name:"GameAnimation",
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

</style>
