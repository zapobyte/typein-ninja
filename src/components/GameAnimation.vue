<template>
  <div class="animation--container">
    <div class="ninja">
      <img v-if="!config.gameDone" src="@/assets/gameAssets/spritesheets/idle-Sheet.png" class="ninja--player ninja--player__idle " alt="ninja player" />
      <img v-else src="@/assets/gameAssets/spritesheets/slash-Sheet.png" class="ninja--player ninja--player__attack " alt="ninja player" />
    </div>
    <div class="bg">
      <img src="~@/assets/gameAssets/bg.png" class="bg-terrain__ground" />
    </div>
  </div>
</template>

<script>

export default {
  name: 'GameAnimation',
  props: {
    config: {
      type: Object,
      default: {
        gameDone: false,
      },
    },
  },
  data() {
    return {
    };
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '~@/scss/components/game_animation.scss';
</style>
